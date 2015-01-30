/**
 * @author Josh Glendenning
 */

define([
    'lodash',
    "matrix",
    // Non-captured
    "lodashMixins"
], function(_, matrix) {

    this.HopfieldNetwork = function(memoryVectors) {
        var self = this;

        // Cleanse the memVecs
        var memoryVectorMaxLength = memVecs[0].length;
        _.forEach(memoryVectors, function(mem) {
            if (mem.length > memoryVectorMaxLength) memoryVectorMaxLength = mem.length;
        });

        // Pad the memVecs
        memoryVectors = _.map(memoryVectors, function(memVec) {
            return _pad(memVec, 0, memoryVectorMaxLength);
        });

        // Generate weight matrix from memories
        var weights = matrix.fill(memoryVectorMaxLength, memoryVectorMaxLength, function(i, j) {
            if (i != j) {
                return _.reduce(
                    memoryVectors,
                    function(acc, mem) {
                        // Learning rule
                        // (acc: Float, mem: Float[], i: Int, j: Int) => Float
                        return acc + mem[i] * mem[j]
                    },
                    0 // Initial acc
                )
            } else {
                // Zeros on the diagonal
                return 0;
            }
        });

        // Initialize neurons/nodes
        this.state = _.zeros(memoryVectorMaxLength);

        this.reset = function() {
            self.state = _.zeros(memoryVectorMaxLength);
        };

        this.update = function() {
            self.state = _.fill(self.state.length, function(i) {
                var sum = 0;
                for (var j = 0; j < N; j++) {
                    if (i != j) {
                        sum += weights[i][j] * self.state[j];
                    }
                }
            });
        };

    };

});