import LoginPage from '../../pages/loginPage'
import LoginPage from '../pages/loginPage'

const loginpage = new LoginPage()

describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io')
  })
})