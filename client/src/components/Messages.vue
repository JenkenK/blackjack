<template>
  <div id="message">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "message",
  props: {
    message: String,
  },
};
</script>

<style scoped>
</style>