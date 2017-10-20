dom-keys-mixin
=========

Install
-----

`npm install --save dom-keys-mixin`

Usage
----

```javascript
import {
    mixinKeys,
    cleanKeysMixin
} from 'dom-keys-mixin';

class KeyTracker {
    constructor(){
        //Add the properties
        mixinKeys(this);
    }
    cleanUp(){
        //Delete the properties
        cleanKeysMixin(this);
    }
}

let tracker = new KeyTracker();

document.addEventListener('mousemove', event=>{
    console.log(tracker.ctrl); //true when the control key is down
});
```

Properties added to the target object
--------------------

* ctrl
* shift
* alt
* which (identical to keyCode)
* keyCode
* key (this won't be available in some old browsers)

About
----

`mixinKeys(target)` adds some properties to a target object instance.

The properties are set to true on `"keydown"`. They are set to false on `"keyup"`.

You can use key sequences like `tracker.ctrl` + `tracker.key`, or `tracker.ctrl` + `tracker.keyCode` for older browsers.


### A word about preventDefault

The event listeners set by `mixinKeys(target)` do not call `event.preventDefault()`. You can however call `event.preventDefault()` in the `"keydown"`/`"keyup"` event listeners you set, and all will work as expected.
