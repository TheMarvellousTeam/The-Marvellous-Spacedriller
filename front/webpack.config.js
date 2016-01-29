var path = require('path')
var webpack = require('webpack')

var productionEnv = process.argv.indexOf('--production') > -1 || process.env.PRODUCTION ||  process.env.NODE_ENV == 'production'
var testEnv = process.argv.indexOf('--test') > -1 || process.env.TEST

var plugins = [

    // replace keys
    new webpack.DefinePlugin({
        __PROD__: productionEnv,
        __TEST__: testEnv,
        __VERSION__: JSON.stringify( require( './package.json' ).version ),


        // react test process.env.NODE_ENV !== 'production' to add dev check ( not required in prod )
        'process.env': { NODE_ENV: JSON.stringify('production') }
    }),

]

if ( productionEnv )
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
        })
    )


var entry = {}

if ( testEnv )
    entry[ 'jasmine-bundle' ] = './test/unit/jasmine-src.js'

else {
    entry[ 'bootstrap' ] = './app/scripts/directives/playlist/bootstrap.js'
    entry[ 'ReactPlaylist' ] = './app/scripts/directives/playlist/component/app.jsx'

}

module.exports = {

    entry: entry,

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
                    presets: ['es2015', 'stage-0'],
                    // plugins: ['transform-runtime'],
                }
            },

            {
                test: /\.jsx$/,
                exclude: /(node_modules|\.tmp)/,
                loader: 'babel',
                query: {
                    cacheDirectory: true,
                    presets: ['es2015', 'stage-0', 'react'],
                    // plugins: ['transform-runtime'],
                }
            },
        ]
    },

    plugins: plugins,

    resolve: {
        alias: {
            'react' :           'react/dist/react'+ ( productionEnv ? '.min.js' : '.js' ),
            'react-dom' :       'react-dom/dist/react-dom'+ ( productionEnv ? '.min.js' : '.js' ),
        }
    }

}
