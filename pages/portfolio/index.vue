<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <main class="grey lighten-3">
          <v-sheet class="header ma-0 pb-0" color="primary darken-2" dark tile>
            <h1 class="headline mb-0 ml-3 pa-2">Portfolio&nbsp;></h1>
          </v-sheet>
          <v-list class="my-12 mx-6" color="#eee">
            <v-list-item
              class="align-stretch align-self-stretch pa-0"
              three-line
              v-for="(portfolioItem, index) in portfolioItems"
              :key="index"
            >
              <v-card class="d-flex flex-column portfolio-card">
                <v-img :src="portfolioItem.thumbnail" lazy-src="https://picsum.photos/10/6" />
                <v-card-title class="display-1">{{portfolioItem.title.substring(0, 70)}}</v-card-title>
                <v-card-subtitle
                  class="subtitle-1"
                >{{portfolioItem.description.substring(0, 43) + '...'}}</v-card-subtitle>
                <v-card-text
                  class="preview"
                  v-html="$md.render(portfolioItem.body.substring(0, 133) + '...')"
                />
                <v-container class="mt-auto">
                  <v-btn
                    class="ml-3 mb-12"
                    name="info"
                    max-width="120px"
                    color="primary darken-2"
                    nuxt
                    dark
                    :to="`portfolio/${portfolioItem.slug}`"
                  >Info</v-btn>
                  <v-btn
                    v-if="portfolioItem.repo"
                    class="ml-3 mb-12"
                    name="repo"
                    max-width="120px"
                    color="primary darken-1"
                    dark
                  >
                    <a class="white--text" :href="portfolioItem.repo">Repo</a>
                  </v-btn>
                  <v-btn
                    v-if="portfolioItem.demo"
                    class="ml-3 mb-12"
                    name="demo"
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
.portfolio-card {
  max-width: 100%;
}

main {
  .v-list {
    display: flex;
    flex-direction: column;

    .v-list-item {
      margin-bottom: 2rem;

      .v-card {
        width: 100%;
        .v-card__text.preview > * {
          font-size: 1rem;
          margin: 1rem 0;
        }
      }
    }
  }
}

@media screen and (min-width: 768px) {
  main .v-list .v-list-item .v-card.portfolio-card {
    max-width: calc(50vw - 4rem);
  }

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
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      gap: 2rem;
      justify-content: center;

      .v-list-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>