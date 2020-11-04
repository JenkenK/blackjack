<template>
  <div id="header">
    <h1>BLACKJACK.</h1>
    <section id="wrapper">
      <h2>Rules:</h2>
      <div class="tooltip-wrap">
        <img id="resize" src="../assets/back_of_card.png" alt="Some Image" />
          <div class="tooltip-content">
            <p>
              <ul> 
                  <li>The goal of Blackjack is to beat the dealer's hand without going over 21.</li>
                  <li>Face cards are worth 10. Aces are worth 1 or 11, whichever makes a better hand.</li>
                  <li>Each player starts with two cards, one of the dealer's cards is hidden until the end.</li>
                  <li>To 'Hit' is to ask for another card. To 'Stick' is to hold your total and end your turn.</li>
                  <li>If you go over 21 you bust, and the dealer wins regardless of the dealer's hand.</li>
                  <li>If you are dealt 21 from the start (Ace and 10), you got a blackjack.</li>
                  <li>Dealer will hit until his/her cards total 17 or higher.</li>
              </ul>
            </p>
          </div> 
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "app-header",
};
</script>

<style lang="css" scoped>
header {
  font-family: "Abril Fatface", cursive;
  margin: 0;
  padding: 0;
}

h1 {
  font-size: 46px;
  letter-spacing: 6px;
  text-decoration: underline;
  margin: none;
  margin-block-start: 0 !important;
  margin-block-end: 0 !important;
  padding: 2vh 2vw;
}

h2 {
  margin: 0;
  padding: 0;
  margin-top: 5px;
  margin-right: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
}

.tooltip-wrap .tooltip-content {
  display: none;
  position: absolute;
  background-color: #fff;
  padding: 0.5em;
  width: 600px;
}
.tooltip-wrap:hover .tooltip-content {
  display: block;
}
#resize {
  width: 30px;
  height: auto;
  cursor: help;
}
ul {
  list-style-position: outside;
  font-size: 15px;
  position: relative;
  text-align: left;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

#wrapper {
  display: flex;
  align-content: center;
  justify-content: center;
}
</style>