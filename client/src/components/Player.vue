<template>
  <div id="player">
    <h2>Player</h2>
    <hr />
    <div>{{ this.player.hand }}</div>
    <hr />
    <img :src="player.hand[0].image" alt="" />
    <img :src="player.hand[1].image" alt="" />
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "player",
  //   props: ["player"],
  data() {
    return {
      player: null,
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