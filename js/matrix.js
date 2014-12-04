/**
 * @author Josh Glendenning
 */

define([
], function() {
    var matrix = {
        zeros: function (x, y) {
            return this.fill(x, y, function () {
                return 0;
            })
        },
        fill: function (x, y, f) {
            var res = [];
            for (var i = 0; i < x; i++) {
                res[i] = [];
                for (var j = 0; j < y; j++) {
                    res[i][j] = f(i, j);
                }
            }
            return res;
        }
    };

    return matrix;
});
