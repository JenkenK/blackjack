
<template>
  <div id="dealer">
    <div class="details">
      <h2>Dealer</h2>
      <p v-if="!playerTurn" id="total-hand">{{ dealer.cardTotal }}</p>
    </div>
    <div>
      <div id="dealer-img">
        <div v-if="playerTurn">
          <img class="pre-dealer" src="../assets/back_of_card.png" alt="" />
        </div>
        <div v-else>
          <img class="post-dealer" :src="this.dealer.cardImg[0]" alt="" />
        </div>
        <div v-for="(card, index) in this.dealer.cardImg" :key="index">
          <img :src="card" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "dealer",
  props: {
    dealer: Object,
    playerTurn: Boolean,
    totalHandValue: Function,
    player: Object,
  },
};
</script>

<style scoped>
#dealer {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  margin-bottom: 10px;
}

h2 {
  font-weight: 350;
  font-size: 44px;
  padding: 5px;
  margin: 10px;
  color: white;
}

img {
  width: 8vw;
  margin: 2px;
}

#dealer-img > div:nth-child(2) {
  display: none;
}

#dealer-img,
.details {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
}

#total-hand {
  /* position: absolute;
  top: -1.5rem;
  right: -1.5rem; */
  border-radius: 50%;
  background: #eff0fc;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  color: red;
  text-align: center;
  line-height: 2em;
  margin: 5px;
  position: static;
}

.pre-dealer {
  transform: rotateY(180deg);
}

.post-dealer {
  transition: transform 0.6s;
  transform-style: preserve-3d;
  /* -webkit-visibility: hidden; */
  backface-visibility: hidden;
}
</style>