<template>
  <v-app color="#eee">
    <!-- Header Area -->
    <v-toolbar color="#eee" flat height="100px" max-height="100px">
      <v-toolbar-title v-text="title" />
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <MenuLinks
        :general-links="generalLinks"
        list-class="hidden-md-and-down"
        list-item-class="row-menu"
      />
    </v-toolbar>
    <!-- side/mobile navigation -->
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" fixed app right>
      <MenuLinks :general-links="generalLinks" list-class="listClass" list-item-class="column" />
    </v-navigation-drawer>
    <!-- Nuxt content -->
    <v-content>
      <nuxt />
    </v-content>
    <!-- Footer Area -->
    <v-footer light color="#eee" class="pa-0">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="(link, i) in footerLinks"
          :key="i + link.title"
          text
          rounded
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
      footerLinks: [
        {
          title: 'Home',
          to: '/'
        },
        {
          title: 'About Us',
          to: '/'
        },
        {
          title: 'Team',
          to: '/'
        },
        {
          title: 'Services',
          to: '/'
        },
        {
          title: 'Blog',
          to: '/'
        },
        {
          title: 'Contact Us',
          to: '/'
        }
      ],
      generalLinks: [
        {
          title: 'Home',
          to: '/'
        },
        {
          title: 'Blog',
          to: '/blog'
        }
      ],
      miniVariant: false,
      title: 'JB'
    }
  }
}
</script>

<style lang="scss">
*,
*:before,
*:after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
.v-application {
  font-family: 'Raleway', sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html,
body {
  min-width: 100vw;
  overflow-x: hidden;
  overflow-y: visible;
}

.v-application a {
  color: #000 !important;
}

.v-toolbar {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 0;
}

.v-toolbar__content {
  justify-content: space-between;
  width: 100%;

  .v-toolbar__title {
    border-radius: 0.33rem;
    box-shadow: -4px -4px 4px 0 rgba(255, 255, 255, 1),
      4px 4px 4px 0 rgba(0, 0, 0, 0.3);
    font-size: 2rem;
    letter-spacing: 0.125rem;
    margin: 0 1rem;
    padding: 0 0.4rem;
    transition: box-shadow 0.5s ease;

    &:hover {
      box-shadow: -1px -1px 1px 0 rgba(255, 255, 255, 0.5),
        1px 1px 1px 0 rgba(0, 0, 0, 0.1);
    }
  }

  .v-list {
    display: flex;
    align-items: baseline;
    background: none;
    padding-bottom: 0;
  }
}

.v-list-item {
  margin: 0 0.5rem;
}

.v-list-item__title {
  font-weight: 400;
  font-size: 1.25rem;
}

.v-card__title {
  word-break: break-word;
}

.justify-space-evenly {
  justify-content: space-around;
  justify-content: space-evenly;
}
</style>