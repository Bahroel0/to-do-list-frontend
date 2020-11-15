<template>
  <v-app dark>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-snackbar
      v-model="snackbar.visibility"
      :color="snackbar.color"
      :timeout="2000"
      bottom
      left
    >
      {{ snackbar.text }}
    </v-snackbar>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
  computed: {
    snackbar() {
      return this.$store.state.snackbar
    },
  },
}
</script>
