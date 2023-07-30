interface StorageServiceInterface {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

class StorageService implements StorageServiceInterface {
  getItem(key: string): string | null {
    return localStorage.getItem(key)
  }

  setItem(key: string, value: string) {
    return localStorage.setItem(key, value)
  }

  removeItem(key: string) {
    return localStorage.removeItem(key)
  }
}

export default new StorageService()
