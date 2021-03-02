describe('navigation', () => {
  it('should navigate to the stops page', () => {
    cy.visit('/');
    cy.findByText('METRO Blue Line').click();
    cy.findByText('Northbound').should('exist').click();

    cy.findByText('Mall of America Station').should('exist');
    cy.findByAltText('Metro Transit').should('exist').click();

    cy.findByRole('searchbox').should('exist').type('Northstar');
    cy.findAllByRole('listitem').should('have.length.below', 3);
    cy.findByRole('searchbox').clear();
  });

  it('should navigate with the back and forward browser buttons and show the right breadcrumb state', () => {
    cy.findByText('METRO Blue Line').should('exist').click();
    cy.findByText('Northbound').should('exist').click();
    cy.findByText('Mall of America Station').should('exist');
    cy.findByRole('button', { name: /northbound/i }).should('exist');
    cy.findByRole('button', { name: /metro blue line/i }).should('exist');

    cy.go('back');
    cy.wait(1000);
    cy.findByText('Northbound').should('exist');
    cy.findByRole('button', { name: /northbound/i }).should('not.exist');
    cy.findByRole('button', { name: /metro blue line/i }).should('exist');

    cy.go('back');
    cy.findByText('METRO Blue Line').should('exist');
    cy.findByRole('button', { name: /northbound/i }).should('not.exist');
    cy.findByRole('button', { name: /metro blue line/i }).should('not.exist');

    cy.go('forward');
    cy.findByText('Northbound').should('exist');
    cy.findByRole('button', { name: /northbound/i }).should('not.exist');
    cy.findByRole('button', { name: /metro blue line/i }).should('exist');

    cy.go('forward');
    cy.findByText('Mall of America Station').should('exist');
    cy.findByRole('button', { name: /northbound/i }).should('exist');
    cy.findByRole('button', { name: /metro blue line/i }).should('exist');
  });
});

export {};
