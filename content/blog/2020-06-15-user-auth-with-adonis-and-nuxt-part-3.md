---
date: 2020-06-15T13:16:13.364Z
title: User Auth with Adonis and Nuxt, Part 3
description: Forgot Password / Password Reset
thumbnail: /images/adonis-nuxt-starter.svg
hero: /images/adonis-nuxt-starter.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Last time, we set up a way for registered users to verify their accounts via email. This post will cover the related functionality that allows a user to reset their password via a 'forgot password' request.

[Previous Post](https://www.jeremybratcher.com/blog/2020-06-04-user-auth-with-adonis-and-nuxt-part-2)

The workflow will be similar to the registration of a new user in that they will be sent an email with a link to reset their password.

To start we will create a page in the `users` folder named `forgot-password.vue`.

`pages/users/forgot-password.vue`

```html
<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-8 col-md-5 py-12">
        <!-- Forgot Password Form -->
        <v-card class="pa-6" elevation="6">
          <v-card-title
            :class="{
              'headline mb-6': $breakpoint.mdAndUp,
              'title mb-4': $breakpoint.smAndDown
            }"
          >
            Reset Your Password
          </v-card-title>

          <v-card-subtitle :class="$breakpoint.mdAndUp ? 'mb-6' : 'mb-4'">
            Enter your email and we will send you a password reset link
          </v-card-subtitle>

          <v-card-text class="pb-0">
            <v-form v-model="valid">
              <v-text-field
                v-model="email"
                label="Email"
                :rules="emailRules"
                outlined
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0 px-4">
            <v-btn @click="reset" dark width="fit-content">
              <v-icon class="mr-3">{{ forgotIcon }}</v-icon>Send link
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert :value="Boolean(error)" type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
```

```html
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { mdiLockQuestion } from '@mdi/js'
  import formRulesMixin from '../../mixins/formRulesMixin'
  export default {
    mixins: [formRulesMixin],
    data: () => ({
      forgotIcon: mdiLockQuestion,
      email: '',
      error: null,
      valid: true
    }),
    methods: {
      ...mapActions(['forgotPasswordLink']),
      async reset() {
        this.forgotPasswordLink(this.email)
        this.$toast
          .info(`A password reset link has been emailed to you`)
          .goAway(3000)
      }
    }
  }
</script>
```

This page will have an input for the user's email and a button to request a forgot password email.

Once the user enters their email and clicks the submit button, the request is sent to the User controller with the email coded as the `uid` in the URL.

In the User controller `Persona.forgotPassword()` is called passing the email as the `uid`. This method does several things as outlined in the [Adonis Persona documentation](https://github.com/adonisjs/adonis-persona#forgotpassworduid)

- Finds a user with the matching uid.
- Generates a password change token.
- Emits the forgot::password event. You can listen for this event to send an email with the token to reset the password.

`App/Controllers/UserController.js`

```javascript
class UserController {
  // send forgot password email with token link
  async forgotPassword({ request }) {
    return await Persona.forgotPassword(request.input('uid'))
  }
}
```

Persona is doing the heavy lifting here in verifying that the user exists in the `users` table, creating a token to verify the password change request, and firing an even which we will use to send the email to the user.

## Email Template

The email should provide basic information about the request and a link to the password reset page that contains the password reset token.

`resources/views/forgot/password.edge`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Reset Request</title>
  </head>
  <body>
    <section>
      <p>Password Reset Request</p>
      <p>
        Hi, {{ user.full_name }}.
      </p>
      <p>
        This email was sent because you requested a password reset. Please
        follow the link below to reset your password.
      </p>
      <a href="http://localhost:3000/users/password-reset?{{token}}"
        >Reset Your Password</a
      >
    </section>
  </body>
</html>
```

## Forgot Password Event

The triggered event should use the mail provider to send the filled in email template to the user.

`start/events.js`

```javascript
// on forgot password, send email reset link
Event.on('forgot::password', async payload => {
  const user = payload.user.toJSON()
  const token = querystring.encode({
    token: payload.token
  })

  await Mail.send('forgot.password', { user, token }, message => {
    message
      .to(payload.user.email)
      .from(`<${Env.get('MAIL_USERNAME')}>`)
      .subject('Password Reset Request')
  })
})
```

This event is basically the same as the event we use to send a newly registered user their account verification email except we are targeting the `forgot::password` event.

Once the user receives the email and clicks the link, it will redirect them to the password reset page using the token as verification. The user is asked to enter a new password, confirm it, and finally click the submit button to update their password.

`pages/users/password-reset/_token.vue`

```html
<template>
  <!-- update password -->
  <v-container class="pa-0">
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-8 col-md-5 py-12">
        <!-- Forgot Password Form -->
        <v-card class="pa-6" elevation="6">
          <v-card-title
            :class="{
              'headline mb-6': $breakpoint.mdAndUp,
              'title mb-4': $breakpoint.smAndDown
            }"
          >
            Change Your Password
          </v-card-title>

          <v-card-subtitle :class="$breakpoint.mdAndUp ? 'mb-6' : 'mb-4'">
            Enter your new password
          </v-card-subtitle>

          <v-card-text class="pb-0">
            <v-form v-model="valid">
              <v-text-field
                v-model="updatePassword.password"
                outlined
                placeholder="New Password"
                :rules="shortTextRules"
                type="password"
                autocomplete="new-password"
              />

              <v-text-field
                v-model="updatePassword.password_confirmation"
                outlined
                placeholder="New Password"
                :rules="shortTextRules"
                type="password"
              />
            </v-form>
          </v-card-text>

          <v-card-actions class="pt-0 px-4">
            <v-btn
              @click="updatePasswordByTokenClient"
              dark
              width="fit-content"
            >
              <v-icon class="mr-3">{{ keyIcon }}</v-icon>Change Password
            </v-btn>
          </v-card-actions>
        </v-card>
        <v-alert :value="Boolean(error)" type="error">{{ error }}</v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>
```

```html
<script>
  import { mapState, mapMutations, mapActions } from 'vuex'
  import { mdiAccountKey } from '@mdi/js'
  import formRulesMixin from '../../../mixins/formRulesMixin'
  export default {
    mixins: [formRulesMixin],
    data: () => ({
      error: null,
      keyIcon: mdiAccountKey,
      updatePassword: {
        password: '',
        password_confirmation: ''
      },
      valid: true
    }),
    methods: {
      ...mapActions(['updateUserPasswordByToken']),
      updatePasswordByTokenClient() {
        this.updateUserPasswordByToken({
          updatePassword: this.updatePassword,
          token: Object.values(this.$route.query)[0]
        })
      }
    }
  }
</script>
```

The `password` and `password-confirmation` fields as well as the token are sent to the User controller where Persona.updatePasswordByToken() is called.

Persona.updatedPasswordByToken() does a few things:

- Makes sure the token is valid and not expired.
- Ensures the password is confirmed.
- Updates the user's password.

Next time, we will wrap up the user module by allowing the user to edit their profile, update their email, and update their password as a logged in user.
