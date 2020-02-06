<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0" color="#444" dark tile>
          <h1 class="headline pa-2" display="headline">Blog > {{ blogPost.title }}</h1>
        </v-sheet>
        <article>
          <v-card class="d-flex flex-column align-center mx-auto" tile>
            <v-img :src="blogPost.hero" lazy-src="https://picsum.photos/10/6">
              <section class="img-text">
                <v-card-title class="white--text">{{blogPost.title.substring(0, 70)}}</v-card-title>
                <v-card-subtitle class="white--text">{{blogPost.description.substring(0, 80)}}</v-card-subtitle>
              </section>
            </v-img>
            <section class="post-content">
              <v-card-subtitle class="date">{{ formatDate(blogPost.date) }}</v-card-subtitle>
              <v-card-text v-html="$md.render(blogPost.body)"></v-card-text>
            </section>
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
.v-card__subtitle + .v-card__text {
  padding-top: 1rem;
}

article {
  .v-image {
    width: 100%;
    max-height: 300px;
  }

  .post-content {
    padding: 1rem 1.5rem;
    width: 95vw;
  }

  .v-card__text {
    font-size: 1rem;
    line-height: 1.5;
  }
}

@media screen and (min-width: 768px) {
  article {
    .post-content {
      padding: 1rem 1.5rem;
      width: 70vw;
    }
    .v-card__text {
      font-size: 1rem;
      line-height: 1.5;
    }
  }
}
</style>