
<template>
  <div id="dealer">
    <div class="details">
      <h2>Dealer</h2>
      <p v-if="!playerTurn" id="total-hand">{{ totalHandValue(dealer) }}</p>
    </div>
    <div>
      <div id="dealer-img">
        <div v-if="playerTurn">
          <img src="../assets/back_of_card.png" alt="" />
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
</template>

<script>
export default {
  name: "dealer",
  props: {
    dealer: Object,
    playerTurn: Boolean,
    totalHandValue: Function,
  },
};
</script>

<style scoped>
#dealer {
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

h2 {
  font-weight: 300;
  font-size: 36px;
  padding: 5px;
  margin: 10px;
}

img {
  width: 250px;
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
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  color: red;
  text-align: center;
  line-height: 2em;
  margin: 5px;
  position: static;
}
</style>