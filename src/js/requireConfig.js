/**
 * @author Josh Glendenning
 */

require.config({
    baseUrl: "js",
    waitSeconds: 15,
    paths: {
        "vue": "../components/vue/dist/vue",
        "lodash": "../components/lodash/dist/lodash",
        "dejavu": "../components/dejavu/dist/amd/strict/main"
    },
    shim: {
    }
});
