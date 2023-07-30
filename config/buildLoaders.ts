import {RuleSetRule} from 'webpack'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import {BuildOptions} from './types'

export function buildLoaders({isDev}: BuildOptions): RuleSetRule[] {
  const tsLoader: RuleSetRule = {
    test: /\.tsx?$/,
    use: {
      loader: 'ts-loader',
      options: {
        appendTsSuffixTo: [/\.vue$/],
      }
    },
    exclude: /node_modules/,
  }
  const babelLoader: RuleSetRule = {
    test: /\.(js|ts)$/,
    exclude: /node_modules/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
      }
    }
  }
  const vueLoader: RuleSetRule = {
    test: /\.vue$/,
    use: 'vue-loader',
    exclude: /node_modules/
  }
  const styleLoader: RuleSetRule = {
    test: /\.css$/,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      'css-loader'
    ],
    exclude: /node_modules/
  }
  const svgVueLoader: RuleSetRule = {
    test: /\.svg$/,
    issuer: /\.(vue|js|ts|svg)$/,
    use: [
      'vue-loader',
      'svg-to-vue-component/loader'
    ],
    exclude: /node_modules/
  }

  return [
    babelLoader,
    tsLoader,
    styleLoader,
    svgVueLoader,
    vueLoader,
  ]
}
