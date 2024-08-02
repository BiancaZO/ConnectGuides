// describe('Guide Service Form Page', () => {
//     beforeEach(() => {
//       // Adjust URL to your actual login endpoint and credentials
//       cy.request('POST', '/api/login', {
//         email: 'r@email.com',
//         password: '12345678'
//       }).then((resp) => {
//         window.localStorage.setItem('authToken', resp.body.token);
//         // You may need to set other local storage or cookies as required by your app
//       });
//       cy.visit('/guideServiceForm'); // Adjust the URL to your form page
//     });
  
//     it('should fill and submit the form', () => {
//       // Fill title
//       cy.get('input[placeholder="title, for exemple: I can offer you the better experience..."]')
//         .type('Amazing Tour Experience');
  
//       // Fill city
//       cy.get('input[placeholder="city"]').type('Vancouver');
  
//       // Upload photos (Mock photo upload)
//       // This requires more setup if you want to simulate actual file upload
  
//       // Fill description
//       cy.get('textarea').first().type('This is a detailed description of the tour service.');
  
//       // Select services (Assuming checkboxes or similar for service selection)
//       cy.get('input[type="checkbox"]').first().check();
  
//       // Fill extra info
//       cy.get('textarea').eq(1).type('Please be on time.');
  
//       // Fill max travelers
//       cy.get('input[type="number"]').first().clear().type('5');
  
//       // Fill price
//       cy.get('input[type="number"]').eq(1).clear().type('150');
  
//       // Submit the form
//       cy.get('button.primary').click();
  
//       // Verify redirection
//       cy.url().should('include', '/account/guideService');
//     });
//   });
  