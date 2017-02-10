'use strict';

const humanize = require('humanize-string');
const titleize = require('titleize');

const humanTitle = (str) => {
    return titleize(humanize(str));
};

module.exports = humanTitle;
