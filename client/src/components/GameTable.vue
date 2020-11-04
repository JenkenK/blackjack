<template>
  <div id="game-table">
    <div id="dealer">
      <div class="details">
        <h2>Dealer</h2>
        <p v-if="!playerTurn" id="total-hand">{{ totalHandValue(dealer) }}</p>
      </div>
      <div>
        <div id="dealer-img">
          <div v-if="playerTurn">
            <img src="../assets/back_of_card.png" alt="">
          </div>
          <div v-else>
            <img :src="this.dealer.cardImg[0]" alt="" />
          </div>
          <div v-for="(card, index) in this.dealer.cardImg" :key="index">
            <img :src="card" alt="" />
          </div>

        </div>
      </div>
    </div>
    <div id="player">
      <div class="details">
        <h2>Player</h2>
        <p id="total-hand">{{ totalHandValue(player) }}</p>
      </div>
      <div>
        <div id="player-img">
          <div v-for="(card, index) in this.player.cardImg" :key="index">
            <img :src="card" alt="" />
          </div>
        </div>
      </div>
    </div>
    <div class="col-3 sidebar">
      <message-box v-if="message" :message="message"></message-box>
    </div>
    <aside>
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
    </aside>
  </div>
</template>

<script>
import CardsAPI from "../api/CardsAPI";
import MessageBox from "@/components/Messages.vue";

export default {
  name: "game-table",
  components: {
    "message-box": MessageBox,
  },
  data() {
    return {
      deck_id: "",
      player: {
        hand: [],
        cardTotal: 0,
        cardNum: 0,
        cardImg: [],
        aces: 0,
        hasBlackjack: false,
      },
      dealer: {
        hand: [],
        cardNum: 0,
        cardTotal: 0,
        cardImg: [],
        aces: 0,
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
      this.player.aces = 0
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
      this.dealer.aces = 0;
      this.drawCards();
    },

    totalHandValue(player) {
      let cardTotal = 0;
      player.hand.forEach(card => {
        if (
          card.value === "KING" ||
          card.value === "QUEEN" ||
          card.value === "JACK"
        ) {
          cardTotal += 10;
        } else if (card.value === "ACE") {
          if (cardTotal < 11 && player.aces <= 1) {
            cardTotal += 11;
          } else if (cardTotal > 21 && player.aces > 1) {
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
        if (this.player.cardTotal === 21){
          this.playerTurn = false
          this.dealerTurn();
        }else {
        this.checkWinner()
        };
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
          player.cardTotal = this.totalHandValue(player);
        });
      });
      // this.player.cardTotal = this.totalHandValue(player);
      // if (this.hasBlackjack()) {
      //   player.hasBlackjack = true;
      //   if (this.dealer.cardTotal !== 10 && this.dealer.cardTotal !== 11) {
      //     this.playerTurn = false;
      //     this.checkWinner();
      //   } else {
      //     this.dealerTurn();
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
        if (this.dealer.hasBlackjack === true) {
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
  font-family: "Abril Fatface", cursive;
  border: 1px solid black;
  background-color: rgb(31, 16, 16);
  color: rgb(175, 201, 26);
}

.cards {
  margin: 5px;
}

#dealer-img,
#player-img, 
.details {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: baseline;
}

#dealer-img > div:nth-child(2) {
  display: none;

}

img {
  width: 100px;
}
#total-hand {
  /* position: absolute;
  top: -1.5rem;
  right: -1.5rem; */
  border-radius: 50%;
  background: #eff0fc;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  color: red;
  text-align: center;
  line-height: 2em;
  margin: 5px;
  position: static;
}

.button {
  background-color: #4caf50;
  border: none;
  color: brown;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 2em;
}

.button:hover {
  outline: none;
  box-shadow: 5px black;
}

.button:focus {
  outline: none;
  box-shadow: none;
}
</style>