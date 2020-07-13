<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet
          class="ma-0 pb-0"
          :class="$breakpoint.mdAndUp ? ' pl-10' : 'pl-0'"
          color="primary darken-2"
          dark
          tile
        >
          <h1
            :class="{
              'headline mb-0 ml-3 pa-2': $breakpoint.mdAndUp,
              'title font-weight-bold mb-0 ml-3 pa-2': $breakpoint.smAndDown
            }"
          >
            Blog
          </h1>
        </v-sheet>
        <v-container id="blog-list">
          <v-row>
            <v-col
              v-for="(post, index) in posts"
              :key="index"
              class="col-12 col-md-6"
            >
              <v-card class="d-flex flex-column" height="100%">
                <v-img
                  :alt="post.title"
                  :src="post.thumbnail"
                  lazy-src="https://picsum.photos/10/6"
                  height="12.5rem"
                  max-height="12.5rem"
                >
                  <v-card color="transparent" dark flat width="50%">
                    <v-card-title class="title font-weight-bold mb-3">{{
                      post.title
                    }}</v-card-title>
                    <v-card-subtitle class="subtitle-1 white--text">{{
                      post.description
                    }}</v-card-subtitle>
                  </v-card>
                </v-img>
                <v-card-text
                  :class="{
                    'title font-weight-regular black--text':
                      $breakpoint.mdAndUp,
                    'body-1 black--text': $breakpoint.smAndDown
                  }"
                  v-html="
                    String(post.body.children[0].children[0].value).substring(
                      0,
                      200
                    ) + '...'
                  "
                ></v-card-text>
                <v-btn
                  class="ml-3 mb-12 mt-auto"
                  dark
                  color="primary"
                  name="more"
                  nuxt
                  max-width="120px"
                  :to="`blog/${post.slug}`"
                  >More...</v-btn
                >
              </v-card>
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head() {
    return {
      title: `Blog | Jeremy Bratcher | Web Developer | Louisville, KY`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `A web development blog by Jeremy Bratcher`
        }
      ]
    }
  },
  async asyncData({ $content, params }) {
    const posts = await $content('blog', params.slug)
      .sortBy('createdAt', 'desc')
      .fetch()
    return {
      posts
    }
  }
}
</script>
<style lang="scss">
#blog-list {
  .v-card__title,
  .v-card__subtitle {
    line-height: 1.2;
  }
}
</style>
