# 🐾 Sistema de Gestão Veterinária Kikão

Sistema completo de gestão para clínica veterinária desenvolvido com React, TypeScript, Zustand e Tailwind CSS.

## 📋 Sobre o Projeto

Este é um sistema frontend desenvolvido seguindo especificações técnicas rigorosas para a Clínica Veterinária Kikão em Montes Claros, MG. O projeto implementa os 4 módulos essenciais da Fase 1 do MVP:

- **Autenticação e RBAC**: Sistema de login com perfis Admin e Veterinário
- **Gestão de Responsáveis**: CRUD completo com validações e conformidade LGPD
- **Gestão de Animais**: Cadastro vinculado a responsáveis com upload de foto
- **Agenda de Consultas**: Calendário interativo com visualizações Dia/Semana/Mês
- **Dashboard Financeiro**: Controle de receitas e despesas com integração automática

## 🛠️ Stack Tecnológica

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **React** | 18.2.0 | Biblioteca UI |
| **TypeScript** | 5.2.2 | Tipagem estática rigorosa |
| **Vite** | 5.0.8 | Build tool e dev server |
| **Zustand** | 4.4.7 | Gerenciamento de estado |
| **Tailwind CSS** | 3.3.6 | Estilização |
| **React Aria** | 3.30.0 | Componentes acessíveis |
| **React Router** | 6.20.0 | Roteamento |
| **Jest** | 29.7.0 | Testes unitários |
| **Cypress** | 13.6.2 | Testes E2E |
| **Storybook** | 7.6.4 | Documentação de componentes |

## 🎨 Design System

O projeto utiliza a identidade visual oficial da Kikão:

```css
Cor Primária: #B8587D (Rosa vibrante)
Cor Secundária: #B4264A (Rosa escuro)
Cor de Fundo: #fafafa e #f5d5e0
Tipografia: 'Poppins', sans-serif
```

## 📁 Estrutura do Projeto

```
kikao-vet-frontend/
├── src/
│   ├── components/        # Componentes reutilizáveis
│   │   ├── Layout.tsx
│   │   └── SchedulerCalendar/  # Compound component
│   ├── hooks/            # Custom hooks complexos
│   │   ├── useResponsaveis.ts
│   │   └── useAppointmentScheduler.ts
│   ├── pages/            # Páginas da aplicação
│   │   ├── Login.tsx
│   │   ├── Agenda.tsx
│   │   ├── Financeiro.tsx
│   │   └── Responsaveis.tsx
│   ├── services/         # Serviços e APIs
│   │   └── mock/         # Mock APIs para desenvolvimento
│   ├── store/            # Zustand stores
│   │   └── authStore.ts
│   ├── types/            # Interfaces TypeScript
│   │   ├── IResponsavel.ts
│   │   ├── IAnimal.ts
│   │   ├── IConsulta.ts
│   │   ├── IRecursoFinanceiro.ts
│   │   └── IAuth.ts
│   ├── utils/            # Utilitários
│   ├── testing/          # Setup de testes
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── cypress/              # Testes E2E
│   ├── e2e/
│   │   ├── login.cy.ts
│   │   ├── responsaveis.cy.ts
│   │   └── agenda.cy.ts
│   └── support/
├── .storybook/           # Configuração Storybook
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── README.md
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js 18+ 
- npm ou yarn

### Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Testes

```bash
# Testes unitários
npm test

# Testes com cobertura
npm run test:coverage

# Testes E2E interativos
npm run cypress

# Testes E2E headless
npm run cypress:run
```

### Storybook

```bash
# Executar Storybook
npm run storybook

# Build do Storybook
npm run build-storybook
```

## 🔐 Credenciais de Teste

**Admin:**
- Email: admin@kikao.vet
- Senha: senha123

**Veterinário:**
- Email: vet@kikao.vet
- Senha: senha123

## 🎯 Requisitos de Qualidade Implementados

### TypeScript Rígido
- ✅ Interfaces formais para 100% dos modelos de dados
- ✅ Uso de `any` estritamente proibido
- ✅ Strict mode habilitado

### Conformidade LGPD
- ✅ Ofuscação de CPF/CNPJ na UI
- ✅ Minimização de dados sensíveis
- ✅ Controle de acesso por perfil

### Padrões Avançados
- ✅ Compound Components (SchedulerCalendar)
- ✅ Custom Hooks complexos (useAppointmentScheduler)
- ✅ Abstração completa de lógica de negócio

### Testes
- ✅ Configuração Jest com 85% de cobertura
- ✅ 5 cenários E2E implementados (Cypress)
- ✅ Storybook completo para componentes

## 📊 Cobertura de Testes

O projeto está configurado para exigir mínimo de 85% de cobertura em:
- Branches
- Functions
- Lines
- Statements

## 🔄 Integração Automática

O sistema implementa integração automática entre módulos:
- Consultas realizadas geram automaticamente receitas no módulo financeiro
- Histórico de animais é atualizado com consultas e vacinas
- Dashboard financeiro consolida dados em tempo real

## 🤝 Contribuindo

Este é um projeto proprietário da Clínica Veterinária Kikão.

---

<p align="center">
  Desenvolvido com 💛 por <strong>@mayasrl</strong>
</p>
