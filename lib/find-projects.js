'use strict';

const projectDirs = require('project-dirs');
const loadProjects = require('./load-projects');

const findProjects = async (cwd) => {
    const dirs = await projectDirs(cwd);
    return loadProjects(dirs);
};

module.exports = findProjects;
