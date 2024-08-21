class IotPage {
    get modulIot(){
        return cy.get(':nth-child(6) > .link_name > i > .logo_name');

    }
    get Iottitle(){
        return  cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span');
    }
    IotModule() {
        this.modulIot.should('be.visible').click();
    }
    Iot_Search(){
        this.Iottitle.should('have.text',' IOT Devices ');
    }
}
export default IotPage