import {buildPlugins} from './buildPlugins'
import {Configuration} from 'webpack'
import {BuildOptions} from './types'
import {buildLoaders} from './buildLoaders'
import {buildResolvers} from './buildResolvers'
import {buildDevServer} from './buildDevServer'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin'

export function buildWebpackConfig(options: BuildOptions): Configuration {
  const {paths, mode, isDev} = options

  return {
    mode,
    entry: [paths.entry],
    output: {
      filename: '[name].[fullhash].js',
      path: paths.build,
      clean: true
    },
    plugins: buildPlugins(options),
    module: {
      rules: buildLoaders(options)
    },
    resolve: buildResolvers(options),
    devtool: isDev ? 'inline-source-map' : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
      ]
    }
  }
}
