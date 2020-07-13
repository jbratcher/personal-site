---
date: 2020-04-22T16:43:31.392Z
title: Improve Google Page Speed Score In Nuxt Apps
description: Configuration for Scalable Nuxt Apps
thumbnail: /images/nuxt-google-lighthouse.svg
hero: /images/nuxt-google-lighthouse.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

You should get a perfect score from a Google Lighthouse audit with a base install of a Nuxt Application after building and running in production mode. In the test for this post, I got a 97 in performance with all 100s in the rest of the categories and passing PWA tests.

If you use the generate command to render everything as static, the performance score hits 100.

This pre-configured base is a big selling point for Nuxt which abstracts away the most common configurations and best practices for Vue apps.

## Performance Takes A Big Hit As Dependencies and Assets Grow

The kicker is that when you start to add third-party libraries, fonts, icons, and heavy assets like images the performance score can take a nosedive.

I noticed this when building out web apps. Performance scores would often drop significantly depending on the package size of the library or due to un-optimized images.

This isn't a fault of Nuxt however as there are several community modules that allow you to optimize for performance.

Thus began my journey of optimizing the Nuxt configuration for performance.

## Performance

### Render Blocking Resources

Lighthouse performance audit may detect render blocking resources which are resources that increase the time it takes to render the page. The size of these resources directly affects how large the increase is.

#### Cross-origin URL Requests

My biggest blocker for performance was requests to CDNs and the size of the packages.

[Stripe](https://stripe.com) is a common third-party resource and is an easy way to set up payment solutions for an app. It is recommended to load Stripe on all pages to help enhance fraud prevention.

Here, I am loading Stripe globally in the Nuxt configuration using `preconnect` and `dns-prefetch`.

`nuxt.config.js`

```javascript
export default {
  head: {
    link: [
      {
        rel: 'preconnect',
        href: 'https://m.stripe.com',
        crossorigin: 'anonymous'
      },
      {
        rel: 'dns-prefetch',
        href: 'https://m.stripe.com'
      }
    ]
  }
}
```

`preconnect` and `dns-prefetch` are used in combination to both perform a DNS lookup and establish a connection to the server. These attributes allow the browser to do these tasks preemptively and in the background while the app is in use. Use these attributes where you can for resources that are not critical to the immediate page load.

For resources that are critical to the page load, you can use the `preload` attribute instead. This works in a similar fashion but tells the browser this resource is important and should be rendered as soon as possible without blocking rendering. This is useful to load some base page styles as to prevent Flash of Unstyled Text(FOUT) from occurring.

### Remove Unused CSS

I use Material Design Icons with Vuetify in my Nuxt projects. However, Vuetify makes a request to the CDN for the icon pack without preconnecting or prefetching.

[Vuetify Docs](https://vuetifyjs.com/en/customization/icons/) recommend install the icon package locally and using custom imports in components for only the icons you use. This will prune any unused CSS for icons in production.

`npm install --save @mdi/js`

After that, in any `component.vue` file:

```javascript
<template>
  <v-icon>{{ menuIcon }}</v-icon>
</template>
```

```javascript
<script>
  import { mdiMenu } from '@mdi/js'
  export default {
    data: () => ({
      menuIcon: mdiMenu
    }),
  }
</script>
```

We also need to turn off the default icon loading from the Nuxt Vuetify module so that we aren't loading the resource twice.

`nuxt.config.js`

```javascript
export default {
  vuetify: {
    defaultAssets: {
      icons: false
    }
  }
}
```

### Nuxt Image Optimization

[nuxt-optimized-images](https://github.com/aceforth/nuxt-optimized-images) allows you to use several image optimization packages with Nuxt acting as a plugin. You will need to include each [image optimization packages](https://github.com/aceforth/nuxt-optimized-images#optimization-packages) you want.

### Unused CSS

[nuxt-purgecss](https://github.com/Developmint/nuxt-purgecss) allows you to use [PurgeCSS](https://purgecss.com/) with Nuxt removing any unused CSS during the production build.

## Conclusion

Using these methods and modules, my medium-sized, un-optimized app went from a 57 performance score to an 84. While there is still some work to be done to increase load times even more such as [serving images in next-gen formats](https://web.dev/uses-webp-images/?utm_source=lighthouse&utm_medium=devtools), I will leave that for another time.

## Resources

[Preconnect and Prefetch for Links](https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch) - https://developer.mozilla.org/en-US/docs/Web/Performance/dns-prefetch
