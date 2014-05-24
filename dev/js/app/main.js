var test = require('./test.js');

$(document).on('ready', function() {
    test.init();
    test.sum([1, 2]);
});