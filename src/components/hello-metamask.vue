<template>
  <div>
    <p>user: {{ users }}</p>
  </div>
</template>

<script>
export default {
  name: 'hello-metamask',
  computed: {
    users () {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped>
</style>
