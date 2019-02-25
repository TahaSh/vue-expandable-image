import ExpandableImage from './ExpandableImage.vue'
let vueExpandableImage = {}

vueExpandableImage.install = function (Vue) {
  Vue.component('expandable-image', ExpandableImage)
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(vueExpandableImage)
}

export default vueExpandableImage
