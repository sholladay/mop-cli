'use strict';

const git = require('../git');

const isClean = async (cwd) => {
    try {
        const status = await git('status --porcelain', { cwd });
        return status === '';
    }
    catch (err) {
        if (err.message.includes('Not a git repository')) {
            return true;
        }
        throw err;
    }
};

const cleanRepo = async (project) => {
    const clean = await isClean(project.path);
    return clean || {
        message : 'Repository has uncommitted changes'
    };
};

module.exports = cleanRepo;
