describe('navigation', () => {
  it('should navigate to the stops page', () => {
    cy.visit('/');
    cy.findByText('METRO Blue Line').click();
    cy.findByText('Northbound').should('exist').click();
    cy.findByText('Mall of America Station').should('exist');
  });
});

export {};
