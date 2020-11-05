

describe('App', () => {
    beforeEach(() => {
        cy.visit('http://localhost:8080/', () => {
            console.log("App loaded");
        })
    })

    it('Should deal cards', () => {
        cy.get('#draw').click();
        cy.get(this.player.hand).should('have.length', 2);
        cy.get(this.dealer.hand).should('have.length', 2)
    })

    it('should deal another card to player on hit', () => {
        cy.get('#hit').click();
        cy.get(player.hand).should('have.length', 3)

    })
    
    it('should change to dealer turn on stick', () => {
        cy.get('#stick').click();
        cy.get(dealerTurn).should('eq', true)
    })

    it('should reset game and deal more cards', () => {
        cy.get('#deal').click();
        cy.get(cy.get(playerTurn).should('eq', true));
        cy.get(player.hand).should('have.length', 2);
        cy.get(dealer.hand).should('have.length', 2)
    })

})