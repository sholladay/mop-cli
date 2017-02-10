'use strict';

const codeDir = require('code-dir');
const childrenDirs = require('./children-dirs');

const projectDirs = (cwd) => {
    return codeDir(cwd).then((dirPath) => {
        return childrenDirs(dirPath);
    });
};

module.exports = projectDirs;
