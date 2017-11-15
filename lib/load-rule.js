'use strict';

const loadRule = (input) => {
    if (input.includes('/')) {
        throw new Error('External rules are not supported yet');
    }
    const ruleId = encodeURIComponent(input);
    try {
        // eslint-disable-next-line global-require
        const rule = require('./rule/' + ruleId);
        // TODO: Do not mutate imported rule. Maybe use sindresorhus/mimic-fn
        rule.id = ruleId;
        return rule;
    }
    catch (err) {
        if (err.code === 'MODULE_NOT_FOUND') {
            err.message = `Unable to find rule "${ruleId}". Check for typos or install it.`;
        }
        throw err;
    }
};

module.exports = loadRule;
