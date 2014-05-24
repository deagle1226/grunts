//module('Test test');

var testModule = require('../../../dev/js/app/test.js');

test('sum(nums)', function() {
    equal(testModule.sum([1, 1]), 2);
});