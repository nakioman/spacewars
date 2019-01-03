const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  devtool: 'source-map',
  plugins: [
    new CompressionPlugin(),
    new CopyWebpackPlugin([
      {
        from: 'src/img/**/*',
        to: 'img/',
        flatten: true,
      },
    ]),
    new CopyWebpackPlugin([
      {
        from: 'src/snd/**/*',
        to: 'snd/',
        flatten: true,
      },
    ]),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: 'true',
      }),
    ],
  },
});
