<template>
  <v-app>
    <!-- Header Area -->
    <v-app-bar
      color="grey lighten-3"
      flat
      :min-height="responsiveNavHeight"
      :height="responsiveNavHeight"
      :max-height="responsiveNavHeight"
    >
      <v-avatar :size="responsiveIconSize">
        <v-img
          src="/img/profile.jpg"
          lazy-src="/img/10x10_profile.png"
          aspect-ratio="1"
          cover
        />
      </v-avatar>
      <span class="hidden-sm-and-up">
        <v-btn
          v-if="togglePortfolioLink"
          class="white--text"
          href="/portfolio"
          color="#444"
        >
          Portfolio
          <v-icon class="ml-2">{{ folderStarOutlineIcon }}</v-icon>
        </v-btn>
      </span>
      <v-app-bar-nav-icon
        class="hidden-sm-and-up"
        @click.stop="drawer = !drawer"
      >
        <i aria-hidden="true" class="v-icon notranslate theme--dark"
          ><v-icon>{{ menuIcon }}</v-icon></i
        >
      </v-app-bar-nav-icon>
      <MenuLinks
        :general-links="generalLinks"
        list-class="d-none d-sm-flex"
        list-item-class="flex-0"
      />
    </v-app-bar>
    <!-- side/mobile navigation -->
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      class="pt-6 pb-12"
      color="#eee"
      height="auto"
      app
      disable-resize-watcher
      fixed
      right
    >
      <MenuLinks
        :general-links="generalLinks"
        list-class="mobile"
        list-item-class="column"
      />
    </v-navigation-drawer>
    <!-- Nuxt content -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- Footer Area -->
    <v-footer light color="#eee" class="main-footer">
      <v-row class="mx-6 pt-6 justify-center" no-gutters>
        <v-btn
          v-for="(link, i) in generalLinks"
          :key="i + link.title"
          :name="link.title.toLowerCase()"
          text
          rounded
          nuxt
          :to="link.to"
          class="my-2"
          >{{ link.title }}</v-btn
        >
        <v-col class="d-flex justify-center mt-6 mb-12" cols="12">
          <v-btn
            v-for="(link, i) in socialLinks"
            :key="i + link.title"
            :name="link.title.toLowerCase()"
            :href="link.to"
            color="primary"
            target="_blank"
            text
            rounded
          >
            <v-icon size="2rem">{{ link.icon }}</v-icon>
          </v-btn>
        </v-col>
        <v-col class="mx-auto py-4 text-center" cols="12">
          {{ new Date().getFullYear() }} -
          <strong>Jeremy Bratcher</strong>
          - Louisville, KY
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import MenuLinks from '../components/MenuLinks.vue'
import {
  mdiGithub,
  mdiLinkedin,
  mdiFolderStarOutline,
  mdiMenu,
  mdiTwitter
} from '@mdi/js'
export default {
  components: {
    MenuLinks
  },
  data() {
    return {
      drawer: false,
      fixed: false,
      folderStarOutlineIcon: mdiFolderStarOutline,
      generalLinks: [
        {
          title: 'Home',
          to: '/'
        },
        {
          title: 'Portfolio',
          to: '/portfolio'
        },
        {
          title: 'Blog',
          to: '/blog'
        },
        {
          title: 'Contact',
          to: '/contact'
        }
      ],
      menuIcon: mdiMenu,
      socialLinks: [
        {
          title: 'Github',
          to: 'https://github.com/jbratcher',
          icon: mdiGithub
        },
        {
          title: 'Twitter',
          to: 'https://twitter.com/JeremyBBratcher',
          icon: mdiTwitter
        },
        {
          title: 'LinkedIn',
          to: ' https://www.linkedin.com/in/jeremy-bratcher/',
          icon: mdiLinkedin
        }
      ],
      iconSize: 0,
      miniVariant: false,
      navHeight: 64
    }
  },
  computed: {
    responsiveIconSize() {
      let value = '32'
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          value = '64'
          break
        case 'sm':
          value = '80'
          break
        case 'md':
          value = '96'
          break
        case 'lg':
          value = '112'
          break
        case 'xl':
          value = '128'
          break
      }
      return value
    },
    responsiveNavHeight() {
      let value = '140'
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          value = '80'
          break
        case 'sm':
          value = '100'
          break
        case 'md':
          value = '140'
          break
        case 'lg':
          value = '140'
          break
        case 'xl':
          value = '140'
          break
      }
      return value
    },
    togglePortfolioLink() {
      if (this.$route.name !== 'portfolio') {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss">
// global
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  font-size: 1rem; // fallback for older browsers
  font-size: calc(1vw + 1vh + 0.5vmin); // fluid typography
}

html,
body,
.v-application {
  color: #525f7f;
  font-size: 16px;
  font-family: 'Poppins', sans-serif;
  line-height: 1.5;
  min-height: 100vh;
  overflow-x: hidden;
  scroll-behavior: smooth;
  text-rendering: optimizeSpeed;
  word-break: keep-all;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
}

html,
body {
  background: #eee;
  min-width: 100vw;
  overflow-x: hidden;
}

.v-application {
  a {
    text-decoration: none;
  }

  .v-responsive__content {
    .v-card__title,
    .v-card__subtitle,
    .v-card__text {
      line-height: 1.2;
      word-break: keep-all;
    }
  }

  .v-card__title,
  .v-card__subtitle,
  .v-card__text {
    line-height: 1.5;
    word-break: keep-all;

    .v-list-item__content {
      overflow: visible;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 1rem;
    }
    p > a {
      color: #0d47a1;
    }

    p,
    p + p,
    ul {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }

  .v-card__text {
    pre {
      margin-bottom: 2rem;
      min-width: 100%;
      code {
        font-size: 0.75rem;
        max-width: 100%;
        min-width: 100%;
      }
      code:before {
        content: '';
      }
    }
  }

  .v-card__text[v-html] {
    article > * + * {
      margin-top: 1rem;
    }
  }
}

// header
.v-toolbar {
  display: flex;
  align-items: center;
  min-width: 100vw;
  position: relative;
  z-index: 0;
}

.v-toolbar__content {
  justify-content: space-between;
  width: 100%;

  span {
    font-size: 1.25rem;
  }

  .v-avatar {
    box-shadow: 0 8px 15px 0 rgba(0, 0, 0, 0.2), 0 0 0 4px #fff;
  }

  .v-list {
    border-radius: 0;
    border-top: 1px solid #666;
    display: flex;
    align-items: baseline;
    background: transparent;
    padding-bottom: 0;
    width: 100%;
  }
}

.v-list-item__title {
  font-size: 1.5rem;
}

.v-toolbar__content .v-btn.v-btn--icon.v-size--default {
  height: 4.75rem;
  width: 4.75rem;
}

.v-btn--icon.v-size--default .v-icon {
  font-size: 4rem;
  height: 4rem;
  width: 4rem;
}

nav.v-navigation-drawer {
  border-bottom-left-radius: 5rem;
}

// footer
.v-footer {
  border: 1px solid #000;
}

// lists (global)
.theme--light.v-list {
  background-color: #eee;
}

// cards (global)
.justify-space-evenly {
  justify-content: space-around;
  justify-content: space-evenly;
}

.flex-0 {
  flex: 0;
}

/* Remove all animations and transitions for people that prefer not to see them */
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

@media screen and (min-width: 960px) {
  // header
  .v-list-item__title {
    font-size: 1rem;
  }

  .v-application {
    p,
    p + p,
    ul {
      font-size: 1rem;
      margin-bottom: 2rem;
    }
  }
}
</style>
