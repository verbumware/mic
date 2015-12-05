'use strict';

var content = document.getElementById('content');

var buttons = 'A B C D'.split(' ').reduce(function (o, key) {
    var el = document.createElement('button');
    el.innerHTML = key;
    content.appendChild(el);
    o[key] = el;
    return o;
}, {});

var w, orig;

if (window.Worker) {
    w = new Worker('worker.js');

    w.onmessage = function (e) {
        console.log(JSON.stringify(e.data));
    };

    buttons.A.onclick = function (ev) {
        w.postMessage({cmd: 'cfg', dat: { channels: 1 }});
    };

    buttons.B.onclick = function (ev) {
        w.postMessage({cmd: 'clear'});
    };

    buttons.C.onclick = function (ev) {
        w.postMessage({cmd: 'rec', dat: [[1, 2, 3]]});
    };

    buttons.D.onclick = function (ev) {
        w.postMessage({cmd: 'report'});
    };

    // Object.keys(buttons).forEach(function (name) {
    //     buttons[name].addEventListener('click', function (ev) {
    //         console.log(name, ev);
    //     });
    // });



    // w.terminate();
}

/* env browser */
