'use strict';

const codeDir = require('code-dir');
const childrenDirs = require('children-dirs');

const projectDirs = async (cwd) => {
    const parentDir = await codeDir(cwd);
    return childrenDirs(parentDir);
};

module.exports = projectDirs;
