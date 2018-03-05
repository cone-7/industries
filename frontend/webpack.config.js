var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, './public');

var config = {
   entry: './app.js',
	
   output: {
      path:BUILD_DIR,
      filename: 'bundle.js',
   },
	
   devServer: {
      inline: true,
      port: 7777
   },
	
   module: {
      rules: [
         {
            test: /\.(jsx|js)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
            query: {
               presets: ['es2015', 'react']
            }
         },
         {
            test: /\.css$/,
            exclude: /node_modules/,
            loader:['style-loader', 'css-loader']
         }
      ]
   }
}

module.exports = config;