'use strict';

const path = require('path');
const loadRule = require('./lib/load-rule');
const findProjects = require('./lib/find-projects');

const lint = async (option) => {
    const config = Object.assign({}, option);
    const cwd = path.resolve(config.cwd || '');
    const projects = config.projects || await findProjects.withPkg(cwd);
    if (projects.length < 1) {
        throw new RangeError('You must provide at least one project');
    }
    const userConfig = Object.assign({}, config.config);
    const rules = Object.keys(userConfig.rule || {})
        .filter((ruleId) => {
            const [severity] = [].concat(userConfig.rule[ruleId]);
            return severity && severity !== 'off';
        })
        .map((ruleId) => {
            const rule = loadRule(ruleId);
            // TODO: Do not mutate user-provided object.
            rule.id = ruleId;
            return rule;
        });

    if (rules.length < 1) {
        throw new RangeError('You must enable at least one rule');
    }

    const projectResults = await Promise.all(projects.map(async (project) => {
        const ruleResults = await Promise.all(rules.map(async (rule) => {
            const ruleId = rule.id;
            const ruleConfig = [].concat(userConfig.rule[ruleId]);
            const ruleResult = await rule(project, ...ruleConfig.slice(1));
            return ruleResult && Object.assign({}, ruleResult, {
                ruleId,
                severity : ruleConfig[0]
            });
        }));
        const problems = ruleResults.filter((ruleResult) => {
            return Boolean(ruleResult);
        });

        return Object.assign({}, project, {
            problems,
            errors : problems.filter((problem) => {
                return problem.severity === 'error';
            }),
            warnings : problems.filter((problem) => {
                return problem.severity === 'warn';
            })
        });
    }));
    return projectResults.filter(({ problems }) => {
        return problems.length > 0;
    });
};

module.exports = lint;
