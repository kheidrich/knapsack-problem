const path = require('path');
const webpack = require('webpack');
const cleanPlugin = require('clean-webpack-plugin');
const htmlPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/ui/main.ts',
    target: 'electron-renderer',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: ''
    },
    resolve: {
        extensions: ['.js', '.ts'],
        modules: ['node_modules']
    },
    module: {
        rules: [
            { enforce: 'pre', test: /\.ts$/, use: ['ts-loader'], exclude: /node_modules/ },
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
        new webpack.NamedModulesPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new htmlPlugin({
            template: './src/ui/index.html'
            // chunks: ['app'],
            // filename: 'app.html'
        }),
        // new htmlPlugin({
        //     chunks: ['resolver'],
        //     filename: 'resolver.html'
        // }),
        // new webpack.ProvidePlugin({
        //     require: 'require'
        // }),
    ]
}