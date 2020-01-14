<template>
  <v-app>
    <!-- Header Area -->
    <v-app-bar
      class="py-12"
      color="#eee"
      flat
      :min-height="responsiveNavHeight"
      :height="responsiveNavHeight"
      :max-height="responsiveNavHeight"
    >
      <v-avatar :size="responsiveIconSize">
        <v-img src="/img/profile.jpg" lazy-src="/img/10x10_profile.png" aspect-ratio="1" cover />
      </v-avatar>
      <span class="hidden-sm-and-up">Jeremy Bratcher</span>
      <v-app-bar-nav-icon class="hidden-sm-and-up" @click.stop="drawer = !drawer" />
      <MenuLinks :general-links="generalLinks" list-class="hidden-xs-only" />
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
      <MenuLinks :general-links="generalLinks" list-class="mobile" list-item-class="column" />
    </v-navigation-drawer>
    <!-- Nuxt content -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- Footer Area -->
    <v-footer light color="#eee" class="pa-0">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="(link, i) in generalLinks"
          :key="i + link.title"
          :name="link.title.toLowerCase()"
          text
          rounded
          nuxt
          :to="link.to"
          class="my-2"
        >{{ link.title }}</v-btn>
        <v-col class="py-4 text-center" cols="12">
          {{ new Date().getFullYear() }} —
          <strong>Jeremy Bratcher</strong>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
import MenuLinks from '../components/MenuLinks.vue'

export default {
  components: {
    MenuLinks
  },
  data() {
    return {
      drawer: false,
      fixed: false,
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
      let value = '160'
      switch (this.$vuetify.breakpoint.name) {
        case 'xs':
          value = '100'
          break
        case 'sm':
          value = '120'
          break
        case 'md':
          value = '160'
          break
        case 'lg':
          value = '160'
          break
        case 'xl':
          value = '160'
          break
      }
      return value
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
  font-family: 'Raleway', sans-serif;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html,
body {
  background: #eee;
  min-width: 100vw;
  overflow-x: hidden;
}

.v-application a {
  text-decoration: none;
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
    font-size: 1.67rem;
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

// lists

.theme--light.v-list {
  background-color: #eee;
}

// cards (global)

.v-card__title,
.v-card__subtitle,
.v-card__text {
  word-break: keep-all;
}

.justify-space-evenly {
  justify-content: space-around;
  justify-content: space-evenly;
}
</style>