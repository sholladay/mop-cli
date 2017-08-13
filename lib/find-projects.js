'use strict';

const path = require('path');
const readPkg = require('read-pkg');
const projectDirs = require('project-dirs');

const findProjects = async (cwd) => {
    const dirs = await projectDirs(cwd);

    return dirs && Promise.all(dirs.map(async (projectPath) => {
        let pkg = null;
        try {
            pkg = await readPkg(projectPath);
        }
        catch (err) {
            if (err.code !== 'ENOENT') {
                throw err;
            }
        }
        return {
            name : (pkg && pkg.name) || path.basename(projectPath),
            path : projectPath,
            pkg
        };
    }));
};

findProjects.withPkg = async (...args) => {
    const projects = await findProjects(...args);
    return projects.filter((project) => {
        return Boolean(project.pkg);
    });
};

module.exports = findProjects;
