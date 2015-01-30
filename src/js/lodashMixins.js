/**
 * @author Josh Glendenning
 */

define([
    'lodash'
], function(_) {

    _.mixin({'fill': function(n, f) {
        var result = [];
        for (var i = 0; i < n; i++) {
            result[i] = f(i);
        }
        return result;
    }});

    _.mixin({'zeros': function(n) {
        return _.fill(n, function() {return 0;});
    }});

    _.mixin({'chunk': function(collection, chunkSize) {
        var copy = collection.concat();
        var result = [];
        while (copy.length) result.push( copy.splice(0,chunkSize) );
        return result;
    }});

    _.mixin({'flatten': function(collection) {
        return [].concat.apply([], collection);
    }});

    _.mixin({'pad': function(collection, padVal, len) {
        var newArr = collection.concat();
        for (var i = collection.length; i < len; i++) {
            newArr[i] = padVal;
        }
        return newArr;
    }})

});
