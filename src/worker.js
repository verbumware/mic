'use strict';

var mic = require('../lib/mic');

onmessage = function (e) {
    mic[e.data.cmd](e.data.dat, postMessage);
};
