/* global cy */
describe('Client Base', () => {
  it('Visits Client Base', () => {
    cy.visit('http://localhost:3300/manifest')
    cy.get('#manifestURI').type('http://localhost:5000/test.json')
    cy.get('#label').click()
    cy.get('#label > li').should('contain', 'Bodleian Library: Human Freaks 2 (33')
    cy.get('#summary').click()
    cy.get('#summary > li').should('contain', '[Handbill of Mr. Becket, [1787] ]')
    cy.get('#metadata').click()
    cy.get('#metadata > li').should('contain', 'Printed ephemera')
  })
})
