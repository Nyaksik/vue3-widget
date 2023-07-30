import {Configuration} from 'webpack'
import {BuildEnv, BuildMode, BuildPath} from './config/types'
import * as path from 'path'
import {buildWebpackConfig} from './config/buildWebpackConfig'

export default (env: BuildEnv): Configuration => {
  const paths: BuildPath = {
    entry: path.resolve(__dirname, 'src', 'scripts', 'index.ts'),
    build: path.resolve(__dirname, 'dist'),
    src: path.resolve(__dirname, 'src'),
    html: path.resolve(__dirname, 'src', 'html', 'index.html')
  }
  const mode: BuildMode = env.mode || 'development'
  const PORT = env.port || 3000
  const isDev = mode === 'development'
  const apiUrl = env.apiUrl || 'http://localhost:8000'

  return buildWebpackConfig({
    mode,
    paths,
    isDev,
    apiUrl,
    port: PORT,
  })
}
