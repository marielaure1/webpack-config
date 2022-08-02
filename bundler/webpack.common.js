const path = require("path")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')

module.exports = {
    entry: {
        index: path.resolve(__dirname, "../src/index.js"),
        print: path.resolve(__dirname, "../src/print.js")
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../dist'),
        clean: true
    },
    devtool: 'source-map',
    // This tells webpack-dev-server to serve the files from the dist directory on localhost:8080
    devServer: {
        static: '../dist',
    },
    resolve: {
        alias: {
          img: path.resolve(__dirname, '../assets/img/'),
          icon: path.resolve(__dirname, '../assets/icon/'),
          fonts: path.resolve(__dirname, '../assets/fonts/'),
          styles: path.resolve(__dirname, '../src/styles/style.scss'),
        },
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            '_': 'lodash'
        }),
        new CopyWebpackPlugin({
            patterns: [
                { 
                    from: path.resolve(__dirname, '../assets/models') ,
                    to: path.resolve(__dirname, '../dist/static/models')
                },
                { 
                    from: path.resolve(__dirname, '../assets/textures') ,
                    to: path.resolve(__dirname, '../dist/static/textures')
                },
            ]
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../src/index.html'),
            minify: true
        }),
        new MiniCssExtractPlugin({
            filename: "./css/[name].css",
        }),
    ],
    module: {
        rules: [
            {
                test: /\.html$/i,
                use: [
                    "html-loader"
                ]
            },
            {
                test: /\.css$/,
                use:
                [
                    'css-loader'
                ]
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    MiniCssExtractPlugin.loader,
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use:
                [
                    'babel-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/img/[hash][ext][query]'
                }
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
                generator: {
                    filename: 'static/fonts/[hash][ext][query]'
                }
            },
        ],
    }
}