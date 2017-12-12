const path = require('path');
const webpack = require('webpack');
const cleanPlugin = require('clean-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: {
        app: './src/ui/app.module.js',
        resolver: './src/resolver/genetic-algorithm-resolver.js'
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    resolve: {
        extensions: ['.js'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.(js|jsx)$/, use: ['babel-loader'], exclude: /node_modules/ },
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
        new webpack.NamedModulesPlugin(),
        new cleanPlugin(['dist']),
        new htmlPlugin({
            template: './src/ui/index.html',
            filename: 'app.html'
        }),
        new htmlPlugin({
            template: './src/resolver/resolver.html',
            filename: 'resolver.html'
        }),
        new webpack.ProvidePlugin({
            require: 'require'
        })
    ]
}