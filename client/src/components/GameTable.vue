<template>
  <div id="game-table">
    <div id="deck">
      <h2>Deck</h2>
      <div>Deck ID: {{ this.deck_id }}</div>
      <br />
      <button v-on:click="drawCards">Draw Cards</button>
    </div>
    <p>{{ this.totalHandValue }}</p>
    <player></player>
    <dealer></dealer>

    <buttonList></buttonList>
    <results></results>
  </div>
</template>

<script>
import { eventBus } from "../main.js";
import CardsAPI from "../api/CardsAPI";
import Results from "./Result";
import Dealer from "./Dealer";
import Player from "./Player";
import ButtonList from "./ButtonList";

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
  components: {
    results: Results,
    dealer: Dealer,
    player: Player,
    buttonList: ButtonList,
  },
  mounted() {
    // eventBus.$on("player", (data) => {
    //   this.player = data;
    // });
    // eventBus.$on("dealer", (data) => {
    //   this.dealer = data;
    // });
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