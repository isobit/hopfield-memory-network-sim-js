/**
 * @author Josh Glendenning
 */

require.config({
    baseUrl: "js",
    waitSeconds: 15,
    paths: {
        "vue": "../components/vue/dist/vue",
        //"math": "../components/mathjs/dist/math"
        "lodash": "../components/lodash/dist/lodash"
    },
    shim: {
    }
});

define([
    "vue",
    "matrix",
    "hopfield"
], function(Vue, _, hopfield) {

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

    var N = 30;

    var memories = [
        [
            0, 0, 0,
            1, 0, 0,
            1, 1, 0
        ],
        [
            1, 0, 0,
            0, 1, 0,
            0, 0, 1
        ],
        [
            0, 1, 1,
            0, 0, 1,
            0, 0, 0
        ]
    ];
    var network = window.test = new hopfield.Network(memories, N);

    var initPixels = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    var vue = window.vue = new Vue({
        el: 'body',
        data: {
            pixels: [
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0]
            ],
            memPixels: memories.map(function(e) {return e.eachConsecutive(3)}),
            autoPropagate: false
        },
        methods: {
            togglePixel: function(i, j) {
                var newRow = this.pixels[i];
                newRow[j] = (this.pixels[i][j] === 1)? 0 : 1;
                this.pixels.$set(i, newRow);
            },
            clear: function() {
                for (var i = 0; i < this.pixels.length; i++) {
                    this.pixels.$set(i, [0, 0, 0]);
                }
            },
            propagate: function() {
                this.pixels = network.propagate(this.pixels.flatten()).slice(0, 9).eachConsecutive(3);
            },
            startAutoPropagate: function() {
                if (!this.autoPropagate) {
                    var self = this;
                    this.autoPropagate = true;
                    setTimeout(function() {
                        self.autoPropagate = false;
                    }, 5000)
                } else {
                    this.autoPropagate = false;
                }
            },
            memorize: function() {
                this.memPixels.push(this.pixels.concat());
                this.clear();
            },
            unmemorize: function(m) {
                this.memPixels.splice(m, 1);
            }
        },
        watch: {
            memPixels: function(val, old) {
                var memories = val.map(function(e) {
                    return e.flatten();
                });
                network = window.test = new hopfield.Network(memories, N);
            }
        }
    });

    setInterval(function() {
        if (vue.autoPropagate) {
            vue.propagate();
        }
    }, 500);

});