'use strict';

const path = require('path');
const findProjects = require('./lib/find-projects');

const lint = async (option) => {
    const config = Object.assign({}, option);
    const cwd = path.resolve(config.cwd || '');
    const projects = config.projects || await findProjects.withPkg(cwd);
    const rules = config.rules || [
        require('./lib/rule/outdated'),
        require('./lib/rule/pinned')
    ];

    const projectResults = await Promise.all(projects.map(async (project) => {
        const ruleResults = await Promise.all(rules.map((rule) => {
            return rule(project);
        }));
        const problems = ruleResults.filter((ruleResult) => {
            return Boolean(ruleResult);
        });
        // TODO: Filter by severity
        const errors = problems;
        return Object.assign({}, project, { errors });
    }));
    return projectResults.filter((projectResult) => {
        return projectResult.errors.length > 0;
    });
};

module.exports = lint;
