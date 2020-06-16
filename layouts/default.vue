<template>
  <v-app>
    <!-- Header Area -->
    <v-app-bar
      absolute
      app
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
      <v-card class="border-top d-none d-md-block" flat tile width="100%">
        <MenuLinks
          :general-links="generalLinks"
          list-class="d-md-flex justify-end hidden-md-and-down ml-auto"
          list-item-class="mx-3 text-center"
          width="50%"
        />
      </v-card>
    </v-app-bar>
    <!-- side/mobile navigation -->
    <v-navigation-drawer
      v-model="drawer"
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
        list-class="d-flex flex-column"
        list-item-class="text-center"
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

<style lang="scss"></style>
