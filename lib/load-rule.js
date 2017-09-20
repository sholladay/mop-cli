'use strict';

const loadRule = (input) => {
    if (input.includes('/')) {
        throw new Error('External rules are not supported yet');
    }
    const ruleId = encodeURIComponent(input);
    try {
        // eslint-disable-next-line global-require
        return require('./rule/' + ruleId);
    }
    catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            err.message = `Unable to find rule "${ruleId}". Check for typos or install it.`;
        }
        throw err;
    }
};

module.exports = loadRule;
