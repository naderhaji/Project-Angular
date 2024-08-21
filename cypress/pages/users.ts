

class UsersPage {
    //Elements
    get modulUsers(){
        return cy.get(':nth-child(5) > .link_name > i > .logo_name');

    }
    get Userstitle(){
        return  cy.get('app-breadcrumb.ng-star-inserted > .d-flex > span');
    }
    get Search(){
        return cy.get('#mat-input-3')
    }
    get NbrSearch(){
        return cy.get('[class="mat-mdc-row mdc-data-table__row cdk-row ng-star-inserted"]')
    }
    get AdduserButton(){
        return cy.get('.mdc-button__label')
    }
    get PopUpAddNewUser(){
        return cy.get('#mat-mdc-dialog-title-0')
    }
    get AddCompany(){
        return cy.get('[role="combobox"]')
    }
     get Company(){
        return cy.get('.mdc-list-item__primary-text').eq(0)
     }
     get AddFirstName(){
        return cy.get('#mat-input-4')
     }
     get AddEmail(){
        return cy.get('#mat-input-5')
     }
     get AddLastName(){
        return cy.get('#mat-input-6')
     }
     get AddPassword(){
        return cy.get('#mat-input-7')
     }
     get AddRepeatPass(){
        return cy.get('#mat-input-8')
     }
     get AddRol(){
        return cy.get('[role="combobox"]').eq(3)
    }
    get Role(){
        return cy.get('.mdc-list-item__primary-text').eq(1)
    }
    get AddPhoneNumber(){
        return cy.get('#mat-input-9')
    }
    get ButtonSave(){
        return cy.get('.button-blue')
    }
    get EditeUser(){
        return cy.get('.action-button > :nth-child(1)')
    }
    get PopUpEditeUser(){
        return cy.get('.dialog-container')
    }
    get PopUpSuccess(){
        return cy.get('h1')
    }
    get SatutsUSER(){
        return cy.get('.action-button > :nth-child(3)')
    }
    get PopUpStatus(){
        return cy.get('.title')
    }
    get ComfirmButton(){
        return cy.get('.button-form-bleu')
    }
    get CompareImg(){
        return cy.get('[alt="lock-key"]').eq(0)
    }
    get userdelete(){
        return cy.get('.action-button > :nth-child(2) > .ng-star-inserted')
    }
    get PopUPDelete(){
        return cy.get('.title')
    }
    get TotalTenant(){
        return cy.get(':nth-child(3) > .card-item > .info > h2')
    }
    get total(){
        return cy.get('.mat-mdc-paginator-range-label')
    }
    get TotalAdmin(){
        return cy.get(':nth-child(2) > .card-item > .info > h2')
    }
  
    get TotalFreigtUser(){
        return cy.get(':nth-child(1) > .card-item > .info > h2')
    }
    

    //Methods
    UsersModule() {
        this.modulUsers.should('be.visible').click();
        this.Userstitle.should('have.text',' Users ');
    }
    
    AddUsers(FirstName: string, Email: string, LastName: string, PASSWORD: string, reaptPass: string, Phone: string){
        this.AdduserButton.should('be.visible').click()
        this.PopUpAddNewUser.should('have.text','Add new user')
        cy.wait(3000);
        this.AddCompany.eq(2).click({force: true})
        this.Company.click()
        this.AddFirstName.type(FirstName)
        this.AddEmail.type(Email)
        this.AddLastName.type(LastName)
        this.AddPassword.type(PASSWORD)
        this.AddRepeatPass.type(reaptPass)
        this.AddRol.click()
        this.Role.click()
        this.AddPhoneNumber.type(Phone)
        this.ButtonSave.click()

    }
    Users_Search(organization: string){
        this.Search.type(organization,{delay: 100});
        // cy.wait(10000);
         this.NbrSearch.should("have.length",1) 
    }
    UserEdit(FirstName: string, reaptPass: string){
        this.EditeUser.click({force: true})
        this.PopUpEditeUser.should('be.visible')
        this.AddFirstName.clear().type(FirstName, {delay: 100})
        this.AddRepeatPass.type(reaptPass)
        this.ButtonSave.click()
        this.PopUpSuccess.should('contain', 'Success')
    }
    UsreStatus(username: string, lastname: string){
        
        this.SatutsUSER.click()
        this.PopUpStatus.should('have.text',' Are you sure you want to set status'+' ' +username+' '+lastname+' '+'user?')
        this.ComfirmButton.click({force: true})
        this.PopUpSuccess.should('contain', 'Success')
    }
     VerifyStatus(organization: string){
        this.Search.type(organization,{delay: 100});
        this.CompareImg.should('be.visible')
     }
     TotalUser(){
            this.TotalTenant.invoke('text').then((text) => {
             cy.log(text);
            this.TotalAdmin.invoke('text').then((text1) =>{
                cy.log(text1);
            this.TotalFreigtUser.invoke('text').then((text2) =>{
                cy.log(text2);
                const numberText = parseInt(text, 10);  
                const numberText1 = parseInt(text1, 10);
                const numberText2 = parseInt(text2, 10);
                const sumOfTextAndText1 = numberText + numberText1;
                expect(numberText2).to.equal(sumOfTextAndText1);
                this.total.then((e)=> {
                        let totalcompany;
                        // eslint-disable-next-line prefer-const
                        let mytext=e.text();
                        // eslint-disable-next-line @typescript-eslint/no-unused-vars, prefer-const
                        totalcompany=mytext.substring(mytext.indexOf("f")+2);
                       // cy.should(text+' ',totalcompany)
                       cy.wrap(text2 + ' ').should('eq', totalcompany);
                    })
                })    
            })
         
       
            
        })
       
    } 
       

         
    DeleteUser(username: string, lastname: string){
        this.userdelete.click()
        this.PopUPDelete.should('have.text',' Are you sure you want to delete'+' ' +username+' '+lastname+' '+'user?')
        this.ComfirmButton.click({force: true})
        this.PopUpSuccess.should('contain', 'Success')
    }
    UsersDelete_Search(organization: string){
        this.Search.type(organization,{delay: 100});
         this.NbrSearch.should("have.length",0)
    }
    
}
export default UsersPage