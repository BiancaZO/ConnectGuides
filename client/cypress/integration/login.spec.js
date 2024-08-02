// // cypress/integration/login.spec.js

// describe('Login Page', () => {
//     beforeEach(() => {
//       cy.visit('/login'); // Navegue até a página de login
//     });
  
//     it('should display the login form', () => {
//       cy.get('h1').contains('Login'); // Verifique se o cabeçalho de login é exibido
//       cy.get('input[type="email"]').should('be.visible'); // Verifique se o campo de email está visível
//       cy.get('input[type="password"]').should('be.visible'); // Verifique se o campo de senha está visível
//       cy.get('button.primary').contains('Login'); // Verifique o botão de login
//     });
  
//     it('should show error on login failure', () => {
//       // Insira credenciais inválidas
//       cy.get('input[type="email"]').type('wrong@example.com');
//       cy.get('input[type="password"]').type('wrongpassword');
  
//       // Intercepte a solicitação de login e simule a falha
//       cy.intercept('POST', '/login', {
//         statusCode: 401,
//         body: { error: 'Invalid credentials' },
//       }).as('loginRequest');
  
//       // Envie o formulário
//       cy.get('button.primary').click();
  
//       // Aguarde a solicitação de login
//       cy.wait('@loginRequest');
  
//       // Verifique o alerta de falha
//       cy.on('window:alert', (txt) => {
//         expect(txt).to.contains('Login failed');
//       });
//     });
  
//     it('should login successfully with correct credentials', () => {
//       // Insira credenciais válidas
//       cy.get('input[type="email"]').type('user@example.com');
//       cy.get('input[type="password"]').type('correctpassword');
  
//       // Intercepte a solicitação de login e simule o sucesso
//       cy.intercept('POST', '/login', {
//         statusCode: 200,
//         body: { user: { id: 1, name: 'User', email: 'user@example.com' } },
//       }).as('loginRequest');
  
//       // Envie o formulário
//       cy.get('button.primary').click();
  
//       // Aguarde a solicitação de login
//       cy.wait('@loginRequest');
  
//       // Verifique o alerta de sucesso
//       cy.on('window:alert', (txt) => {
//         expect(txt).to.contains('Login successful');
//       });
  
//       // Verifique a redireção para a página inicial
//       cy.url().should('eq', Cypress.config().baseUrl + '/'); // Substitua pela sua URL base real
//     });
  
//     it('should navigate to the register page when clicking on Register now', () => {
//       cy.get('a').contains('Register now').click(); // Clique no link de registro
//       cy.url().should('include', '/register'); // Verifique se a URL inclui '/register'
//     });
//   });
  