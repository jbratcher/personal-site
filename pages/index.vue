<template>
  <v-layout>
    <v-flex>
      <main>
        <!-- Hero Section -->
        <section class="container" id="hero">
          <p>
            My name is
            <span>Jeremy</span>
          </p>
          <p>
            I am a
            <span>Web Developer</span>
          </p>
          <p class="sub-heading">Let me help you with your next project</p>
          <p class="background-text">Hi,</p>
        </section>
      </main>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'

export default {
  components: {
    Logo
  },
  head() {
    return {
      script: [
        { src: 'https://identity.netlify.com/v1/netlify-identity-widget.js' }
      ]
    }
  }
}
</script>

<style lang="scss">
main {
  background: #eee;
  position: relative;

  section#hero {
    padding: 4rem 0;

    p {
      font-size: 3rem;
      position: relative;
      z-index: 1;
    }

    p:first-child {
      span {
        color: #f57c00;
      }
    }

    p:nth-of-type(2) {
      span {
        color: #1976d2;
      }
    }

    p.sub-heading {
      font-size: 3rem;
    }

    p.background-text {
      background: none;
      color: #ddd;
      font-size: 35rem;
      position: absolute;
      top: -200px;
      left: 30vw;
      z-index: 0;
    }
  }
}
</style>
