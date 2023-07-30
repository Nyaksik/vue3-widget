export type BuildMode = 'production' | 'development'

export interface BuildEnv {
  mode: BuildMode
  port: number
  apiUrl: string
}

export interface BuildPath {
  entry: string
  build: string
  html: string
  src: string
}

export interface BuildOptions extends BuildEnv{
  isDev: boolean
  paths: BuildPath
}
