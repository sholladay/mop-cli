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

const [cmd] = cli.input;

if (!cmd) {
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
    outdated : (depContainer) => {
        return Object.entries(depContainer).reduce((rows, [depType, depMap]) => {
            rows.push([humanDepType(depType), 'Wanted', 'Latest'].map(columnHead));
            return rows.concat(Object.entries(depMap).map(([name, spec]) => {
                return [name, spec.wanted, spec.latest];
            }));
        }, []);
    },
    pinned : (depContainer) => {
        return Object.entries(depContainer).reduce((rows, [depType, depMap]) => {
            rows.push([humanDepType(depType), 'Wanted', 'Expected'].map(columnHead));
            return rows.concat(Object.entries(depMap).map(([name, spec]) => {
                return [name, spec.wanted, spec.expected];
            }));
        }, []);
    }
})[cmd];

mop({
    rules : [
        require('./lib/rule/' + cmd)
    ]
}).then((failedProjects) => {
    failedProjects.forEach((project) => {
        console.log(headline(project.name));
        showTable(lines(project.errors[0].data));
    });
    if (failedProjects.length > 0) {
        const subject = failedProjects.length === 1 ? 'project' : 'projects';
        console.error(bold.red(failedProjects.length + ' failed', subject));
        process.exitCode = 1;
    }
});
