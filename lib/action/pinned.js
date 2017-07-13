'use strict';

const semver = require('semver');
const isDepKey = require('../is-dep-key');

const unpinnedVersion = (version) => {
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
    const pinnedPattern = /^\^\d+\.\d+\.\d+$/;
    return Object.entries(depMap).reduce((result, [name, wanted]) => {
        if (!pinnedPattern.test(wanted)) {
            result[name] = {
                wanted,
                expected : unpinnedVersion(wanted)
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

const pinned = async (projects) => {
    return projects.reduce((result, project) => {
        const depContainer = processPkg(project.pkg);
        const hasPinned = Object.values(depContainer).some((depMap) => {
            return Object.keys(depMap).length > 0;
        });
        if (hasPinned) {
            result.push(Object.assign({}, project, depContainer, {
                name : project.pkg.name
            }));
        }
        return result;
    }, []);
};

module.exports = pinned;
