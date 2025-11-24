describe('Gestão de Responsáveis', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('admin@kikao.vet');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.visit('/responsaveis');
  });

  it('deve exibir lista de responsáveis', () => {
    cy.contains('Responsáveis').should('be.visible');
    cy.contains('João Pedro Oliveira').should('be.visible');
    cy.contains('Maria Fernanda Costa').should('be.visible');
  });

  it('deve ofuscar CPF/CNPJ por LGPD', () => {
    cy.contains('123.***.***-**').should('be.visible');
    cy.contains('123.456.789-00').should('not.exist');
  });

  it('deve buscar responsáveis', () => {
    cy.get('input[placeholder*="Buscar"]').type('João');
    cy.contains('João Pedro Oliveira').should('be.visible');
  });

  it('deve exibir botão de novo responsável', () => {
    cy.contains('button', 'Novo Responsável').should('be.visible');
  });

  it('deve exibir ações de editar e excluir', () => {
    cy.contains('button', 'Editar').should('be.visible');
    cy.contains('button', 'Excluir').should('be.visible');
  });
});
