<template>
  <v-container class="pa-0 white--text" fluid>
    <v-row>
      <v-col class="pa-0">
        <v-parallax
          dark
          :src="imageSource"
          lazy-src="https://picsum.photos/id/0/10/6"
          width="100%"
        >
          <v-row align="center" justify="center">
            <v-col class="text-center" cols="12" md="8">
              <h1 class="display-2 mb-6">
                {{ headerText }}
              </h1>
              <p
                class="px-6"
                :class="$breakpoint.mdAndUp ? 'headline' : 'display-1'"
              >
                {{ subText }}
              </p>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TheSplash',
  props: {
    imageSource: {
      type: String,
      default: ''
    },
    headerText: {
      type: String,
      default: ''
    },
    subText: {
      type: String,
      default: ''
    },
    avatarSrc: {
      type: String,
      default: ''
    },
    authorName: {
      type: String,
      default: ''
    },
    articleUpdatedAt: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.v-parallax {
  min-width: 100vw;
  > .v-parallax__image-container {
    filter: brightness(0.2);
  }
}
</style>
