<template>
  <div id="player">
    <h2>Player</h2>
    <hr />
    <div>{{ this.player.hand }}</div>
    <hr />
    <div>{{ this.player.cardImg }}</div>
    <hr />
    <img :src="player.cardImg[0]" alt="" />
    <img :src="player.cardImg[1]" alt="" />
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
        hand: [],
        cardImg: [],
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