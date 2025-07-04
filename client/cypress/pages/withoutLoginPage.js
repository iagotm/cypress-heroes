class WithoutLoginPage {
  selectorsList() {
    const selectors = {
      likeButton: "[data-cy='like']",
      hireButton: "[data-cy='money']",
      mustLoginMessage: ".mb-1"
    }
    return selectors
  }
  acessLoginPage() {
    cy.visit('http://localhost:3000/heroes');
  }

  likeCardButton() {
    cy.get(this.selectorsList().likeButton).eq(0).click()
  }

  hireCardButton() {
    cy.get(this.selectorsList().hireButton).eq(0).click()
  }

  mustLoginLikeMessage() {
    cy.get(this.selectorsList().mustLoginMessage).contains('You must log in to like.')
    cy.get('button').contains('Ok').click()
  }

  mustLoginHireMessage() {
    cy.get(this.selectorsList().mustLoginMessage).contains('You must log in to hire this hero.')
    cy.get('button').contains('Ok').click()
  }
}

export default WithoutLoginPage
