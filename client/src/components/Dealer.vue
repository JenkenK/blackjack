<template>
  <div id="dealer">
    <h2>Dealer</h2>
    <hr />
    <div>{{ this.dealer.hand }}</div>
    <hr />
    <div>{{ this.dealer.cardImg }}</div>
    <hr />
    <!-- <img :src="dealer.cardImg[0]" alt="" /> -->
    <img :src="dealer.cardImg[1]" alt="" />
  </div>
</template>

<script>
import { eventBus } from "../main.js";
export default {
  name: "dealer",
  data() {
    return {
      dealer: {
        hand: [],
      },
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