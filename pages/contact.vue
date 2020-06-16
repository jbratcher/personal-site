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
          label="Name"
          outlined
          name="name"
          required
          :rules="nameRules"
        ></v-text-field>
        <v-text-field
          v-model="email"
          label="E-mail"
          outlined
          name="email"
          required
          :rules="emailRules"
        ></v-text-field>
        <v-textarea
          v-model="message"
          label="Your Message"
          outlined
          name="message"
          required
          :rules="messageRules"
        ></v-textarea>
        <v-container class="d-flex justify-end" fluid>
          <v-btn
            @click="reset"
            class="mr-4"
            color="primary lighten-1"
            name="reset"
            >Reset</v-btn
          >
          <v-btn
            color="teal"
            dark
            :disabled="!valid"
            name="submit"
            type="submit"
            >Submit</v-btn
          >
        </v-container>
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
