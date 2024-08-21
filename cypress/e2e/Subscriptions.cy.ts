/// <reference types="cypress" />

import LoginPage from '../pages/loginPage'
import SubscriptionsPage  from '../pages/subscriptionsPage';


describe('Module Subscription Test Cases', () => {
  const loginPage = new LoginPage();
  const subscriptionsPage = new SubscriptionsPage();
  beforeEach('Open Gah administrator application', () => {
    
    new LoginPage().load()
    cy.title().should('eql', 'GlobalAdministrationHub');
    loginPage.Login('achref.fnoun@addinn.com', 'achref123');
    subscriptionsPage.SubscriptionsModule();
  });
  it('should be able to Search organization', () => {
    subscriptionsPage.Subscriptions_Search();
    
  });

});