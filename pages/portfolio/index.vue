<template>
  <v-layout>
    <v-flex>
      <main>
        <v-sheet class="ma-0" color="primary" dark tile>
          <h1 class="headline pa-2" display="headline">Portfolio ></h1>
        </v-sheet>
        <v-list class="grid-2">
          <v-list-item three-line v-for="(portfolioItem, index) in portfolioItems" :key="index">
            <v-card class="d-flex flex-column">
              <v-img
                :src="portfolioItem.thumbnail"
                lazy-src="https://picsum.photos/10/6"
                max-height="200px"
              />
              <v-card-title class="display-1">{{portfolioItem.title.substring(0, 70)}}</v-card-title>
              <v-card-subtitle class="subtitle-1">{{portfolioItem.description.substring(0, 80)}}</v-card-subtitle>
              <v-card-text>{{portfolioItem.body.substring(0, 144) + '...'}}</v-card-text>
              <v-btn
                class="ml-3 mb-12"
                max-width="120px"
                color="primary"
                nuxt
                :to="`portfolio/${portfolioItem.slug}`"
              >Info</v-btn>
              <v-btn
                v-if="portfolioItem.repo"
                class="ml-3 mb-12"
                max-width="120px"
                color="primary"
                nuxt
                :to="`portfolio/${portfolioItem.repo}`"
              >Repo</v-btn>
              <v-btn
                v-if="portfolioItem.demo"
                class="ml-3 mb-12"
                max-width="120px"
                color="primary"
                nuxt
                :to="`portfolio/${portfolioItem.demo}`"
              >Demo</v-btn>
            </v-card>
          </v-list-item>
        </v-list>
      </main>
    </v-flex>
  </v-layout>
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
main {
  .v-list {
    display: flex;
    flex-direction: column;

    .v-list-item {
      margin-bottom: 2rem;
    }
  }
}

@media screen and (min-width: 768px) {
  main {
    .v-list {
      align-items: flex-start;
      display: grid;
      grid-template-columns: minmax(calc(50vw - 2rem), 1fr) minmax(
          calc(50vw - 2rem),
          1fr
        );
      grid-template-rows: auto;
      gap: 2rem;

      .v-list-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>