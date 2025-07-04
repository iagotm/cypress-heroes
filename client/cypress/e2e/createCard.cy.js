/* describe('template spec', () => {
  it('Create Hero', () => {
     cy.visit('http://localhost:3000/heroes');

    // Clica no botão de login
    cy.get('li > .undefined').click();

    // Preenche os campos de login
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('test123');
    cy.get('button').contains('Sign in').click();
    //cy.get(".undefined").eq(15).click();

    // Verifica se o login foi bem-sucedido (pode ser URL ou texto na página)
    cy.get("[href='/heroes/new']").should('be.visible');
    cy.visit(`/heroes/new`);

    cy.get('[data-cy=nameInput]').type('New Test Hero');
    cy.get('[data-cy=priceInput]').clear().type('12');
    cy.get('[data-cy=fansInput]').clear().type('34');
    cy.get('[data-cy=savesInput]').clear().type('56');
    cy.get('[data-cy=powersSelect]').select(['Fireball', 'Super Strength']);
    cy.get('button').contains('Submit').click();
    });

    it('Edit Hero', () => {
     cy.visit('http://localhost:3000/heroes');

    // Clica no botão de login
    cy.get('li > .undefined').click();

    // Preenche os campos de login
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('test123');
    cy.get('button').contains('Sign in').click();
    //cy.get(".undefined").eq(15).click();

    // Verifica se o login foi bem-sucedido (pode ser URL ou texto na página)
    cy.get("[href='/heroes/new']").should('be.visible');
    cy.visit(`/heroes/new`);

    cy.get('[data-cy=nameInput]').clear.type('New Test Hero');
    cy.get('[data-cy=priceInput]').clear().type('12');
    cy.get('[data-cy=fansInput]').clear().type('34');
    cy.get('[data-cy=savesInput]').clear().type('56');
    cy.get('[data-cy=powersSelect]').select(['Fireball', 'Super Strength']);
    cy.get('button').contains('Submit').click();
    });
    }) */

    let heroId; // variável global para armazenar o ID

describe('Hero Tests', () => {
  it('Create Hero', () => {
    cy.intercept('POST', '**/heroes').as('createHero'); // <-- intercepta a criação do herói

    cy.visit('http://localhost:3000/heroes');

    // Login
    cy.get('li > .undefined').click();
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('test123');
    cy.get('button').contains('Sign in').click();

    cy.get("[href='/heroes/new']").should('be.visible');
    cy.visit(`/heroes/new`);

    // Preenche formulário
    cy.get('[data-cy=nameInput]').type('New Test Hero');
    cy.get('[data-cy=priceInput]').clear().type('12');
    cy.get('[data-cy=fansInput]').clear().type('34');
    cy.get('[data-cy=savesInput]').clear().type('56');
    cy.get('[data-cy=powersSelect]').select(['Fireball', 'Super Strength']);
    cy.get('button').contains('Submit').click();

   // Aguarda e captura o ID da resposta
   cy.wait('@createHero').then((interception) => {
     expect(interception.response.statusCode).to.eq(201);
     heroId = interception.response.body.id;
     cy.log('ID do Heroi criado:', heroId);
   });
  });

  it('Edit Hero', () => {
    // Espera até o ID ser definido
   cy.wrap(null).should(() => {
     expect(heroId).to.exist;
   });
    cy.visit('http://localhost:3000/heroes');

    cy.get('li > .undefined').click();
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('test123');
    cy.get('button').contains('Sign in').click();

    cy.get("[href='/heroes/new']").should('be.visible');
    cy.visit(`/heroes/new`);
    // Acessa a página de edição usando o ID
    cy.visit(`http://localhost:3000/heroes/${heroId}/edit`);

    cy.get('[data-cy=nameInput]').clear().type('Hero Updated');
    cy.get('[data-cy=priceInput]').clear().type('99');
    cy.get('[data-cy=fansInput]').clear().type('100');
    cy.get('[data-cy=savesInput]').clear().type('88');
    cy.get('[data-cy=powersSelect]').select(['Flying']);
    cy.get('button').contains('Submit').click();
  });

  /*it('Delete Hero', () => {
    // Espera até o ID ser definido
   //cy.wrap(null).should(() => {
   //  expect(heroId).to.exist;
   //});
    cy.visit('http://localhost:3000/heroes');
    
    cy.get('li > .undefined').click();
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('test123');
    cy.get('button').contains('Sign in').click();

     cy.contains('Hero Updated') // encontra o texto com o nome do herói criado
    .parents('[data-cy="hero-card"]') // container do herói (coloque aqui o seletor correto do seu card!)
    .find('[data-cy="trash"]') // botão de deletar
    .click();

     cy.get('.modal-container').should('be.visible');

     // Clica no botão "Yes" para confirmar a exclusão
     cy.get('.modal-container').contains('Yes').click();

     // Verifica se o herói não aparece mais na lista (opcional)
     cy.contains('New Test Hero').should('not.exist');
  });*/

  it('Edit Delete Hero', () => {
    // Espera até o ID ser definido
   cy.wrap(null).should(() => {
     expect(heroId).to.exist;
   });
    cy.visit('http://localhost:3000/heroes');

    cy.get('li > .undefined').click();
    cy.get('input[name="email"]').type('admin@test.com');
    cy.get('input[name="password"]').type('test123');
    cy.get('button').contains('Sign in').click();

    cy.get("[href='/heroes/new']").should('be.visible');
    cy.visit(`/heroes/new`);
    // Acessa a página de edição usando o ID
    cy.visit(`http://localhost:3000/heroes/${heroId}/edit`);

    cy.get('button').contains('Delete Hero').click();
    cy.get('.modal-container').should('be.visible');

     // Clica no botão "Yes" para confirmar a exclusão
     cy.get('.modal-container').contains('Yes').click();
  });
});