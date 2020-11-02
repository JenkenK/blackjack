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
      <div>
        <div>{{ this.dealer.hand }}</div>
        <hr />
        <!-- <img :src="dealer.cardImg[0]" alt="" /> -->
        <img :src="dealer.cardImg[1]" alt="" />
        <p>Total Score: {{ totalHandValue(dealer) }}</p>
      </div>
    </div>
    <div id="player">
      <h2>Player</h2>
      <hr />
      <div>
        <div>{{ this.player.hand }}</div>
        <hr />
        <img :src="player.cardImg[0]" alt="" />
        <img :src="player.cardImg[1]" alt="" />
        <p>Total Score: {{ totalHandValue(player) }}</p>
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
        cardImg: [],
      },
      dealer: {
        hand: [],
        cardTotal: 0,
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
        // player side
        this.player.hand.push(res.cards[0], res.cards[2]);
        this.player.cardImg.push(res.cards[0].image, res.cards[2].image);
        //dealer side
        this.dealer.hand.push(res.cards[1], res.cards[3]);
        this.dealer.cardImg.push(res.cards[1].image, res.cards[3].image);
      });
    },
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