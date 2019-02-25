const buble = require('rollup-plugin-buble')
const cjs = require('rollup-plugin-commonjs')
const node = require('rollup-plugin-node-resolve')
const replace = require('rollup-plugin-replace')
const vue = require('rollup-plugin-vue')
const version = process.env.VERSION || require('../package.json').version

const replaceConfig = {
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  'process.env.VUE_ENV': JSON.stringify(process.env.VUE_ENV || 'development')
}

module.exports = {
  input: './src/index.js',
  plugins: [replace(replaceConfig), node(), cjs(), vue(), buble()],
  output: {
    file: 'dist/vue-expandable-image.js',
    format: 'umd',
    name: 'VueExpandableImage',
    banner:
`/**
 * vue-expandable-image v${version}
 * (c) ${new Date().getFullYear()} Taha Shashtari
 * @license MIT
 */`
  }
}