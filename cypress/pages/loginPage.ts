

class LoginPage {
    // Elements

    get emailInput() {
        return cy.get('#mat-input-0')

    }
    get passwordInput() {
        return cy.get('#mat-input-1')

    }
    get SignInButton() {
        return cy.get('.sign-in')

    }
    //Methods
    load( ) {
        cy.visit('https://gah-frontend.dev.abridia.com');
        cy.wait(10000);
    }
    Login(email: string, pwd: string) {
        this.emailInput.type(email);
        this.passwordInput.type(pwd);
        this.SignInButton.click();
        cy.wait(3000);
    }
}
export default LoginPage