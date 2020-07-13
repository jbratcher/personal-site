<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <main>
          <!-- Hero Section -->
          <section id="hero">
            <section class="container">
              <p>
                My name is
                <span @mouseover="showProfilePic" @mouseleave="showProfilePic"
                  >Jeremy</span
                >
              </p>
              <transition
                name="custom-classes-transition"
                enter-active-class="animated fadeInDown"
                leave-active-class="animated lightSpeedOut"
              >
                <section v-if="profilePic" id="profile-pic">
                  <v-avatar size="96">
                    <v-img
                      src="images/profile.jpg"
                      lazy-src="images/10x10_profile.png"
                      aspect-ratio="1"
                      cover
                    />
                  </v-avatar>
                </section>
              </transition>
              <p>
                I'm a
                <span
                  class="pa-2"
                  :class="{
                    'input-display': inputDisplay,
                    'no-input': !inputDisplay
                  }"
                  @mouseover="toggleInputDisplay"
                  @mouseout="toggleInputDisplay"
                  >Web Developer</span
                >
              </p>
              <p>
                I create
                <span
                  @click="toggleHighlightPortfolioLink"
                  @mouseover="toggleHighlightPortfolioLink"
                  @mouseout="toggleHighlightPortfolioLink"
                  >User Interfaces</span
                >
                &amp;
                <span
                  @click="toggleShapeAnimation"
                  @mouseover="toggleShapeAnimation"
                  @mouseout="toggleShapeAnimation"
                  >Experiences</span
                >
              </p>
            </section>
            <p
              :class="[
                shapeAnimation
                  ? 'background-text experience-on-text'
                  : 'background-text'
              ]"
            >
              Hi,
            </p>
            <p
              :class="[
                shapeAnimation
                  ? 'abstract-shape-1 experience-on-1'
                  : 'abstract-shape-1'
              ]"
            ></p>
            <p
              :class="[
                shapeAnimation
                  ? 'abstract-shape-2 experience-on-2'
                  : 'abstract-shape-2'
              ]"
            ></p>
          </section>
        </main>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  head() {
    return {
      script: [
        {
          defer: true,
          src: 'https://identity.netlify.com/v1/netlify-identity-widget.js'
        }
      ]
    }
  },
  data: () => ({
    inputDisplay: false,
    profilePic: false,
    shapeAnimation: false
  }),
  methods: {
    ...mapActions(['toggleHighlightPortfolioLink']),
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
  background-color: #eee;
  position: relative;

  section#hero {
    border-left: 1px solid #333;
    margin-left: 3vw;
    position: relative;
    width: 100%;
    min-height: 300px;

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
      font-size: 8rem;
      opacity: 0.7;
      position: absolute;
      top: 0;
      right: 30vw;
      transition: all 0.5s ease 0.25s;
      z-index: 0;
    }

    p.experience-on-text {
      color: #d25d19;
      opacity: 1;
      top: 20%;
      right: 10vh;
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
      border: 2px solid #ddd;
      height: 2.5rem;
      width: 2.5rem;
      position: absolute;
      top: 80px;
      right: 10vw;
      transform: rotate(30deg);
      transition: all 0.5s ease 0.25s;
      z-index: 0;
    }

    .abstract-shape-2 {
      background: none;
      border: 2px solid #ddd;
      border-radius: 50%;
      height: 2.5rem;
      width: 2.5rem;
      position: absolute;
      top: 0;
      right: 10vw;
      transition: all 0.5s ease 0.25s;
      z-index: 0;
    }

    .experience-on-1 {
      border-color: #d25d19;
      top: 10px;
      transform: rotate(225deg);
      transition: all 0.5s ease 0.25s;
    }

    .experience-on-2 {
      border-color: #1976d2;
      top: 40px;
      transform: scale(1.25);
      transition: all 0.5s ease 0.25s;
    }
  }

  #profile-pic {
    position: absolute;
    top: -2vh;
    left: 66vw;
    z-index: 1;

    .v-avatar {
      box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 0 0 4px #fff;
    }
  }
}

#home-main {
  background: #eee;
}

div.v-content__wrap {
  width: 100%;
}

@media screen and (min-width: 960px) {
  main {
    section#hero {
      min-height: 600px;

      p.background-text {
        font-size: 16rem;
        top: -15%;
        left: 3vw;
        z-index: 0;
      }

      .abstract-shape-1 {
        background: none;
        border: 5px solid #ddd;
        height: 7.5rem;
        width: 7.5rem;
        position: absolute;
        top: 200px;
        right: 15vw;
        transform: rotate(30deg);
      }

      .abstract-shape-2 {
        background: none;
        border: 5px solid #ddd;
        border-radius: 50%;
        height: 7.5rem;
        width: 7.5rem;
        position: absolute;
        top: -30px;
        right: 25vw;
      }

      .experience-on-1 {
        border-color: #d25d19;
        top: 0;
        right: 20vw;
        transform: rotate(225deg);
      }

      .experience-on-2 {
        border-color: #1976d2;
        top: 0;
        right: 10vw;
        transform: scale(1.25);
      }
    }

    #profile-pic {
      position: absolute;
      top: 60px;
      left: 540px;
    }
  }
}

@media screen and (min-width: 1024px) {
  main {
    section#hero {
      p.background-text {
        font-size: 24rem;
        top: -30%;
        left: 7vw;
        z-index: 0;
      }

      .abstract-shape-1 {
        background: none;
        border: 8px solid #ddd;
        height: 7.5rem;
        width: 7.5rem;
        position: absolute;
        top: 200px;
        right: 15vw;
        transform: rotate(30deg);
      }

      .abstract-shape-2 {
        background: none;
        border: 8px solid #ddd;
        border-radius: 50%;
        height: 7.5rem;
        width: 7.5rem;
        position: absolute;
        top: -30px;
        right: 25vw;
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
      }
    }

    #profile-pic {
      position: absolute;
      top: -10px;
      left: 37vw;
    }
  }
}

@media screen and (min-width: 1440px) {
  main #profile-pic {
    top: 15px;
    left: 49vw;
  }
}
</style>
