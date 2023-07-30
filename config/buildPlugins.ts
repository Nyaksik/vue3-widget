import {WebpackPluginInstance} from 'webpack'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import {BuildOptions} from './types'
import {VueLoaderPlugin} from 'vue-loader'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export function buildPlugins({
                               paths,
                               isDev
                             }: BuildOptions): WebpackPluginInstance[] {
  return [
    new HtmlWebpackPlugin({
      title: 'Weather widget',
      template: paths.html,
      filename: 'index.html',
      meta: {
        'viewport': 'width=device-width, initial-scale=1, shrink-to-fit=no',
        minify: isDev ? 'auto' : {
          collapseWhitespace: true,
          keepClosingSlash: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        }
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[fullhash].css',
      chunkFilename: '[id].css'
    }),
    new VueLoaderPlugin(),
  ]
}
