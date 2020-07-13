---
date: 2020-05-27T18:03:00.468Z
title: User Auth with Adonis and Nuxt
description: User registration and authentication workflow
thumbnail: /images/adonis-nuxt-starter.svg
hero: /images/adonis-nuxt-starter.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Recently, I've been developing a lot of projects with [AdonisJS](https://adonisjs.com/) and [Nuxt](https://nuxtjs.org/) so, of course, I've also been working on a starter project that I can just clone and get to work on without worrying about all the initial configuration every time I want to start a new project. My Adonis/Nuxt starter project is built as the base of a general RESTful web application.

The majority of these types of apps will at least need some basic user management functionality. Things like being able to authenticate, authorize, and manage users. Both Adonis and Nuxt provide modules that allow you to do all of these things but they aren't pre-installed or pre-configured for the most part.

[Github Repo For This Project](https://github.com/jbratcher/Adonis-Nuxt-Starter)

### User Management Workflow

Let's look at a typical user management workflow.

A user needs to be able to:

- register
- verify their account
- login
- manage their profile
- logout
- forgot password
- password reset

### Common Scenarios

Most use cases need the same basic functionality.

#### Registration

The user fills out and submits a web form. The user's details are used to create a user model instance which is stored in the users table.

#### Account Verification

Successful registration triggers an email being sent to the user that allows them to verify their account. The email will have a link that contains a token which is linked to the user. The link will redirect the user to a page passing the token as a query parameter. This token is matched against the user's email token in the database token table and is removed after changing the user status to active. Once the account is verified, the user can be authorized for certain permissions.

#### Login

Wen a user tries to login to the application, their credentials must be verified before we authenticate the user. The entered login credentials are matched against those store in the database. If the credentials match, the user is authenticated.

#### Profile Management

A logged in user should be able to view and/or edit their profile. Edits can be biographical information like name, location, or avatar.

#### Logout

A logged in user should be able to end their authenticated session by logging out. This should revoke any credential specific to the session that ended such as tokens.

#### Forgot Password

A user who has forgotten their password, should be able to submit a request to reset their password. A forgot password form should request the user's unique ID (uid) which can be their email, username, etc. The uid is matched a user in the users table and a token is created to verify the request. An email is then sent to the user with a password reset link containing the token.

#### Password Reset

When a user clicks a password reset link from their email, they should be redirected to a page to set up a new password. The token in the link will be matched against those in the tokens table to verify the request. The stored password will be updated to reflect the new password that is entered in the web form.

### Adonis Auth Provider

Adonis has a built in [authentication provider](https://adonisjs.com/docs/4.0/authentication#_basic_example) that provides a lot of helpful methods and an `auth` object we can pass to our controllers as an extension of the [HTTP Context object](https://adonisjs.com/docs/4.1/request-lifecycle#_http_context)

This starter project is pre-configured with [stateless authentication](https://dev.to/yos/stateless-authentication-with-json-web-tokens--km3) using JWT. Adonis has built-in support for [JWT authentication](https://adonisjs.com/docs/4.0/authentication#_jwt) and it is pre-installed on the full-stack version we using.

To configure Adonis to use JWT for authentication:

In `config/auth.js`:

```javascript
module.exports = {
  ...
  authenticator: "jwt",
  ...
  jwt: {
    serializer: "lucid",
    model: "App/Models/User",
    scheme: "jwt",
    uid: "email",
    password: "password",
    options: {
      secret: Env.get("APP_KEY")
    }
  },
}
```

### Adonis Persona

#### Overview

[Adonis Persona](https://github.com/adonisjs/adonis-persona) is a service that allows you to easily manage users. It is highly opinionated which is excellent for most use cases as the majority of user management workflows have similar requirements.

#### Install

We will also need to install [Adonis Validator](https://adonisjs.com/docs/4.1/validator) and [Adonis Mail](https://adonisjs.com/docs/4.1/mail) providers. Validator is helpful for validating user input and is required for Persona. Mail helps you configure mail servers, respond to events (like new user registration) and uses Edge templates.

`npm install @adonisjs/persona @adonisjs/validator`

#### Configure

Register the providers.

In `start/app.js`:

```javascript
const providers = [
  '@adonisjs/mail/providers/MailProvider',
  '@adonisjs/persona/providers/PersonaProvider',
  '@adonisjs/validator/providers/ValidatorProvider'
]
```

Persona requires the `User` and `Token` models to have a relationship set up. By default, the `User` model is already set up correctly but you will need to add a relationship to the `Token` model.

In `app/Models/Token.js`:

```javascript
class Token extends Model {
  user() {
    return this.belongsTo('App/Models/User')
  }
}
```

Persona also requires the `users` table to have a string column named `account_status`. This should be added to your user migration file.

```javascript
class UserSchema extends Schema {
  up() {
    this.create("users", table => {
      ...
      table.string("account_status");
      ...
    });
  }
```

Re-run the user migration to process the changes to the table if it has already been migrated previously.

#### Auth routes

In `start/routes.js`:

```javascript
// Auth
Route.get('/auth/user', 'UserController.getCurrentUser')
Route.post('/auth/login', 'UserController.login')
Route.post('auth/logout', 'UserController.logout')
Route.post('/auth/register', 'UserController.register')
```

Note that all routes except register match the Nuxt auth endpoints.

#### Controller Methods

In the User Controller, we will define the methods we used in our routes file.

In `app/Controllers/Http/UserController.js`:

```javascript
'use strict'

const Persona = use('Persona')
const User = use('App/Models/User')

class UserController {
  async getCurrentUser({ auth }) {
    const user = await auth.getUser()
    const token = await auth.getAuthHeader()
    return user
  }

  async login({ request, auth, response }) {
    const payload = request.only(['uid', 'password'])
    const user = await Persona.verify(payload)
    return await auth.generate(user)
  }

  async logout({ auth }) {
    const user = await auth.getUser()
    const token = await auth.getAuthHeader()
    await user
      .tokens()
      .where('token', token)
      .update({ is_revoked: true })
    return user
  }

  async register({ request, auth, response }) {
    const payload = request.only([
      'email',
      'first_name',
      'last_name',
      'password',
      'password_confirmation'
    ])
    const { first_name, last_name } = payload
    payload.full_name = `${first_name} ${last_name}`
    payload.profile_image_source = `https://ui-avatars.com/api/?name=${first_name}+${last_name}`
    const user = await Persona.register(payload)
    return await auth.generate(user)
  }
}
```

`getCurrentUser` is simply returning the current user and ensuring an authentication token exists. This is used in the client to sync the current user data object.

`login` validates the user's unique ID and password using Persona and returns a token to the client allowing a sync in authentication. The method assumes a unique ID and password are being sent through user input as a request object.

`logout` is similar to `getCurrentUser` except it also revokes the current user's token then returns the user to sync data with the client.

`register` uses Persona to create a new user. It expects user input for the fields listed to be sent as a request object. It then transforms the first and last names into the full name and sets a default profile image for the user(this part is can be rmov). Finally, it generates and returns a user token.

### Nuxt Auth Module

#### Getting Started

The [auth module for Nuxt](https://auth.nuxtjs.org/), which bills itself as "zero-configuration", allows you to have client-side authentication which can be synced with the server-side.

Install the Nuxt auth module.

`npm install @nuxtjs/auth`

Register the module and set the endpoints in `nuxt.config.js`:

```javascript
export default {
  ...
  modules: [
    "@nuxtjs/auth",
  ],
}
/*
** Nuxtjs auth module
*/
auth: {
  strategies: {
    local: {
      endpoints: {
        login: {
          url: "/auth/login",
          method: "post",
          propertyName: "token"
        },
        logout: {
          url: "/auth/logout",
          method: "post",
          propertyName: "token"
        },
        user: { url: "/auth/user", method: "get", propertyName: false }
      }
      // tokenRequired: true,
      // tokenType: 'bearer',
      // globalToken: true,
      // autoFetchUser: true
    }
  },
  token: {
    prefix: "token"
  }
},
```

Note that I have modified this somewhat from the example in the documentation. Property names were giving me issues when used for the user endpoint so setting it to `false` fixed this issue while still syncing the user data object. The token prefix solved an issue where the token wasn't being updated in Vuex.

###### Registering this module automatically creates an `auth` module that contains client-side data. Since we are extending the `auth` module, you may be tempted to create a Vuex store module named `auth`. Unfortunately, this may throw a console error that the `auth` namespace is already registered but otherwise work fine. To avoid this error, I have instead put all custom auth methods and properties in the main Vuex store (store/index.js).

In `store/index.js`:

```javascript
export const getters = {
  isAuthenticated(state) {
    console.log(`Checking user authentication...`)
    return state.auth.loggedIn
  },

  loggedInUser(state) {
    console.log(`Fetching current user info...`)
    return state.auth.user
  }
}
```

#### User Actions

Since the `login` and `register` methods are only used once each on their respective components, they will live in components script instead of the Vuex store.

I created a `Login.vue` and `Register.vue` at the top level of the `pages` folder.

`logout` is configured in `nuxt.config.js` as described below.

Note that I'm using [Vuetify](https://vuetifyjs.com/en/) for UI components.

##### Login

In `Login.vue`:

```html
<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-9 col-md-6 py-12">
        <!-- User Login Form -->
        <h1
          :class="{
            'display-1 mb-12': $breakpoint.mdAndUp,
            'headline mb-9': $breakpoint.smAndDown
          }"
        >
          Login
        </h1>

        <v-text-field
          v-model="email"
          label="Email"
          placeholder="Email"
          :rules="emailRules"
        />
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Password"
          :rules="shortTextRules"
          type="password"
          autocomplete="new-password"
        />
        <v-alert
          border="left"
          close-text="Close"
          color="warning"
          dark
          dismissible
          :value="Boolean(loginErrorMessage)"
          type="error"
          >{{ loginErrorMessage }}</v-alert
        >
        <v-btn @click="login" dark width="fit-content">
          <v-icon class="mr-3">{{ loginIcon }}</v-icon>Login
        </v-btn>
        <v-btn class="body-2 my-6 mr-auto px-0" to="/users/forgot-password" text
          >Forgot Password?</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
```

```javascript
<script>
import { mapMutations } from "vuex";
import { mdiLogin } from "@mdi/js";
import formRulesMixin from "../mixins/formRulesMixin";
export default {
  mixins: [formRulesMixin],
  data: () => ({
    loginIcon: mdiLogin,
    email: "",
    password: "",
    loginErrorMessage: ""
  }),
  methods: {
    async login() {
      await this.$auth
        .loginWith("local", {
          data: {
            uid: this.email,
            password: this.password
          }
        })
        .then(response => {
          this.$auth.setToken("local", "Bearer " + response.data.token);
          this.$router.replace("/");
        })
        .catch(error => {
          const errorMessage = error.response.data[0].message;
          this.loginErrorMessage = errorMessage;
        });
    }
  }
};
</script>
```

In the template, we have input fields for the unqiue ID (uid) and the password which are local data. Clicking the button calls the `login` method which uses the [`loginWith` method](https://auth.nuxtjs.org/api/auth.html#loginwith-strategyname-args) from the Nuxt auth API. This project uses email as the uid but you can add as many others as you need such as 'username'.

`loginWith` passes the email as the uid and the password to the User Controller via the `login` endpoint set in `nuxt.config.js`. The login method in the User Controller generate and returns a token which is used in the response to set the token client-side. A caught error will set the `loginErrorMessage` local data property which is displayed as an alert on the page.

After logging in the user should be authenticated both client- and server-side.

##### Register

In `Register.vue`:

```html
<template>
  <v-container>
    <v-row>
      <v-col class="d-flex flex-column mx-auto col-9 col-md-6 py-12">
        <!-- User Sign Up Form -->
        <h1
          :class="{
            'display-1 mb-12': $breakpoint.mdAndUp,
            'headline mb-9': $breakpoint.smAndDown
          }"
        >
          Register
        </h1>

        <v-text-field
          v-model="first_name"
          label="First Name"
          placeholder="First Name"
        />
        <v-text-field
          v-model="last_name"
          label="Last Name"
          placeholder="Last Name"
        />
        <v-text-field v-model="email" label="Email" placeholder="Email" />
        <v-text-field
          v-model="password"
          label="Password"
          placeholder="Password"
          type="password"
          autocomplete="new-password"
        />
        <v-text-field
          v-model="password_confirmation"
          label="Confirm Password"
          placeholder="Confirm Password"
          type="password"
          autocomplete="new-password"
        />
        <v-alert v-model="error" type="error">{{ errorMessage }}</v-alert>
        <v-btn @click="register" dark width="fit-content">
          <v-icon class="mr-3">{{ accountPlusIcon }}</v-icon>Register
        </v-btn>
        <v-btn class="body-2 my-6 mr-auto px-0" to="/login" text
          >Already registered?</v-btn
        >
      </v-col>
    </v-row>
  </v-container>
</template>
```

```javascript
<script>
import { mdiAccountPlus } from "@mdi/js";
export default {
  data() {
    return {
      accountPlusIcon: mdiAccountPlus,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password_confirmation: "",
      error: false,
      errorMessage: ""
    };
  },
  methods: {
    register() {
      try {
        const newUser = {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          first_name: this.first_name,
          last_name: this.last_name
        };

        this.$axios
          .post("/auth/register", newUser)
          .then(response => {
            this.login();
          })
          .catch(error => console.log(`Register/login error: ${error}`));
      } catch (e) {
        this.error = true;
        this.errorMessage = e.response.data[0].message;
      }
    },
    login() {
      this.$auth
        .loginWith("local", {
          data: {
            uid: this.email,
            password: this.password
          }
        })
        .then(response => {
          this.$auth.setToken("local", "Bearer " + response.data.token);
          this.$router.replace("/");
        })
        .catch(error => console.log(`Login Error: ${error}`));
    }
  }
};
</script>
```

The register component is similar to the login component as it is a set of local data fields and a button to submit the data to the User controller. It uses several fields to create the user profile and then logins in the user once successfully registered.

##### Logout

`logout` is only defined in the auth object of `nuxt.config.js` on the client-side. We will conditionally display a logout link in the global navigation, that will send a request to the User Controller and call the logout method.

This step would complete the minimal viable user module. At this point you can register new users, authenticate them on login and revoke that authentication on logout.

### Next Steps

We went through quite a bit of material here so I'll save the rest for next time.

Next week, we will diving into extending this base functionality to create a more full-featured user module adding features like sending newly registered users email with account verification links, password resets, and user profile edits.
