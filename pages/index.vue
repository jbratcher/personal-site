<template>
  <v-layout>
    <v-flex>
      <main>
        <!-- Hero Section -->
        <section id="hero">
          <section class="container content-container">
            <p>
              My name is
              <span @mouseover="showProfilePic" @mouseleave="showProfilePic">Jeremy</span>
            </p>
            <transition
              name="custom-classes-transition"
              enter-active-class="animated pulse"
              leave-active-class="animated rubberBand"
            >
              <section v-if="profilePic" id="profile-pic">
                <v-avatar size="96">
                  <v-img
                    src="profile.jpg"
                    lazy-src="https://picsum.photos/id/11/10/6"
                    aspect-ratio="1"
                    cover
                  />
                </v-avatar>
              </section>
            </transition>
            <p>
              I'm a
              <span
                :class="{'pa-2 input-display': inputDisplay, 'pa-2 no-input': !inputDisplay}"
                @mouseover="toggleInputDisplay"
                @mouseout="toggleInputDisplay"
              >Web Developer</span>
            </p>
            <p>
              I'm good at creating
              <span
                @click="toggleHighlightPortfolioLink"
                @mouseover="toggleHighlightPortfolioLink"
                @mouseout="toggleHighlightPortfolioLink"
              >User Interfaces</span>
              &amp;
              <span
                @click="toggleShapeAnimation"
                @mouseover="toggleShapeAnimation"
                @mouseout="toggleShapeAnimation"
              >Experiences</span>
            </p>
          </section>
          <p class="background-text">Hi,</p>
          <p :class="[shapeAnimation ? 'abstract-shape-1 experience-on-1' : 'abstract-shape-1']"></p>
          <p :class="[shapeAnimation ? 'abstract-shape-2 experience-on-2' : 'abstract-shape-2']"></p>
        </section>
      </main>
    </v-flex>
  </v-layout>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
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
  },
  data: () => ({
    inputDisplay: false,
    profilePic: false,
    shapeAnimation: false
  }),
  computed: {
    ...mapState(['highlightPortfolioLink'])
  },
  methods: {
    ...mapMutations(['toggleHighlightPortfolioLink']),
    showProfilePic: function() {
      this.profilePic = !this.profilePic
    },
    toggleInputDisplay: function() {
      this.inputDisplay = !this.inputDisplay
    },
    toggleShapeAnimation: function() {
      this.shapeAnimation = !this.shapeAnimation
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
    border-left: 1px solid #333;
    position: relative;
    margin-left: 2rem;

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

    .no-input {
      color: #1976d2;
      transition: all 0.5s ease;
    }

    .input-display {
      background: #333;
      color: #d25d19;
      transition: all 0.5s ease;
    }

    .abstract-shape-1 {
      background: none;
      border: 5px solid #ddd;
      height: 150px;
      width: 150px;
      position: absolute;
      top: 200px;
      right: 5vw;
      transform: rotate(30deg);
      transition: all 0.5s ease;
    }

    .abstract-shape-2 {
      background: none;
      border: 5px solid #ddd;
      border-radius: 50%;
      height: 150px;
      width: 150px;
      position: absolute;
      top: -30px;
      right: 15vw;
      transition: all 0.5s ease;
    }

    .experience-on-1 {
      border-color: #d25d19;
      top: 0;
      right: 20vw;
      transform: rotate(225deg);
      transition: all 0.5s ease;
    }

    .experience-on-2 {
      border-color: #1976d2;
      top: 0;
      right: 10vw;
      transform: scale(1.25);
      transition: all 0.5s ease;
    }
  }

  #profile-pic {
    position: absolute;
    top: 15px;
    left: 540px;
    z-index: 1;
  }
}

@media screen and (min-width: 768px) {
  main {
    section#hero {
      padding-bottom: 200px;

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
        font-size: 40rem;
        top: -300px;
        left: 7vw;
        z-index: 0;
      }
    }
  }

  #profile-pic {
    position: absolute;
    top: 60px;
    left: 540px;
  }
}
</style>
