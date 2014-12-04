/**
 * @author Josh Glendenning
 */

define([
], function() {
    var array = window.array = {
        zeros: function(x) {
            return this.fill(x, function() {return 0;})
        },
        fill: function(x, f) {
            var res = [];
            for (var i = 0; i < x; i++) {
                res[i] = f(i);
            }
            return res;
        }
    };
    return array;
});
