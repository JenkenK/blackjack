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

<style>
#app {
  margin: 0;
  padding: 0;
  text-align: center;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  
}
</style>