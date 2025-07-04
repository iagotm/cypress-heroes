import WithoutLoginPage from '../pages/withoutLoginPage';
import userData from '../fixtures/userData.json';

const withoutLoginPage = new WithoutLoginPage();

describe('Teste de Login', () => {
   it('Testar Like sem estar logado', () => {
    withoutLoginPage.acessLoginPage();
    withoutLoginPage.likeCardButton();
    withoutLoginPage.mustLoginLikeMessage();
 });

  it('Testar Contratar(Hire) sem estar logado', () => {
    withoutLoginPage.acessLoginPage();
    withoutLoginPage.hireCardButton();
    withoutLoginPage.mustLoginHireMessage();
   //cy.contains('You must log in to hire this hero.').should('not.exist');
 });
})