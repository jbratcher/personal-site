<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0" color="primary darken-2" dark tile>
          <h1
            :class="{'headline mb-0 ml-3 pa-2': $breakpoint.mdAndUp, 'title font-weight-bold mb-0 ml-3 pa-2': $breakpoint.smAndDown}"
          >Portfolio</h1>
        </v-sheet>
        <article class="mb-12">
          <v-card tile>
            <v-img
              :alt="portfolioItem.title"
              :aspect-ratio="16/9"
              class="mb-12"
              :src="portfolioItem.hero"
              lazy-src="https://picsum.photos/1280/920"
              width="100%"
              max-width="100vw"
              height="25rem"
            />
            <v-card class="mx-auto" flat :width="$breakpoint.mdAndUp ? '75vw' : '90vw'">
              <v-card-text class="px-12" v-html="$md.render(portfolioItem.body)"></v-card-text>
            </v-card>
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
</style>