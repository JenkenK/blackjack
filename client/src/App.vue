<template>
  <div id="app">
    <app-header></app-header>
    <game-table></game-table>
    <app-footer></app-footer>
  </div>
</template>

<script>
import GameTable from "./components/GameTable";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default {
  name: "app",
  components: {
    "game-table": GameTable,
    "app-header": Header,
    "app-footer": Footer,
  },
};
</script>

<style lang="css" scoped>
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");

#app {
  margin: 0 !important;
  padding: 0;
  text-align: center;
  font-family: "Abril Fatface", cursive;
  background-size: cover;
}
</style>