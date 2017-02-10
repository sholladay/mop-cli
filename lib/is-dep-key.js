'use strict';

const isDepKey = (key) => {
    return key.toLowerCase().endsWith('dependencies');
};

module.exports = isDepKey;
