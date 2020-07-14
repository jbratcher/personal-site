export const state = () => ({
  highlightPortfolioLink: false
})

export const mutations = {
  toggleHighlightPortfolioLink(state) {
    state.highlightPortfolioLink = !state.highlightPortfolioLink
    console.log(state.highlightPortfolioLink)
  }
}
