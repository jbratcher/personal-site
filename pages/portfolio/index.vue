<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0 pl-10 pb-0" color="primary darken-2" dark tile>
          <h1
            :class="{'headline mb-0 ml-3 pa-2': $breakpoint.mdAndUp, 'title font-weight-bold mb-0 ml-3 pa-2': $breakpoint.smAndDown}"
          >Portfolio&nbsp;></h1>
        </v-sheet>
        <v-container>
          <v-row>
            <v-col
              class="col-12 col-md-6"
              v-for="(portfolioItem, index) in portfolioItems"
              :key="index"
            >
              <v-card class="d-flex flex-column" height="100%">
                <v-img
                  :alt="portfolioItem.title"
                  :src="portfolioItem.thumbnail"
                  lazy-src="https://picsum.photos/10/6"
                  height="12.5rem"
                  max-height="12.5rem"
                />
                <v-card-title
                  :class="{'display-1 my-3 mx-3': $breakpoint.mdAndUp, 'headline my-3 mx-3': $breakpoint.smAndDown}"
                >{{portfolioItem.title}}</v-card-title>
                <v-card-subtitle class="body-1 mx-3">{{portfolioItem.description}}</v-card-subtitle>
                <v-container class="mt-auto mx-3 mb-12">
                  <v-btn
                    name="info"
                    max-width="120px"
                    color="primary darken-2"
                    nuxt
                    dark
                    :to="`portfolio/${portfolioItem.slug}`"
                  >Info</v-btn>
                  <v-btn
                    v-if="portfolioItem.repo"
                    class="ml-3"
                    name="repo"
                    max-width="120px"
                    color="primary darken-1"
                    dark
                  >
                    <a class="white--text" :href="portfolioItem.repo">Repo</a>
                  </v-btn>
                  <v-btn
                    v-if="portfolioItem.demo"
                    class="ml-3"
                    name="demo"
                    max-width="120px"
                    color="primary"
                    dark
                  >
                    <a class="white--text" :href="portfolioItem.demo">Demo</a>
                  </v-btn>
                </v-container>
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapActions, mapState } from 'vuex'
export default {
  computed: {
    ...mapState('resources', ['portfolioItems'])
  },
  methods: {
    ...mapActions('resources', ['getPortfolioItems'])
  },
  created() {
    this.getPortfolioItems()
  }
}
</script>
<style lang="scss">
</style>