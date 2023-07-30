<script setup lang="ts">
import SettingIcon from '../../assets/setting.svg'
import KeyboardReturnIcon from '../../assets/keyboard-return.svg'
import {onBeforeMount, onBeforeUnmount, Ref, ref} from 'vue'
import {API} from 'api'
import {WeatherQuery} from 'api/types'
import WeatherItem from 'vue/components/WeatherItem.vue'
import CityItem from 'vue/components/CityItem.vue'
import StorageService from 'scripts/services/StorageService'
import GeolocationService from 'scripts/services/GeolocationService'

document.addEventListener('keyup', pressEnter)

const inputValue: Ref<string> = ref('')
const isFocus: Ref<boolean> = ref(false)
const isWeatherList: Ref<boolean> = ref(true)
const isLoading: Ref<boolean> = ref(false)
const weatherItems: Ref<any[]> = ref([])
const cityItems: Ref<{ name: string, code: string, id: number }[]> = ref([])
const cityDragIndex: Ref<Record<string, number>> = ref({
  start: 0,
  enter: 0
})

onBeforeMount(async () => {
  await getInitialWeather()
})

onBeforeUnmount(() => {
  document.removeEventListener('keyup', pressEnter)
})

function changeView() {
  isWeatherList.value = !isWeatherList.value
}

async function pressEnter(e: KeyboardEvent) {
  const {key, which} = e

  if (isFocus.value && (key === 'Enter' || which === 13)) {
    await getWeather({q: inputValue.value})
  }
}

function onDragStart(event: DragEvent, index: number) {
  cityDragIndex.value.start = index

  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('id', String(index))
  }
}

function onDragEnter(index: number) {
  cityDragIndex.value.enter = index
}

function onDragEnd() {
  if (cityDragIndex.value.start === cityDragIndex.value.enter) return

  const enter = cityDragIndex.value.enter
  const start = cityDragIndex.value.start
  const cityItem = cityItems.value.splice(start, 1)[0]
  const weatherItem = weatherItems.value.splice(start, 1)[0]

  cityItems.value.splice(enter, 0, cityItem)
  weatherItems.value.splice(enter, 0, weatherItem)
}

function deleteCity(index: number) {
  const item = cityItems.value.splice(index, 1)[0]
  weatherItems.value.splice(index, 1)

  const storage = StorageService.getItem('weather')

  if (!storage) return

  const filterStorage = storage
  .split(', ')
  .filter((it) => it !== String(item.id))
  .join(', ')

  StorageService.setItem('weather', filterStorage)
}

async function getLocation() {
  try {
    const geolocation = await GeolocationService.getGeolocation()

    if (typeof geolocation === 'object') {
      await getWeather({lat: geolocation.lat, lon: geolocation.lon})
    }
  } catch (e) {
    console.info('Unable to retrieve your location')
  }
}

async function getInitialWeather() {
  const ids = StorageService.getItem('weather')

  if (!ids) {
    await getLocation()

    return
  }

  try {
    isLoading.value = true

    const {data} = await API.groupWeather.get({id: ids.replace(' ', '')})

    const cities = data.list.map((it) => {
      return {
        id: it.id,
        name: it.name,
        code: it.sys.country
      }
    })

    weatherItems.value = data.list
    cityItems.value = cities
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}

async function getWeather(query: WeatherQuery) {
  try {
    isLoading.value = true

    const {data} = await API.weather.get(query)

    const checkId = weatherItems.value.find(({id}) => id === data.id)

    if (checkId) return

    const city = {
      id: data.id,
      name: data.name,
      code: data.sys.country
    }
    const value = StorageService.getItem('weather')

    if (!value) {
      StorageService.setItem('weather', String(data.id))
    } else {
      StorageService.setItem('weather', `${value}, ${data.id}`)
    }

    cityItems.value.push(city)
    weatherItems.value.push(data)

    inputValue.value = ''
  } catch (e) {
    console.log(e)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="weather-widget">
    <div
      v-show="isLoading"
      class="loader"
    >
      Loading...
    </div>

    <button
      type="button"
      class="btn weather-widget__btn"
      @click="changeView"
    >
      <setting-icon />
    </button>

    <div
      v-if="isWeatherList"
      class="weather-widget__weather-list"
    >
      <weather-item
        v-for="item in weatherItems"
        :key="item.id"
        v-bind="item"
      />
    </div>

    <div
      v-else
      class="weather-widget__city-list"
    >
      <city-item
        v-for="(city, index) in cityItems"
        :key="city.id"
        v-bind="city"
        :index="index"
        @start="onDragStart"
        @enter="onDragEnter"
        @end="onDragEnd"
        @delete="deleteCity"
      />

      <div class="weather-widget__field">
        <div class="weather-widget__field-wrapper">
          <label for="city">Add Location</label>

          <input
            id="city"
            v-model="inputValue"
            type="text"
            @focus="isFocus = true"
            @blur="isFocus = false"
          >
        </div>

        <button
          type="button"
          class="btn weather-widget__field-btn"
          :disabled="!inputValue.length"
          @click="getWeather({ q: inputValue })"
        >
          <keyboard-return-icon />
        </button>
      </div>
    </div>
  </div>
</template>

<style>
.btn {
  padding: 0;
  border: none;
  background-color: transparent;
  cursor: pointer;
  outline: none;
}

.btn svg {
  width: 2rem;
  height: 2rem;
}

.loader {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
  background: rgba(0, 0, 0, 0.3);
  text-align: center;
  color: white;
}

.weather-widget {
  position: relative;
  padding: 3rem 2rem 2rem;
  width: 20rem;
  max-height: 50vh;
  overflow: auto;
  border: 1px solid black;
}

.weather-widget__weather-list,
.weather-widget__city-list {
  display: flex;
  gap: 1rem;
  flex-direction: column;
}

.weather-widget__btn {
  position: absolute;
  top: 1rem;
  right: 1rem;
}

.weather-widget__field {
  display: flex;
  gap: 1rem;
  margin-top: 1rem;
}

.weather-widget__field-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}

.weather-widget__field-btn {
  align-self: flex-end;
}

.weather-widget__field svg {
  width: 1.5rem;
  height: 1.5rem;
}

.weather-widget__field label {
  cursor: pointer;
}

.weather__temp {
  margin: 0;
  font-size: 3rem;
}

.weather__icon {
  width: 10rem;
  height: 10rem;
  flex-shrink: 0;
}

.weather__icon img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.weather__wrapper {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.weather__wrapper._column {
  display: inline-flex;
  gap: 2rem;
  flex-direction: column;
  flex-wrap: wrap;
  height: 7rem;
}

.weather__wind {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.weather__wind svg {
  width: 1rem;
  height: 1rem;
}

.city {
  display: flex;
  padding: 0.5rem;
  align-items: center;
  justify-content: space-between;
  background: rgba(0, 0, 0, 0.1);
}

.city__wrapper {
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>
