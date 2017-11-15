'use strict';

const path = require('path');
const loadRule = require('./lib/load-rule');
const findProjects = require('./lib/find-projects');

const lint = async (option) => {
    const config = Object.assign({}, option);
    const cwd = path.resolve(config.cwd || '');
    const projects = config.projects || await findProjects(cwd);
    if (!projects || projects.length < 1) {
        throw new RangeError('You must provide at least one project');
    }
    const ruleConfig = Object.assign({}, config.rule);
    const rules = Object.keys(ruleConfig)
        .filter((ruleId) => {
            const [severity] = [].concat(ruleConfig[ruleId]);
            if (!['off', 'warn', 'error'].includes(severity)) {
                throw new Error('Rule severity must be "off", "warn", or "error"');
            }
            return severity && severity !== 'off';
        })
        .map((ruleId) => {
            return loadRule(ruleId);
        });

    if (rules.length < 1) {
        throw new RangeError('You must enable at least one rule');
    }

    const projectResults = await Promise.all(projects.map(async (project) => {
        const ruleResults = await Promise.all(rules.map(async (rule) => {
            const ruleId = rule.id;
            const [severity, ...ruleArgs] = [].concat(ruleConfig[ruleId]);
            const ruleResult = await rule(project, ...ruleArgs);
            return ruleResult && Object.assign({}, ruleResult, {
                ruleId,
                severity
            });
        }));
        const problems = ruleResults.filter((ruleResult) => {
            return Boolean(ruleResult);
        });

        return Object.assign({}, project, {
            problems,
            errors : problems.filter(({ severity }) => {
                return severity === 'error';
            }),
            warnings : problems.filter(({ severity }) => {
                return severity === 'warn';
            })
        });
    }));
    return projectResults.filter(({ problems }) => {
        return problems.length > 0;
    });
};

module.exports = lint;
