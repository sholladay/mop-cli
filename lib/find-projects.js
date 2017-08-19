'use strict';

const projectDirs = require('project-dirs');
const loadProjects = require('./load-projects');

const findProjects = async (cwd) => {
    const dirs = await projectDirs(cwd);
    return loadProjects(dirs);
};

findProjects.withPkg = async (...args) => {
    const projects = await findProjects(...args);
    return projects && projects.filter((project) => {
        return Boolean(project.pkg);
    });
};

module.exports = findProjects;
