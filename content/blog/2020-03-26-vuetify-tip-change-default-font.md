---
date: 2020-03-26T13:55:19.299Z
title: Vuetify Tip&#58; Change Default Font
description: Configure Custom Fonts with Vuetify
thumbnail: /images/vuetify.svg
hero: /images/vuetify.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

I've written briefly about [Vuetify](https://vuetifyjs.com/) before which is a great UI component library for Vue with an official module for Nuxt. Vuetify is an amazing library that allows you to quickly bootstrap a new project but locks you in to several defaults that can be tricky to figure out how to change.

One thing I change on most sites is the font used. Typography is integral in web development. A good understanding of typography and its uses can separate an amateurish look from a professional one.

Based on the Material Design specification, Vuetify uses the [Roboto font](https://fonts.google.com/?query=roboto) which is a great standard but definitely doesn't work for all use cases.

## Overriding Vuetify Typography Classes (The Quick and Dirty Way)

If you just need to use a font in a few places or for specific elements, you can simply override the classes Vuetify uses by making your specificity greater than Vuetify's classes.

For example, everything in a Vuetify app is wrapped in a `v-application` element. If you wanted to override an `h1` element to use a different font (ex. `Playfair Display`) you could write a CSS class like this:

```css
.v-application h1 {
  font-family: 'Playfair Display', serif;
}
```

However, one of Vuetify's benefits is it's Bootstrap-like class system which has specific classes for typography that come in very handy. Again, if you have only a few use cases, you could just override the class but, if you want to change all headings or body text, you will need to use the method described below.

## Changing the Default Font (The Quick and Best Way)

Thankfully, this method isn't that difficult, it just isn't very clear in the documentation on how to achieve it.

This method will help you change the default font Vuetify uses by utilizing SASS variables. This method is specifically for those that use Nuxt but can be adapted for vanilla Vue users as well.

First, we need to create a `variables.scss` file in the `Assets` folder. If you don't already have an `Assets` folder, you can simply create it. Inside the `variables.scss` folder, we will set the heading and body font families to our custom fonts:

```scss
$body-font-family: 'Open-Sans';
$heading-font-family: 'Playfair Display';

@import '~vuetify/src/styles/styles.sass';
```

Notice, we are importing styles from Vuetify's source in the `node-modules` folder.

`$heading-font-family` is the variable used for all headings in Vuetify and `$body-font-family` is the variable for all other fonts that are not headings.

(Note: if you have not already imported your fonts, you will need to do so for this to work. I generally import Google Fonts as a style script in the head section but you method may differ depending on if you are using download files or a CDN. In Nuxt, this is done in the config file [using the `head` property](https://nuxtjs.org/api/configuration-head/).)

Now, we just need to reference this file in `nuxt.config.js` inside the Vuetify property.

```javascript
vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          ...
        }
      }
    }
  },
```

Notice `treeShake` is set to `true` which is required for the use of [custom variables](https://webpack.js.org/guides/tree-shaking/) with the Vuetify module.

You will need to restart you dev environment for the changes to take effect.

## Conclusion

At this point, the custom fonts should be reflected in the app and you can freely use Vuetify typography classes with these fonts. Vuetify provides some powerful tools to quickly create an app and, combined with a few tweaks, can be extended in functionality. Typography is integral to modern web development and font choices are key.

This setup actually allows you to change any SASS variables used in Vuetify in the `variables.scss` file. A full list of these variables can be found [here](https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/styles/settings).

Resources:

- [Nuxt Vuetify Module](https://github.com/nuxt-community/vuetify-module)
- [Custom Variables](https://github.com/nuxt-community/vuetify-module#customvariables)
- [TreeShake](https://github.com/nuxt-community/vuetify-module#treeshake)
