<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-sheet class="ma-0" color="#444" dark tile>
          <h1 class="headline pa-2" display="headline">Blog > {{ blogPost.title }}</h1>
        </v-sheet>
        <article>
          <v-card class="d-flex flex-column align-center mx-auto">
            <v-img :src="blogPost.hero" lazy-src="https://picsum.photos/10/6">
              <section class="img-text">
                <v-card-title class="white--text">{{blogPost.title.substring(0, 70)}}</v-card-title>
                <v-card-subtitle class="white--text">{{blogPost.description.substring(0, 80)}}</v-card-subtitle>
              </section>
            </v-img>
            <v-card-subtitle class="date my-6">{{ formatDate(blogPost.date) }}</v-card-subtitle>
            <v-card-text class="px-12 my-3" v-html="$md.render(blogPost.body)"></v-card-text>
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
article {
  .img-text {
    width: 50%;

    .v-card__title {
      font-size: 2rem;
      margin-bottom: 1rem;
    }

    .v-card__subtitle {
      font-size: 1.5rem;
      line-height: 1.2;
    }
  }
}

@media screen and (min-width: 768px) {
  article {
    margin: 0 3rem;

    .v-image {
      width: 100%;
      max-height: 300px;
    }

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