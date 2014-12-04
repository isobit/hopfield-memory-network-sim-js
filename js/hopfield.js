/**
 * @author Josh Glendenning
 */

define([
    "array",
    "matrix"
], function(array, matrix) {
    var hopfield = {};

    function _pad(arr, padVal, len) {
        var newArr = arr.concat();
        for (var i = arr.length; i < len; i++) {
            newArr[i] = padVal;
        }
        return newArr;
    }

    window._pad = _pad;

    hopfield.Network = function(memVecs, N) {
        var n = memVecs.length;
        this.n = n;
        this.N = N;

        var memSize = memVecs[0].length;
        memVecs.forEach(function(mem) {
            if (mem.length > memSize) memSize = mem.length;
        });

        var paddedMemVecs = memVecs.map(function(mem) {
            return _pad(mem, 0, N);
        });

        var U = this.U = array.zeros(N);

        var T = this.T = matrix.fill(N, N, function(i, j) {
            var sum = 0;
            if (i != j) {
                paddedMemVecs.forEach(function(mem) {
                    sum += (2 * mem[i] - 1) * (2 * mem[j] - 1);
                });
            }
            return sum;
        });

        this.propagate = function(V) {
            V = _pad(V, 0, N);
            return array.fill(N, function(i) {
                var sum = 0;
                for (var j = 0; j < N; j++) {
                    if (i != j) {
                        sum += T[i][j] * V[j];
                    }
                }
                return (sum > U[i])? 1 : 0;
            });
        };
    };

    return hopfield;
});