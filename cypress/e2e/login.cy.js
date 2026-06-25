describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('harus menampilkan halaman login dengan benar', () => {
    cy.get('input[placeholder="Email"]').should('be.visible');
    cy.get('input[placeholder="Password"]').should('be.visible');
    cy.get('button').contains('Masuk').should('be.visible');
  });

  it('harus berhasil login dan dialihkan ke halaman utama', () => {
    const timestamp = Date.now();
    const email = `testing-dicoding-${timestamp}@example.com`;
    const password = 'testing123';

    cy.request('POST', 'https://forum-api.dicoding.dev/v1/register', {
      name: `Testing Dicoding ${timestamp}`,
      email,
      password,
    });

    cy.get('input[placeholder="Email"]').type(email);
    cy.get('input[placeholder="Password"]').type(password);
    cy.get('button').contains('Masuk').click();

    cy.location('pathname').should('eq', '/');
    cy.get('nav').should('be.visible');
  });
});
