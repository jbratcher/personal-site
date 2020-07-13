---
date: 2020-06-25T17:49:49.490Z
title: User Auth with Adonis and Nuxt, Part 4 (Final)
description: Profile Editing / Change Email / Change Password
thumbnail: /images/adonis-nuxt-starter.svg
hero: /images/adonis-nuxt-starter.svg
author:
  name: Jeremy Bratcher
  img: /images/pwa-install.png
---

Last time, we set up a common, useful feature allowing the user to request a password reset and complete a password change. Today, we will be wrapping up this series on user authentication and authorization. The final features that will finish this project are the ability to edit the user's profile, change their email, and change their password.

[Previous Post](https://www.jeremybratcher.com/blog/2020-06-15-user-auth-with-adonis-and-nuxt-part-3)

## Table of Contents

- [Profile editing](#profile_editing)
  - [Creating the profile layout](#creating_the_profile_page_layout)
  - [Creating the profile view](#creating_the_profile_view)
    - [Adding the edit menu](#adding_the_edit_menu)
    - [Finishing the user profile view](#finishing_the_user_profile_view)
    - [Breaking down the profile view](#breaking_down_the_profile_view)
    - [Updating the user profile](#updating_the_user_profile)
    - [Updating the user profile image](#updating_the_user_profile_image)
- [Change email](#change_email)
- [Change password](#change_password)

The code from this series is part of my ongoing project [Adonis Nuxt Starter](https://github.com/jbratcher/Adonis-Nuxt-Starter)

## Profile editing <a name = "profile_editing"></a>

The first step we want to take is to create a view for the user's profile.

Right now, we have the user's data object available in the global context as `$auth.user`. We want to create a new page that will render some of the user's information like name and email to a profile page.

But before we do that, we need to create a different layout for the profile page that will give the user a handy menu to edit their profile. To do this, will create a new layout called `profile` to use on the profile page instead of the `default` layout.

### Creating the profile page layout <a name="creating_the_profile_page_layout"></a>

Create a new file in the layouts folder named `profile.vue`.

`layouts/profile.vue`

```html
<template>
  <v-app>
    <!-- Header Area -->
    <!-- Main Nav -->
    <v-app-bar app elevate-on-scroll>
      <v-app-bar-nav-icon
        class="hidden-md-and-up"
        @click.stop="mainMenu = !mainMenu"
        name="menu-open"
        x-large
      >
        <i aria-hidden="true" class="v-icon notranslate theme--dark">
          <v-icon>{{ mainMenuIcon }}</v-icon>
        </i>
      </v-app-bar-nav-icon>
      <MenuLinks
        :general-links="generalLinks"
        :logged-out-links="loggedOutLinks"
        list-class="d-md-flex justify-end hidden-md-and-down ml-auto"
        list-item-class="mx-1"
      />
      <!-- User Actions Nav (Dropdown) -->
      <v-menu v-model="profileMenu" bottom offset-y>
        <template v-slot:activator="{ on }">
          <v-app-bar-nav-icon
            v-on="on"
            @click.stop="profileMenu = !profileMenu"
            class="hidden-md-and-up ml-auto"
            name="profile-edit"
            x-large
          >
            <i aria-hidden="true" class="v-icon notranslate theme--dark">
              <v-icon>{{ profileMenuIcon }}</v-icon>
            </i>
          </v-app-bar-nav-icon>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            @click="item.action"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
          <v-divider />
          <v-list-item @click="logout">
            <v-list-item-title>Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <!-- side/mobile navigation -->
    <v-navigation-drawer
      v-model="mainMenu"
      app
      disable-resize-watcher
      fixed
      right
    >
      <MenuLinks
        :general-links="generalLinks"
        :logged-out-links="loggedOutLinks"
        list-class="d-flex flex-column my-6 mx-3"
        list-item-class="my-3"
        listItemTitleClass="title"
      />
    </v-navigation-drawer>
    <!-- Nuxt content -->
    <v-main>
      <nuxt />
    </v-main>
    <!-- Footer Area -->
    <v-footer>
      <v-row justify="center">
        <v-col class="py-4 text-center">
          {{ new Date().getFullYear() }} — <strong>Adonis Nuxt Starter</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'
  import {
    mdiAccount,
    mdiAccountPlus,
    mdiEmailEdit,
    mdiFormatListBulletedSquare,
    mdiKey,
    mdiLogin,
    mdiMenu,
    mdiPlusCircle,
    mdiTune
  } from '@mdi/js'
  import MenuLinks from '../components/MenuLinks'
  export default {
    name: 'Profile',
    components: {
      MenuLinks
    },
    data() {
      return {
        editEmailMode: false,
        editPasswordMode: false,
        editProfileMode: false,
        generalLinks: [
          {
            icon: mdiFormatListBulletedSquare,
            title: 'Resources',
            to: '/resources'
          },
          {
            icon: mdiPlusCircle,
            title: 'Create',
            to: '/resources/create'
          }
        ],
        loggedOutLinks: [
          {
            icon: mdiLogin,
            title: 'Login',
            to: '/login'
          },
          {
            icon: mdiAccountPlus,
            title: 'Register',
            to: '/register'
          }
        ],
        items: [
          {
            action: this.toggleEditProfileMode,
            icon: mdiAccount,
            title: 'Edit Profile'
          },
          {
            action: this.toggleEditEmailMode,
            icon: mdiEmailEdit,
            title: 'Change Email'
          },
          {
            action: this.toggleEditPasswordMode,
            icon: mdiKey,
            title: 'Change Password'
          }
        ],
        mainMenu: false,
        mainMenuIcon: mdiMenu,
        profileMenu: false,
        profileMenuIcon: mdiTune
      }
    },
    methods: {
      ...mapMutations([
        'toggleEditEmailMode',
        'toggleEditPasswordMode',
        'toggleEditProfileMode'
      ]),
      async logout() {
        await this.$auth.logout()
        this.$toast.success('Logged you out').goAway(2000)
      }
    }
  }
</script>
```

This layout moves the main menu to the left side and introduces a profile options menu on the right side. The menu contains links to edit the profile, the email, and the password as well as a logout link. We are using the `mdiTune` icon which signifies edit functions.

You may also notice the imported Vuex mutations in the methods section. These simply toggle the edit mode when the links are clicked.

`store/index.js`

```javascript
export const state = () => ({
  editEmailMode: false,
  editPasswordMode: false,
  editProfileMode: false
});
...
export const mutations = {
...
toggleEditEmailMode(state) {
    state.editEmailMode = !state.editEmailMode;
    state.editPasswordMode = false;
    state.editProfileMode = false;
  },
  toggleEditPasswordMode(state) {
    state.editEmailMode = false;
    state.editPasswordMode = !state.editPasswordMode;
    state.editProfileMode = false;
  },
  toggleEditProfileMode(state) {
    state.editEmailMode = false;
    state.editPasswordMode = false;
    state.editProfileMode = !state.editProfileMode;
  }
}
...
```

Notice that in addition to the edit state being toggled the other edit states are turned off to prevent more than one edit form being open at one time.

### Creating the Profile View <a name="creating_the_profile_view"></a>

In the `pages/users` folder, we want to create a dynamic route `_id.vue` which we will finish shortly.

#### Adding the edit menu <a name="adding_the_edit_menu"></a>

We will then, create a conditionally rendered link in the header that only displays when the user is logged in. This is done using `v-if-"isAuthenticated`. `isAuthenticated` is a Vuex getter that simply checks if the user is logged in.

This link will point to `_id.vue` with the user's id being passed as the dynamic portion of the URL.

The link is displayed using the user's profile image for a visual cue that this links to their profile page.

In `MenuLinks.vue`:

```html
<template>
  ...
  <!-- User Profile Link -->
  <v-list-item
    v-if="isAuthenticated"
    class="mb-0"
    :class="$breakpoint.mdAndUp ? '' : 'mt-3'"
    exact
    router
    :to="`/users/${this.$auth.user.id}`"
  >
    <v-avatar size="36">
      <images alt="Avatar" :src="this.$auth.user.profile_image_source" />
    </v-avatar>
  </v-list-item>
  ...
</template>

<script>
  ...
  computed: {
      ...mapGetters(["isAuthenticated"])
    },
  ...
</script>
```

#### Finishing the user profile view <a name="finishing_the_user_profile_view"></a>

Now, let's finish our `_id.vue` component.

```html
<template>
  <v-container class="pa-0" fill-height fluid>
    <v-row class="full-height" justify="center">
      <!-- User menu navigation -->
      <v-col
        cols="12"
        class="py-0 col-md-3"
        :class="$breakpoint.mdAndUp ? '' : 'px-0'"
      >
        <v-container class="d-flex flex-column align-center">
          <!-- User Avatar -->
          <v-avatar>
            <v-img :src="this.$auth.user.profile_image_source" />
          </v-avatar>

          <!-- User display info -->

          <p
            class="pt-3 mb-2"
            :class="$breakpoint.mdAndUp ? 'title' : 'display-1'"
          >
            {{ this.$auth.user.full_name }}
          </p>
          <p
            class="font-regular mb-0"
            :class="$breakpoint.mdAndUp ? 'subtitle-2' : 'title'"
          >
            {{ this.$auth.user.email }}
          </p>
        </v-container>
      </v-col>

      <!-- User display content -->
      <v-col v-if="editEmailMode || editPasswordMode || editProfileMode">
        <!-- Edit Fields -->
        <v-card
          class="mx-auto"
          color="transparent"
          flat
          :width="$breakpoint.mdAndUp ? '50%' : '80vw'"
        >
          <!-- edit profile fields -->
          <template v-if="editProfileMode">
            <v-text-field
              :value="this.$auth.user.first_name"
              :counter="50"
              :rules="nameRules"
              @input="setUserFirstName($event)"
              label="First Name"
              outlined
            />

            <v-text-field
              :value="this.$auth.user.last_name"
              :counter="50"
              :rules="nameRules"
              @input="setUserLastName($event)"
              label="Last Name"
              outlined
            />

            <v-file-input
              v-model="userProfileImage"
              :rules="profileImageRules"
              prepend-icon=""
              :prepend-inner-icon="cameraIcon"
              accept="image/png, image/jpeg, image/bmp"
              clearable
              clear-icon
              placeholder="Update your profile picture"
              show-size
              label="Profile Picture"
              outlined
            />
          </template>

          <!-- change password fields -->
          <template v-if="editPasswordMode">
            <v-text-field
              v-model="updatePassword.old_password"
              label="Old password"
              placeholder="Old Password"
              type="password"
              autocomplete="new-password"
              outlined
            />

            <v-text-field
              v-model="updatePassword.password"
              label="New Password"
              placeholder="New Password"
              type="password"
              autocomplete="new-password"
              outlined
            />

            <v-text-field
              v-model="updatePassword.password_confirmation"
              label="Confirm New Password"
              placeholder="Retype New Password"
              type="password"
              autocomplete="new-password"
              outlined
            />
          </template>

          <template v-if="editEmailMode">
            <p class="body-2">Current email: {{ this.$auth.user.email }}</p>
            <v-text-field
              v-model="updateEmail"
              :rules="emailRules"
              label="New Email"
              outlined
            />
          </template>
        </v-card>

        <!-- Edit Profile Action Buttons -->
        <v-container v-if="editProfileMode" class="pa-0">
          <v-row justify="center" align="center">
            <v-col class="d-flex justify-center">
              <!-- Cancel Profile Edit -->
              <v-btn
                @click="toggleEditProfileMode"
                :color="editEmailMode ? 'warning' : 'secondary'"
                class="body-2 mr-3"
                outlined
              >
                Cancel
                <v-icon class="ml-2"
                  >{{ editProfileMode ? accountEditCancelIcon : accountEditIcon
                  }}</v-icon
                >
              </v-btn>
              <!-- Update Event -->
              <v-btn @click="updateUserProfileClient" color="primary darken-2">
                Save
                <v-icon>{{ contentSaveIcon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Change Password Action Buttons -->
        <v-container v-if="editPasswordMode" class="pa-0">
          <v-row justify="center" align="center">
            <v-col class="d-flex justify-center">
              <!-- Edit/Cancel Change Password -->
              <v-btn
                @click="toggleEditPasswordMode"
                :color="editPasswordMode ? 'warning' : 'secondary'"
                class="body-2 mr-3"
                outlined
              >
                Cancel
                <v-icon class="ml-2"
                  >{{ editPasswordMode ? cancelIcon : accountLockIcon }}</v-icon
                >
              </v-btn>
              <!-- Update Event -->
              <v-btn @click="updateUserPasswordClient" color="primary darken-2">
                Save
                <v-icon>{{ contentSaveIcon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>

        <!-- Change Email Action Buttons -->
        <v-container v-if="editEmailMode" class="pa-0">
          <v-row justify="center" align="center">
            <v-col class="d-flex justify-center">
              <!-- Edit/Cancel Change Email -->
              <v-btn
                @click="toggleEditEmailMode"
                :color="editEmailMode ? 'warning' : 'secondary'"
                class="body-2 mr-3"
                outlined
              >
                Cancel
                <v-icon class="ml-2"
                  >{{ editEmailMode ? cancelIcon : emailEditIcon }}</v-icon
                >
              </v-btn>
              <!-- Update Event -->
              <v-btn @click="updateUserEmailClient" color="primary darken-2">
                Save
                <v-icon>{{ contentSaveIcon }}</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
      <!-- End Main -->
    </v-row>
  </v-container>
</template>

<script>
  import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
  import {
    mdiAccount,
    mdiAccountCancel,
    mdiAccountEdit,
    mdiAccountKey,
    mdiAccountLock,
    mdiCamera,
    mdiCancel,
    mdiContentSave,
    mdiEmailEdit,
    mdiKey
  } from '@mdi/js'
  import formRulesMixin from '../../mixins/formRulesMixin'
  export default {
    layout: 'profile',
    mixins: [formRulesMixin],
    data() {
      return {
        accountEditIcon: mdiAccountEdit,
        accountEditCancelIcon: mdiAccountCancel,
        accountLockIcon: mdiAccountLock,
        cameraIcon: mdiCamera,
        cancelIcon: mdiCancel,
        contentSaveIcon: mdiContentSave,
        emailEditIcon: mdiEmailEdit,
        updateEmail: '',
        updatePassword: {
          old_password: '',
          password: '',
          password_confirmation: ''
        },
        userProfileImage: null,
        valid: true
      }
    },
    computed: {
      ...mapGetters(['isAuthenticated', 'loggedInUser']),
      ...mapState(['editEmailMode', 'editPasswordMode', 'editProfileMode']),
      ...mapState('resource', ['userResources'])
    },
    mounted() {
      this.fetchResourcesByUser()
    },
    methods: {
      ...mapActions([
        'updateUserProfile',
        'updateUserPassword',
        'updateUserEmail'
      ]),
      ...mapActions('resource', ['fetchResourcesByUser']),
      titleCase(string) {
        return titleCase(string)
      },
      ...mapMutations([
        'setEditEmailMode',
        'setEditPasswordMode',
        'setEditProfileMode',
        'setUserFirstName',
        'setUserLastName',
        'toggleEditEmailMode',
        'toggleEditPasswordMode',
        'toggleEditProfileMode'
      ]),
      updateUserEmailClient() {
        this.updateUserEmail({ email: this.updateEmail })
        this.setEditEmailMode(false)
      },
      updateUserProfileClient() {
        this.updateUserProfile({
          user: this.$auth.user,
          profileImage: this.userProfileImage
        })
        this.setEditProfileMode(false)
      },
      updateUserPasswordClient() {
        this.updateUserPassword(this.updatePassword)
        this.setEditPasswordMode(false)
      }
    }
  }
</script>

<style lang="scss">
  .profile-card {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 auto;
    width: 80vw;

    p:first-of-type {
      font-size: 1.5rem;
      font-weight: 500;
      margin: 1rem 0 0.75rem;
    }

    p {
      font-size: 1.25rem;
      font-weight: 300;
    }
  }

  .profile-edit-button {
    top: 0;
    right: -15px;
  }

  .profile-save-button {
    top: 0;
    right: -60px;
  }

  @media screen and (min-width: 768px) {
    .profile-card {
      width: 50vw;
    }
  }
</style>
```

#### Breaking down the profile view <a name="breaking_down_the_profile_view"></a>

There is a lot going on here so let's step through it.

First, in the template, we are creating a basic user profile display showing the user's profile image, full name and email.

Next, each edit form is listed to be conditionally displayed when the edit mode for that function is set to true. The edit mode will be toggled by clicking the link in the profile options menu at the top right of the screen.

Each of these forms contain the fields that need to be completed for an edit to occur. The profile edit form is an exception from this as all it's fields are optional.

When these forms are open, a cancel and save button will appear for the user to either abort the edit or save the changes.

The user can edit their first and last names and profile image in the profile edit form. The Nuxt auth user object is used to set the value of each field dynamically. When an input event occurs a Vuex mutation is called and passed the event. For example, when the first name field is edited the `setUserFirstName` mutation is called and passed the entered string as `$event`. This will in turn update the user's first name in the `auth.user` object.

> In plain JavaScript you may be used to getting the event value with `event.target.value` however in Vue the value is contained in `$event`.

`store/index.js`

```javascript
...
export const mutations = {
  ...
  setUserFirstName(state, first_name) {
    state.auth.user.first_name = first_name;
  },
  setUserLastName(state, last_name) {
    state.auth.user.last_name = last_name;
  },
  ...
}
...
```

The profile image is more complicated as we are allowing the user to upload a new file. We are using Vuetify's v-file-input component to do this which will set the local state variable `userProfileImage` to the image object. `userProfileImage` will be passed with the `auth.user` object to a Vuex action to update this information server side.

#### Updating the user profile <a name="updating_the_user_profile"></a>

Once the user has changed the profile edit fields to their liking, the save button can be clicked to call the `updateUserProfileClient` method.

```javascript
updateUserProfileClient() {
  this.updateUserProfile({
    user: this.$auth.user,
    profileImage: this.userProfileImage,
  });
  this.setEditProfileMode(false);
},
```

Here we are passing the updated info to Vuex to send to the server and setting the edit mode to false which closes the form.

`store/index.js`

```javascript
export const actions = {
  // update a user's edited profile
  async updateUserProfile({ commit, dispatch }, { user, profileImage }) {
    // add image to static folder before update user profile
    dispatch('updateProfilePic', profileImage)
    await this.$axios
      .$patch('/auth/update', user)
      .then(response => {
        this.$auth.setUser(response)
        this.$toast.success('Profile updated...').goAway(3000)
      })
      .catch(error => console.log(error))
  },

  // sync add new user photo to images folder and update user profile image source
  updateProfilePic({ commit }, profileImage) {
    // new images must be post to Adonis via form data through axios
    let formData = new FormData()
    formData.append('profileImage', profileImage)
    let url = '/auth/update/profile-pic'
    let config = {
      headers: {
        'content-type': 'multipart/form-data'
      }
    }
    this.$axios({
      method: 'post',
      url: url,
      data: formData,
      config: config
    })
      .then(response => {
        commit('setUserProfileImageSource', response.data.profile_image_source)
      })
      .catch(e => console.log(error))
  }
}
```

Let's look at the `updateUserProfile` function first. Since the `updateProfilePic` function is also an action in the same file, we must call it using Vuex's `dispatch` function. We'll go over this function in more depth shortly but, for now, suffice to say it sends the new image to the server for processing. We are sending a PATCH request to the server at `/auth/update` with the user object and profile image as the request payload.

This triggers the `update` method in the `UserController`, which is shown below.

```javascript
"use strict";
const Env = use("Env");
const Helpers = use("Helpers");
const Persona = use("Persona");
const User = use("App/Models/User");

class UserController {
  ...
  async update({ request, auth }) {
    const user = await auth.getUser();
    const payload = request.only(["first_name", "last_name"]);
    // create full name field
    payload.full_name = `${payload.first_name} ${payload.last_name}`;
    await Persona.updateProfile(user, payload);
    const updatedUser = await auth.getUser();
    return updatedUser;
  }
  ...
}
```

This method gets the current user and the request payload and uses it to update the user profile using the `Persona.updateProfile` method. Once updated, the updated user is fetched and sent as the response to the client.

Back in the Vuex action `updateUserProfile`, the response is used to update the user data on the client-side and display a Toast notification informing the user the profile has been updated.

#### Updating the user profile image <a name="updating_the_user_profile_image"></a>

Now, let's look at how the profile image is updated.

```javascript
// sync add new user photo to images folder and update user profile image source
  updateProfilePic({ commit }, profileImage) {
    // new images must be post to Adonis via form data through axios
    let formData = new FormData();
    formData.append("profileImage", profileImage);
    let url = "/auth/update/profile-pic";
    let config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    this.$axios({
      method: "post",
      url: url,
      data: formData,
      config: config,
    })
      .then((response) => {
        commit("setUserProfileImageSource", response.data.profile_image_source);
      })
      .catch((e) => console.log(error));
  },
```

Because we are uploading a file to the server, we need to use a [Form Data object](https://developer.mozilla.org/en-US/docs/Web/API/FormData/FormData) instead of a plain javascript object. This lets us append the file to the request using Axios options and send it to the server for use in the controller method.

This routes calls the `updateProfilePic` in the `UserController`.

```javascript
async updateProfilePic({ request, auth }) {
    const user = await auth.user;
    // create file from client upload
    const file = await request.file("profileImage");
    // if file is not null or undefined, move the image file to the static/images folder
    if (file) {
      // move the image to the public images folder and name with format `first-last-1.filetype` (ex. jeremy-bratcher-1.jpg) overwriting any images with the same name
      await file.move(Helpers.appRoot("public/images"), {
        name: `${user.first_name}-${user.last_name}-${user.id}.${file.subtype}`,
        overwrite: true,
      });
      // if the file wasn't able to be moved, respond to client with the error response
      if (!file.moved()) {
        return file.error();
      }
      // Update the image link in the user's image source column
      user.profile_image_source = `${Env.get("APP_URL")}/images/${
        user.first_name
      }-${user.last_name}-${user.id}.${file.subtype}`;
      user.save();
      return user;
    }
    // if there in no file, log message and return
    return "No file uploaded";
  }
```

In the controller method, we are moving the upload file to a public folder to display on the client-side. The user's information is used to create the file name. Then, the profile image source is updated in the user table for that user. Finally, the user data object is returned to the client to sync the new profile image source URL with the database. If there is an issue moving the file, an error is returned. If no file is uploaded, a console log statement is made reflecting that.

Once the response is received, we will use that to updated the profile image source.

You can learn more about file uploads and handling image files with Adonis at the links below.

[Updating the user profile image](https://forum.adonisjs.com/t/upload-image-using-axios-vue-js-adonisjs-rest/2594/10)

[Adonis File Uploads](https://adonisjs.com/docs/4.1/file-uploads)

That was a lot of work but we can now freely update the user profile information and profile image at will.

## Change Email <a name="change_email"></a>

Like the profile edit option, we have already seen the email form fields and this function works in a similar way. In addition to updating the email address when a change is made, we want to email the user to confirm this change to enhance the security of our app.

If we refer to the `_id.vue` page above, we can see that `v-model` is used on the email input to update the local variable `updateEmail`. When the save button is clicked, `updateEmail` is passed to `updateUserEmailClient` which calls a Vuex action and the email edit mode is set to `false`.

The related Vuex action `updateUserEmail` is called and will handle the axios call to the `UserController`.

`store/index.js`

```javascript
// update a user's email address with verification
  async updateUserEmail({ commit, dispatch }, updatedEmail) {
    await this.$axios
      .$patch("/auth/update/email", updatedEmail)
      .then(response => {
        this.$auth.setUser(response);
        this.$toast.success("Email updated...").goAway(3000);
      })
      .catch(error => {
        this.$toast
          .error(`Email update error: ${error.response.data[0].message}`)
          .goAway(5000);
      });
  },
```

`app/UserController`

```javascript
async updateEmail({ request, auth }) {
    const payload = request.only(["email"]);
    const user = await auth.user;
    const updatedUser = await Persona.updateProfile(user, payload);
    return updatedUser;
  }
```

Notice that `updateEmail` and `update` both use `Persona.updateProfile`. When `Persona.updateProfile` is used to update the email a few things happen.

- Sets the user's account_status = pending.
- Generates an email verification token.
- Fires the email::changed event.

Due to security risks involved in changing a user's email, the account status is set to pending, a verification token is generated, and an event is triggered.

We want to confirm with the user via email that they made this request and will use the token to verify the request.

Using the fired event, we will send an email in a similar fashion to the new user email.

`app/start/events.js`

```javascript
Event.on('email::changed', async payload => {
  const user = payload.user.toJSON()
  const token = querystring.encode({
    token: payload.token
  })

  await Mail.send('update.email', { host, token, user }, message => {
    message
      .to(payload.user.email)
      .from(`<${Env.get('MAIL_USERNAME')}>`)
      .subject('Email Change Confirmation')
  })
})
```

`resources/update/email.edge`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Email Updated</title>
  </head>
  <body>
    <section>
      <p>Email Change Request</p>
      <p>
        Hi, {{ user.full_name }}.
      </p>
      <p>
        This message is to notify you that your email has been updated on your
        account. To confirm this change, please click on the link below.
      </p>
      <a href="{{host}}/users/verify-email?{{token}}">Verify your new email</a>
    </section>
  </body>
</html>
```

This will send an email to the user's original email address to confirm the change. Note we are using the same link to verify this change as we used to verify the email of new users.

## Change Password <a name="change_password"></a>

Letting the user change their password during an authenticated session is a useful way to offer a password reset while they are already logged in. This is done in a similar manner to the change email function as it affects the security of the user's account.

Back in `_id.vue`, the password change inputs take the old password, the new password, and a confirmation of the new password. This is store in a local state object, `updatePassword` which is passed to `updateUserPasswordClient` when the form is saved. The related Vuex action is `updateUserPassword` which passes the object to the `UserController`

`store/index.js`

```javascript
// change password from user profile
  async updateUserPassword({ commit }, updatePassword) {
    await this.$axios
      .$patch("/auth/update/password", updatePassword)
      .then(response => {
        this.$toast.success("Password changed...").goAway(3000);
      })
      .catch(error => console.log(error));
  },
```

`app/Controllers/Http/UserController.js`

```javascript
async updatePassword({ request, auth }) {
  const payload = request.only([
    "old_password",
    "password",
    "password_confirmation",
  ]);
  const user = await auth.getUser();
  const updatedUser = await Persona.updatePassword(user, payload);
  return updatedUser;
}
```

`Persona.updatePassword` will fire an event `password::changed`. We will use this event to send a notification email to the user that their email has been changed. This is to prevent any unauthorized changes to the account when a hacker is trying to change the user's password to lock them out of the account.

`start/events.js`

```javascript
Event.on('password::changed', async payload => {
  const user = payload.user.toJSON()

  await Mail.send('update.password', { user }, message => {
    message
      .to(payload.user.email)
      .from(`<${Env.get('MAIL_USERNAME')}>`)
      .subject('Password Change Notifcation')
  })
})
```

`resources/update/password.edge`

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Password Change Request</title>
  </head>
  <body>
    <section>
      <p>Password Changed Confirmatioon</p>
      <p>
        Hi, {{ user.full_name }}.
      </p>
      <p>
        This message is to notify you that the password has been updated on your
        account. If this was you, no further action is needed.
      </p>
    </section>
  </body>
</html>
```

On the client-side, the response will trigger a Toast message indicating the user's password has been changed.

## Conclusion <a name="conclusion"></a>

Once these steps are completed, you should have full-functional and robust user module for your application. Most applications need user account management features so this will help for sure.

The code for this series is part of my ongoing project in developing a starter kit that uses Nuxt and Adonis. The link below will take you to that repo on Github.

[Adonis Nuxt Starter](https://github.com/jbratcher/Adonis-Nuxt-Starter)
