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

    var network = window.test = new hopfield.Network([
        [
            0, 0, 0,
            1, 0, 0,
            1, 1, 1
        ],
        [
            1, 1, 0,
            0, 1, 1,
            0, 0, 0
        ]
    ], 30);

    var pixels = [
        [0, 1, 0],
        [0, 0, 0],
        [1, 1, 1]
    ];

    //var pixels = [
    //    [1, 1, 0],
    //    [0, 1, 0],
    //    [0, 1, 0]
    //];

    var vue = new Vue({
        el: 'body',
        data: {
            pixels: pixels
        },
        methods: {
            togglePixel: function(i, j) {
                var newPixels = this.pixels;
                newPixels[i][j] = (this.pixels[i][j] === 1)? 0 : 1;
                this.pixels = null;
                this.pixels = newPixels;
            },
            propagate: function() {
                this.pixels = network.propagate(this.pixels.flatten()).slice(0, 9).eachConsecutive(3);
            }
        }
    })

});