'use strict';

const git = require('../git');

const isPushed = async (cwd) => {
    try {
        await git('fetch', { cwd });
        const stdout = await git('cherry', { cwd });
        return stdout === '';
    }
    catch (err) {
        if (err.message.includes('Not a git repository')) {
            return true;
        }
        throw err;
    }
};

const pushedRepo = async (project) => {
    const pushed = await isPushed(project.path);
    return pushed || {
        message : 'Repository has unpushed changes'
    };
};

module.exports = pushedRepo;
