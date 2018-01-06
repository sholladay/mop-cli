'use strict';

const path = require('path');
const pretty = require('eslint-formatter-pretty');

const format = (projects) => {
    const byPath = new Map();
    projects.forEach((project) => {
        project.problems.forEach((problem) => {
            const fp = path.resolve(project.path, problem.path || '');
            const list = byPath.has(fp) ? byPath.get(fp) : [];
            list.push(problem);
            byPath.set(fp, list);
        });
    });
    const paths = Array.from(byPath.keys());
    const toFormat = paths.map((fp) => {
        const warningsForPath = byPath.get(fp).filter((problem) => {
            return problem.severity === 'warning';
        });
        const errorsForPath = byPath.get(fp).filter((problem) => {
            return problem.severity === 'error';
        });

        return {
            filePath     : fp,
            warningCount : warningsForPath.length,
            errorCount   : errorsForPath.length,
            messages     : byPath.get(fp)
        };
    });
    return pretty(toFormat);
};

module.exports = format;
