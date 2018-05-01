const webpack = require("webpack");

const DEV_API = "http://localhost:3000/api/";
const TEST_API = "https://e7vek1i6vh.execute-api.eu-west-2.amazonaws.com/test/";
const LIVE_API = "https://e7vek1i6vh.execute-api.eu-west-2.amazonaws.com/live/";

const environment = process.env.ENVIRONMENT;
let apiUrl;

switch (environment) {
    case "live":
        apiUrl = LIVE_API;
        break;
    case "test":
        apiUrl = TEST_API;
        break;
    default:
        apiUrl = DEV_API;
}

module.exports = {
    entry: "./src/client/index.tsx",
    output: {
        filename: "bundle.client.js",
        path: __dirname + "/dist/public"
    },

    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",

    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".js", ".json"]
    },

    plugins: [ 
        new webpack.DefinePlugin({
            __API_URL__: JSON.stringify(apiUrl)
        })
    ],

    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
        ]
    },
};