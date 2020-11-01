<template>
  <div id="app">
    <h1>BlackJack</h1>
    <game-table></game-table>
  </div>
</template>

<script>
import GameTable from "./components/GameTable";

export default {
  name: "app",
  components: {
    "game-table": GameTable,
  },
};
</script>

<style>
#app {
  margin: 0;
  padding: 0;
  text-align: center;
}
</style>