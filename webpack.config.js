const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: './src/ui/app.module.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js'],
        modules: ['src', 'node_modules'],
        alias: {
            Core: './src/core'
        }
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.(woff|woff2|eot|ttf|otf)$/, use: ['file-loader'] },
            { test: /\.html$/, use: ['html-loader'] }
        ]
    },
    devServer: {
        contentBase: './dist',
        hot: true
    },
    devtool: 'eval-source-map',
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
    ]
}