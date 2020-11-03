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
  animation-duration: infinite;
  animation-name: blink;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}

@keyframes message-shown {
  0% {
    color: #000;
  }
  49% {
    color: #000;
  }
  60% {
    color: transparent;
  }
  99% {
    color: transparent;
  }
  100% {
    color: #000;
  }
}
</style>