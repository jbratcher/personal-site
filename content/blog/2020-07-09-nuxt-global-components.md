---
date: 2020-07-09T15:41:26.968Z
title: Nuxt Global Components
description: Tree shaking and automatic imports
thumbnail: /images/nuxt-tips.svg
hero: /images/nuxt-tips.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Nuxt 2.13 brought a few new features including full static builds, page crawlers, and [global components](https://nuxtjs.org/api/configuration-components). Now, we can place components that we want to use globally inside the `components` folder for use anywhere in the Nuxt app.

## Vue global components

Global component registration has existed in Vue for awhile now but I have avoided it due to performance and pollution concerns. In Vue, if you make a component global, it will be available for every Vue instance and, even if you never use it, it will be included in your app build and increase your bundle size. To globally register a component in Vue, you can use the `Vue.component()` method.

## Nuxt global components

With the recent Nuxt update you can now easily register components globally in Nuxt by including them in the `components` folder. Nuxt will automatically scan and import the components when you reference them inside the `template` on a page.

The Nuxt docs show how to enable global components in `nuxt.config.js` by setting the `components` option to `true`

`nuxt.config.js`

```javascript
export default {
  components: true
}
```

> Note: While `false` is the default value for the `components` option, a new project created with `create-nuxt-app` will already have `components` set to `true` in the `nuxt.config.js` file.

## Dynamic Imports

The components module makes it easy to take advantage of performance improvements like lazy-loading. To use lazy-loading for components, add a prefix of `Lazy` to your components when referencing them in the `template` section of the Vue file. For example, `<MyComponent>` would become `<LazyMyComponent>`.

## Tree-shaking

Minimizing final bundle size is critical to reduce load times for web apps. Tree-shaking allows us to bundle only those features of a library we are actually using in our application. This is done by default in the components module for the components you include in the global components folder but, for external libraries, some additional work must be done for tree-shaking.

Luckily, the [Nuxt Components module offers tree-shaking](https://github.com/nuxt/components#library-authors) capabilities using the `components:dir` hook.

Imagine you have a UI components library named `ui-library` in `node_modules` that consists of `components` directory and a `nuxt.js` file and you want to use these components in your Nuxt app. In `nuxt.js`, you want to use the `components:dir` hook to add these components to the Nuxt app.

`nuxt.js`

```javascript
import { join } from 'path'

export default function() {
  this.nuxt.hook('components:dirs', dirs => {
    // Add ./components directory to the components list
    dirs.push({
      path: join(__dirname, 'components'),
      prefix: 'awesome'
    })
  })
}
```

Then import the library as a dependency in `nuxt.config.js`

`nuxt.config.js`

```javascript
export default {
  buildModules: ['@nuxt/components', 'ui-library/nuxt']
}
```

Now, you can use the components in this library anywhere in your Nuxt app and when you build the app for production, only the components you actually use will be included in the build. Tree-shaking accomplished.

### References

[Nuxt Official Blog Post For The New Components Module](https://nuxtjs.org/blog/improve-your-developer-experience-with-nuxt-components)
[Nuxt Components Module](https://github.com/nuxt/components)
[Nuxt 2.13.0 Release Notes](https://nuxtjs.org/guide/release-notes/#v2.13.0)
