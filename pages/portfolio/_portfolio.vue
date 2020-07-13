<template>
  <v-container class="py-0" fluid>
    <v-row>
      <v-col class="pa-0">
        <!-- Hero Section -->
        <ThePortfolioSplash
          :articleUpdatedAt="formatDate(portfolio.updatedAt)"
          :authorName="portfolio.author.name"
          :avatarSrc="portfolio.author.img"
          :headerText="portfolio.title"
          imageSource="/images/vbanner.jpg"
          :subText="portfolio.description"
        />

        <article class="mb-12">
          <v-container
            class="py-0"
            :class="$breakpoint.mdAndUp ? 'px-12' : 'px-0'"
            fluid
          >
            <v-row>
              <v-col class="py-0">
                <v-card
                  class="mx-auto py-12 px-9"
                  flat
                  :width="$breakpoint.mdAndUp ? '75vw' : '100%'"
                >
                  <template v-if="portfolio.toc.length > 0">
                    <h2
                      class="font-weight-bold pt-6 pb-3"
                      :class="$breakpoint.mdAndUp ? 'title' : 'display-1'"
                    >
                      Table of Contents
                    </h2>
                    <ul class="mb-12 pl-0 table-of-contents">
                      <li
                        v-for="link of portfolio.toc"
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
                  <nuxt-content :document="portfolio" />
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
    let portfolio = this.portfolio
    return {
      title: `${portfolio.title} | Nuxt Netlify CMS Starter Kit`,
      meta: [
        {
          hid: `description`,
          name: 'description',
          content: `${portfolio.description}`
        }
      ]
    }
  },
  async asyncData({ $content, params }) {
    const portfolio = await $content('portfolio', params.portfolio).fetch()
    const [prev, next] = await $content('portfolio')
      .only(['title', 'slug'])
      .sortBy('createdAt', 'asc')
      .surround(params.portfolio)
      .fetch()
    return {
      portfolio,
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
