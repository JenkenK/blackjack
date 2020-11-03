<template>
    <aside>
        <button v-on:click="drawCards" class="button">Draw Cards</button>
        <button class="new-game" @click="resetGame()" :disabled="playerTurn">Deal Again!</button>
        <button v-on:click="playerHit" :disabled="!playerTurn" class="button">Hit Me</button>
        <button v-on:click="dealerTurn(dealer)" :disabled="!playerTurn" class="button">Stick</button>
    </aside>
</template>

<script>
export default {
    name: "button-field"
}
</script>

<style lang="css" scoped>

.button {
    background-color: #4caf50;
    border: none;
    color: white;
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
</style><template>
