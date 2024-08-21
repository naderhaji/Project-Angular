class HomePage {
    get welcomeMessage(){
        
       return cy.get('.user-nav > .mat-mdc-menu-trigger');

    }
    welcomeMessageShouldBeVisble() {
        this.welcomeMessage.should('be.visible')
    }
}
export default HomePage