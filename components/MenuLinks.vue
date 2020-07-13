/* eslint-disable */
<template>
  <!-- Links Wrapper -->
  <v-list :class="listClass" rounded :width="width">
    <!-- General links -->
    <v-list-item
      v-for="(item, i) in generalLinks"
      :key="i + `-${item.title}`"
      :to="item.to"
      :class="[
        highlightPortfolioLink && item.title === 'Portfolio'
          ? 'highlight-portfolio-link'
          : 'no-highlight'
      ]"
      router
      exact
    >
      <v-list-item-content>
        <v-list-item-title :class="listItemClass" v-text="item.title" />
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
    },
    width: {
      type: String,
      default: ''
    }
  },
  computed: {
    ...mapState(['highlightPortfolioLink'])
  },
  data() {
    return {}
  },
  watch: {
    highlight() {}
  }
}
</script>

<style lang="scss">
.highlight-portfolio-link {
  background: orange;
  transition: all 0.5s ease;
}

.no-highlight {
  background: none;
  transition: all 0.5s ease;
}
</style>
