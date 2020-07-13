---
date: 2020-04-08T17:45:13.386Z
title: Vuetify App Bar Background Transitions
description: How to create a full-featured v-app-bar component
thumbnail: /images/nuxt-vuetify.svg
hero: /images/nuxt-vuetify.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

A trendy feature for website homepages right now is a transparent navigation bar on top of a hero image. You see this a lot on business websites that are chalk full of high end design. As the page is scrolled down, the transparency usually replaced by a solid color to provide readability on light or dark backgrounds.

Vuetify gives you a lot of these features out of the box such as a transparent nav bar that can elevate, shrink and hide on scroll based on a given threshold value. One important feature I found missing was the ability to change the background color on scroll.

I found myself in need of this feature when trying to replicate the effect described above. Vuetify's `v-app-bar` component works wonderfully in the other respects and has come a long way since version 1. It has lots of features that can easily be set simply adding the props as documented.

## A typical v-app-bar component

Here is an typical `v-app-bar` component in a layout file.

In `layouts/default.vue`:

```html
<v-app-bar
  app
  dark
  elevate-on-scroll
  hide-on-scroll
  id="nav"
  scroll-threshold="250"
  shrink-on-scroll
  tile
>
  <a id="brand" href="/">
    <v-toolbar-title
      class="align-self-center py-0 black--text"
      :class="{'pl-5': $breakpoint.mdAndUp, 'pl-0': $breakpoint.smAndDown}"
    >
      Brand
    </v-toolbar-title>
  </a>
  <v-spacer />
  <v-list class="py-0" color="transparent" rounded>
    <v-list-item to="/about" router exact>Documentation</v-list-item>
    <v-list-item to="/about" router exact>About</v-list-item>
    <v-list-item to="/about" router exact>Contact</v-list-item>
  </v-list>
</v-app-bar>
```

Just by adding these 4 properties to the `v-app-bar` component (elevate-on-scroll, hide-on-scroll, scroll-threshold="250", shrink-on-scroll), we have a navigation bar that passes most test on functionality.

The biggest issue is that, if we are not in the hero area, and try to scroll up so that that the nav reappears, it is still transparent and thus not readable. In my project, the hero was dark but the rest of the section were light so my light text got lost in the background and was unreadable.

To fix this, we need to change the background color of `v-app-bar` when we have scrolled past the hero image section. Unfortunately, this is where the functionality of `v-app-bar` falls short.

## Using Vue directives in Nuxt

If you didn't already know, there is no default `v-on:scroll` directive in Vue. It must be added as a [custom directive](https://vuejs.org/v2/cookbook/creating-custom-scroll-directives.html). This is documented well enough but, since I'm using [Nuxt.js](https://nuxtjs.org/) for these projects, it's not as simple as adding this code to the Vue component. To use Vue custom directives with Nuxt, the simplest way is to add them as a Nuxt plugin.

## Using Plugins in Nuxt

Nuxt makes it easy to add some custom code and call it a plugin. In the `Plugins` folder, add a new file name `directives.js`. In this file, we are going to import Vue and add the boilerplate code provided in the custom scroll directives link.

```javascript
import Vue from 'vue'

Vue.directive('scroll', {
  inserted: function(el, binding) {
    let f = function(evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})
```

Then, in `nuxt.config.js`, add the plugin path to the `plugins` object:

```javascript
/*
** Plugins to load before mounting the App
*/
plugins: [
    '~/plugins/directives',
],
```

This will make the directive globally available to Vue components as a `v-scroll` prop you can add.

## Setting Up the v-app-bar Component

All we need to do now is set up the `v-app-bar` component to use `v-scroll`.

In `layouts/default.vue`:

```html
<v-app-bar
  app
  :color="navBelowFold ? 'primary' : 'transparent'"
  dark
  elevate-on-scroll
  id="nav"
  hide-on-scroll
  ref="nav"
  scroll-threshold="250"
  shrink-on-scroll
  tile
  v-scroll="handleScroll"
>
  <a id="brand" href="/">
    <v-toolbar-title
      class="align-self-center py-0 black--text"
      :class="{'pl-5': $breakpoint.mdAndUp, 'pl-0': $breakpoint.smAndDown}"
    >
      Brand
    </v-toolbar-title>
  </a>
  <v-spacer />
  <v-list class="py-0" color="transparent" rounded>
    <v-list-item to="/about" router exact>Documentation</v-list-item>
    <v-list-item to="/about" router exact>About</v-list-item>
    <v-list-item to="/about" router exact>Contact</v-list-item>
  </v-list>
</v-app-bar>
```

```javascript
export default {
  data() {
    return {
      navBelowFold: false
    }
  },
  methods: {
    handleScroll: function(event) {
      if (window.pageYOffset > 150) {
        this.navBelowFold = true
        console.log('Nav is below fold')
      } else {
        this.navBelowFold = false
        console.log('Nav is above fold')
      }
    }
  }
}
```

On `v-app-bar` are adding a ref property so that we can work with this element in the script section of the component.

We are also adding a v-bind shorthand (:) to the color property with a ternary conditional checking the value of `navBelowFold` which then sets the solid color(`primary`) if `true` and `transparent` if `false`.

Finally, we are adding the `v-scroll` prop set to the method we want to call, `handleScroll`

In the script section, we have the initial declaration of the reactive boolean `navBelowFold` with toggles the color in `v-app-bar` in the template.

We also have the method declaration of `handleScroll` which is called by the `v-scroll` directive on `v-app-bar`.

The `handleScroll` method is passed the scroll event from the `v-scroll` directive and does a conditional check of the `pageYOffset` value of the browser window which sets `navBelowFold` to `true` when below the fold and `false` when above the fold.

All this together, should allow `v-app-bar` to have a solid background outside of the hero area and a transparent background in the hero section. You can easily adjust the scroll offset to suit you specific section heights as well.

## Transitioning the background color

The final and simplest part of this process is making sure there is a smooth transition for the background color change.

To do this simply set a CSS transition on the `v-app-bar` component.

```css
<style>
 #nav.v-app-bar {
    .v-toolbar--prominent {
        .v-toolbar__content {
            transition: background-color 0.5s cubic-bezier(1, 0, 0, 1);
        }
    }
 }
</style>
```
