import colors from 'vuetify/es5/util/colors'

export default {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    htmlAttrs: {
      lang: 'en'
    },
    title: 'Jeremy Bratcher | Web Developer | Louisville, KY',
    meta: [
      {
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || ''
      }
    ],
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'preconnect',
        href: 'https://cdn.jsdelivr.net/npm/animate.css@3.5.1',
        as: 'style'
      }
    ]
  },
  generate: {
    routes: function() {
      const fs = require('fs')
      return fs.readdirSync('./assets/content/blog').map(file => {
        return {
          route: `/blog/${file.slice(2, -5)}`,
          payload: require(`./assets/content/blog/${file}`)
        }
      })
    },
    fallback: true
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: '#fff'
  },
  /*
   ** Global CSS
   */
  css: ['highlight.js/styles/a11y-light.css', '@/assets/global.scss'],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: ['~/plugins/breakpoint.js', '~/plugins/vuetify-theme-cache'],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [
    '@aceforth/nuxt-optimized-images',
    'nuxt-purgecss',
    '@nuxtjs/vuetify'
  ],
  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/markdownit', 'nuxt-webfontloader'],
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  },
  /*
   ** Markdown-it module config
   */
  markdownit: {
    breaks: true,
    // use syntax highlighting:
    highlight: function(str, lang) {
      const hljs = require('highlight.js')
      if (lang && hljs.getLanguage(lang)) {
        try {
          return hljs.highlight(lang, str).value
        } catch (__) {}
      }

      return '' // use external default escaping
    },
    html: true,
    injected: true,
    linkify: true
  },
  /*
   ** Nuxt Optimized Images Config
   ** https://github.com/aceforth/nuxt-optimized-images
   */
  optimizedImages: {
    optimizeImages: true
  },
  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: {
      icons: false
    },
    theme: {
      options: {
        minifyTheme: function(css) {
          return process.env.NODE_ENV === 'production'
            ? css.replace(/[\r\n|\r|\n]/g, '')
            : css
        }
      },
      light: true,
      themes: {
        light: {
          primary: colors.grey.darken2,
          accent: colors.grey.lighten1,
          secondary: colors.blueGrey.darken3,
          info: colors.grey.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3,
          background: colors.blueGrey.base
        }
      }
    },
    treeShake: true
  },
  /*
  // nuxt-webfontloader
  // handles efficient loading of web fonts
  */
  webfontloader: {
    // use custom instead of google property to prevent flash of invisible text(foit)
    custom: {
      families: ['Raleway'],
      urls: ['https://fonts.googleapis.com/css?family=Raleway&display=swap']
    }
  }
}
