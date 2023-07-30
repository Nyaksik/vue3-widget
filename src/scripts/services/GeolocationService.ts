class GeolocationService {
  isGeolocation: boolean = false

  constructor() {
    if (navigator?.geolocation) {
      this.isGeolocation = true
    }
  }

  getGeolocation(): Promise<{ lat: number; lon: number } | undefined> {
    if (!this.isGeolocation) {
      return new Promise((_, reject) => reject(undefined))
    }

    return new Promise((resolve, reject) => {
      const success = (position: GeolocationPosition) => {
        const coords = {
          lat: position.coords.latitude,
          lon: position.coords.longitude
        }

        return resolve(coords)
      }
      const error = () => reject(undefined)

      navigator.geolocation.getCurrentPosition(success, error)
    })
  }
}

export default new GeolocationService()
