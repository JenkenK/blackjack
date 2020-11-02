<template>
  <div id="deck">
    <h2>Deck</h2>
    <div>Deck ID: {{ this.deck_id }}</div>
    <br />
    <button v-on:click="drawCards">Draw Cards</button>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import CardsAPI from "../api/CardsAPI";

export default {
  data() {
    return {
      // deck: [],
      deck_id: "",
      player: {
        hand: [],
      },
      dealer: {
        hand: [],
      },
    };
  },
  mounted() {
    CardsAPI.shuffleNewDeck().then((res) => {
      this.deck_id = res.deck_id;
    });
  },
  methods: {
    drawCards() {
      CardsAPI.draw(this.deck_id, 4).then((res) => {
        // player side
        this.player.hand.push(res.cards[0], res.cards[2]);
        eventBus.$emit("player", this.player);
        //dealer side
        this.dealer.hand.push(res.cards[1], res.cards[3]);
        eventBus.$emit("dealer", this.dealer);
      });
    },
  },
};
</script>

<style scoped>
#id {
  border: 2px solid black;
}
</style>