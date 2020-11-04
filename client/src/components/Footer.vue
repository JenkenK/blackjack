<template>
  <section id="footer">
    <h2>FOOTER YO!</h2>
        <h2>Check out the rules:</h2>
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
</template>

<script>
export default {
  name: "app-footer",
};
</script>

<style lang="css" scoped>
#footer {
  font-family: "Abril Fatface", cursive;
  margin: 0;
  padding: 0;
  font-size: 10px;

}

.tooltip-wrap .tooltip-content {
  display: none;
  position: absolute;
  bottom: 5%;
  left: 5%;
  right: 5%;
  background-color: #fff;
  padding: .5em;
}
.tooltip-wrap:hover .tooltip-content {
  display: block;
}

#resize {
    width: 30px;
    height: auto;
}

ul {
    list-style-position: inside;
    font-size: 15px;
    position: relative;

}

h2 {
  font-size: 26px;
}
</style>