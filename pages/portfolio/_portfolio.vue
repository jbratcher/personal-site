<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0" color="#444" dark tile>
          <h1 class="headline mb-0 pa-2">Portfolio > {{ portfolioItem.title }}</h1>
        </v-sheet>
        <article class="mb-12">
          <v-card class="d-flex flex-column align-center mx-auto" tile>
            <v-img :src="portfolioItem.hero" lazy-src="https://picsum.photos/1280/920" />
            <v-card-title class="display-1 mt-6">{{portfolioItem.title}}</v-card-title>
            <v-card-subtitle class="subtitle-1">{{portfolioItem.description}}</v-card-subtitle>
            <v-card-text class="px-12" v-html="$md.render(portfolioItem.body)"></v-card-text>
          </v-card>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { portfolioItem: payload }
    else
      return {
        portfolioItem: await require(`~/assets/content/portfolio/${params.portfolio}.json`)
      }
  }
}
</script>
<style lang="scss" scoped>
article {
  .v-card__title {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .v-card__subtitle {
    font-size: 1.5rem;
    line-height: 1.2;
  }
}
@media screen and (min-width: 768px) {
  article {
    margin: 0 3rem;

    .v-card__text {
      font-size: 1rem;
      line-height: 1.5;
      width: 70vw;
    }

    .v-card__subtitle.date {
      font-size: 0.875rem;
    }
  }
}
</style>