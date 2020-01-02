<template>
  <v-app>
    <!-- Header Area -->
    <v-app-bar app color="#eee" flat height="70px">
      <v-toolbar-title v-text="title" />
      <v-app-bar-nav-icon class="hidden-md-and-up" @click.stop="drawer = !drawer" />
      <MenuLinks
        :general-links="generalLinks"
        list-class="hidden-md-and-down"
        list-item-class="row-menu"
      />
    </v-app-bar>
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
          <strong>Green Spaces</strong>
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
  overflow-x: hidden;
}

.v-application a {
  color: #000 !important;
}

.v-list {
  background: none;
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

.v-toolbar__content {
  justify-content: space-between;

  .v-toolbar__title {
    border-radius: 0.33rem;
    box-shadow: -4px -4px 4px 0 rgba(255, 255, 255, 1),
      4px 4px 4px 0 rgba(0, 0, 0, 0.3);
    font-size: 2rem;
    letter-spacing: 0.125rem;
    margin: 0 1rem;
    padding: 0 0.4rem;
  }

  .v-list {
    display: flex;
    margin-right: 4rem;
  }
}
</style>