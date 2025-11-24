describe('Login Flow', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('deve exibir a tela de login corretamente', () => {
    cy.contains('Kikão').should('be.visible');
    cy.contains('Sistema de Gestão Veterinária').should('be.visible');
    cy.get('input[type="email"]').should('be.visible');
    cy.get('input[type="password"]').should('be.visible');
    cy.get('button[type="submit"]').should('be.visible');
  });

  it('deve fazer login com credenciais de admin', () => {
    cy.get('input[type="email"]').type('admin@kikao.vet');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Dr. Carlos Silva').should('be.visible');
  });

  it('deve fazer login com credenciais de veterinário', () => {
    cy.get('input[type="email"]').type('vet@kikao.vet');
    cy.get('input[type="password"]').type('senha123');
    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/dashboard');
    cy.contains('Dra. Maria Santos').should('be.visible');
  });

  it('deve exibir erro com credenciais inválidas', () => {
    cy.get('input[type="email"]').type('invalido@email.com');
    cy.get('input[type="password"]').type('senhaerrada');
    cy.get('button[type="submit"]').click();

    cy.contains('Credenciais inválidas').should('be.visible');
    cy.url().should('include', '/login');
  });

  it('deve validar campos obrigatórios', () => {
    cy.get('button[type="submit"]').click();
    
    cy.get('input[type="email"]:invalid').should('exist');
    cy.get('input[type="password"]:invalid').should('exist');
  });
});
