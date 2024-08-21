/// <reference types="cypress" />

import LoginPage from '../pages/loginPage'
import IotdevicesPage  from '../pages/iotdevicesPage';


describe('Module Iot devices Test Cases', () => {
  const loginPage = new LoginPage();
  const iotdevicesPage = new IotdevicesPage();
  beforeEach('Open Gah administrator application', () => {
    
    new LoginPage().load()
    cy.title().should('eql', 'GlobalAdministrationHub');
    loginPage.Login('achref.fnoun@addinn.com', 'achref123');
    iotdevicesPage.IotModule();
  });
  it('should be able to Search organization', () => {
    iotdevicesPage.Iot_Search();
    
  });

});