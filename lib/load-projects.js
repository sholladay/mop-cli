'use strict';

const path = require('path');
const readPkg = require('read-pkg');

const loadProjects = async (dirs) => {
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

module.exports = loadProjects;
