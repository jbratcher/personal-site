export const state = () => ({
  highlightPortfolioLink: false
})

export const actions = {
  toggleHighlightPortfolioLink() {
    state.highlightPortfolioLink = !state.highlightPortfolioLink
    console.log(state.highlightPortfolioLink)
  }
}
