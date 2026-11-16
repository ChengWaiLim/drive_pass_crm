<template>
<v-overlay :value="loading">
  <v-progress-circular indeterminate size="64"></v-progress-circular>
</v-overlay>
</template>
<script lang="js">
import Vue from "vue";
export default{
    data: () => ({
      loading: false
    }),
    methods: {
      start() {
        this.loading = true
      },
      finish() {
        this.loading = false
      }
    }
}
</script>
<style lang="sass" scoped>
</style>