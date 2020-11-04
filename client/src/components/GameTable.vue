<template>
  <div id="game-table">
    <dealer
      :dealer="this.dealer"
      :playerTurn="this.playerTurn"
      :totalHandValue="this.totalHandValue"
      v-if="this.gameActive"
    ></dealer>
    <message-box v-if="message" :message="message"></message-box>
    <player
      :player="this.player"
      :playerTurn="this.playerTurn"
      :totalHandValue="this.totalHandValue"
      v-if="this.gameActive"
    ></player>
    <section id="buttons">
      <button v-on:click="newGame()" v-if="firstDraw" class="button">
        Draw Cards
      </button>
      <button
        v-on:click="resetGame()"
        :disabled="playerTurn"
        v-if="this.gameActive"
        class="button"
      >
        Deal Again!
      </button>
      <button
        v-on:click="playerHit"
        :disabled="!playerTurn"
        v-if="this.gameActive"
        class="button"
      >
        Hit Me
      </button>
      <button
        v-on:click="dealerTurn(dealer)"
        :disabled="!playerTurn"
        class="button"
        v-if="this.gameActive"
      >
        Stick
      </button>
    </section>
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
      gameActive: false,
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
    newGame() {
      this.gameActive = true;
      this.hasBlackjack();
      this.message = "";
      this.player.hand = [];
      this.dealer.hand = [];
      this.hitMe(this.player, 2);
      this.hitMe(this.dealer, 2);
      this.playerTurn = true;
      this.player.aces = 0;
      this.dealer.aces = 0;
      this.firstDraw = false;
    },

    resetGame() {
      this.gameEnd = false;
      this.playerTurn = true;
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
      this.dealer.aces = 0;
      this.player.aces = 0;
      this.hitMe(this.player, 2);
      this.hitMe(this.dealer, 2);
      this.firstDraw = false;
    },

    totalHandValue(player) {
      player.cardTotal = 0;
      let initialAces = player.aces;
      player.hand.forEach((card) => {
        if (
          card.value === "KING" ||
          card.value === "QUEEN" ||
          card.value === "JACK"
        ) {
          player.cardTotal += 10;
        } else if (card.value === "ACE") {
          player.cardTotal += 11;
          this.checkAces(player, initialAces);
        } else {
          player.cardTotal += parseInt(card.value);
          this.checkAces(player, initialAces);
        }
      });
      return player.cardTotal;
    },

    playerHit() {
      return this.hitMe(this.player, 1).then(() => {
        player.cardTotal = 0;
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
          if (card.value === "ACE") {
            player.aces += 1;
          }
          this.totalHandValue(player);
          this.hasBlackjack();
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
      } else if (this.totalHandValue(this.dealer) >= 17) {
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

    checkAces(player, initialAces) {
      while (player.cardTotal > 21 && initialAces) {
        player.cardTotal -= 10;
        initialAces -= 1;
      }
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
  background-image: url("../assets/wood.jpeg");
  /* background: rgb(0, 67, 13);
  background: linear-gradient(
    315deg,
    rgba(0, 67, 13, 1) 0%,
    rgba(0, 139, 5, 1) 100%
  ); */
  width: 75%;
  min-height: 80vh;
  margin: auto;
  border: 15px inset #a50104;
}

h2 {
  font-weight: 300;
  font-size: 36px;
}

.button {
  background-image: url("../assets/wood1.jpeg");
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

.button:disabled,
.button[disabled] {
  background-color: #797979;
  color: #303030;
  box-shadow: none;
  cursor: default;
}
</style>