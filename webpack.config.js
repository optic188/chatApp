// http://webpack.github.io/docs/configuration.html
// http://webpack.github.io/docs/webpack-dev-server.html
const app_root = "App"; // the app root folder: src, App, etc
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    devtool: "source-map",
    app_root: "app_root", // the app root folder, needed by the other webpack configs
    entry: [
    // http://gaearon.github.io/react-hot-loader/getstarted/
        "webpack-dev-server/client?http://localhost:8080",
        "webpack/hot/only-dev-server",
        "babel-polyfill",
        __dirname + "/" + app_root + "/index.js",
    ],
    output: {
        path: __dirname + "/public/js",
        publicPath: "js/",
        filename: "bundle.js",
    },
    module: {
        preLoaders: [
        // Javascript
        { test: /\.jsx?$/, loader: "eslint", exclude: /node_modules/ }
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ["babel-loader"],
                exclude: /node_modules/,
            },
            {
        // https://github.com/jtangelder/sass-loader
                test: /\.scss$/,
                loaders: ["style", "css", "sass"],
            },
            {
                test: /\.css$/,
                loaders: ["style", "css"],
            }
        ],
    },
    eslint: {
        failOnWarning: false,
        failOnError: true
    },
    devServer: {
        contentBase: __dirname + "/public",
    },
    plugins: [
        new CleanWebpackPlugin(["css/main.css", "js/bundle.js"], {
            root: __dirname + "/public",
            verbose: true,
            dry: false, // true for simulation
        }),
    ],
};
