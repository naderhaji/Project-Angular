/// <reference types="cypress" />

import LoginPage from '../pages/loginPage'
import DeploymentPage from '../pages/depPage';


describe('Module Deployment Test Cases', () => {
  const loginPage = new LoginPage();
  const deploymentPage = new DeploymentPage();
  beforeEach('Open Gah administrator application', () => {
    
    loginPage.load()
    cy.title().should('eql', 'GlobalAdministrationHub');
    loginPage.Login('achref.fnoun@addinn.com', 'achref123');
    deploymentPage.DeploymentModule();
  });
  it('should be able to Search organization', () => {
      deploymentPage.dep_Search();
    
  });

});
