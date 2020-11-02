<template>
  <div id="dealer">
    <h2>Dealer</h2>
    <hr />
    <div>{{ this.dealer.hand }}</div>
    <hr />
    <!-- <img :src="dealer.hand[0].image" alt="" /> -->
    <img :src="dealer.hand[1].image" alt="" />
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "dealer",
  data() {
    return {
      dealer: null,
    };
  },
  mounted() {
    eventBus.$on("dealer", (data) => {
      this.dealer = data;
    });
  },
};
</script>

<style>
</style>