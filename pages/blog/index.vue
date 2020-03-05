<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <main>
          <v-sheet class="header ma-0 pb-0" color="#444" dark tile>
            <h1 class="headline ml-3 pa-2" display="headline">Blog ></h1>
          </v-sheet>
          <v-list class="my-12 mx-6" color="#eee">
            <v-list-item
              class="align-stretch pa-0"
              three-line
              v-for="(blogPost, index) in blogPostsByDateDescending"
              :key="index"
            >
              <v-card class="d-flex flex-column blog-card">
                <v-img :src="blogPost.thumbnail" lazy-src="https://picsum.photos/10/6">
                  <section class="img-text my-auto">
                    <v-card-title class="white--text">{{blogPost.title.substring(0, 70)}}</v-card-title>
                    <v-card-subtitle class="white--text">{{blogPost.description.substring(0, 80)}}</v-card-subtitle>
                  </section>
                </v-img>
                <v-card-text
                  class="blog-card-text"
                  v-html="$md.render(blogPost.body).substring(0, 200) + '...'"
                />
                <v-btn
                  class="ml-3 mb-12 mt-auto"
                  name="more"
                  max-width="120px"
                  color="primary"
                  nuxt
                  dark
                  :to="`blog/${blogPost.slug}`"
                >More...</v-btn>
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
    ...mapState('resources', ['blogPosts']),
    // return temporary array of events from newest to oldest
    blogPostsByDateDescending() {
      return this.blogPosts
        .slice()
        .sort((a, b) => new Date(b.date) - new Date(a.date))
    }
  },
  methods: {
    ...mapActions('resources', ['getBlogPosts'])
  },
  mounted() {
    this.getBlogPosts()
  }
}
</script>
<style lang="scss">
.v-card__text {
  font-size: 1rem;
  line-height: 1.5;
}

.v-card__subtitle.date {
  font-size: 1.25rem;
}

main {
  .v-image {
    align-self: center;

    .img-text {
      display: flex;
      flex-direction: column;
      width: 50%;
      height: 100%;

      .v-card__title {
        font-size: 1.67rem;
        margin-bottom: 1rem;
        line-height: 1.2;
      }

      .v-card__subtitle {
        font-size: 1.33rem;
        line-height: 1.2;
      }
    }
  }

  .v-list {
    display: flex;
    flex-direction: column;

    .v-list-item {
      margin-bottom: 2rem;
      min-height: 100%;

      .v-card {
        width: 100%;
      }
    }
  }
}

@media screen and (min-width: 768px) {
  main .v-list .v-list-item .v-card.blog-card {
    max-width: calc(50vw - 4rem);
    .v-card__text.blog-card-text p {
      margin-bottom: 0.5rem;
    }
  }

  .v-card__text {
    font-size: 1.25rem;
  }

  .v-card__subtitle.date {
    font-size: 1rem;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .v-sheet.header {
      width: 100vw;
    }

    .v-image {
      max-width: 100%;
      height: 300px;
      max-height: 300px;

      .img-text {
        .v-card__title {
          font-size: 1.33rem;
        }

        .v-card__subtitle {
          font-size: 1.125rem;
        }
      }
    }

    .v-list {
      align-items: baseline;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-auto-rows: 1fr;
      gap: 2rem;

      .v-list-item {
        margin-bottom: 0;
        max-width: 100%;
      }
    }
  }
}
</style>