<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0" color="#444" dark tile>
          <h1 class="headline pa-2" display="headline">Blog > {{ blogPost.title }}</h1>
        </v-sheet>
        <article class="mx-12 mt-2">
          <v-card class="d-flex flex-column align-center mx-auto">
            <v-img
              :src="blogPost.hero"
              lazy-src="https://picsum.photos/1280/920"
              width="1280"
              max-height="400"
            />
            <v-card-title class="display-1 mt-6">{{blogPost.title}}</v-card-title>
            <v-card-subtitle class="subtitle-1">{{blogPost.description}}</v-card-subtitle>
            <v-card-text class="px-12" v-html="$md.render(blogPost.body)"></v-card-text>
          </v-card>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload }
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`)
      }
  }
}
</script>
<style lang="scss" scoped>
</style>