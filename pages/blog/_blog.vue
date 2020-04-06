<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0 pb-0" color="primary darken-2" dark tile>
          <h1
            :class="{'headline mb-0 ml-3 pa-2': $breakpoint.mdAndUp, 'title font-weight-bold mb-0 ml-3 pa-2': $breakpoint.smAndDown}"
          >Blog</h1>
        </v-sheet>
        <article class="mb-12">
          <v-card class="d-flex flex-column align-center mx-auto" tile>
            <v-img
              :alt="blogPost.title"
              :aspect-ratio="16/9"
              class="mb-12"
              :src="blogPost.hero"
              lazy-src="https://picsum.photos/10/6"
              width="100%"
              :height="$breakpoint.mdAndUp ? '18.75rem' : '12.5rem'"
            >
              <v-card color="transparent" dark flat width="50%">
                <v-card-title
                  :class="{'display-2 mb-6': $breakpoint.mdAndUp, 'title mb-6': $breakpoint.smAndDown}"
                >{{blogPost.title.substring(0, 70)}}</v-card-title>
                <v-card-subtitle
                  :class="{'headline font-weight-regular white--text': $breakpoint.mdAndUp, 'subtitle-1 font-weight-regular white--text': $breakpoint.smAndDown}"
                >{{blogPost.description.substring(0, 80)}}</v-card-subtitle>
              </v-card>
            </v-img>
            <v-card flat :width="$breakpoint.mdAndUp ? '75vw' : '100%'">
              <v-card-subtitle class="black--text mb-6">{{ formatDate(blogPost.date) }}</v-card-subtitle>
              <v-card-text v-html="$md.render(blogPost.body)" class="black--text"></v-card-text>
            </v-card>
          </v-card>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head() {
    let blogPost = this.blogPost
    return {
      title: `${blogPost.title} | Jereny Bratcher | Web Developer | Louisville, KY`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `${blogPost.description}`
        }
      ]
    }
  },
  async asyncData({ params, payload }) {
    if (payload) return { blogPost: payload }
    else
      return {
        blogPost: await require(`~/assets/content/blog/${params.blog}.json`)
      }
  },
  methods: {
    formatDate(date) {
      let newDate = new Date(date)
      var options = {
        weekday: 'long',
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      }
      let formattedDate = newDate.toLocaleString('default', options)
      return formattedDate
    }
  }
}
</script>
<style lang="scss" scoped>
</style>