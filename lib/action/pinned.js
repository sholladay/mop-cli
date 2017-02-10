'use strict';

const semver = require('semver');
const findProjects = require('../find-projects');
const isDepKey = require('../is-dep-key');

const expectVersion = (version) => {
    const parsed = semver.parse(version);
    if (parsed) {
        return `^${parsed.major}.${parsed.minor}.${parsed.patch}`;
    }

    // TODO: Determine highest version from range.
    // const range = semver.validRange(version);
    // const shouldParse = Boolean(range) && range !== '*';
    return '^X.X.X';
};

const processCategory = (category) => {
    const result = {};
    const idealPattern = /^\^\d+\.\d+\.\d+$/;
    for (const [name, wanted] of Object.entries(category)) {
        if (!idealPattern.test(wanted)) {
            result[name] = {
                wanted,
                expected : expectVersion(wanted)
            };
        }
    }
    return result;
};

const processPkg = (pkg) => {
    const result = {};
    for (const key of Object.keys(pkg)) {
        if (isDepKey(key)) {
            const processed = processCategory(pkg[key]);
            if (Object.keys(processed).length > 0) {
                result[key] = processed;
            }
        }
    }
    return result;
};

const pinned = async (cwd) => {
    const projects = await findProjects.withPkg(cwd);

    const processed = projects.map((project) => {
        const depContainer = processPkg(project.pkg);
        return Object.assign({}, depContainer, {
            name : project.pkg.name,
            path : project.path
        });
    });

    return processed.filter((project) => {
        return Object.keys(project).some((key) => {
            return isDepKey(key) && (Object.keys(project[key]).length > 0);
        });
    });
};

module.exports = pinned;
