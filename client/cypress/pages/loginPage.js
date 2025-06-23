class LoginPage {
  selectorsList() {
    const selectors = {
      usernameField: "[type='email']",
      passwordField: "[type='password']"
    }
    return selectors
  }

  loginUser(username, password){
    cy.get(this.selectorsList().usernameField).type(username)
    cy.get(this.selectorsList().passwordField).type(password)
  }

}

export default LoginPage
