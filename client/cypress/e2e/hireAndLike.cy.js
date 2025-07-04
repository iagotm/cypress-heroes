import HireAndLikePage from '../pages/hireAndLikePage';
import LoginPage from '../pages/loginPage';
import userData from '../fixtures/userData.json';

const hireAndLikePage = new HireAndLikePage();
const loginPage = new LoginPage();

describe('Teste de Curtir e Contratar', () => {
it('Deve aumentar o contador de fãs ao dar like', () => {
  loginPage.acessLoginPage();
  loginPage.loginUserButton();
  loginPage.loginWithUser(userData.userAdminSuccess.email, userData.userAdminSuccess.password);
  loginPage.checkLoggedAdmin();

  hireAndLikePage.verificarIncrementoLike();
});

it('Deve aumentar o contador de Hire ao dar hire', () => {
  loginPage.acessLoginPage();
  loginPage.loginUserButton();
  loginPage.loginWithUser(userData.userAdminSuccess.email, userData.userAdminSuccess.password);
  loginPage.checkLoggedAdmin();
  hireAndLikePage.verificarIncrementoHire();
    });
});
