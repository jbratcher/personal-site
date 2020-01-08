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
              enter-active-class="animated fadeInDown"
              leave-active-class="animated lightSpeedOut"
            >
              <section v-if="profilePic" id="profile-pic">
                <v-avatar size="96">
                  <v-img src="profile.jpg" lazy-src="10x10_profile.png" aspect-ratio="1" cover />
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
          <p
            :class="[shapeAnimation ? 'background-text experience-on-text' : 'background-text']"
          >Hi,</p>
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
    margin-left: 3vw;

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
      font-size: 30rem;
      opacity: 0.7;
      position: absolute;
      top: -140px;
      left: 5vw;
      transition: all 1s ease;
      z-index: 0;
    }

    p.experience-on-text {
      color: #d25d19;
      opacity: 1;
      transition: all 1s ease;
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
      height: 2.5rem;
      width: 2.5rem;
      position: absolute;
      top: 100px;
      right: 1vw;
      transform: rotate(30deg);
      transition: all 0.5s ease;
    }

    .abstract-shape-2 {
      background: none;
      border: 5px solid #ddd;
      border-radius: 50%;
      height: 2.5rem;
      width: 2.5rem;
      position: absolute;
      top: 0;
      right: 1vw;
      transition: all 0.5s ease;
    }

    .experience-on-1 {
      border-color: #d25d19;
      top: 10px;
      right: 1vw;
      transform: rotate(225deg);
      transition: all 0.5s ease;
    }

    .experience-on-2 {
      border-color: #1976d2;
      top: 40px;
      right: 1vw;
      transform: scale(1.25);
      transition: all 0.5s ease;
    }
  }

  #profile-pic {
    position: absolute;
    top: -4vh;
    left: 31vw;
    z-index: 1;

    .v-avatar {
      box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 0 0 4px #fff;
    }
  }
}

@media screen and (min-width: 768px) {
  main {
    section#hero {
      padding: 1rem 0 12.5rem 0;

      p.background-text {
        top: -300px;
        left: 7vw;
        z-index: 0;
      }

      .abstract-shape-1 {
        background: none;
        border: 5px solid #ddd;
        height: 7.5rem;
        width: 7.5rem;
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
        height: 7.5rem;
        width: 7.5rem;
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
  }

  #profile-pic {
    position: absolute;
    top: 60px;
    left: 540px;
  }
}
</style>
