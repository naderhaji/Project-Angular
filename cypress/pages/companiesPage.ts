class CompanyPage {
    get modulComp(){
        return cy.get(':nth-child(3) > .link_name > i > .logo_name');

    }
    get comptitle(){
        return  cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span')
    }
    get AddCompanyButton(){
        return cy.get('.mdc-button__label')
    }
    get AddNewCompany(){
        return cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span')
    }
    get AddCompanyName(){
        return cy.get('#mat-input-4')
    }
    get AddCountry(){
        return cy.get('.bloc > :nth-child(2) > :nth-child(2) > .row > :nth-child(1) > .mat-mdc-form-field > .mat-mdc-text-field-wrapper')
    }
    get Country(){
        return cy.get('.mdc-list-item__primary-text').eq(1)
    }
    get AddCity(){
        return cy.get(':nth-child(2) > :nth-child(2) > .row > :nth-child(2) > .mat-mdc-form-field > .mat-mdc-text-field-wrapper')
    }
    get City(){
        return cy.get('.mdc-list-item__primary-text').eq(2)
    }
    get AddAdress(){
        return cy.get('#mat-input-5')
    }
    get AddPhoneNumber(){
        return cy.get('#mat-input-6')
    }
    get AddContactMail(){
        return cy.get('#mat-input-7')
    }
    get AddVatNum(){
        return cy.get('#mat-input-8')
    }
    get AddRegistrationNum(){
        return cy.get('#mat-input-9')
    }
    get AddDocuments(){
        return cy.get('input[type=file]');
    }
    get AddNotes(){
        return cy.get('#mat-input-10')
    }
    get SaveButton(){
        return cy.get('.button-form-bleu > .mdc-button__label')
    }
    get PopUpSuccess(){
        return cy.get('h1')
    }
    get Search(){
        return cy.get('.right-bloc > .mat-mdc-form-field > .mat-mdc-text-field-wrapper')
    }
    get NbrSearch(){
        return cy.get('[class="mat-mdc-row mdc-data-table__row cdk-row ng-star-inserted"]')
    }
    get NameSearch(){
        return cy.get('.table-container tr td')
    }
    get nbrCompany(){
        return cy.get('h2')
    }
    get totalComp(){
        return cy.get('.mat-mdc-paginator-range-label')
    }
    get CompanyEdit(){
        return cy.get(':nth-child(1) > .cdk-column-actions > .align-items-center > .action-button > :nth-child(1) > img')
    }
    get CompanyOverview(){
        return cy.get(':nth-child(1) > .cdk-column-actions > .align-items-center > .action-button > :nth-child(3)')
    }
    get Overview(){
        return cy.get('.overview-header > h2')
    }
    get OverviewCompanyName(){
        return cy.get('.right-details')
    }
    get OuverviewSearch(){
        return cy.get('.table-container tr td')
    }
    get OverviewCountry(){
        return
    }
    get DelCompa(){
        return cy.get('.action-button > :nth-child(2)')
    }
    get PopupDelete(){
        return cy.get('.title')
    }
   
    //Methods
    CompanyModule() {
        this.modulComp.should('be.visible').click();
        this.comptitle.should('have.text',' Company ');
    }
    AddCompany(CompanyName: string, Adress: string, PhoneNumber: string, ContactMail: string, VatNum: string, RegistrationNum: string, Notes: string){
       this.AddCompanyButton.should('be.visible').click();
       this.AddNewCompany.should('be.visible')
       this.AddCompanyName.type(CompanyName, {delay: 100})
       this.AddCountry.click()
       this.Country.click()
       this.AddCity.click()
       this.City.click()
       this.AddAdress.type(Adress, {delay: 100})
       this.AddPhoneNumber.type(PhoneNumber, {delay: 100})
       this.AddContactMail.type(ContactMail, {delay: 100})
       this.AddVatNum.type(VatNum, {delay: 300})
       this.AddRegistrationNum.type(RegistrationNum, {delay: 100})
       this.AddDocuments.selectFile('/builds/abridia/freightsure/admin/frontend/gah/frontend/README.md', {force: true});
       //'C:\\Users\\ADDINN - Lazher\\Pictures\\Saved Pictures\\messi.jfif'
       //'/builds/abridia/freightsure/admin/frontend/gah/frontend/README.md'
       this.AddNotes.type(Notes, {delay: 100})
       this.SaveButton.click()
       this.PopUpSuccess.should('contain', 'Success')
    }
    VerifyAddCompany(organization: string){
        this.Search.type(organization,{delay: 100});
        this.NbrSearch.should("have.length", 1) 
        this.NameSearch.should('contain',organization)
    }
    
    EditeCompany(CompanyName: string){
        this.CompanyEdit.click()
        this.AddCompanyName.clear().type(CompanyName, {delay: 100})
        this.SaveButton.click()
        this.PopUpSuccess.should('contain', 'Success')
    }
    OverviewCompany(){
        this.CompanyOverview.click()
        this.Overview.should("have.text", ' Overview ')
        
        this.OverviewCompanyName.eq(0).invoke('text').then((text1) => {
            
            this.NameSearch.eq(0).should("have.text", ' '+text1+' ')
          });
        this.OverviewCompanyName.eq(1).invoke('text').then((text2) => {
            
            this.NameSearch.eq(1).should("have.text", ' '+text2+' ')
          });
        this.OverviewCompanyName.eq(2).invoke('text').then((text3) => {
            
            this.NameSearch.eq(2).should("have.text", ' '+text3+' ')
          });
        this.OverviewCompanyName.eq(3).invoke('text').then((text3) => {
            
            this.NameSearch.eq(3).should("have.text", ' '+text3+' ')
          });
        this.OverviewCompanyName.eq(4).invoke('text').then((text3) => {
            
            this.NameSearch.eq(5).should("have.text", ' '+text3+' ')
          });
        this.OverviewCompanyName.eq(5).invoke('text').then((text3) => {
            
            this.NameSearch.eq(4).should("have.text", ' '+text3+' ')
          });
        this.OverviewCompanyName.eq(6).invoke('text').then((text3) => {
            
            this.NameSearch.eq(6).should("have.text", ' '+text3+' ')
          });  
    }
    TotalCompanies(){
        this.nbrCompany.invoke('text').then((text) => {
             cy.log(text);
        //    this.NbrSearch.should("have.length", text)
          
        
        this.totalComp.then((e)=> {
            let totalcompany;
            // eslint-disable-next-line prefer-const
            let mytext=e.text();
            // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
            totalcompany=mytext.substring(mytext.indexOf("f")+2);
           // cy.should(text+' ',totalcompany)
           cy.wrap(text + ' ').should('eq', totalcompany);
        })
        
    })
    
    }  
    DeleteCompany(CompanyName: string){
        this.DelCompa.click()
        this.PopupDelete.should('have.text',' Are you sure you want to delete'+' ' +CompanyName+' '+'company?')
        this.SaveButton.click()
        this.PopUpSuccess.should('contain', 'Success')
    }
    VerifyDeleteCompany(organization: string){
        this.Search.type(organization,{delay: 100});
        this.NbrSearch.should("have.length", 0) 
        
    }
}
export default CompanyPage