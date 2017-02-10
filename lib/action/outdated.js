'use strict';

const latestVersion = require('latest-version');
const semver = require('semver');
const findProjects = require('../find-projects');
const isDepKey = require('../is-dep-key');

const depCache = new Map();

const processCategory = async (category) => {
    const result = {};
    for (const [name, wanted] of Object.entries(category)) {
        let latest;

        if (depCache.has(name)) {
            latest = depCache.get(name);
        }
        else {
            latest = await latestVersion(name);
            depCache.set(name, latest);
        }

        if (!semver.satisfies(latest, wanted)) {
            result[name] = {
                wanted,
                latest
            };
        }
    }
    return result;
};

const processPkg = async (pkg) => {
    const result = {};
    for (const key of Object.keys(pkg)) {
        if (isDepKey(key)) {
            const processed = await processCategory(pkg[key]);
            if (Object.keys(processed).length > 0) {
                result[key] = processed;
            }
        }
    }
    return result;
};

const outdated = async (cwd) => {
    const projects = await findProjects.withPkg(cwd);

    const processed = await Promise.all(projects.map(async (project) => {
        const depContainer = await processPkg(project.pkg);
        return Object.assign({}, depContainer, {
            name : project.pkg.name,
            path : project.path
        });
    }));

    return processed.filter((project) => {
        return Object.keys(project).some((key) => {
            return isDepKey(key) && (Object.keys(project[key]).length > 0);
        });
    });
};

module.exports = outdated;
