# Base Vue3 widget

*Vue3 + Typescript*

The project uses custom elements so that vue components can be inserted into any part of the HTML document.

## Usage/Examples

```ts
import {defineCustomElement} from 'vue'
import TestWidget from 'vue/custom-elements/TestWidget.ce.vue'

customElements.define('test-widget', defineCustomElement(TestWidget))
```

```html
<div>
    <h1>Test</h1>

    <test-widget></test-widget>
</div>
```

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn dev
```

### Compiles and minifies for production

```
yarn build:prod
```

### Compiles for development

```
yarn build:dev
```

### Deploy on github pages

```
yarn deploy
```
