#!/usr/bin/env node

'use strict';

require('throw-rejects')();
require('root-check')();
const table = require('text-table');
const { bold } = require('chalk');
const stripAnsi = require('strip-ansi');
const cli = require('meow')(`
    Usage
      $ mop [pinned | outdated]

    Example
      $ mop pinned
`);
const humanTitle = require('./lib/human-title');
const mop = require('.');

require('update-notifier')({ pkg : cli.pkg }).notify();

const [ruleName] = cli.input;

if (!ruleName) {
    console.error('Please provide a command for mop to do.');
    process.exit(1);
}

const humanDepType = (key) => {
    return humanTitle(key).replace('Dependencies', 'Dependency');
};
const headline = bold.yellow.underline;
const columnHead = (str) => {
    return bold.cyan(str);
};

const showTable = (lines) => {
    console.log(table(lines, {
        stringLength(str) {
            return stripAnsi(str).length;
        }
    }) + '\n');
};

const lines = Object.assign(Object.create(null), {
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
})[ruleName];

mop({
    cwd    : cli.flags.cwd,
    rule : {
        [ruleName] : 'error'
    }
}).then((failedProjects) => {
    failedProjects.forEach((project) => {
        console.log(headline(project.name));
        showTable(lines(project.problems[0].data));
    });
    if (failedProjects.length > 0) {
        const subject = failedProjects.length === 1 ? 'project' : 'projects';
        console.error(bold.red(failedProjects.length + ' failed', subject));
    }
    const hasError = failedProjects.some((project) => {
        return project.errors.length > 0;
    });
    if (hasError) {
        process.exit(1);
    }
});
