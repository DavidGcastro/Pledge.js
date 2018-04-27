'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:

class $Promise{
    constructor(executor) {
        if (!executor || typeof executor !== 'function')
            throw TypeError('/executor.+function/');
        this._state = 'pending';
        this._value;
        console.log(executor.arguments[0])
        
        executor(this._internalResolve, this._internalReject);
    }

    _internalResolve(data) {
        if (this._state === "pending") {
            this._state = 'fulfilled';
            this._value = data;

        }
    }

    _internalReject(errMessage) {
        if (this._state === "pending") {
            this._state = "rejected"
            this._value = errMessage;
        }
    }

    // We will look at static and subclassed methods shortly
}


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = $Promise;

So in a Node-based project we could write things like this:

var Promise = require('pledge');
…
var promise = new Promise(excutortion (resolve, reject) { … });
--------------------------------------------------------*/
