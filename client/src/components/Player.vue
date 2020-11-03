<template>
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
</template>

<script>
export default {
  name: "player",
  props: {
    player: Object,
    playerTurn: Boolean,
    totalHandValue: Function,
  },
};
</script>

<style scoped>
#player {
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
  width: 200px;
}

#player-img,
.details {
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
}

#total-hand {
  border-radius: 50%;
  background: #eff0fc;
  width: 2rem;
  height: 2rem;
  font-size: 1rem;
  color: red;
  text-align: center;
  line-height: 2em;
  margin: 5;
  position: static;
}
</style>