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
      deck: [],
      deck_id: "",
      player: {
        hand: [],
        cardImgs: [],
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
      CardsAPI.draw(this.deck_id, 2).then((res) => {
        console.log(res);
        res.cards.forEach((card) => {
          this.player.hand.push(card);
          this.player.cardImgs.push(card.image);
        });
        eventBus.$emit("player", this.player);
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