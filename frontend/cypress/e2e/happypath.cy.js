context('test all the happy path', () => {
  beforeEach(() => {
    cy.visit('localhost:3000');
  });

  it('should have a home page', () => {
    cy.url().should('include', 'localhost:3000');
  });

  it('should register successfully', () => {
    const name = 'Amy';
    const email = 'amy@gmail.com';
    const password = 'amy';

    cy.get('Button[name="goto-register"]').click()
    cy.url().should('include', 'localhost:3000/register');
    cy.get('[name="name"]')
      .focus()
      .type(name);
    cy.get('[name="email"]')
      .focus()
      .type(email);
    cy.get('[name="password"]')
      .focus()
      .type(password);
    cy.get('Button[name="register"]').click();    
    cy.url().should('include', 'localhost:3000/dashboard');
  })

  Cypress.Commands.add('login', (user) => {
    cy.session(
      user,
      () => {
        cy.visit('localhost:3000');
        cy.get('Button[name="goto-login"]').click()
        cy.url().should('include', 'localhost:3000/login');
        cy.get('[name="email"]')
          .focus()
          .type(user.email);
        cy.get('[name="password"]')
          .focus()
          .type(user.password);
        cy.get('Button[name="login"]').click();    
        cy.url().should('include', 'localhost:3000/dashboard');
      }
    )
  })

  it('should login successfully', () => {
    const email = 'amy@gmail.com';
    const password = 'amy';
    cy.url();
    cy.get('Button[name="goto-login"]').click()
    cy.url().should('include', 'localhost:3000/login');
    cy.get('[name="email"]')
      .focus()
      .type(email);
    cy.get('[name="password"]')
      .focus()
      .type(password);
    cy.get('Button[name="login"]').click();    
    cy.request('POST', 'localhost:5005/admin/auth/login', {email, password})
      .then(response => {
        expect(response.body.ok === true)
      })
    cy.url().should('include', 'localhost:3000/dashboard');
    cy.contains('Dashboard').should('exist');
  });

  it('should create new game successfully', () => {
    cy.login({
      email: 'amy@gmail.com',
      password: 'amy'
    })
    const title = 'new game';
    cy.visit('localhost:3000/dashboard')
    cy.url().should('include', '/dashboard');
    cy.get('[name="new-game-title"]')
      .focus()
      .type(title)
      .click();

    cy.request('')
    cy.contains(title).should('exist');

  })

})

