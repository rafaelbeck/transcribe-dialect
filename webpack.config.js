const path    = require('path'),
      webpack = require('webpack'),
      CopyWebpackPlugin = require('copy-webpack-plugin'),
      autoprefixer = require('autoprefixer');

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
          test: /\.js$/,
          loader: 'babel-loader',
          exclude: /node_modules/,
          query: {
              presets: ["babel-preset-es2015"].map(require.resolve)
          }
        },
        {
          test: /\.css$/,
          use: [
              'style-loader',
              'css-loader',
          ]
        },
        {
            test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'file-loader'
        },
        {
            test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
            loader: 'url-loader?limit=10000&minetype=application/font-woff'
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
