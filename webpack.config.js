		const path = require('path');

		module.exports = {
		  context: __dirname,
		  entry: "./scripts/breakout.js",
		  output: {
		    path: path.resolve(__dirname),
		    filename: "./scripts/bundle.js"
		  },
		  devtool: 'source-map',
		};