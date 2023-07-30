import {defineCustomElement} from 'vue'
import TestWidget from '../../vue/custom-elements/TestWidget.ce.vue'
import WeatherWidget from '../../vue/custom-elements/WeatherWidget.ce.vue'

customElements.define('test-widget', defineCustomElement(TestWidget))
customElements.define('weather-widget', defineCustomElement(WeatherWidget))
