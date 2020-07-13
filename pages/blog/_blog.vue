<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <!-- Hero Section -->
        <TheBlogSplash
          :articleUpdatedAt="formatDate(post.updatedAt)"
          :authorName="post.author.name"
          :avatarSrc="post.author.img"
          :headerText="post.title"
          imageSource="/images/vbanner.jpg"
          :subText="post.description"
        />

        <article class="mb-12">
          <v-container
            class="py-0"
            :class="$breakpoint.mdAndUp ? 'px-12' : 'px-0'"
          >
            <v-row>
              <v-col :class="$breakpoint.mdAndUp ? 'px-0' : 'py-0 px-0'">
                <v-card
                  class="mx-auto py-12 px-9"
                  flat
                  :width="$breakpoint.mdAndUp ? '75vw' : '100%'"
                >
                  <template>
                    <h2
                      class="font-weight-bold pt-6 pb-3"
                      :class="$breakpoint.mdAndUp ? 'title' : 'display-1'"
                    >
                      Table of Contents
                    </h2>
                    <ul class="mb-12 pl-0 table-of-contents">
                      <li
                        v-for="link of post.toc"
                        :key="link.id"
                        :class="{
                          toc2: link.depth === 2,
                          toc3: link.depth === 3
                        }"
                      >
                        <NuxtLink :to="`#${link.id}`">{{ link.text }}</NuxtLink>
                      </li>
                    </ul>
                  </template>
                  <nuxt-content :document="post" />
                </v-card>
              </v-col>
            </v-row>
          </v-container>
        </article>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  head() {
    let post = this.post
    return {
      title: `${post.title} | Nuxt Netlify CMS Starter Kit`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `${post.description}`
        }
      ]
    }
  },
  async asyncData({ $content, params }) {
    const post = await $content('blog', params.blog).fetch()
    const [prev, next] = await $content('blog')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.blog)
      .fetch()
    return {
      post,
      prev,
      next
    }
  },
  methods: {
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      return new Date(date).toLocaleDateString('en', options)
    }
  }
}
</script>
<style lang="scss" scoped>
.table-of-contents {
  list-style-type: none;
}
</style>
