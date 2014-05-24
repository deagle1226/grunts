(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = {
    init: function() {
        $('<h1>Hello World!</h1>').appendTo('body');
    },

    sum: function(nums) {
        var sum = 0;
        nums.forEach(function(num) {
            sum += num;
        });
        return sum;
    }
};
},{}],2:[function(require,module,exports){
//module('Test test');

var testModule = require('../../../dev/js/app/test.js');

test('sum(nums)', function() {
    equal(testModule.sum([1, 1]), 2);
});
},{"../../../dev/js/app/test.js":1}]},{},[2])