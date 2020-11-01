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
        cardImg: [],
      },
      dealer: {
        hand: [],
        cardImg: [],
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
        this.player.hand.push(res.cards[0], res.cards[1]);
        this.player.cardImg.push(res.cards[0].image, res.cards[1].image);
        eventBus.$emit("player", this.player);
        this.dealer.hand.push(res.cards[2], res.cards[3]);
        this.dealer.cardImg.push(res.cards[2].image, res.cards[3].image);
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