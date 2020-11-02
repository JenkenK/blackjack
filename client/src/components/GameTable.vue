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
        <div v-for="(card, index) in this.dealer.cardImg" :key="index">
          <img :src="card" alt="" />
        </div>
        <p>Total Score: {{ totalHandValue(dealer) }}</p>
        <p>Number of Cards: {{ this.dealer.cardNum }}</p>
      </div>
    </div>
    <div id="player">
      <h2>Player</h2>
      <hr />
      <div>
        <div>{{ this.player.hand }}</div>
        <hr />
        <div v-for="(card, index) in this.player.cardImg" :key="index">
          <img :src="card" alt="" />
        </div>
        <br />
        <button v-on:click="playerHit" :disabled="!playerTurn">HIT ME</button>
        <button v-on:click="dealerTurn(dealer)" :disabled="!playerTurn">
          Stick
        </button>
        <p>Total Score: {{ totalHandValue(player) }}</p>
        <p>Number of Cards: {{ this.player.cardNum }}</p>
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
        hasBlackjack: false,
      },
      dealer: {
        hand: [],
        cardNum: 0,
        cardTotal: 0,
        cardImg: [],
        dealerTurn: false,
        hasBlackjack: false,
      },
      gameHistory: [],
      gameEnd: false,
      playerTurn: false,
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

        this.playerTurn = true;
      });
    },
    newGame() {
      this.message = "";
      this.player.hand = [];
      this.dealer.hand = [];
      this.playerTurn = true;
    },
    resetGame() {
      this.gameEnd = false;
      this.playerTurn = false;
      this.message = "";
      this.player.cardNum = 0;
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

    playerHit() {
      return this.hitMe(this.player, 1).then(() => {
        this.checkWinner();
      });
    },

    hitMe(player, number) {
      return CardsAPI.draw(this.deck_id, number).then((res) => {
        res.cards.forEach((card) => {
          player.hand.push(card);
          player.cardImg.push(card.image);
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

    checkWinner() {
      if (this.player.cardTotal > 21) {
        this.message = "Dealer WINS!";
        this.gameEnd = true;
        this.playerTurn = false;
        this.writeResult("lost");
      } else if (this.player.hasBlackjack) {
        this.message = "Player has BLAAAAACKJAAAACK!";
        this.gameEnd = true;
        this.playerTurn = false;
        this.writeResult("blackjack");
      } else if (!this.playerTurn) {
        if (
          this.dealer.handValue > 21 ||
          this.dealer.cardTotal < this.player.cardTotal
        ) {
          this.message = "Player WINS!!!";
          this.gameEnd = true;
        } else if (this.dealer.cardTotal === this.player.cardTotal) {
          this.message = "DRAW! NO WINNER";
        } else if (!this.playerTurn) {
          this.message = "Dealer WINS!";
          this.gameEnd = true;
          this.writeResult("lost");
        }
      }
    },

    hasBlackjack() {
      return this.player.cardNum === 2 && this.player.cardTotal === 21;
    },

    dealerTurn() {
      this.playerTurn = false;
      this.hitMe(this.dealer, 1).then(() => {
        if (this.dealer.cardTotal > 16) {
          this.checkWinner();
        } else {
          this.dealerTurn();
        }
      });
    },

    writeResult(result) {
      this.gameHistory.push({
        result: result,
      });
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