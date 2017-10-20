(function () {
'use strict';

/*
object-assign
(c) Sindre Sorhus
@license MIT
*/

/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

var objectAssign = shouldUseNative() ? Object.assign : function (target, source) {
	var arguments$1 = arguments;

	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments$1[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};

//Supposedly faster for v8 than just Object.create(null)
function Raw(){}
Raw.prototype = (function (){
    //Maybe some old browser has risen from it's grave
    if(typeof Object.create !== 'function'){
        var temp = new Object();
        temp.__proto__ = null;
        return temp;
    }

    return Object.create(null);
})();

function rawObject(){
    var arguments$1 = arguments;

    var objects = [], len = arguments.length;
    while ( len-- ) { objects[ len ] = arguments$1[ len ]; }

    var raw = new Raw();
    objectAssign.apply(void 0, [ raw ].concat( objects ));
    return raw;
}

var keys$1 = rawObject({
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
    keys$1.ctrl = event.metaKey || event.ctrlKey;
    keys$1.shift = event.shiftKey;
    keys$1.alt = event.altKey;
    keys$1.keyCode = keys$1.which = (event.which || event.keyCode);
    keys$1.key = event.key;
});

document.addEventListener('keyup', function (event){
    keys$1.ctrl = keys$1.shift = keys$1.alt = false;
    keys$1.key = keys$1.keyCode = keys$1.which = null;
});

function defineProp(dest, prop){
    Object.defineProperty(dest, prop, {
        get: function get(){ return keys$1[prop]; },
        enumerable: enumerable,
        configurable: configurable
    });
}

function mixinKeys(dest){
    for(var name in keys$1){
        if(!dest.hasOwnProperty(name))
            { defineProp(dest, name); }
    }
}

var preventDefault = false;
var keys = {};

mixinKeys(keys);

document.addEventListener('keydown', function (event){
    for(var name in keys){
        console.log(name, keys[name]);
    }
    if(preventDefault)
        { event.preventDefault(); }
});

var button = document.querySelector('button');
button.addEventListener('click', function (event){
    preventDefault = preventDefault ? false : true;
    button.style.color = preventDefault ? 'red' : 'black';
});

}());
//# sourceMappingURL=code.js.map
