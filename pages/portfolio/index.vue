<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <main>
          <v-sheet class="header ma-0 pb-0" color="#444" dark tile>
            <h1 class="headline ml-3 pa-2" display="headline">Portfolio&nbsp;></h1>
          </v-sheet>
          <v-list class="mx-6">
            <v-list-item
              class="align-stretch ma-0 pa-0"
              three-line
              v-for="(portfolioItem, index) in portfolioItems"
              :key="index"
            >
              <v-card class="d-flex flex-column">
                <v-img
                  :src="portfolioItem.thumbnail"
                  lazy-src="https://picsum.photos/10/6"
                  height="200px"
                  max-height="200px"
                />
                <v-card-title class="display-1">{{portfolioItem.title.substring(0, 70)}}</v-card-title>
                <v-card-subtitle class="subtitle-1">{{portfolioItem.description.substring(0, 80)}}</v-card-subtitle>
                <v-card-text v-html="$md.render(portfolioItem.body.substring(0, 144) + '...')" />
                <v-container>
                  <v-btn
                    class="ml-3 mb-12"
                    max-width="120px"
                    color="primary"
                    nuxt
                    dark
                    :to="`portfolio/${portfolioItem.slug}`"
                  >Info</v-btn>
                  <v-btn
                    v-if="portfolioItem.repo"
                    class="ml-3 mb-12"
                    max-width="120px"
                    color="primary"
                    dark
                  >
                    <a class="white--text" :href="portfolioItem.repo">Repo</a>
                  </v-btn>
                  <v-btn
                    v-if="portfolioItem.demo"
                    class="ml-3 mb-12"
                    max-width="120px"
                    color="primary"
                    dark
                  >
                    <a class="white--text" :href="portfolioItem.demo">Demo</a>
                  </v-btn>
                </v-container>
              </v-card>
            </v-list-item>
          </v-list>
        </main>
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
main {
  .v-list {
    display: flex;
    flex-direction: column;

    .v-list-item {
      margin-bottom: 2rem;

      .v-card {
        width: 100%;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .v-sheet.header {
      width: 100vw;
    }

    .v-list {
      align-items: baseline;
      display: grid;
      grid-template-columns: minmax(calc(50vw - 2rem), 500px) minmax(
          calc(50vw - 2rem),
          500px
        );
      grid-template-rows: minmax(500px, auto);
      gap: 0.5rem;
      justify-content: center;

      .v-list-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>