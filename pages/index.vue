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
            I'm a
            <span>Web Developer</span>
          </p>
          <p>
            I'm good at creating
            <span>User Interfaces</span> &amp;
            <span>Experiences</span>
          </p>
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
  padding: 0 1rem;

  section#hero {
    p {
      position: relative;
      z-index: 1;
    }

    p:first-child {
      font-size: 2rem;

      span {
        color: #f57c00;
      }
    }

    p:nth-of-type(2) {
      font-size: 1.75rem;

      span {
        color: #1976d2;
      }
    }

    p:nth-of-type(3) {
      font-size: 1.5rem;

      span:first-child {
        color: #00796b;
      }

      span:last-child {
        color: #791a00;
      }
    }

    p.background-text {
      background: none;
      color: #ddd;
      font-size: 20rem;
      position: absolute;
      top: -120px;
      left: 5vw;
      z-index: 0;
    }
  }
}

@media screen and (min-width: 768px) {
  main {
    section#hero {
      padding: 4rem 0;

      p:first-child {
        font-size: 3.5rem;
      }

      p:nth-of-type(2) {
        font-size: 3rem;
      }

      p:nth-of-type(3) {
        font-size: 2.5rem;
      }

      p.background-text {
        font-size: 30rem;
        top: -150px;
        left: 5vw;
        z-index: 0;
      }
    }
  }
}
</style>
