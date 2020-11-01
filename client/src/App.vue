<template>
  <div>
    <h1>BlackJack</h1>
    <div>{{ drawCards(this.deck_id, 2) }}</div>
    <div>{{ this.deck_id }}</div>
    <div>{{ this.player.hand }}</div>
  </div>
</template>

<script>
import CardsAPI from "./api/CardsAPI.js";

export default {
  data() {
    return {
      deck_id: "",
      player: {
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
      CardsAPI.draw(this.deck_id, 2).then((res) => {
        res.cards.forEach((card) => {
          this.player.hand.push(card);
        });
      });
    },
  },
};
</script>

<style></style>