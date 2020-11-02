<template>
  <div id="game-table">
    <div id="deck">
      <h2>Deck</h2>
      <div>Deck ID: {{ this.deck_id }}</div>
      <br />
      <button v-on:click="drawCards">Draw Cards</button>
    </div>
    <div id="dealer">
      <h2>Dealer</h2>
      <hr />
      <div v-if="dealer">
        <div>{{ this.dealer.hand }}</div>
        <hr />
        <!-- <img :src="dealer.hand[0].image" alt="" /> -->
        <img :src="dealer.hand[1].image" alt="" />
      </div>
    </div>
    <div id="player">
      <h2>Player</h2>
      <hr />
      <div v-if="player">
        <div>{{ this.player.hand }}</div>
        <hr />
        <img :src="player.hand[0].image" alt="" />
        <img :src="player.hand[1].image" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import CardsAPI from "../api/CardsAPI";

export default {
  name: "game-table",
  data() {
    return {
      deck_id: "",
      player: {
        hand: [],
        cardTotal: 0,
      },
      dealer: {
        hand: [],
        cardTotal: 0,
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
        //dealer side
        this.dealer.hand.push(res.cards[1], res.cards[3]);
      });
    },
  },
  computed: {
    totalHandValue(player) {
      let cardTotal = 0;
      player.hand.forEach((card) => {
        if (
          card.value === "KING" ||
          card.value === "QUEEN" ||
          card.value === "JACK"
        ) {
          cardTotal += 10;
        } else if (card.value === "ACE") {
          if (cardTotal < 11) {
            cardTotal += 11;
          } else {
            cardTotal += 1;
          }
        } else {
          cardTotal += parseInt(card.value);
        }
      });
      return cardTotal;
    },
  },
};
</script>

<style scoped>
#game-table {
  border: 1px solid black;
  margin: 20px;
}
</style>