const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    watch: true,
    mode: 'development',
    entry: {
        'main': './src/index.js'
    },
    output: {
        filename: 'content-blocks.js',
        path: path.resolve(__dirname, 'dist'),
        library: {
            name: 'FormConnect',
            type: 'umd',
            umdNamedDefine: true,
            export: 'FormConnect'
        }
    },
    devtool: 'eval',
    module: {
        rules: [{
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: [
                        // ['@babel/preset-env', { targets: "defaults" }]
                        ['@babel/preset-env',
                            {
                                corejs: { version: 3 },
                                useBuiltIns: 'usage',
                                // targets: {
                                //     ie: "9"
                                // }
                            }
                        ]
                    ]
                }
            }
        }]
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
};