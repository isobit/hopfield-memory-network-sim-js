/**
 * @author Josh Glendenning
 */

define([
], function() {
    var array  = {
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
    Object.defineProperty( Array.prototype, 'eachConsecutive', {
        value:function(n){
            var copy = this.concat(), result = [];
            while (copy.length) result.push( copy.splice(0,n) );
            return result;
        }
    });

    Object.defineProperty( Array.prototype, 'flatten', {
        value:function(n){
            return [].concat.apply([], this)
        }
    });

    return array;
});
