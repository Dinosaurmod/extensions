const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(svg|png|jpg|ico|woff|woff2|eot|ttf|otf)$/,
                type: 'asset/resource'
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx', '.css', '.svg', '.png', '.jpg', '.ico', '.woff', '.woff2', '.eot', '.ttf', '.otf']
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html',
            favicon: './favicon.ico'
        })
    ],
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true
    },
    mode: 'development'
};
