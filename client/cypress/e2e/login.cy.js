import LoginPage from '../pages/loginPage';
import userData from '../fixtures/userData.json';

const loginPage = new LoginPage();

describe('Teste de Login', () => {
  it('Login como Usuario Normal', () => {
    loginPage.acessLoginPage();
    loginPage.loginUserButton();
    loginPage.loginWithUser(userData.userSuccess.email,userData.userSuccess.password)
    loginPage.checkLogged()
  })

  it('Login como Usuario Administrador', () => {
    loginPage.acessLoginPage();
    loginPage.loginUserButton();
    loginPage.loginWithUser(userData.userAdminSuccess.email,userData.userAdminSuccess.password)
    loginPage.checkLoggedAdmin()
  })

   it('Login Fail - Campos Vazios', () => {

    loginPage.acessLoginPage();
    loginPage.loginUserButton();
    loginPage.loginWithUser(userData.userEmpty.email,userData.userEmpty.password)
    loginPage.checkEmailMissing();
    loginPage.checkPasswordMissing();
  });

  it('Login Fail - Dados errados', () => {
    loginPage.acessLoginPage();
    loginPage.loginUserButton();
    loginPage.loginWithUser(userData.userFail.email,userData.userFail.password)
    loginPage.checkWrongData();
  });

  it('Login Fail - Email Invalido', () => {
    loginPage.acessLoginPage();
    loginPage.loginUserButton();
    loginPage.loginWithUser(userData.userEmailFail.email, userData.userEmailFail.password)
    loginPage.checkWrongEmail();
 });

 it('Login Fail - Email em Branco', () => {
    loginPage.acessLoginPage();
    loginPage.loginUserButton();
    loginPage.loginWithUser(userData.userEmailEmpty.email, userData.userEmailEmpty.password)
    loginPage.checkEmailMissing();
 });

 it('Login Fail - Senha em Branco', () => {
    loginPage.acessLoginPage();
    loginPage.loginUserButton();
    loginPage.loginWithUser(userData.userPasswordEmpty.email, userData.userPasswordEmpty.password)
    loginPage.checkPasswordMissing2();
 });
})