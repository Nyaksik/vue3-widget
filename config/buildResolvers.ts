import {BuildOptions} from './types'
import {ResolveOptions} from 'webpack'

export function buildResolvers({paths}: BuildOptions): ResolveOptions {
  return {
    extensions: ['.ts', '.js', '.vue'],
    preferAbsolute: true,
    modules: [paths.src, 'node_modules'],
    mainFiles: ['index'],
    symlinks: false,
  }
}
