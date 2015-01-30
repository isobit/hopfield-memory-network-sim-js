/**
 * @author Josh Glendenning
 */

require.config({
    baseUrl: "js",
    waitSeconds: 15,
    paths: {
        "vue": "../components/vue/dist/vue",
        "lodash": "../components/lodash/dist/lodash"
    },
    shim: {
    }
});

define([
    "vue",
    "matrix",
    "hopfield",
    "lodashMixins"
], function(Vue, _, hopfield, array) {

    var N = 1000;
    var memDim = 5;

    var initMemories = [
        [
            1, 1, 1, 1, 1,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 0
        ],
        [
            0, 0, 0, 0, 0,
            0, 1, 1, 1, 0,
            0, 1, 1, 1, 0,
            0, 1, 1, 1, 0,
            0, 0, 0, 0, 0
        ],
        [
            0, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 0, 0, 0, 0,
            1, 1, 1, 0, 0
        ],
        [
            0, 0, 0, 0, 0,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 0, 0, 1,
            0, 0, 1, 1, 1
        ]
    ];
    var network = new hopfield.Network(initMemories, N);

    var vue = new Vue({
        el: 'body',
        data: {
            pixels: [
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0]
            ],
            memPixels: initMemories.map(function(e) {return e.eachConsecutive(memDim)}),
            autoPropagate: false,
            stochastic: false
        },
        methods: {
            togglePixel: function(i, j) {
                var newRow = this.pixels[i];
                newRow[j] = (this.pixels[i][j] === 1)? 0 : 1;
                this.pixels.$set(i, newRow);
            },
            clear: function() {
                for (var i = 0; i < this.pixels.length; i++) {
                    this.pixels.$set(i, lodashMixins.zeros(memDim));
                }
            },
            propagate: function() {
                this.pixels = network.propagate(this.pixels.flatten()).slice(0, Math.pow(memDim, 2)).eachConsecutive(memDim);
            },
            startAutoPropagate: function() {
                this.autoPropagate = !this.autoPropagate;
            },
            memorize: function() {
                this.memPixels.push(this.pixels.concat());
                this.clear();
            },
            unmemorize: function(m) {
                this.memPixels.splice(m, 1);
                console.log(this.memPixels.length);
            }
        },
        watch: {
            memPixels: function(val, old) {
                var memories = val.map(function(e) {
                    return e.flatten();
                });
                network = new hopfield.Network(memories, N);
            },
            stochastic: function(val, old) {
                network.stochastic = val;
            }
        }
    });

    setInterval(function() {
        if (vue.autoPropagate) {
            vue.propagate();
        }
    }, 500);

});