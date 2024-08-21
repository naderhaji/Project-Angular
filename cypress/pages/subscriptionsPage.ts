class SubscriptionsPage {
    get modulSubscriptions(){
        return cy.get(':nth-child(4) > .link_name > i > .logo_name');

    }
    get Subscriptionstitle(){
        return  cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span');
    }
    SubscriptionsModule() {
        this.modulSubscriptions.should('be.visible').click();
    }
    Subscriptions_Search(){
        this.Subscriptionstitle.should('have.text',' Subscriptions ');
    }
}
export default SubscriptionsPage