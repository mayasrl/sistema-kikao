describe('Agenda de Consultas', () => {
  beforeEach(() => {
    cy.visit('/login');
    cy.get('input[type="email"]').type('vet@kikao.vet');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
    cy.visit('/agenda');
  });

  it('deve exibir agenda com visualizações', () => {
    cy.contains('Agenda').should('be.visible');
    cy.contains('button', 'Dia').should('be.visible');
    cy.contains('button', 'Semana').should('be.visible');
    cy.contains('button', 'Mês').should('be.visible');
  });

  it('deve exibir estatísticas de consultas', () => {
    cy.contains('Agendadas').should('be.visible');
    cy.contains('Realizadas').should('be.visible');
    cy.contains('Canceladas').should('be.visible');
    cy.contains('Ausentes').should('be.visible');
  });

  it('deve permitir navegação entre períodos', () => {
    cy.get('button[aria-label="Período anterior"]').should('be.visible');
    cy.get('button[aria-label="Próximo período"]').should('be.visible');
    cy.contains('button', 'Hoje').should('be.visible');
  });

  it('deve alternar entre visualizações', () => {
    cy.contains('button', 'Dia').click();
    cy.contains('button', 'Semana').click();
    cy.contains('button', 'Mês').click();
  });

  it('deve exibir botão de nova consulta', () => {
    cy.contains('button', 'Nova Consulta').should('be.visible');
  });
});
