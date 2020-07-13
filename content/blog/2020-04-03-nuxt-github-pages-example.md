---
date: 2020-04-03T18:00:36.704Z
title: Nuxt Github Pages Example
description: Avoiding common pitfalls like 404 errors
thumbnail: /images/nuxt-github-pages.svg
hero: /images/nuxt-github-pages.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Github Pages is an easy, integrated way to host a Github project with Nuxt. However, there are some common configuration pitfalls you want to avoid due to how Github Pages and Nuxt work.

The Nuxt documentation has a [pretty decent guide](https://nuxtjs.org/faq/github-pages/) on how to your Nuxt app up and running on Github Pages but it does seem to neglect a few issues that I ran into with a recent project update. These issues crop up if you are using SSR ('universal' mode).

> If you refresh any page but the home page, you get a 404.

This drove me crazy for awhile as I couldn't find a straight answer. Most answers I found in Nuxt Github issues stated this was due to the base route not being configured correctly for Github Pages but I had made sure that was not the case.

Before we get into that let's go through the normal process and get the app up and running on Github Pages.

## Getting Started

[Repo for this post](https://github.com/jbratcher/nuxt-github-pages-example)

To create a Nuxt app:

From the command line: `npx create-nuxt-app [app-name]`

Select the options you want and the app with be created for you.

`cd [app-name]` and `npm run dev`

This will get the app up and running in development mode. Now we will do some setup so that we can host the app on Github Pages.

## Github Pages Configuration

###### Note: if you haven't already, create a new github repo for the project and push the master branch.

###### After creating a new repo on Github, run these from the command line,

```bash
  git init
  git add .
  git commit -m "initial commit"
  git remote add origin [github-repo-url]
  git push -u origin master
```

Again, Nuxt has documentation on how to do the basic setup for Github Pages but it is lacking in some respects. Several of the following steps are outlined in the Nuxt documentation.

In `nuxt.config.js`:

```javascript
// only add `router.base = '/<repository-name>/'` if `DEPLOY_ENV` is `GH_PAGES`
const routerBase =
  process.env.DEPLOY_ENV === 'GH_PAGES'
    ? {
        router: {
          base: '/<repository-name>/'
        }
      }
    : {}

export default {
  ...routerBase
}
```

In `package.json`:

```javascript
"scripts": {
  "build:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "DEPLOY_ENV=GH_PAGES nuxt generate"
},
```

- Note: Windows users may need to install an npm package called cross-env `npm install cross-env --save-dev` Then prepend `cross-env` to the build and generate scripts:

```javascript
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
  "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate"
```

Create a local gh-pages branch by running `git checkout -b gh-pages` from the command line.

To create a static version of your app, you will need to run the `build` and `generate` commands sequentially.

```bash
  npm run build:gh-pages
  npm run generate:gh-pages
```

Then add and commit the new files.

```bash
  git add .
  git commit -m "deploy"
```

Since the `build` and `generate` commands create a static site in the dist folder, you will need to remove the dist folder from the .gitignore file and push only the dist folder to the gh-pages branch.

To push a sub folder to Github, from the command line:

```bash
git subtree push --prefix dist origin gh-pages
```

The git subtree command allows you to push a subfolder only. You can register this as a script in package.json for easy deployment.

In `package.json`

```javascript
  "deploy": "git subtree push --prefix dist origin gh-pages",
```

You can further abstract the deployment process by sequentially chaining the npm scripts into one command:

In `package.json`:

```javascript
"scripts": {
  "build:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt build",
    "generate:gh-pages": "cross-env DEPLOY_ENV=GH_PAGES nuxt generate",
    "deploy": "git subtree push --prefix dist origin gh-pages",
    "deploy:gh-pages": "npm run build:gh-pages && npm run generate:gh-pages && git add . && git commit -m \"deploy\" && npm run deploy"
}
```

- Note: make sure to enable Github Pages on your repo from the Settings page and ensure the source is the gh-pages branch. If you have already pushed the gh-pages branch to your repo, it should be automagically setup for you.

## 404 error when refreshing subpages

The biggest blunder that happens when you use this setup is that any pages besides the homepage will 404 if you refresh the page. This will quickly ruin your user experience.

For example, I created a basic About page by creating an `About.vue` file in the `pages` directory. This page is a basic vue component with only a template filled out.

`About.vue`

```html
<template>
  <h1>This is the about page</h1>
</template>

<script>
  export default {}
</script>

<style></style>
```

For simplicity sake, I also made a basic navigation in the `layouts/default.vue` file:

```javascript
<template>
  <div>
    <nav>
      <ul>
        <nuxt-link to="/">Home</nuxt-link>
        <nuxt-link to="/about">About</nuxt-link>
      </ul>
    </nav>
    <nuxt />
  </div>
</template>

<style>
...
</style>
```

Currently, on the hosted Github Pages version of the app, if you navigate to the About page it renders fine but, upon refresh, it 404's.

I'm not sure if this happens on other static hosting platforms but it definitely plagues Github Pages at least with Nuxt apps.

Thankfully, there is a super easy fix.

In `nuxt.config.js`:

```javascript
export default {
  generate: {
    fallback: true
  }
}
```

The [generate propery](https://nuxtjs.org/api/configuration-generate) in Nuxt config, configures _the generation of your universal web application to a static web application_. This configuration property helps set up how the static folder (dist by default) is generated.

Now, you can run your `build`, `generate` and `deploy` scripts and to push up this change and the pages will refresh as intended without a 404 error.

In all truth, I'm not exactly sure how this works. The property is specifically states it is for use in [customizing fallback pages](https://nuxtjs.org/api/configuration-generate#fallback) not for preventing pages from 404'ing.

I stumbled upon this solution in a [Nuxt Github issue](https://github.com/nuxt/nuxt.js/issues/6088) and it seems to work without fail. Curiously, the issue is about a SPA app with dynamic routes and this app is Universal and was failing on static routes. However, a fixed issues is a fixed issue.

Maybe, I'll open my own issue to see if I can gain some clarity from the Nuxt team.

So, that is it. Your Nuxt app should now be fully hosted without issue on Github Pages. Happy coding!

**_UPDATE_**

I did open an [issue](https://github.com/nuxt/nuxt.js/issues/7172) with Nuxt.js and got a quick response.

> This is intended. When generating pages, you have to tell your platform/web server (GitHub pages in your case) in case you want to handle 404 errors "through your own application". This is usually not wanted when building non-SPAs but highly recommended for SPAs (to avoid the mentioned reload - 404 - issue).
>
> When enabled, generate.fallback creates a 404.html which is essentially an SPA fallback page. GitHub pages picks it up automatically and redirects all "not found URLs" there.
>
> However, generated URLs (with mode: universal) should not need a redirect. In your case, the capitalization of About.vue is giving troubles here. Lowercasing it and it should work fine 👍🏻
>
> For the future, it might be an idea to unify pages, no matter how they are capitalized (e.g. About.vue should behave the same like about.vue or aBoUt.vue, as long as no drawbacks are present (cc @pi0).

It appears I fubar'd the file name by capitalizing it as it should actually be lowercased. A simple oversight and quick fix to be had!

Otherwise it appears as this behavior is intended as far as the 404 goes when using generate with web platforms such as Github Pages.
