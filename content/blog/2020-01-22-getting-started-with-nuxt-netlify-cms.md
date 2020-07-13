---
date: 2020-01-22T18:47:34.235Z
title: Getting Started With Nuxt + Netlify CMS
description: Quickly spin up a headless CMS
thumbnail: /images/nuxt-netlify-cms-starter-thumb.svg
hero: /images/nuxt-netlify-cms-starter.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Recently, I wanted to add a CMS functionality to my website to blog and post personal projects. I originally had the idea to develop it from scratch using a combination of AdonisJS for the API and Axios to fetch data client-side. It took a week or two and I had myself a CMS from the ground up but I found myself reaching for things I hadn't included in my rudimentary design.

Sometimes you just want to get a static site with a CMS and dashboard up and running fast. That's why I developed this Nuxt Netlify CMS starter kit.

Built with using [Nuxt](https://nuxtjs.org/guide/), you can easily start building a static site right away. It starts pre-configured for user auth and a basic blog module. A Vuex store with modules is also available to use. Nuxt lets you create pages which enables automatic routing even dynamic routes that need parameters.

Nuxt comes pre-configured but is highly configurable via \`nuxt.config.js\` and its [official and community modules](https://github.com/nuxt-community/awesome-nuxt#modules).

With Nuxt alone you can build an impressive site quickly and [Netlify CMS ](https://www.netlifycms.org/)allows you to easily add content to the blog module.

Netlify CMS provides a user-friendly interface for creating and editing content. It also integrates nicely with git and services like Github and Gitlab allowing it to become part of your workflow.

This project can be deployed to [Netlify](https://www.netlify.com/) with one click and local development is as easy as `yarn install` and `yarn dev`.

[One click deploy to Netlify](https://app.netlify.com/start/deploy?repository=https://github.com/jbratcher/nuxt-netlify-cms-starter-kit)
