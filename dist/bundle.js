'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var rawObject = _interopDefault(require('raw-object'));

var keys = rawObject({
    ctrl: false,
    shift: false,
    alt: false,
    key: null,
    keyCode: null,
    which: null
});

var enumerable = true;
var configurable = true;

document.addEventListener('keydown', function (event){
    keys.ctrl = event.metaKey || event.ctrlKey;
    keys.shift = event.shiftKey;
    keys.alt = event.altKey;
    keys.keyCode = keys.which = (event.which || event.keyCode);
    keys.key = event.key;
});

document.addEventListener('keyup', function (event){
    keys.ctrl = keys.shift = keys.alt = false;
    keys.key = keys.keyCode = keys.which = null;
});

function defineProp(dest, prop){
    Object.defineProperty(dest, prop, {
        get: function get(){ return keys[prop]; },
        enumerable: enumerable,
        configurable: configurable
    });
}

function mixinKeys(dest){
    for(var name in keys){
        if(!dest.hasOwnProperty(name))
            { defineProp(dest, name); }
    }
}

function cleanKeysMixin(dest){
    for(var name in keys){
        delete dest[name];
    }
}

exports.mixinKeys = mixinKeys;
exports.cleanKeysMixin = cleanKeysMixin;
//# sourceMappingURL=bundle.js.map
