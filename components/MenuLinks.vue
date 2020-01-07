/* eslint-disable */
<template>
  <!-- Links Wrapper -->
  <v-list :class="`justify-end ${listClass}`" rounded>
    <!-- General links -->
    <v-list-item
      v-for="(item, i) in generalLinks"
      :key="i + `-${item.title}`"
      :to="item.to"
      :class="[item.title === 'Portfolio' && highlightPortfolioLink ? 'highlight-portfolio-link' : 'no-highlight']"
      router
      exact
    >
      <v-list-item-content>
        <v-list-item-title v-text="item.title" />
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'MenuLinks',
  props: {
    generalLinks: {
      type: Array,
      default() {
        return []
      }
    },
    listClass: {
      type: String,
      default: ''
    },
    listItemClass: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['highlightPortfolioLink'])
  }
}
</script>

<style lang="scss">
.v-list-item {
  flex: 0;
  margin: 0 0.5rem;
  padding: 0 1.5rem;
}

.v-list-item__title {
  font-weight: 400;
  font-size: 1.25rem;
}

.highlight-portfolio-link {
  background: orange;
  transition: all 0.5s ease;
}

.no-highlight {
  background: none;
  transition: all 0.5s ease;
}
</style>
