import axios, {AxiosResponse} from 'axios'
import {API_KEY} from '../../../constant'

interface ApiServiceInterface<T, K> {
  path: string
  get: (query: T) => Promise<AxiosResponse<K>>
}

export class ApiService<T = Record<string, string>,
  K = Record<string, any>> implements ApiServiceInterface<T, K>
{
  readonly path

  constructor(path: string) {
    this.path = path
  }

  async get(query: T): Promise<AxiosResponse<K>> {
    return await axios.get(this.path, {params: {...query, appid: API_KEY}})
  }
}
