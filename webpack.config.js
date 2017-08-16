var webpack = require('webpack');
var  HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');

var paths = {
    source: path.join(__dirname, 'src/'),
    build: path.join(__dirname, 'public/')
};

module.exports = {
    entry: paths.source + 'index.js',
    output: {
        path: paths.build,
        publicPath: '/public/',
        filename: "[name].js"
    },
    devServer: {
        publicPath: "/public/"
    },
  
    plugins:[
        new HtmlWebpackPlugin({
            template: paths.source + 'index.pug',
            filename: './index.html'
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "autoBind": "auto-bind"
        })
    ],
   module: {
    
        rules:[
            {
			    test: /\.js$/,
			    include: [
				path.join(__dirname, 'src/')
			     ],
                enforce: "pre",
                options: {
                fix: true,
                },
			    loader: 'eslint-loader',
			    exclude: /node_modules/,
		    },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader!autoprefixer-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.styl$/,
                loader: "style-loader!css-loader!autoprefixer-loader!stylus-loader",
                exclude: [/node_modules/, /public/]
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/,
                loader: 'url-loader?limit=30000&name=images/[name].[ext]' 
            },
            {
               test: /\.(eot|woff|woff2|ttf|otf|svg)$/,
                loader: 'url-loader?limit=30000&name=fonts/[name].[ext]'  
            },
             {
                test: /\.pug$/,
                loader: "pug-loader",
                exclude: [/node_modules/, /public/],
                options: {
                    pretty:true
                }
            },
              {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: [/node_modules/, /public/]
            }
        ],
   
    }
}

