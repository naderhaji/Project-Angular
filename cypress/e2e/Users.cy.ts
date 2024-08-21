/// <reference types="cypress" />


import LoginPage from '../pages/loginPage'
import UsersPage  from '../pages/users';
const uuid: () => number = () => Cypress._.random(1000, 9999) 
const id = uuid()

describe('Module Users Test Cases', () => {
  const loginPage = new LoginPage();
  const usersPage = new UsersPage();
  beforeEach('Open Gah administrator application', () => {
    
    loginPage.load()
    
    loginPage.Login('achref.fnoun@addinn.com', 'achref123');
    usersPage.UsersModule();
  });
  it('should be able to Add user and Verify by Search', () =>{
    usersPage.AddUsers(`Firstname${id}`, `test${id}@gmail.com`, `LastNamename${id}`,`password${id}`,`password${id}`, `+2169892${id}`)
    usersPage.Users_Search(`Firstname${id}`);
  });
  it('should be able to edite User', () => {
    usersPage.Users_Search(`Firstname${id}`);
    usersPage.UserEdit(`{selectall}{backspace}${id}Firstname`, `password${id}`)
  })
  it('should be able to disbled or enable User', () => {
    usersPage.Users_Search(`${id}Firstname`);
    usersPage.UsreStatus(`${id}Firstname`, `LastNamename${id}`)
    usersPage.VerifyStatus(`{selectall}{backspace}${id}Firstname`)
  })
  it('should be able to Verify Total User', () => {
    usersPage.TotalUser()
  })
  it('should be able to Delete User and Verify by Search', () => {
    usersPage.Users_Search(`${id}Firstname`);
    usersPage.DeleteUser(`${id}Firstname`, `LastNamename${id}`)
    usersPage.UsersDelete_Search(`${id}Firstname`)
  })
});