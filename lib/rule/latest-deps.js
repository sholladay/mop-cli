'use strict';

const latestVersion = require('latest-version');
const semver = require('semver');
const isDepKey = require('../is-dep-key');

const depCache = new Map();

const processDepMap = async (depMap) => {
    const result = {};
    for (const [name, wanted] of Object.entries(depMap)) {
        const isCached = depCache.has(name);
        // eslint-disable-next-line no-await-in-loop
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
        // eslint-disable-next-line no-await-in-loop
        const processed = await processDepMap(pkg[depType]);
        if (Object.keys(processed).length > 0) {
            result[depType] = processed;
        }
    }
    return result;
};

const latestDeps = async (project) => {
    if (!project.pkg) {
        return;
    }
    const depContainer = await processPkg(project.pkg);
    const hasOutdated = Object.values(depContainer).some((depMap) => {
        return Object.keys(depMap).length > 0;
    });
    return hasOutdated && {
        message : 'Package has outdated dependencies',
        path    : 'package.json',
        data    : depContainer
    };
};

module.exports = latestDeps;
