<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0 pl-10 pb-0" color="primary darken-2" dark tile>
          <h1
            :class="{
              'headline mb-0 ml-3 pa-2': $breakpoint.mdAndUp,
              'title font-weight-bold mb-0 ml-3 pa-2': $breakpoint.smAndDown
            }"
          >
            Portfolio
          </h1>
        </v-sheet>
        <v-container>
          <v-row>
            <v-col
              class="col-12 col-md-6"
              v-for="(post, index) in posts"
              :key="index"
            >
              <v-card class="d-flex flex-column" height="100%">
                <v-img
                  :alt="post.title"
                  :src="post.thumbnail"
                  lazy-src="https://picsum.photos/10/6"
                  height="12.5rem"
                  max-height="12.5rem"
                />
                <v-card-title
                  :class="{
                    'display-1 my-3 mx-3': $breakpoint.mdAndUp,
                    'headline my-3 mx-3': $breakpoint.smAndDown
                  }"
                  >{{ post.title }}</v-card-title
                >
                <v-card-subtitle class="body-1 mx-3">{{
                  post.description
                }}</v-card-subtitle>
                <v-container class="mt-auto mx-3 mb-12">
                  <v-btn
                    name="info"
                    max-width="120px"
                    color="primary darken-2"
                    nuxt
                    dark
                    :to="`portfolio/${post.slug}`"
                    >Info</v-btn
                  >
                  <v-btn
                    v-if="post.repo"
                    class="ml-3"
                    name="repo"
                    max-width="120px"
                    color="primary darken-1"
                    dark
                  >
                    <a class="white--text" :href="post.repo">Repo</a>
                  </v-btn>
                  <v-btn
                    v-if="post.demo"
                    class="ml-3"
                    name="demo"
                    max-width="120px"
                    color="primary"
                    dark
                  >
                    <a class="white--text" :href="post.demo">Demo</a>
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
export default {
  head() {
    return {
      title: `Portfolio | Jeremy Bratcher | Web Developer | Louisville, KY`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `A web development portfolio by Jeremy Bratcher`
        }
      ]
    }
  },
  async asyncData({ $content, params }) {
    const posts = await $content('portfolio', params.slug)
      .sortBy('date', 'desc')
      .fetch()
    return {
      posts
    }
  }
}
</script>
<style lang="scss"></style>
