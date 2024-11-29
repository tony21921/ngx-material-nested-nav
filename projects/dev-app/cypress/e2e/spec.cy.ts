describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Angular Material Nested Navigation List');
  });

  it ('Check if the nested nav list is displayed', () => {
    cy.visit('/');
    cy.get('mat-nav-list').should('exist');
    cy.contains('Home');
    cy.contains('Profile').should('not.exist');
    cy.contains('Settings').click();
    cy.contains('Profile');
    cy.contains('Notifications');
    cy.contains('Repo');
  });

  it('Check navigation', () => {
    cy.visit('/');
    cy.contains('Settings').click();
    cy.contains('Profile').click();
    cy.url().should('include', '/profile');
    cy.contains('Home').click();
    cy.url().should('include', '/home');

    cy.window().then((win) => {
      cy.stub(win, 'open').as('windowOpen');
    });
    cy.get('mat-list-item:contains("Repo")').click();
    cy.get('@windowOpen').should('be.calledWith', 'about:blank', '_blank');
  });

  it('SVG icon should be displayed', () => {
    cy.visit('/');
 
    cy.get('mat-list-item:contains("Repo")').find('mat-icon[matlistitemicon]').find('svg').should('exist');
 
    cy.get('ngx-nested-nav-list').should('have.class', 'override-svg-icon-color');
    cy.contains('Keep Svg Icon Color').click();
    cy.get('ngx-nested-nav-list').should('not.have.class', 'override-svg-icon-color');
  });
});
