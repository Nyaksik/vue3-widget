export interface WeatherQuery {
  q?: string
  lat?: string
  log?: string
  id?: string
}

export interface WeatherData {
  weather: [
    {
      description: string
      icon: string
    }
  ]
  main: {
    temp: number
    feels_like: number
    humidity: number
    pressure: number
  }
  visibility: number
  wind: {
    speed: number
    deg: number
  }
  sys: {
    country: string
  }
  id: number
  name: string
}
