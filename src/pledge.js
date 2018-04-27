'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js ES6-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
class $Promise {
    constructor(executor) {
        if (!executor || typeof executor !== 'function')
            throw TypeError('/executor.+function/');
        this._state = 'pending';

        this._value;
        //WHY DOESNT THIS WORK?
        // executor.call(this, this._internalResolve, this._internalReject)
        executor(this._internalResolve.bind(this), this._internalReject.bind(this));

        this.then = function (successCb, errorCb) {
            if (this._state !== 'pending') {
                successCb(this._value);
            } else {
                typeof successCb === 'function' ? successCb : (successCb = null);
                typeof errorCb === 'function' ? errorCb : (errorCb = null);
                this._handlerGroups.push({
                    successCb,
                    errorCb,
                });
            }
        };

        this._handlerGroups = [];
    }

    _internalResolve(data) {
        if (this._state === 'pending') {
            this._state = 'fulfilled';
            this._value = data;
        }

        if (this._handlerGroups) this._handlerGroups.forEach((elem) => elem.successCb(this._value));

    }

    _internalReject(errMessage) {
        if (this._state === 'pending') {
            this._state = 'rejected';
            this._value = errMessage;
        }
    }
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
