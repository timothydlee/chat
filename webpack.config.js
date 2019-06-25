const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const dev = Boolean(process.env.NODE_ENV !== 'production');

module.exports = {
    entry: './src/app.js',
    mode: dev ? 'development' : 'production',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test: /\.(scss|css)$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 5000
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    output: {
        path: __dirname + '/dist',
        publicPath: '/',
        filename: 'bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new CleanWebpackPlugin,
    ],
    devServer: {
        contentBase: './dist',
        hot: true
    }
};