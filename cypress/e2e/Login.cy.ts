/// <reference types="cypress" />

import LoginPage from '../pages/loginPage'
import HomePage from '../pages/homePages';


describe('GAH login Functionality Test Cases', () => {
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  beforeEach('Open Gah administrator application', () => {
    
    new LoginPage().load()
    
  });
  it('should be able to login with valid email and valid password', () => {
      cy.title().should('eql', 'GlobalAdministrationHub');
      loginPage.Login('achref.fnoun@addinn.com', 'achref123');
      homePage.welcomeMessageShouldBeVisble();
    
});

});



