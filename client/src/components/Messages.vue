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
  text-shadow: 2px 2px 5px rgb(14, 14, 14);
  transition: 0.4s;
  color: antiquewhite;
  animation-duration: 0.8s;
  animation-name: blink;
  animation-iteration-count: 4;
  width: auto;
  margin-top: 20px;
  margin-bottom: 20px;
}

@keyframes blink {
  from {
    color: #111111;
  }
  to {
    color: antiquewhite;
  }
}
</style>