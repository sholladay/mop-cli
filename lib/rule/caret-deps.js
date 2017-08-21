'use strict';

const semver = require('semver');
const isDepKey = require('../is-dep-key');

const caretVersion = (version) => {
    const parsed = semver.parse(version);
    if (parsed) {
        return `^${parsed.major}.${parsed.minor}.${parsed.patch}`;
    }

    // TODO: Determine highest version from range.
    // const range = semver.validRange(version);
    // const shouldParse = Boolean(range) && range !== '*';
    return '^X.X.X';
};

const processDepMap = (depMap) => {
    const caretPattern = /^\^\d+\.\d+\.\d+$/;
    return Object.entries(depMap).reduce((result, [name, wanted]) => {
        if (!caretPattern.test(wanted)) {
            result[name] = {
                wanted,
                expected : caretVersion(wanted)
            };
        }
        return result;
    }, {});
};

const processPkg = (pkg) => {
    return Object.keys(pkg).filter(isDepKey).reduce((result, depType) => {
        const processed = processDepMap(pkg[depType]);
        if (Object.keys(processed).length > 0) {
            result[depType] = processed;
        }
        return result;
    }, {});
};

const caretDeps = (project) => {
    if (!project.pkg) {
        return;
    }
    const depContainer = processPkg(project.pkg);
    const hasPinned = Object.values(depContainer).some((depMap) => {
        return Object.keys(depMap).length > 0;
    });
    if (hasPinned) {
        return {
            message : 'Package has pinned dependencies',
            path    : 'package.json',
            data    : depContainer
        };
    }
};

module.exports = caretDeps;
