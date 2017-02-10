'use strict';

const readPkg = require('read-pkg');
const projectDirs = require('./project-dirs');

const findProjects = (cwd) => {
    return projectDirs(cwd).then((dirs) => {
        return Promise.all(dirs.map((projectPath) => {
            return readPkg(projectPath)
                .catch((err) => {
                    if (err.code === 'ENOENT') {
                        return null;
                    }
                    throw err;
                })
                .then((pkg) => {
                    return {
                        pkg,
                        path : projectPath
                    };
                });
        }));
    });
};

findProjects.withPkg = (...args) => {
    return findProjects(...args).then((projects) => {
        return projects.filter((project) => {
            return Boolean(project.pkg);
        });
    });
};

module.exports = findProjects;
