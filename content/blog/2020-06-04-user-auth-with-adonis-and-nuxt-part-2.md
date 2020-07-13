---
date: 2020-06-04T13:14:05.756Z
title: User Auth with Adonis and Nuxt, Part 2
description: Account verification
thumbnail: /images/adonis-nuxt-starter.svg
hero: /images/adonis-nuxt-starter.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Last time we set up a basic user authentication workflow that allowed us to register, login, and logout users and sync the state data between the server and client.

[Previous post](https://www.jeremybratcher.com/blog/2020-05-27-user-auth-with-adonis-and-nuxt)

Next, we will be building upon this functionality with the following:

- Allowing newly registered users to verify their accounts
- Allowing users to reset a forgotten password
- Allowing users to update their profile information and change their password

### Extending the base user functionality

Even the most basic user management workflow still needs to do things like sign-up verification like sending an email to the register user's email address that contains a link to click to verify the new account.

Users will inevitably need a forgot password action as well as the ability to reset a password.

It may not always be necessary but this starter project does include a light profile management ability as well.

### Account Verification

Verifying a newly registered users account via email is a common practice and [has many benefits](https://ux.stackexchange.com/questions/111005/what-is-the-point-of-email-verification). Adonis and it's official modules make this task easy to implement.

Adonis Persona sets the `account_status` of the user to `pending` upon registration and also emits a `user::created` event which we can target to generate a verification email to send to the user.

#### Configuring the email provider

Setting up an email provider for small projects can be a challenge especially when it's hard to find a free provider. Luckily, Gmail now offers the ability to use your [gmail address as an SMTP mail server](https://support.google.com/a/answer/176600?hl=en). You can send around 500 emails per day for free with this service with is perfect for development and testing.

We are using the [Adonis Mail module](https://adonisjs.com/docs/4.1/mail) which needs to be installed.

`npm install @adonisjs/mail`

Then register the mail provider in `start/app.js`

```javascript
const providers = ['@adonisjs/mail/providers/MailProvider']
```

Adonis Mail uses SMTP by default which is what we need. We do need to configure it to use Gmail.

In `config/mail.js`, change the `smtp` options to the following:

```javascript
smtp: {
    driver: "smtp",
    pool: true,
    port: Env.get("SMTP_PORT", 2525),
    host: Env.get("SMTP_HOST"),
    secure: true,
    auth: {
      user: Env.get("MAIL_USERNAME"),
      pass: Env.get("MAIL_PASSWORD")
    },
    maxConnections: 5,
    maxMessages: 100,
    rateLimit: 10
  },
```

`secure: true` is needed for the connection to work.

Here is an example `.env` with the mail ENV variables:

```javascript
MAIL_CONNECTION=smtp  // redundant since default
SMTP_PORT=465  // gmail port
SMTP_HOST=smtp.gmail.com  // gmail host
MAIL_USERNAME=yourname@gmail.com  // gmail email address
MAIL_PASSWORD=Y0urPa$$word  // gmail password
```

You may also need to [change your app access](https://myaccount.google.com/lesssecureapps) for your Google account to be able to send mail from a local development server. If you don't want to do this on your main account, you can always register a new gmail address for this.

#### Sending Mail To New Users

Now that the mail provider is configured, we can email new users a account verification link with their token.

[Adonis Events](https://adonisjs.com/docs/4.1/events) is installed with Adonis but we will need to create an `events.js` file in the start folder.

In `start/events.js`:

```javascript
const querystring = require('querystring')
const Env = use('Env')
const Event = use('Event')
const Mail = use('Mail')

// on new user registration, send email verification link
Event.on('user::created', async payload => {
  const user = payload.user.toJSON()
  const token = querystring.encode({
    token: payload.token
  })

  await Mail.send('new.user', { user, token }, message => {
    message
      .to(payload.user.email)
      .from(`<${Env.get('MAIL_USERNAME')}>`)
      .subject('Thanks for registering!')
  })
})
```

Here we are defining a new event to trigger when the `user::created` event is fired. Persona automatically fires a `user::created` event when Persona.register() from the User controller is called.

Persona.register() returns an object containing the user and token which will be modified then passed to the edge template for the email.

The user object will need to be converted to JSON to user in the email template. This is done with the `.toJSON()` method.

The email token is generated during registration by Adonis Persona. This token can be included in a link in the email which authenticates the user when verifying their account. `querystring`, a Node.js method, is used to properly encode the generated token for use in a url. This is necessary because the generated token can contain characters (like slashes) that won't be [read correctly in a url](https://forum.adonisjs.com/t/adonis-persona-verifyemail-400-error-the-token-is-invalid-or-expired/6466).

##### Creating the email template

In the `resources` folder create a folder `new`.

Inside `new`, create a file `user.edge`.

Now, we can reference the template as `new.user`.

Let's create the email template.

In `user.edge`:

```javascript
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>New User Registration</title>
</head>
<body>
  <section>
      <p>
        Welcome, {{ user.full_name }}. Thanks for registering. Please click the link below to verify your email and activate your account.
      </p>
    <a href="http://localhost:3000/users/verify-email?{{token}}">Verify your email</a>
  </section>
</body>
</html>
```

This basic example just welcomes the user by name and displays a link containing their token to verify their email. The link should trigger a request to the server (see the `verifyEmailWithToken` method in `store/index.js`)

Let's look at the `verifyEmailWithToken` method.

In `store/index.js`:

```javascript
export const actions = {
  // verify a newly created user's account from an email token link
  async verifyEmailWithToken({ commit }, token) {
    await this.$axios
      .$get(`/auth/verify-email?token=${token}`)
      .then(response => console.log(response))
      .catch(e => console.log(e))
  }
}
```

This method makes a get request with the token to the User Controller method `verifyEmail`. This method will use the token to verify the user using `Persona.verifyEmail()`.

In `app/Controllers/UserController.js`

```javascript
// verify a new user's account by token
async verifyEmail({ request, params, session, response }) {
  const token = request.input("token");
  const user = await Persona.verifyEmail(token);
  session.flash({ message: "Email verified" });
  return user;
}
```

`request.input("token")` is used since the token is being passed as a query param in the url.

`Persona.verifyEmail(token)` will change the user's `account_status` from `pending` to `active` and remove the email token from the tokens table.

Now the user's account has been properly activated.

### Conclusion

I'm going to split the rest of the functions into their own post since they are long and detailed. Up next week will be how to implement a forgot password and password reset functionality. After that, we will wrap up the series with how to allow uses to edit their profiles and change their password.
