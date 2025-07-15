class LoginPage {
  selectorsList() {
    const selectors = {
      emailField: "[data-cy='email']",
      passwordField: "[data-cy='password']",
      loginButton: "li > .undefined",
      logoutButton: "button:contains('Logout')",
      checkLoginAdmin: "[href='/heroes/new']",
      signInButton: "button:contains('Sign in')",
      errorMessage: ".text-red-500"
    }
    return selectors
  }
  acessLoginPage() {
    cy.visit('http://localhost:3000/heroes');
  }

  loginUserButton() {
    cy.get(this.selectorsList().loginButton).click()
  }
  loginWithUser(email, password){
    if (email === ' ') {
    cy.get(this.selectorsList().emailField).type(' ').clear();
  } else {
    cy.get(this.selectorsList().emailField).type(email)
  }

  if (password === ' ') {
    cy.get(this.selectorsList().passwordField).type(' ').clear();
  } else {
    cy.get(this.selectorsList().passwordField).type(password)
  }
    cy.get(this.selectorsList().signInButton).click()
  }

  checkLogged(){
    cy.get(this.selectorsList().logoutButton).should('be.visible')
  }

   checkLoggedAdmin(){
    cy.get(this.selectorsList().checkLoginAdmin).should('be.visible');
  }

  checkEmailMissing() {
    cy.get(this.selectorsList().errorMessage).eq(0).contains('Email is required');
  }
  checkPasswordMissing() {
    cy.get(this.selectorsList().errorMessage).eq(1).contains('Password is required');
  }

   checkPasswordMissing2() {
    cy.get(this.selectorsList().errorMessage).eq(0).contains('Password is required');
  }

  checkWrongData() {
    cy.get(this.selectorsList().errorMessage).eq(0).contains('Invalid email or password');
  }

  checkWrongEmail() {
    cy.get(this.selectorsList().errorMessage).eq(0).contains('Email is not valid');
  }
}

export default LoginPage
