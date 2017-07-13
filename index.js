'use strict';

const findProjects = require('./lib/find-projects');
const outdated = require('./lib/action/outdated');
const pinned = require('./lib/action/pinned');

module.exports = {
    async outdated(cwd) {
        const projects = await findProjects.withPkg(cwd);
        return outdated(projects);
    },
    async pinned(cwd) {
        const projects = await findProjects.withPkg(cwd);
        return pinned(projects);
    }
};
