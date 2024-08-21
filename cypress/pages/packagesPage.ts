class PackagesPage {
    get modulPackages(){
        return cy.get(':nth-child(8) > .link_name > .icon-label > span');

    }
    get Packagestitle(){
        return  cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span');
    }
    get Features(){
        return cy.get('.mat-button-toggle-label-content').eq(3)
    }
    get FeatureAdd(){
        return cy.get('.mdc-button__label')
    }
    get PopUpAddNewFeatures(){
        return cy.get('#mat-mdc-dialog-title-0')
    }
    get AddCodeFeat(){
        return cy.get('#mat-input-5')
    }
    get AddNameFeat(){
        return cy.get('#mat-input-6')
    }
    get AddDescriptionFeat(){
        return cy.get('#mat-input-7')
    }
    get ButtonSave(){
        return cy.get('.mdc-button__label').contains('Save')
    }
    get PopUpSucess(){
        return cy.get('h1').should('contain', 'Success')
    }
    get Search(){
        return cy.get('#mat-input-4')
    }
    get NbrSearch(){
        return cy.get('[class="mat-mdc-row mdc-data-table__row cdk-row ng-star-inserted"]')
    }
    get Services(){
        return cy.get('.mat-button-toggle-label-content').eq(2)
    }
    get ServicAdd(){
        return  cy.get('.mdc-button__label')
    }
    get Addnewservice(){
        return cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span')
    }
    get AddCategory(){
        return cy.get('.mat-mdc-select-placeholder')
    }
    get Category(){
        return cy.get('.mdc-list-item__primary-text').eq(1)
    }
    get AddNameSerivce(){
        return cy.get('#mat-input-5')
    }
    get AddCodeService(){
        return cy.get('#mat-input-6')
    }
    get AddQuantityService(){
        return cy.get('#mat-input-7')
    }
    get AddDescriptionService(){
        return cy.get('#mat-input-8')
    }
    get AddNewRowButton(){
        return cy.get('.container-pricing-form > .d-flex > .button-form-bleu > .mdc-button__label')
    }
    get Package_Add(){
        return cy.get('.mdc-button__label')
    }
      //Methods
    PackagesModule() {
        this.modulPackages.should('be.visible').click();
        this.Packagestitle.should('have.text',' Packages ');
    }
   
    AddFeatures(Code: string, Name: string, Description: string){
        this.Features.should('be.visible').click();
        this.FeatureAdd.should('be.visible').click();
        this.PopUpAddNewFeatures.should('have.text', 'Add new feature')
        this.AddCodeFeat.type(Code)
        this.AddNameFeat.type(Name)
        this.AddDescriptionFeat.type(Description)
        this.ButtonSave.click();  
    }
    VerifyAddFeature(Code: string){
        this.PopUpSucess
        this.Search.type(Code,{delay: 100});
        this.NbrSearch.should("have.length",1) 
    }
    AddService(){
        this.Services.should('be.visible').click();
        this.ServicAdd.should('be.visible').click();
        this.Addnewservice.should('have.text', ' Add new service ')
    }
    AddServiceDetails(Name: string, Code: string, Quantity: string, Description: string){
        this.AddCategory.click()
        this.Category.click()
        this.AddNameSerivce.type(Name)
        this.AddCodeService.type(Code)
        this.AddQuantityService.type(Quantity)
        this.AddDescriptionService.type(Description)
    }
    AddNewRow(){
        this.AddNewRowButton.should('be.visible').click();

    }
}
export default PackagesPage