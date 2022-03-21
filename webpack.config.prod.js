const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        'main': './src/index.js'
    },
    output: {
        filename: 'content-blocks.js',
        path: path.resolve(__dirname, 'dist'),
        // environment: {
        //     arrowFunction: false
        // }
        // publicPath: './dist/scripts/'
    },
    // devtool: false,
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /(node_modules)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                corejs: { version: 3 },
                                // useBuiltIns: 'usage',
                                useBuiltIns: false, // Dont use coreJs, ie no polyfills
                                targets: {
                                    ie: '10'
                                }
                            }
                        ]
                    ]
                }
            }
        }]
    },
    plugins: [new CleanPlugin.CleanWebpackPlugin()]
};