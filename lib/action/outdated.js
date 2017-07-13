'use strict';

const latestVersion = require('latest-version');
const semver = require('semver');
const isDepKey = require('../is-dep-key');

const depCache = new Map();

const processCategory = async (category) => {
    const result = {};
    for (const [name, wanted] of Object.entries(category)) {
        const isCached = depCache.has(name);
        const latest = isCached ? depCache.get(name) : await latestVersion(name);

        if (!isCached) {
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
    for (const depType of Object.keys(pkg).filter(isDepKey)) {
        const processed = await processCategory(pkg[depType]);
        if (Object.keys(processed).length > 0) {
            result[depType] = processed;
        }
    }
    return result;
};

const outdated = async (projects) => {
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
