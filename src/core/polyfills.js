import runtime from './runtime.js'

// Promise API polyfill for IE11
import 'bluebird/js/browser/bluebird.js'

// fetch API polyfill for old browsers
import 'whatwg-fetch'

if (!console.time || !console.timeEnd) {
  var timers = {}
  console.time = function(key) {
    timers[key] = new Date().getTime()
  }
  console.timeEnd = function(id) {
    if (!timers[key]) return
    console.log(key + ': ' + (new Date().getTime() - timers[key]) + 'ms')
    delete timers[key]
  }
}

// from https://raw.githubusercontent.com/mrdoob/three.js/dev/src/polyfills.js

if (Number.EPSILON === undefined) {
  Number.EPSILON = Math.pow(2, -52);
}

if (Number.isInteger === undefined) {
  // Missing in IE
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger
  Number.isInteger = function (value) {
    return typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  }
}

if (Math.sign === undefined) {
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign
  Math.sign = function (x) {
    return ( x < 0 ) ? -1 : ( x > 0 ) ? 1 : +x
  }
}

if (Function.prototype.name === undefined) {
  // Missing in IE
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/name
  Object.defineProperty(Function.prototype, 'name', {
    get: function () {
      return this.toString().match(/^\s*function\s*([^\(\s]*)/)[1]
    }
  })
}

if (Object.assign === undefined) {
  // Missing in IE
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
  (function () {
    Object.assign = function (target) {
      'use strict';
      if (target === undefined || target === null) {
        throw new TypeError('Cannot convert undefined or null to object')
      }
      var output = Object(target)
      for (var index = 1; index < arguments.length; index++) {
        var source = arguments[index]
        if (source !== undefined && source !== null) {
          for (var nextKey in source) {
            if (Object.prototype.hasOwnProperty.call(source, nextKey)) {
              output[nextKey] = source[nextKey]
            }
          }
        }
      }
      return output
    }
  })()
}