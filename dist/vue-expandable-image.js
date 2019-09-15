/**
 * vue-expandable-image v0.1.0
 * (c) 2019 Taha Shashtari
 * @license MIT
 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VueExpandableImage = factory());
}(this, function () { 'use strict';

  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //
  //

  var script = {
    props: {
      closeOnBackgroundClick: {
        type: Boolean,
        default: false
      }
    },

    data: function data () {
      return {
        expanded: false,
        closeButtonRef: null
      }
    },

    methods: {
      closeImage: function closeImage (event) {
        this.expanded = false;
        event.stopPropagation();
      },

      freezeVp: function freezeVp (e) {
        e.preventDefault();
      },

      onExpandedImageClick: function onExpandedImageClick (e) {
        e.stopPropagation();
        var image = this.cloned.querySelector('img');
        var imagePosition = this.getRenderedSize(image.width, image.height, image.naturalWidth, image.naturalHeight);
        if (
          (e.clientX < imagePosition.left) ||
          (e.clientX > imagePosition.right) ||
          (e.clientY < imagePosition.top) ||
          (e.clientY > imagePosition.bottom)
        ) {
          this.expanded = false;
        }
      },

      getRenderedSize: function getRenderedSize (cWidth, cHeight, oWidth, oHeight) {
        var oRatio = oWidth > oHeight
          ? oWidth / oHeight
          : oHeight / oWidth;
        var width = oWidth >= oHeight
          ? oRatio * cHeight
          : cWidth;
        var height = oHeight > oWidth
          ? oRatio * cWidth
          : cHeight;
        var left = (this.cloned.clientWidth - width) / 2;
        var right = left + width;
        var top = (this.cloned.clientHeight - height) / 2;
        var bottom = top + height;
        return { left: left, top: top, right: right, bottom: bottom }
      }
    },

    watch: {
      expanded: function expanded (status) {
        var this$1 = this;

        this.$nextTick(function () {
          if (status) {
            this$1.cloned = this$1.$el.cloneNode(true);
            this$1.closeButtonRef = this$1.cloned.querySelector('.close-button');
            this$1.closeButtonRef.addEventListener('click', this$1.closeImage);
            document.body.appendChild(this$1.cloned);
            document.body.style.overflow = 'hidden';
            this$1.cloned.addEventListener('touchmove', this$1.freezeVp, false);
            if (this$1.closeOnBackgroundClick) {
              this$1.cloned.addEventListener('click', this$1.onExpandedImageClick);
            }
            setTimeout(function () {
              this$1.cloned.style.opacity = 1;
            }, 0);
          } else {
            this$1.cloned.style.opacity = 0;
            this$1.cloned.removeEventListener('touchmove', this$1.freezeVp, false);
            if (this$1.closeOnBackgroundClick) {
              this$1.cloned.removeEventListener('click', this$1.onExpandedImageClick);
            }
            setTimeout(function () {
              this$1.closeButtonRef.removeEventListener('click', this$1.closeImage);
              this$1.cloned.remove();
              this$1.cloned = null;
              this$1.closeButtonRef = null;
              document.body.style.overflow = 'auto';
            }, 250);
          }
        });
      }
    }
  };

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
  /* server only */
  , shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
    if (typeof shadowMode !== 'boolean') {
      createInjectorSSR = createInjector;
      createInjector = shadowMode;
      shadowMode = false;
    } // Vue.extend constructor export interop.


    var options = typeof script === 'function' ? script.options : script; // render functions

    if (template && template.render) {
      options.render = template.render;
      options.staticRenderFns = template.staticRenderFns;
      options._compiled = true; // functional template

      if (isFunctionalTemplate) {
        options.functional = true;
      }
    } // scopedId


    if (scopeId) {
      options._scopeId = scopeId;
    }

    var hook;

    if (moduleIdentifier) {
      // server build
      hook = function hook(context) {
        // 2.3 injection
        context = context || // cached call
        this.$vnode && this.$vnode.ssrContext || // stateful
        this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
        // 2.2 with runInNewContext: true

        if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
          context = __VUE_SSR_CONTEXT__;
        } // inject component styles


        if (style) {
          style.call(this, createInjectorSSR(context));
        } // register component module identifier for async chunk inference


        if (context && context._registeredComponents) {
          context._registeredComponents.add(moduleIdentifier);
        }
      }; // used by ssr in case component is cached and beforeCreate
      // never gets called


      options._ssrRegister = hook;
    } else if (style) {
      hook = shadowMode ? function () {
        style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
      } : function (context) {
        style.call(this, createInjector(context));
      };
    }

    if (hook) {
      if (options.functional) {
        // register for functional component in vue file
        var originalRender = options.render;

        options.render = function renderWithStyleInjection(h, context) {
          hook.call(context);
          return originalRender(h, context);
        };
      } else {
        // inject component registration as beforeCreate hook
        var existing = options.beforeCreate;
        options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
      }
    }

    return script;
  }

  var normalizeComponent_1 = normalizeComponent;

  var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
    return function (id, style) {
      return addStyle(id, style);
    };
  }
  var HEAD = document.head || document.getElementsByTagName('head')[0];
  var styles = {};

  function addStyle(id, css) {
    var group = isOldIE ? css.media || 'default' : id;
    var style = styles[group] || (styles[group] = {
      ids: new Set(),
      styles: []
    });

    if (!style.ids.has(id)) {
      style.ids.add(id);
      var code = css.source;

      if (css.map) {
        // https://developer.chrome.com/devtools/docs/javascript-debugging
        // this makes source maps inside style tags work properly in Chrome
        code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

        code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
      }

      if (!style.element) {
        style.element = document.createElement('style');
        style.element.type = 'text/css';
        if (css.media) { style.element.setAttribute('media', css.media); }
        HEAD.appendChild(style.element);
      }

      if ('styleSheet' in style.element) {
        style.styles.push(code);
        style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
      } else {
        var index = style.ids.size - 1;
        var textNode = document.createTextNode(code);
        var nodes = style.element.childNodes;
        if (nodes[index]) { style.element.removeChild(nodes[index]); }
        if (nodes.length) { style.element.insertBefore(textNode, nodes[index]); }else { style.element.appendChild(textNode); }
      }
    }
  }

  var browser = createInjector;

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"expandable-image",class:{
      expanded: _vm.expanded
    },on:{"click":function($event){_vm.expanded = true;}}},[(_vm.expanded)?_c('i',{staticClass:"close-button"},[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"fill":"#666666","d":"M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"}})])]):_vm._e(),_vm._v(" "),(!_vm.expanded)?_c('i',{staticClass:"expand-button"},[_c('svg',{staticStyle:{"width":"24px","height":"24px"},attrs:{"viewBox":"0 0 24 24"}},[_c('path',{attrs:{"fill":"#000000","d":"M10,21V19H6.41L10.91,14.5L9.5,13.09L5,17.59V14H3V21H10M14.5,10.91L19,6.41V10H21V3H14V5H17.59L13.09,9.5L14.5,10.91Z"}})])]):_vm._e(),_vm._v(" "),_c('img',_vm._b({},'img',_vm.$attrs,false))])};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-3c2a268c_0", { source: ".expandable-image{position:relative;transition:.25s opacity;cursor:zoom-in}body>.expandable-image.expanded{position:fixed;z-index:999999;top:0;left:0;width:100%;height:100%;background:#000;display:flex;align-items:center;opacity:0;padding-bottom:0!important;cursor:default}body>.expandable-image.expanded>img{width:100%;max-width:1200px;max-height:100%;object-fit:contain;margin:0 auto}body>.expandable-image.expanded>.close-button{display:block}.close-button{position:fixed;top:10px;right:10px;display:none;cursor:pointer}.close-button svg,.expand-button svg{filter:drop-shadow(1px 1px 1px rgba(0, 0, 0, .5))}.close-button svg path,.expand-button svg path{fill:#fff}.expand-button{position:absolute;z-index:999;right:10px;top:10px;padding:0;align-items:center;justify-content:center;padding:3px;opacity:0;transition:.2s opacity}.expandable-image:hover .expand-button{opacity:1}.expand-button svg{width:20px;height:20px}.expand-button path{fill:#fff}.expandable-image img{width:100%}", map: undefined, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = undefined;
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    

    
    var ExpandableImage = normalizeComponent_1(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      browser,
      undefined
    );

  var vueExpandableImage = {};

  vueExpandableImage.install = function (Vue) {
    Vue.component('expandable-image', ExpandableImage);
  };

  if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(vueExpandableImage);
  }

  return vueExpandableImage;

}));
