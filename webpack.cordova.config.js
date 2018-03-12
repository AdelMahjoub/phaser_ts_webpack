const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const config = { 
    entry: { 
        bundle:  path.resolve('src/main.ts'),
        phaser: ['pixi', 'p2', 'phaser']
    }, 
    output: { 
        path: path.resolve('www'), 
        filename: '[name].[chunkhash:8].js',
        publicPath: '' 
    },
    resolve: { 
        extensions: ['.ts', '.js'],
        alias: {
            pixi: path.resolve('node_modules/phaser/build/custom/pixi.js'),
            phaser: path.resolve('node_modules/phaser/build/custom/phaser-split.js'),
            p2: path.resolve('node_modules/phaser/build/custom/p2.js')
        } 
    },
    context: __dirname, 
    module: {
        rules: [
            { 
                test: /\.ts$/, 
                enforce: 'pre', 
                loader: 'tslint-loader' 
            },
            {
                test: /\.ts$/,
                exclude: /node_modules/,
                use: [
                    { 
                        loader: 'cache-loader' 
                    },
                    {
                        loader: 'thread-loader',
                        options: { workers: require('os').cpus().length - 1 }
                    },
                    { 
                        loader: 'ts-loader', 
                        options: { happyPackMode: true }
                    }
                ]
            },
            { test: /pixi\.js$/, use: 'expose-loader?PIXI' },
            { test: /phaser-split\.js$/, use: 'expose-loader?Phaser' },
            { test: /p2\.js$/, use: 'expose-loader?p2' },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name: 'phaser',
            filename: 'phaser.min.js'
        }),
        new HtmlWebpackPlugin({ 
            template: path.resolve('src/cordova.html'),
            title: 'PhaserTsWebpack',
            inject: 'body',
            chunks: ['phaser', 'bundle'],
            chunkSortMode: 'manual',
            minify: {
                removeAttributeQuotes: true,
                collapseWhitespace: true,
                html5: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true,
                removeComments: true,
                removeEmptyAttributes: true
            }
        }),
        new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true  }),
        new CleanWebpackPlugin(['dist']),
        new CopyWebpackPlugin([{from: path.resolve('assets'), to: path.resolve('www/assets')}]),
        new webpack.WatchIgnorePlugin([/\.js$/, /\.d\.ts$/]),
        new webpack.optimize.UglifyJsPlugin({
            drop_console: true,
            minimize: true,
            output: {
                comments: false
            }
        })
    ]
};

module.exports = config;