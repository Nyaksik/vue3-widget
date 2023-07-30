import {BuildOptions} from './types'
import {Configuration as DevServerConfiguration} from 'webpack-dev-server'

export function buildDevServer({port}: BuildOptions): DevServerConfiguration {
  return {
    port,
    open: true,
    historyApiFallback: true,
    hot: true,
    watchFiles: ['src/**/*']
  }
}
