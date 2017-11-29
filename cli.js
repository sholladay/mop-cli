#!/usr/bin/env node

'use strict';

require('throw-rejects')();
require('root-check')();
const cli = require('meow')(`
    Usage
      $ mop [rule-name]

    Option
      --cwd       Working directory to search for projects
      --reporter  How to display and stylize results

    Example
      $ mop caret-deps
      $ mop caret-deps --reporter=eslint
`);
const eslint = require('./reporter/eslint');
const fancy = require('./reporter/fancy');
const mop = require('.');

require('update-notifier')({ pkg : cli.pkg }).notify();

const [ruleName] = cli.input;

if (!ruleName) {
    console.error('Please enable at least one rule. Example: $ mop caret-deps');
    process.exit(1);
}

mop({
    cwd    : cli.flags.cwd,
    rule : {
        [ruleName] : 'error'
    }
}).then((failedProjects) => {
    const report = cli.flags.reporter === 'eslint' ? eslint : fancy;
    console.error(report(failedProjects));
    const hasError = failedProjects.some((project) => {
        return project.errors.length > 0;
    });
    if (hasError) {
        process.exit(1);
    }
});
