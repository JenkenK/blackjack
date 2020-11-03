<template>
  <div id="app">
    <app-header></app-header>
    <game-table></game-table>
    <button-field></button-field>
    <app-footer></app-footer>
  </div>
</template>

<script>
import GameTable from "./components/GameTable";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ButtonField from "./components/ButtonField";

export default {
  name: "app",
  components: {
    "game-table": GameTable,
    "app-header": Header,
    "app-footer": Footer,
    "button-field": ButtonField
  },
};
</script>

<style lang="css" scoped>
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");

#app {
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: 'Abril Fatface', cursive;
  background-size: cover;
  background: rgb(211, 123, 123);
}
</style>