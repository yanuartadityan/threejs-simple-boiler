const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: path.resolve(__dirname, '../app/index.js'),
    module: {
        rules: [
            {
                test: /\.html$/,
                use: "html-loader"
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    "css-loader"
                ]
            },
            {
                test: /\.(js|jsx)$/,
                exclude: "/node_modules/",
                use: "babel-loader"
            },
            {
                test: /\.(glb|gltf|bin)$/,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "models"
                    }
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, "../app/index.html"),
            minify: true
        })
    ],
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, '../dist')
    }
}