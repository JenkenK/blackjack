<template>
  <div id="message">
    <p id="message-shown">
      {{ message }}
    </p>
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
#message-shown {
  font-size: 60px;
  color: #fca311;
  animation-duration: 0.5s;
  animation-name: blink;
  animation-iteration-count: infinite;
}

@keyframes blink {
  from {
    color: #fca311;
  }
  to {
    color: red;
  }
}
</style>