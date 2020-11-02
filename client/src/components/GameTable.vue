<template>
  <div id="game-table">
    <div id="deck">
      <h2>Deck</h2>
      <div>Deck ID: {{ this.deck_id }}</div>
      <br />
      <button v-on:click="drawCards">Draw Cards</button>
      <!-- <button v-on:click="hitMe">HIT ME</button> -->
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
        <p>{{ this.dealer.cardNum }}</p>
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
        <p>{{ this.player.cardNum }}</p>
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
        cardNum: 0,
        cardImg: [],
        playerTurn: false,
      },
      dealer: {
        hand: [],
        cardNum: 0,
        cardTotal: 0,
        cardImg: [],
        dealerTurn: false,
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
        this.player.cardNum += 2;
        //dealer side
        this.dealer.hand.push(res.cards[1], res.cards[3]);
        this.dealer.cardImg.push(res.cards[1].image, res.cards[3].image);
        this.dealer.cardNum += 2;
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
    hitMe(player, number) {
      return CardsAPI.draw(this.deck_id, number).then((res) => {
        res.cards.forEach((card) => {
          player.hand.push(card);
          player.cardNum += 1;
        });
      });
      player.cardTotal = this.totalHandValue(player);
      if (this.dealer.cardTotal !== 10 && this.dealer.cardTotal !== 11) {
        this.playerTurn = false;
        this.checkWinner();
      } else {
        this.dealerTurn();
      }
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