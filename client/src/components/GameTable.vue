<template>
  <div id="game-table">
    <deck></deck>
    <dealer></dealer>
    <player></player>
    <buttonList></buttonList>
    <results></results>
  </div>
</template>

<script>
import Results from "./Result";
import Dealer from "./Dealer";
import Deck from "./Deck";
import Player from "./Player";
import ButtonList from "./ButtonList";

export default {
  components: {
    results: Results,
    dealer: Dealer,
    deck: Deck,
    player: Player,
    buttonList: ButtonList,
  },
};
</script>

<style scoped>
#game-table {
  border: 1px solid black;
  margin: 20px;
}
</style>