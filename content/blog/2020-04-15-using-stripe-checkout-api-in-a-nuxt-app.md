---
date: 2020-04-15T23:34:09.128Z
title: Using Stripe Checkout API In A Nuxt App
description: Easy setup using CDN and Vue Mixins
thumbnail: /images/nuxt-stripe.svg
hero: /images/nuxt-stripe.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

[Repo for this post](https://github.com/jbratcher/stripe-client-only-checkout)

A recent project of mine needed a quick solution for payment collection and I decided to use [Stripe](https://stripe.com/)'s API since it provides an easy way to set this up. This project is using [Nuxt](https://nuxtjs.org) with [Netlify](https://www.netlify.com/) for CI/CD and hosting which I've come to really enjoy using to develop over the last few months. If you aren't familiar with Netlfiy, it will allow you to host a static Nuxt website that can be git pushed to deployment. I just write the code and push it to my Github repo and Netlify builds, generates, deploys, and hosts the site.

Netlify does offer Lamda Functions with AWS but I haven't used them much and knew that Stripe's API is developer friendly enough simply to load via CDN.

Since this is a static site, we won't be able to use Stripe Checkout's session but we will be using a Stripe hosted page that is designed to make sales as easy for the user. Checkout will allow us to redirect the user back to our site after the purchase is either completed or cancelled.

### Getting Started

To use Stripe, you will need to [sign up](https://dashboard.stripe.com/register) with them and activate your account. The sign up require some information but is painless and quick to complete.

Once your Stripe account is activated, you can [enable Checkout from the dashboard](https://stripe.com/docs/payments/checkout/client#enable-checkout).

Go ahead and change to test mode for development. This can can be done by toggling the 'View Test Data' button on the Stripe Dashboard.

Next, create a product and and allow it to be used with Checkout. New products can be created from the Dashboard under Products.

When you click 'Use With Checkout`, a dialog will open with a copy/paste template to be used on an html page. We won't need this as we are using a modified version of this method.

Copy the generated sku from the item listing. The sku will be used by the checkout method in the Vue mixin and component.

### Loading Stripe via CDN

We are using the Stripe CDN for simplicity's sake but you can also locally [install Stripe via npm](https://www.npmjs.com/package/stripe).

In `nuxt.config.js`:

```javascript
export default {
    head: {
        ...,
        script: [
            {
                src: 'https://js.stripe.com/v3',
                defer: true
            }
        ]
    }
}
```

Normally, we would only load a 3rd party script on the specific pages that would use it to reduce unnecessary page load but Stripe recommends loading the script on every page ['to best leverage Stripe's advanced fraud functionality'](https://stripe.com/docs/js/including).

We are setting defer to true to prevent the script from blocking the render of the page.

### Create the Vue Mixin for the Checkout method

Vue mixins are good for reducing code redundancy as they just need to be imported into the component. Using this workflow allows you to set the arguments for the mixin method inside the component to enhance reusability.

First, create a file named `stripeCheckoutMixin.js` in the `mixins` folder. If you don't already have a `mixins` folder, you can create it at the top level of your project.

In `stripeCheckoutMixin.js`:

```javascript
export default {
  methods: {
    checkout: function(event) {
      this.stripe
        .redirectToCheckout({
          items: [{ sku: this.sku, quantity: 1 }],
          // Todo: handle fullfillment
          // https://stripe.com/docs/payments/checkout/fulfillment
          successUrl: this.successUrl,
          cancelUrl: this.cancelUrl
        })
        .then(function(result) {
          if (result.error) {
            var displayError = document.getElementById('error-message')
            displayError.textContent = result.error.message
          }
        })
    }
  },
  mounted() {
    this.stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY)
  }
}
```

Basically, we are passing some options in an object that represent the item we created previously and urls to redirect to after finishing.

The stripe data variable is being set in the mounted function to ensure it stays around during page refresh of the component. If otherwise set outside this hook, Stripe() will not be found on page refresh.

The stripe documentation explains the [redirectToCheckout](https://stripe.com/docs/js/checkout/redirect_to_checkout) method fully.

### Using environment variables in Nuxt

(You can find your stripe publishable key from your Stripe Dashboard home page via 'Get your test API keys')

To easily access `process.env.STRIPE_PUBISHABLE_KEY`, I'm using the dotenv package for Nuxt, @nuxtjs/dotenv.

`npm install --save-dev @nuxtjs/dotenv`

Register the module in the build modules section of `nuxt.config.js`:

```javascript
export default {
    ...,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: ['@nuxtjs/dotenv'],
}
```

This module allows you easily access variables from your `.env` file without exposing them publicly. Make sure you include your `.env` file in your `.gitignore` file to prevent these from being tracked by your repo.

Back in `stripeCheckoutMixin.js`:

```javascript
export default {
    ...,
    mounted() {
        this.stripe = Stripe(process.env.STRIPE_PUBLISHABLE_KEY)
    }
}
```

Here we are using the dotenv package to access the variable with the standard pattern of `process.env.ENV_VARIABLE_NAME`. In this case, Caps are used to represent a constant.

### Adding a Purchase Button to the Component

To redirect to the checkout from our product page, we will add a purchase button with a click handler.

```javascript
<template>
  <button
    @click="checkout"
    role="link">
        Purchase this package
    </button>
</template>
```

```javascript
<script>
    import 'stripeCheckoutMixin' from './mixins/stripeCheckoutMixin'
    export default {
        mixins: [stripeCheckoutMixin],
        data: () => {
            sku: 'sku_from_stripe_dashboard_product_listing',
            successUrl: '/item-purchase/success',
            cancelUrl: '/item-purchase/cancel'
        })
    }
</script>
```

Here we are adding a click event to the button and setting it's role to link since we are linking to an external url at stripe to complete the process.

In the script section, the mixin is being imported and registered with the Vue component.

In the data section, each argument to be passed to the checkout method (in the mixin) is set for the item.

Using this set up, when the purchase button is clicked, the user is redirected from our page to the stripe checkout page. The checkout page is populated with the product info and provides a section to easily gather the user payment info and process the payment.

### Conclusion

This serves as a quick and painless way to set up payment processing for a product being served on a static site using Nuxt.

This script can be easily modified to add more items or more checkout options.

Stripe documentation refers to this set up as a [client-only integration](https://stripe.com/docs/payments/checkout/client) and provides a step-by-step walk-through. You can read that page for more information on how Stripe Checkout works. My method is adapted from this page for use with Nuxt.
