export const state = () => ({
  blogPosts: [],
  highlightPortfolioLink: false,
  portfolioItems: []
})

export const actions = {
  async getBlogPosts({ commit }) {
    let posts = await require.context(
      '~/assets/content/blog/',
      false,
      /\.json$/
    )
    let blogPosts = posts.keys().map(key => {
      let res = posts(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setBlogPosts', blogPosts)
  },

  async getPortfolioItems({ commit }) {
    let items = await require.context(
      '~/assets/content/portfolio/',
      false,
      /\.json$/
    )
    let portfolioItems = items.keys().map(key => {
      let res = items(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setPortfolioItems', portfolioItems)
  }
}

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list
  },
  setPortfolioItems(state, list) {
    state.portfolioItems = list
  },
  toggleHighlightPortfolioLink(state) {
    state.highlightPortfolioLink = !state.highlightPortfolioLink
  }
}
