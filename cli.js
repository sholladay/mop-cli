#!/usr/bin/env node

'use strict';

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
const isDepKey = require('./lib/is-dep-key');
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

if (cmd === 'outdated') {
    const print = (project) => {
        console.log(headline(project.name));
        const lines = [];
        Object.keys(project).forEach((key) => {
            if (!isDepKey(key)) {
                return;
            }
            const headings = [humanDepType(key), 'Wanted', 'Latest'].map(columnHead);
            lines.push(headings);
            const category = project[key];
            for (const [name, spec] of Object.entries(category)) {
                lines.push([name, spec.wanted, spec.latest]);
            }
        });
        showTable(lines);
    };
    mop[cmd]().then((projects) => {
        projects.forEach(print);
    });
}
else if (cmd === 'pinned') {
    const print = (project) => {
        console.log(headline(project.name));
        const lines = [];
        Object.keys(project).forEach((key) => {
            if (!isDepKey(key)) {
                return;
            }
            const headings = [humanDepType(key), 'Wanted', 'Expected'].map(columnHead);
            lines.push(headings);
            const category = project[key];
            for (const [name, spec] of Object.entries(category)) {
                lines.push([name, spec.wanted, spec.expected]);
            }
        });
        showTable(lines);
    };

    mop[cmd]().then((projects) => {
        projects.forEach(print);
    });
}
else {
    console.error('Unknown mop command.');
    process.exit(1);
}
