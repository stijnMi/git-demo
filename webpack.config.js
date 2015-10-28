module.exports = {
	entry: './_js/script.js', 
	output: {
		filename: './js/script.js' 
	},
	devtool: 'source-map',
  	module: {
    	loaders: [
			{ test: /\.js$/, loader: 'babel-loader' } 
		]
	}
 };