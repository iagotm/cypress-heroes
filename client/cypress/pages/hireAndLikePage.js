class HireAndLikePage {
  selectorsList() {
    const selectors = {
      likeButton: "[data-cy='like']",
      hireButton: "[data-cy='money']",
      mustLoginMessage: ".mb-1",
      fansCountBefore: "0"
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
  verificarIncrementoLike() {
    // Captura o valor antes do like
    cy.get('[data-cy="fans"]')
      .first()
      .invoke('text')
      .then((textBefore) => {
        const countBefore = parseInt(textBefore);
        cy.log('Contador antes do like:', countBefore);

        // Clica no botão de like
        cy.get('[data-cy="like"]').first().click({ force: true });

        // Aguarda um tempo para o DOM atualizar ou backend responder
        cy.wait(500);

        // Captura o valor depois do like e valida incremento
        cy.get('[data-cy="fans"]')
          .first()
          .invoke('text')
          .then((textAfter) => {
            const countAfter = parseInt(textAfter);
            cy.log('Contador depois do like:', countAfter);
            expect(countAfter).to.eq(countBefore + 1);
          });
      });
  }

  verificarIncrementoHire() {
    // Captura o valor antes do like
    cy.get('[data-cy="saves"]')
      .first()
      .invoke('text')
      .then((textBefore) => {
        const countBefore = parseInt(textBefore);
        cy.log('Contador antes do hire:', countBefore);

        // Clica no botão de like
        cy.get('[data-cy="money"]').first().click({ force: true });
        cy.get('.text-lg').contains('Hire Hero?').should('exist');
        cy.get('button').contains('Yes').click();

        // Aguarda um tempo para o DOM atualizar ou backend responder
        cy.wait(500);

        // Captura o valor depois do like e valida incremento
        cy.get('[data-cy="saves"]')
          .first()
          .invoke('text')
          .then((textAfter) => {
            const countAfter = parseInt(textAfter);
            cy.log('Contador depois do hire:', countAfter);
            expect(countAfter).to.eq(countBefore + 1);
          });
      });
  }
}

export default HireAndLikePage