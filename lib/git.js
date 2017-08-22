'use strict';

const util = require('util');
const childProcess = require('child_process');

const exec = util.promisify(childProcess.exec);

const git = async (command, option) => {
    const { stdout } = await exec('git ' + command, option);
    return stdout.trimRight();
};

module.exports = git;
