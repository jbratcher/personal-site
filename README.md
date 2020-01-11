# Personal Website

This is the code for my 2020 personal website.

You can see it live at [jeremybratcher.com](https://jeremybratcher.com/contact)

This is a static site generate by Nuxt and host by Netlify.  I use Netlify CMS on the backend to manage blog posts and portfolio items.  The contact form is also tied to Netlify to handle form submissions.

Built on top of [Nuxt Netlify CMS Starter Kit](https://github.com/jbratcher/nuxt-netlify-cms-starter-kit)

#### Note:

Not that long ago, I rebuilt my 2 year old site from a static page and rolled my own CMS using Laravel for the API and Vue for the frontend.  At the time, I wanted to build my own CMS for Laravel for the experience.  While I did indeed create a working CMS and dashboard to manage blog posts and other resources, I found that the imperfections in my own system made it painful to consistently update the site thus I found a more simple method to fit my needs.

## Getting Started

1. Clone the repository locally and cd into the directory.

```bash
git clone https://github.com/jbratcher/personal-site

cd nuxt-netlify-cms-starter
```

2. Install dependencies.

```bash
yarn install
```

3. Run the project for local dev. This will start a hot-reloading server at `localhost:3000`.

```bash
yarn dev
```

4. Build the app for server-side rendered deployment. See more about **Universal SSR** in the [Nuxt.js docs](https://nuxtjs.org/guide#server-rendered-universal-ssr-).

```bash
yarn build

# And to serve that deployment...
yarn start
```

5. Generate a fully pre-rendered static site. See more [in the docs](https://nuxtjs.org/guide#static-generated-pre-rendering-).

```bash
yarn generate
```

> This project was bootstrapped with `create-nuxt-app`. There are more detailed explanations of how everything works in the [Nuxt.js docs](https://nuxtjs.org).

## Activating Netlify CMS

This project comes with Netlify CMS ready to rumble, and a basic blog configuration. To use Netlify CMS:

### Authenticating with Netlify Identity

1. Deploy to Netlify at least once.
2. Go to **Settings > Identity**, and select **Enable Identity service**.
3. Once enabled, select **Settings and usage**, and scroll down to **Registration preferences**. You can set this to either **Open** or **Invite only**, but usually **Invite only** is your best bet for a personal site.
4. If you don't want to create an account, or would like to use an external provider such as GitHub or Google, you can enable those services under **External providers**.
5. Scroll down to **Services** and click **Enable Git Gateway**.

### Local Setup

1. In your browser, navigate to `localhost:3000/admin`.
2. Enter the Netlify URL of your site when prompted.
3. Login with the account you created or one of the external providers, if you enabled them.

#### To change netlify deploy url, run localStorage.removeItem("netlifySiteURL") in the browser console. This needs to be done if you previously used this method for another Netlify site.

### Use Netlify CMS Dashboard

You can access the admin panel by going ot '/admin' from your Netlify url


