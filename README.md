# vue-expandable-image

> Allows your images to open in full size.

# Demo Preview

![](./demo-preview.gif)

## Setup

```
npm install vue-expandable-image
```

You have two ways to setup `vue-expandable-image`:

#### CommonJS (Webpack/Browserify)

- ES6

```js
import VueExpandableImage from 'vue-expandable-image'
Vue.use(VueExpandableImage)
```

- ES5

```js
var VueExpandableImage = require('vue-expandable-image')
Vue.use(VueExpandableImage)
```

#### Include

Include it directly with a `<script>` tag. In this case, you don't need to write `Vue.use(VueExpandableImage)`, this will be done automatically for you.

## Demo
You can check this [CodePen](https://codepen.io/tahazsh/pen/aMbooL) to see how it works.

## Usage

Just replace your `<img>` tag with `<expandable-image/>`, and it should work!

## License

[MIT](http://opensource.org/licenses/MIT)

Copyright (c) 2019 Taha Shashtari