var path = require('path')
var webpack = require('webpack')

var productionEnv = process.argv.indexOf('--production') > -1 || process.env.PRODUCTION ||  process.env.NODE_ENV == 'production'
var testEnv = process.argv.indexOf('--test') > -1 || process.env.TEST

module.exports = {

    entry: {
        'app' : './front/src/app.js'
    },

    output: {
        path: path.join(__dirname, '.tmp'),
        filename: '[name].js',
        publicPath: '/',
    },

    module: {

        loaders: [

            {
                test: /\.js$/,
                exclude: /(node_modules|\.tmp)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-2'],
                }
            },

        ]
    },


}
