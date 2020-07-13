---
date: 2020-03-19T21:43:27.656Z
title: Responsive Typography with Vuetify
description: Tap into the full power of Vuetify
thumbnail: /images/nuxt-vuetify.svg
hero: /images/nuxt-vuetify.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

I've been using [Nuxt.js](https://nuxtjs.org/), a Vue.js framework for several months now. Nuxt provides a way to easily configure a Vue.js app and abstracts away some of the more complex setup like routing and stores. Nuxt also has a rich community for support and a variety of popular plugins for extending it's functionality. One of the biggest reasons, I use it is the mode config which allows you to switch between static site rendering and server side rendering.

[Vuetify](https://vuetifyjs.com/) is a Material Design UI Library for Vue which also provides a variety of Bootstrap-like classes to quickly and easily layout and style a web site or app in addition to many premade components. This includes several typography helpers that set the font-weight and -size of text elements.

## How Vuetify Typography Works

Vuetify uses [scale pixels](https://material.io/design/layout/pixel-density.html#pixel-density-on-android), or sp, for their font sizes. Sp allows font sizes to play well with a user's font settings and their devices pixel density (dp). However, the typography classes don't look right for all screen sizes. It may loook good on mobile but not desktop or vice versa. For example, the `display-1` class makes the font size 34sp which makes for a good mobile or tablet heading but looks too small on laptop and desktop screens.

If we want to use a differnt font size, one method would be to ditch the classes and write different css styles for the heading element with media queries for different screen sizes. This totally works but then we are missing the benefits of using the typograhpy classes. The good news is that in Vue we can use class bindings which allow us to provide an object of class and breakpoint pairs to dynamically change the class based on the viewport width.

## Using Vue class bindings with Vueitfy breakpoints

Vuetify provides an array of [handy breakpoint helpers](https://vuetifyjs.com/en/customization/breakpoints/) that not only allow you to target specific breakpoints but also from specific breakpoints up and down (i.e. medium screems and up, small screens and down).

The example below shows how to set the classes dynamically based on the current viewport width.

```html
<h1
  :class="{'display-2 mb-6': $breakpoint.mdAndUp, 'display-1 mb-2': $breakpoint.smAndDown}"
>
  Nuxt Netlify CMS Starter Kit
</h1>
```

Here you can see we are setting the heading class to `display-2` when the viewport is medium or larger and to `display-1` when the viewport is small or smaller. We are also changing the bottom margin based on the viewport width as well.

It's that simple to create responsive typography with Vuetify.

## Going beyond 2 classes

In the rare case where you want to target mulitple breakpoints each with their own specific class, you could just add another key/value pair to the object but it can start to become unwieldy. In these case you can replace the binding with a computed property.

In a Vue component file:

```html
<template>
  <h1 :class="displayClass">Nuxt Netlify CMS Starter Kit</h1>
</template>
```

```js
export default {
  computed: {
    diplayClass() {
      let classString = ''
      switch (this.$breakpoint.name) {
        case 'xs':
          classString = 'headline'
          break
        case 'sm':
          classString = 'display-1'
          break
        case 'md':
          classString = 'display-2'
          break
        case 'lg':
          classString = 'display-3'
          break
        case 'xl':
          classString = 'display-4'
          break
      }
      return classString
    }
  }
}
```

This is not very common but this is a good way to target multiple breakpoints specifically instead of cluttering the template with logic.

## Refresh bug and fix

One issue that remains is a Vue bug that can affect how class bindings are calculated after a page refresh. This is a [known bug](https://github.com/vuetifyjs/vuetify/issues/3436) and a workaround for Nuxt users has been created via an [unofficial plugin](https://gist.github.com/douira/6d3f99fa4546adee470637467931ed19).

The bug can take effect when the page is refreshed which can either display the wrong class or no class thus breaking the styling of the page.

The unofficial plugin can be used by placing the `breakpoint.js` file in the Nuxt `plugins` folder and registering the plugin inside the `nuxt.config.js` file.

```js
export default {
    ...
    plugins: ["~/plugins/breakpoint"]
    ...
}
```
