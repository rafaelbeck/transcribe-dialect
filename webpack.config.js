const path    = require('path'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(m4a|mp4)$/,
        loader: 'file-loader'
      }
    ],
    loaders: [
       {
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
          presets: ['es2015']
         }
       }
     ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: 'jquery',
       jQuery: 'jquery',
       'window.jQuery': 'jquery',
       Popper: ['popper.js', 'default']
    }),
    new CopyWebpackPlugin([{
        from: path.resolve(__dirname + '/src/public')
    }])
  ],
   stats: {
     colors: true
   },
   devtool: 'source-map',
   devServer: {
    contentBase: './src/public',
    stats: 'minimal',
    disableHostCheck: true
  }
};
