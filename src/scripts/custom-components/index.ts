import {defineCustomElement} from 'vue'
import TestWidget from '../../vue/custom-elements/TestWidget.ce.vue'

customElements.define('test-widget', defineCustomElement(TestWidget))
