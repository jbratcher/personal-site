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
          <v-row align="center" class="mt-12" justify="center">
            <v-col
              class="text-center"
              :class="
                $breakpoint.mdAndUp ? 'mt-12 pa-12 pb-0' : 'mt-6 pa-6 pb-0'
              "
              cols="12"
              md="8"
            >
              <h1 class="display-2 mb-6">
                {{ headerText }}
              </h1>
              <p
                class="px-6"
                :class="$breakpoint.mdAndUp ? 'headline' : 'display-1'"
              >
                {{ subText }}
              </p>
              <v-container class="d-flex px-12">
                <v-avatar :size="$breakpoint.mdAnUp ? '80' : '96'">
                  <img :src="avatarSrc" :alt="authorName" />
                </v-avatar>
                <v-container class="py-0">
                  <v-row align="center">
                    <v-col>
                      <p
                        class="mb-0 text-left"
                        :class="
                          $breakpoint.mdAndUp
                            ? 'subtitle-1'
                            : 'display-1 font-weight-regular'
                        "
                      >
                        {{ authorName }}
                      </p>
                      <p
                        class="mb-0 text-left"
                        :class="$breakpoint.mdAndUp ? 'subtitle-2' : 'headline'"
                      >
                        {{ articleUpdatedAt }}
                      </p>
                    </v-col>
                  </v-row>
                </v-container>
              </v-container>
            </v-col>
          </v-row>
        </v-parallax>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'TheBlogSplash',
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
