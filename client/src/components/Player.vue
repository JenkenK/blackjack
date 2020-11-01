<template>
  <div id="player">
    <h2>Player</h2>
    <div>{{ this.player.hand }}</div>
    <div>{{ this.player.cardImgs }}</div>
    <img :src="player.cardImgs[0]" alt="" />
    <img :src="player.cardImgs[1]" alt="" />
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "player",
  //   props: ["player"],
  data() {
    return {
      player: {
        cardImgs: [],
        hand: [],
      },
    };
  },
  mounted() {
    eventBus.$on("player", (data) => {
      this.player = data;
    });
  },
};
</script>

<style>
</style>