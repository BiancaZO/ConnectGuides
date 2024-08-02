describe('Register Page', () => {
  beforeEach(() => {
    cy.visit('/register'); // The base URL will be prepended automatically
  });

  it('should render the registration form correctly', () => {
    cy.get('h1').contains('Register');
    cy.get('input[placeholder="Full Name"]').should('be.visible');
    cy.get('input[placeholder="your@email.com"]').should('be.visible');
    cy.get('input[placeholder="password"]').should('be.visible');
    cy.get('input[placeholder="000-000-000"]').should('be.visible');
    cy.get('input[placeholder="356, Vancouver St"]').should('be.visible');
    cy.get('button').contains('Register').should('be.visible');
  });

  it('should display validation errors for empty form fields', () => {
    cy.get('button').contains('Register').click();
    cy.get('.error-message').should('contain', 'All fields cannot be empty.'); // Adjust the selector based on your error message element
  });

  it('should validate name field correctly', () => {
    cy.get('input[placeholder="Full Name"]').type('John');
    cy.get('button').contains('Register').click();
    cy.get('.error-message').should('contain', 'Please enter at least first and last name.'); // Adjust the selector based on your error message element
  });

  it('should validate email field correctly', () => {
    cy.get('input[placeholder="Full Name"]').type('John Doe');
    cy.get('input[placeholder="your@email.com"]').type('invalid-email');
    cy.get('button').contains('Register').click();
    cy.get('.error-message').should('contain', 'Please enter a valid email address.'); // Adjust the selector based on your error message element
  });

  it('should validate password field correctly', () => {
    cy.get('input[placeholder="Full Name"]').type('John Doe');
    cy.get('input[placeholder="your@email.com"]').type('john.doe@example.com');
    cy.get('input[placeholder="password"]').type('123');
    cy.get('button').contains('Register').click();
    cy.get('.error-message').should('contain', 'Password must be at least 8 characters long.'); // Adjust the selector based on your error message element
  });

  it('should validate phone number field correctly', () => {
    cy.get('input[placeholder="Full Name"]').type('John Doe');
    cy.get('input[placeholder="your@email.com"]').type('john.doe@example.com');
    cy.get('input[placeholder="password"]').type('securepassword');
    cy.get('input[placeholder="000-000-000"]').type('abc123');
    cy.get('button').contains('Register').click();
    cy.get('.error-message').should('contain', 'Phone number can only contain numbers.'); // Adjust the selector based on your error message element
  });

  it('should successfully register a user with valid data', () => {
    // Mock the axios POST request
    cy.intercept('POST', '/register', {
      statusCode: 201,
      body: {},
    }).as('registerUser');

    cy.get('input[placeholder="Full Name"]').type('John Doe');
    cy.get('input[placeholder="your@email.com"]').type('john.doe@example.com');
    cy.get('input[placeholder="password"]').type('securepassword');
    cy.get('input[placeholder="000-000-000"]').type('1234567890');
    cy.get('input[placeholder="356, Vancouver St"]').type('123 Main St');

    cy.get('button').contains('Register').click();

    cy.wait('@registerUser');
    cy.get('.success-message').should('contain', 'Registration successful. Welcome to Connect Guides!'); // Adjust the selector based on your success message element
    cy.url().should('include', '/login');
  });
});
