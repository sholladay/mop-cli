'use strict';

const table = require('text-table');
const { bold } = require('chalk');
const stripAnsi = require('strip-ansi');
const humanTitle = require('../lib/human-title');

const humanDepType = (key) => {
    return humanTitle(key).replace('Dependencies', 'Dependency');
};
const headline = bold.yellow.underline;
const columnHead = (str) => {
    return bold.cyan(str);
};

const showTable = (lines) => {
    return table(lines, {
        stringLength(str) {
            return stripAnsi(str).length;
        }
    }) + '\n';
};

const org = Object.assign(Object.create(null), {
    'latest-deps' : (depContainer) => {
        return Object.entries(depContainer).reduce((rows, [depType, depMap]) => {
            rows.push([humanDepType(depType), 'Wanted', 'Latest'].map(columnHead));
            return rows.concat(Object.entries(depMap).map(([name, spec]) => {
                return [name, spec.wanted, spec.latest];
            }));
        }, []);
    },
    'caret-deps' : (depContainer) => {
        return Object.entries(depContainer).reduce((rows, [depType, depMap]) => {
            rows.push([humanDepType(depType), 'Wanted', 'Expected'].map(columnHead));
            return rows.concat(Object.entries(depMap).map(([name, spec]) => {
                return [name, spec.wanted, spec.expected];
            }));
        }, []);
    }
});

const format = (failedProjects) => {
    const parts = failedProjects.map((project) => {
        return headline(project.name) + '\n' + showTable(org[project.problems[0].ruleId](project.problems[0].data));
    });
    if (failedProjects.length > 0) {
        const subject = failedProjects.length === 1 ? 'project' : 'projects';
        parts.push(bold.red(failedProjects.length + ' failed', subject) + '\n');
    }
    return parts.join('\n');
};

module.exports = format;
