class DeploymentPage {
    get modulDep(){
        return cy.get(':nth-child(2) > .link_name > i > .logo_name');

    }
    get deptitle(){
        return  cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span')
    }
    DeploymentModule() {
        this.modulDep.should('be.visible').click();
    }
    dep_Search(){
        this.deptitle.should('have.text',' Deployment ');
    }
}
export default DeploymentPage