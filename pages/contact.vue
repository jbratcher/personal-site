<template>
  <main>
    <!-- Contact Section -->
    <v-container class="my-12 mx-auto">
      <h2 class="display-1 text-center">
        I'm currently
        <span class="teal--text">open</span> to new projects
      </h2>
      <p class="headline text-center my-6 mb-12">Drop me a line!</p>
      <v-form
        id="contact-form"
        ref="form"
        v-model="valid"
        name="contact"
        method="post"
        value="contactform"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        lazy-validation
      >
        <input type="hidden" name="form-name" value="contact" />
        <v-text-field
          v-model="name"
          :rules="nameRules"
          label="Name"
          name="name"
          required
        ></v-text-field>
        <v-text-field
          v-model="email"
          :rules="emailRules"
          label="E-mail"
          name="email"
          required
        ></v-text-field>
        <v-textarea
          v-model="message"
          :rules="messageRules"
          label="Your Message"
          name="message"
          required
        ></v-textarea>
        <v-btn
          class="mr-4"
          name="reset"
          color="primary lighten-1"
          @click="reset"
          >Reset</v-btn
        >
        <v-btn
          type="submit"
          name="submit"
          :disabled="!valid"
          color="primary"
          class="mr-4"
          >Submit</v-btn
        >
      </v-form>
    </v-container>
  </main>
</template>

<script>
export default {
  name: 'Contact',
  head() {
    return {
      title: `Contact | Jeremy Bratcher | Web Developer | Louisville, KY`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `Contact Jeremy Bratcher, a web developer in Louisville, KY`
        }
      ]
    }
  },
  data: () => ({
    sliderModel: null,
    valid: true,
    name: '',
    nameRules: [v => !!v || 'Name is required'],
    email: '',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    message: '',
    messageRules: [
      v => !!v || 'Message is required',
      v =>
        (v && v.length <= 1000) ||
        'Your message must be less than 1000 characters. Please email us at company@email.com'
    ]
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
      this.$refs.form.resetValidation()
    }
  }
}
</script>

<style lang="scss">
#contact-form {
  margin: 4rem auto;
  width: 80vw;
}

@media screen and (min-width: 960px) {
  #contact-form {
    width: 40vw;
  }
}
</style>
