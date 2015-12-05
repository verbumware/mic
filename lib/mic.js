'use strict';

var cxt;

/*
    {
        buffers: [
            [],
            []
        ],
        length: 0,
        channels: 2
    }
*/

exports.cfg = function (dat, ack) {
    cxt = dat;
    ack('cfg done.');
};

exports.clear = function (nop, ack) {
    var i,
        channels = cxt.channels,
        buffers = [];

    cxt.buffers = buffers;
    cxt.length = 0;
    for (i = 0; i < channels; i++) {
        buffers.push([]);
    }
    ack('clear done. ' + cxt.length);
};

exports.rec = function (dat, ack) {
    var i,
        buffers = cxt.buffers,
        len = buffers.length;

    for (i = 0; i < len; i++) {
        buffers[i].push(dat[i]);
    }
    cxt.length += dat[0].length;
    ack('rec...' + cxt.length);
};

exports.report = function (nop, ack) {
    ack('report:length: ' + cxt.length);
};
