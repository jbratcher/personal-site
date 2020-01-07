export const state = () => ({
  blogPosts: [],
  highlightPortfolioLink: false,
})

export const mutations = {
  setBlogPosts(state, list) {
    state.blogPosts = list;
  },
  toggleHighlightPortfolioLink(state, highlightPortfolioLink) {
    console.log('clicked');
    state.highlightPortfolioLink = !state.highlightPortfolioLink;
    console.log(state.highlightPortfolioLink);
  }
}

export const actions = {
  async nuxtServerInit({
    commit
  }) {
    let files = await require.context(
      '~/assets/content/blog/',
      false,
      /\.json$/
    )
    let blogPosts = files.keys().map(key => {
      let res = files(key)
      res.slug = key.slice(2, -5)
      return res
    })
    await commit('setBlogPosts', blogPosts)
  }
}