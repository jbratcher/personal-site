---
date: 2020-05-12T12:30:18.204Z
title: Adonis Nuxt Starter
description: Bootstrap your next app with Adonis and Nuxt
thumbnail: /images/adonis-nuxt-starter.svg
hero: /images/adonis-nuxt-starter.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

While choosing the architecture for a recent project, I wanted to explore creating a full-stack JavaScript app since MEAN stack offers a lot of advantages when it comes to easily bootstrapping an app and making it scalable. [Adonis](https://adonisjs.com/), a NodeJS MVC framework, has long been a favorite of mine porting Laravel-like development from PHP to JavaScript. Adonis has a focus on the server side so combining it with a UI focused framework like [Nuxt](https://nuxtjs.org/) can make for an excellent pairing.

In previous project, I had decided to split the backend from the frontend by placing each app in its respective `server` and `client` folders while keeping them in the same Github repository. This works well for separation of concerns on a directory level but does come with some challenges during building and deployment. For example, I found myself hosting the server on Heroku and the client on Github Pages. Since both of these services by default expect your application in the root directory, there does have to be some additional often complicated configuration for this setup to work. Because of this, I wanted to see if combining both apps together in the same root directory would work better.

There was an official(?) starter project for Nuxt that used Adonis but it is now [deprecated](https://github.com/nuxt-community/adonuxt-template). Strangely enough, Adonis is even listed as an option in the using the Nuxt CLI when creating a new Nuxt app although the "None" option is labeled as recommended.

So, I whipped up (in a few hours) a good base configuration for the 2 apps meshed into a single root directory.

Everything tested works fine and I haven't run into any issues yet.

This repo isn't exactly a bare starter, either. It includes user authorization and authentication allowing users to register, login, and logout. Users are also associated with the example resource in a 'has many' fashion. The example resource can serve as template for how to structure database migrations and controllers as well as using vuex to handle data.

This is a work in progress and will see updates and refinements as I learn more.

[Link to the repo](https://github.com/jbratcher/Adonis-Nuxt-Starter)
