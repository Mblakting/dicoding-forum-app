describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/login');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('harus berhasil login dan dialihkan ke halaman utama', () => {
    cy.get('input[placeholder="Email"]').type('testing-dicoding@gmail.com');
    cy.get('input[placeholder="Password"]').type('testing123');
    cy.get('button').contains('Masuk').click();

    cy.url().should('eq', 'http://localhost:5173/');
    cy.get('nav').should('be.visible');
  });
});
