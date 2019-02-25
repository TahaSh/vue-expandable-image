import Vue from 'vue'
import App from './App'

import VueExpandableImage from '../src'
Vue.use(VueExpandableImage)

new Vue({
  render: h => h(App)
}).$mount('#app')
