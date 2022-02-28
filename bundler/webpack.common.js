const webpack = require("webpack");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
    entry: path.resolve(__dirname, '../src/script.js'),
    output:
    {
        hashFunction: 'xxhash64',
        filename: 'bundle.[contenthash].js',
        path: path.resolve(__dirname, '../dist')
    },
    devtool: 'source-map',
    target: "web",
    plugins:
        [
            new CopyWebpackPlugin({
                patterns: [
                    { from: path.resolve(__dirname, '../static') }
                ]
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(__dirname, '../src/index.html'),
                minify: true
            }),
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
            new webpack.HotModuleReplacementPlugin(),
        ],
    module:
    {
        rules:
            [
                // HTML
                {
                    test: /\.(html)$/,
                    use:
                        [
                            'html-loader'
                        ]
                },

                // JS
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use:
                        [
                            'babel-loader'
                        ]
                },

                // SCSS
                {
                    test: /\.scss$/i,
                    use: [{
                        loader: MiniCssExtractPlugin.loader,
                        // options: {
                        //     hot: process.env.NODE_ENV === 'development'
                        // }
                    },
                        "css-loader",
                        "postcss-loader",
                        "sass-loader",
                    ],
                    // bien installer ces loaders plus 'sass' et tous les loader du fichier config de post css loader
                },

                // CSS
                {
                    test: /\.css$/,
                    use:
                        [
                            MiniCssExtractPlugin.loader,
                            'css-loader'
                        ]
                },

                // Images
                {
                    test: /\.(jpg|png|gif|svg)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/images/[hash][ext]'
                    }
                },

                // Videos
                {
                    test: /\.(mp4|webm)$/,
                    use: [{
                        loader: "file-loader",
                        options: {
                            outputPath: "assets/videos/",
                        },
                    },],
                },

                // Fonts
                {
                    test: /\.(ttf|eot|woff|woff2)$/,
                    type: 'asset/resource',
                    generator:
                    {
                        filename: 'assets/fonts/[hash][ext]'
                    }
                },

                // Shaders
                {
                    test: /\.(glsl|vs|fs|vert|frag)$/,
                    type: 'asset/source',
                    generator:
                    {
                        filename: 'assets/images/[hash][ext]'
                    }
                }
            ]
    }
}
