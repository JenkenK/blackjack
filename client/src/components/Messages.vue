<template>
  <div class="message-box alert">
    {{ message }}
  </div>
</template>

<script>
export default {
  name: "MessageBox",
  props: {
    message: String,
  },
};
</script>

<style scoped>
</style>