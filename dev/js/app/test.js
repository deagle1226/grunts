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