var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');

module.exports = {
    entry: './client.js',
    output: {
        path: './public',
        filename: '/js/bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015', 'stage-0'],
                plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
            }
        }]
        // loaders: [{
        //     test: /\.sass?$/,
        //     exclude: /(node_modules|bower_components)/,
        //     loader: 'babel-loader',
        //     query: {
        //         presets: ['react', 'es2015', 'stage-0'],
        //         plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties'],
        //     }
        // }]
    },
    devtool: 'source-map',
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: true }),
    ]
};

