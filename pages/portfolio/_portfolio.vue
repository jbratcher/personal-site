<template>
  <v-layout>
    <v-col>
      <v-sheet class="ma-0" color="primary lighten-2" dark tile>
        <h1 class="headline pa-2" display="headline">Blog > {{ portfolioItem.title }}</h1>
      </v-sheet>
      <article>
        <v-card class="d-flex flex-column align-center mx-auto">
          <v-img
            :src="portfolioItem.hero"
            lazy-src="https://picsum.photos/1280/920"
            width="1280"
            max-height="300"
          />
          <v-card-title class="display-1">{{portfolioItem.title}}</v-card-title>
          <v-card-subtitle class="subtitle-1">{{portfolioItem.description}}</v-card-subtitle>
          <v-card-text v-html="$md.render(portfolioItem.body)"></v-card-text>
        </v-card>
      </article>
    </v-col>
  </v-layout>
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
.col {
  margin: 0;
  padding: 0;
}
</style>