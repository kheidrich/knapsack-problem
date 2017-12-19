const copyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    entry: './src/main.js',
    target: 'electron-main',
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new copyPlugin([
            { from: './package.json', to: './' },
        ])
    ]
};