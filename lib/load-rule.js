'use strict';

const loadRule = (ruleId) => {
    if (ruleId.includes('/')) {
        throw new Error('External rules are not supported yet');
    }
    return require('./rule/' + encodeURIComponent(ruleId));
};

module.exports = loadRule;
