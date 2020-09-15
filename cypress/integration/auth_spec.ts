describe('Login', function () {
  beforeEach(function() {
    cy.exec('npm run db:reset:test && npm run db:seed:test')
  })

  it('redirects to register', function() {
    cy.visit('/')
    cy.url().should('include', 'register')
  })

  it('sign up unsuccessfully', function() {
    cy.visit('/register')
    cy.contains('Sign up')

    cy.get('#name').type('u')
    cy.get('#email').type('user1@example.com')
    cy.get('#password').type('invalid')
    cy.get('form').submit()
    cy.get('#au-name').should('be.visible')
  })

  it('sign up successfully', function() {
    cy.visit('/register')
    cy.contains('Sign up')

    cy.get('#name').type('user')
    cy.get('#email').type('user1@example.com')
    cy.get('#password').type('invalid')
    cy.get('form').submit()
    cy.url().should('include', 'surveys')
  })

})