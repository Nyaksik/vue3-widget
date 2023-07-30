<script setup lang="ts">
import MergeIcon from '../../assets/merge.svg'
import {WeatherData} from 'api/types'
import {BASE_URL_ICON} from '../../../constant'
import {computed, ComputedRef} from 'vue'

const props = defineProps<WeatherData>()

const icon: ComputedRef<string> = computed(() => {
  return props.weather[0]?.icon ? `${BASE_URL_ICON}${props.weather[0].icon}.png` : ''
})
const description: ComputedRef<string> = computed(() => {
  return props.weather[0]?.description ? props.weather[0].description : ''
})

function numberRound(number: number) {
  return Math.round(number)
}
</script>

<template>
  <div class="weather">
    <h2 class="weather__title">
      {{ props.name }}, {{ props.sys.country }}
    </h2>

    <div class="weather__wrapper">
      <div class="weather__icon">
        <img
          v-if="icon"
          :src="`${icon}`"
          alt="icon"
        >
      </div>

      <h3 class="weather__temp">
        {{ numberRound(props.main.temp) }}&deg;C
      </h3>
    </div>

    <p v-if="description">
      Feels like {{ numberRound(props.main.feels_like) }}&deg;C. {{ description }}
    </p>

    <div class="weather__wrapper _column">
      <div class="weather__wind">
        <merge-icon :style="`transform: rotate(${props.wind.deg}deg)`" />

        {{ numberRound(props.wind.speed) }}m/s SSE
      </div>

      <div>{{ props.main.pressure }}hPa</div>

      <div>Humidity: {{ props.main.humidity }}%</div>

      <div>Visibility: {{ (props.visibility / 1000).toFixed(1) }}km</div>
    </div>
  </div>
</template>
