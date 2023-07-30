import {ApiService} from 'scripts/services/ApiService'
import {BASE_GROUP_URL, BASE_URL} from '../../constant'
import {WeatherData, WeatherQuery} from 'api/types'

export const API = {
  weather: new ApiService<WeatherQuery, WeatherData>(BASE_URL),
  groupWeather: new ApiService<WeatherQuery, { list: WeatherData[] }>(BASE_GROUP_URL)
}
