<template>
  <div id="game-table">
    <dealer
      :dealer="this.dealer"
      :playerTurn="this.playerTurn"
      :totalHandValue="this.totalHandValue"
    ></dealer>
    <player
      :player="this.player"
      :playerTurn="this.playerTurn"
      :totalHandValue="this.totalHandValue"
    ></player>
    <section>
      <button v-on:click="drawCards" v-if="firstDraw" class="button">
        Draw Cards
      </button>
      <button v-on:click="resetGame()" :disabled="playerTurn" class="button">
        Deal Again!
      </button>
      <button v-on:click="playerHit" :disabled="!playerTurn" class="button">
        Hit Me
      </button>
      <button
        v-on:click="dealerTurn(dealer)"
        :disabled="!playerTurn"
        class="button"
      >
        Stick
      </button>
    </section>
    <message-box v-if="message" :message="message"></message-box>
  </div>
</template>

<script>
import CardsAPI from "../api/CardsAPI.js";
import Message from "@/components/Messages.vue";
import Dealer from "@/components/Dealer.vue";
import Player from "@/components/Player.vue";

export default {
  name: "game-table",
  components: {
    "message-box": Message,
    dealer: Dealer,
    player: Player,
  },
  data() {
    return {
      deck_id: "",
      player: {
        hand: [],
        cardTotal: 0,
        cardNum: 0,
        cardImg: [],
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
      gameEnd: true,
      playerTurn: false,
      message: "",
      firstDraw: true,
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
        this.firstDraw = false;

        // player side
        this.player.hand.push(res.cards[0], res.cards[2]);
        this.player.cardImg.push(res.cards[0].image, res.cards[2].image);
        this.player.cardNum += 2;
        this.player.cardTotal = this.totalHandValue(this.player);
        //dealer side
        this.dealer.hand.push(res.cards[1], res.cards[3]);
        this.dealer.cardImg.push(res.cards[1].image, res.cards[3].image);
        this.dealer.cardNum += 2;
        this.dealer.cardTotal = this.totalHandValue(this.dealer);

        this.playerTurn = true;
        this.hasBlackjack();
        this.checkWinner();
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
      this.dealer.cardNum = 0;
      this.player.hand = [];
      this.dealer.hand = [];
      this.player.cardImg = [];
      this.dealer.cardImg = [];
      this.player.cardTotal = 0;
      this.dealer.cardTotal = 0;
      this.player.hasBlackjack = false;
      this.dealer.hasBlackjack = false;
      this.drawCards();
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
          } else if (cardTotal > 11) {
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
        if (this.player.cardTotal === 21) {
          this.playerTurn = false;
          this.dealerTurn();
        } else {
          this.checkWinner();
        }
      });
    },

    hitMe(player, number) {
      return CardsAPI.draw(this.deck_id, number).then((res) => {
        res.cards.forEach((card) => {
          player.hand.push(card);
          player.cardImg.push(card.image);
          player.cardNum += 1;
          player.cardTotal = this.totalHandValue(player);
        });
      });
      this.player.cardTotal = this.totalHandValue(player);
      if (this.hasBlackjack()) {
        player.hasBlackjack = true;
        if (this.dealer.cardTotal !== 10 && this.dealer.cardTotal !== 11) {
          this.playerTurn = false;
          this.checkWinner();
        } else {
          this.dealerTurn();
        }
      }
    },

    checkWinner() {
      if (this.player.cardTotal > 21) {
        this.message = "Dealer WINS!";
        this.gameEnd = true;
        this.playerTurn = false;
        // this.writeResult("lost");
      } else if (this.player.hasBlackjack) {
        this.message = "Player has BLAAAAACKJAAAACK!";
        this.gameEnd = true;
        this.playerTurn = false;
        // this.writeResult("blackjack");
      } else if (
        this.player.hasBlackjack === true &&
        this.dealer.hasBlackjack === true
      ) {
        this.message = "PUSH, No winners here";
        this.gameEnd = true;
        this.playerTurn = false;
      } else if (!this.playerTurn) {
        if (this.dealer.cardTotal === this.player.cardTotal) {
          this.message = "DRAW! No winner";
          this.gameEnd = true;
        } else if (this.dealer.hasBlackjack === true) {
          this.message = "Dealer has BLACKJACK.  YOU LOSE!!";
          this.gameEnd = true;
          this.playerTurn = false;
        } else if (
          this.dealer.cardTotal > 21 ||
          this.dealer.cardTotal < this.player.cardTotal
        ) {
          this.message = "Player WINS!!!";
          this.gameEnd = true;
        } else if (this.dealer.cardTotal === this.player.cardTotal) {
          this.message = "DRAW! NO WINNER";
          this.gameEnd = true;
        } else if (!this.playerTurn) {
          this.message = "Dealer WINS!";
          this.gameEnd = true;
          // this.writeResult("lost");
        }
      }
    },

    hasBlackjack() {
      if (
        this.player.cardNum === 2 &&
        this.player.cardTotal === 21 &&
        this.dealer.cardNum === 2 &&
        this.dealer.cardTotal === 21
      ) {
        this.player.hasBlackjack = true;
        this.dealer.hasBlackjack = true;
      } else if (
        this.playerTurn === true &&
        this.player.cardNum === 2 &&
        this.player.cardTotal === 21
      ) {
        this.player.hasBlackjack = true;
      } else if (
        this.playerTurn === false &&
        this.dealer.cardNum === 2 &&
        this.dealer.cardTotal === 21
      ) {
        this.dealer.hasBlackjack = true;
        this.checkWinner();
      }
    },

    dealerTurn() {
      this.playerTurn = false;
      this.hasBlackjack();
      if (this.dealer.hasBlackjack === true) {
        this.checkWinner();
      } else
        this.hitMe(this.dealer, 1).then(() => {
          if (
            this.dealer.cardTotal < 17
            // this.dealer.cardTotal <= this.player.cardTotal
          ) {
            this.dealerTurn();
            this.checkWinner();
          } else if (this.dealer.cardTotal === 21) {
            this.checkWinner();
          } else if (
            this.dealer.cardTotal > 17 &&
            this.dealer.cardTotal === this.player.cardTotal
          ) {
            this.checkWinner();
          } else if (
            this.dealer.cardTotal < 21 &&
            this.dealer.cardTotal > this.player.cardTotal
          ) {
            this.checkWinner();
          } else {
            this.checkWinner();
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

<style lang="css" scoped>
#game-table {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  background-color: #00430d;
  color: rgb(175, 201, 26);
  height: 100vh;
}

h2 {
  font-weight: 300;
  font-size: 36px;
}

.button {
  background-color: #4caf50;
  border: none;
  color: black;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 10px 10px 10px;
  cursor: pointer;
  border-radius: 2em;
}

.button:hover {
  outline: none;
  box-shadow: 3px 3px 5px rgb(44, 44, 44);
  background-color: #800000;
  color: antiquewhite;
}

.button:focus {
  outline: none;
  box-shadow: none;
}
</style>