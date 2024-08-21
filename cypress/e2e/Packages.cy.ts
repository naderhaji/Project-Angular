/// <reference types="cypress" />

import LoginPage from '../pages/loginPage'
import PackagesPage  from '../pages/packagesPage';
const uuid: () => number = () => Cypress._.random(1000, 9999) 
const id = uuid()

describe('Module Packages Test Cases', () => {
  const loginPage = new LoginPage();
  const packagesPage = new PackagesPage();
  beforeEach('Open Gah administrator application', () => {
    
    new LoginPage().load()
    cy.title().should('eql', 'GlobalAdministrationHub');
    loginPage.Login('achref.fnoun@addinn.com', 'achref123');
    packagesPage.PackagesModule();
  });
  it('should be able to Add Features and Verify by Search', () => {
    packagesPage.AddFeatures(`${id}${id}`,`Name${id}`, `Description${id}`);
    packagesPage.VerifyAddFeature(`${id}${id}`)
    
  });
  it.only('should be able to Add Services and Verify by Search', () => {
    packagesPage.AddService();
    packagesPage.AddServiceDetails(`Name${id}`, `${id}00`,`${id}00`, `Description${id}`)
    packagesPage.AddNewRow()
    //packagesPage.VerifyAddService(`${id}${id}`)

    
  });
});