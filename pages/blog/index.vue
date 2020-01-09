<template>
  <v-container class="pt-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <main>
          <v-sheet class="ma-0" color="#444" dark tile>
            <h1 class="headline pa-2" display="headline">Blog ></h1>
          </v-sheet>
          <v-list>
            <v-list-item three-line v-for="(blogPost, index) in blogPosts" :key="index">
              <v-card class="d-flex flex-column">
                <v-img
                  :src="blogPost.thumbnail"
                  lazy-src="https://picsum.photos/10/6"
                  max-height="200px"
                />
                <v-card-title class="display-1">{{blogPost.title.substring(0, 70)}}</v-card-title>
                <v-card-subtitle class="subtitle-1">{{blogPost.description.substring(0, 80)}}</v-card-subtitle>
                <v-card-text>{{blogPost.body.substring(0, 144) + '...'}}</v-card-text>
                <v-btn
                  class="ml-3 mb-12"
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
    ...mapState('resources', ['blogPosts'])
  },
  methods: {
    ...mapActions('resources', ['getBlogPosts'])
  },
  created() {
    this.getBlogPosts()
  }
}
</script>
<style lang="scss">
main {
  .v-list {
    display: flex;
    flex-direction: column;

    .v-list-item {
      margin-bottom: 2rem;
    }
  }
}

@media screen and (min-width: 768px) {
  main {
    .v-list {
      align-items: flex-start;
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-template-rows: auto;
      gap: 2rem;

      .v-list-item {
        margin-bottom: 0;
      }
    }
  }
}
</style>