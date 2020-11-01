<template>
  <div>
    <h1>BlackJack</h1>
    <div>Deck ID: {{ this.deck_id }}</div>
    <br />
    <button v-on:click="drawCards">Draw Cards</button>
    <div>{{ this.player.hand }}</div>
    <div>{{ this.player.cardImgs }}</div>
    <img :src="player.cardImgs[0]" alt="" />
    <img :src="player.cardImgs[1]" alt="" />
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
        res.cards.forEach((card) => {
          this.player.hand.push(card);
          this.player.cardImgs.push(card.image);
        });
      });
    },
  },
};
</script>

<style></style>