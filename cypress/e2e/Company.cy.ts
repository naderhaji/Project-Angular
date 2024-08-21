/// <reference types="cypress" />

import LoginPage from '../pages/loginPage'
import CompanyPage from '../pages/companiesPage';
const uuid: () => number = () => Cypress._.random(1000, 9999) 
const id = uuid()

describe('Module Company Test Cases', () => {
  const loginPage = new LoginPage();
  const companyPage = new CompanyPage();
  beforeEach('Open Gah administrator application', () => {
    
    new LoginPage().load()
    cy.title().should('eql', 'GlobalAdministrationHub');
    loginPage.Login('achref.fnoun@addinn.com', 'achref123');
    companyPage.CompanyModule();
  });
  it('should be able to add company and Verify by Search', () => {
    companyPage.AddCompany(`CompanyName${id}`,`Adress${id}`, `+2169892${id}`, `test${id}@gmail.com`, `1${id}${id}`, `111${id}${id}`,`test add company${id}`);
    companyPage.VerifyAddCompany(`CompanyName${id}`)
    
  });
  it('should be able to edite Company', () => {
    companyPage.VerifyAddCompany(`CompanyName${id}`)
    companyPage.EditeCompany(`{selectall}{backspace}${id}CompanyName`)
  })
  it('should be able to overview Company', () => {
    companyPage.VerifyAddCompany(`${id}CompanyName`)
    companyPage.OverviewCompany()
  })
  it('should be able to Verify Total Companies', () => {
    companyPage.TotalCompanies()
  });
  it('should be able to Delete Companies and Verify by Search', () => {
    companyPage.VerifyAddCompany(`${id}CompanyName`)
    companyPage.DeleteCompany(`${id}CompanyName`)
    companyPage.VerifyDeleteCompany(`${id}CompanyName`)
  });
});
