# TAgri — Backend (Node/Express + Sequelize)

Monorepo com frontend (Vite) e backend (Express). Este diretório contém o backend completo com autenticação JWT + refresh rotativo, RBAC e módulo de Suporte básico.

## Requisitos
- Node.js 18+
- PostgreSQL local

## Instalação
```bash
cd server
npm i
```

## Configuração
Copie `.env.example` para `.env` e ajuste as variáveis.

## Banco de Dados
```bash
npm run db:migrate
npm run db:seed
```

## Desenvolvimento
```bash
npm run dev
```
Servidor em http://localhost:3001

## Scripts
- `dev`: desenvolvimento com nodemon
- `start`: produção
- `db:migrate`: executa migrations
- `db:seed`: popula dados de demonstração
- `test`: Jest (serviços e rotas principais)

## Estrutura
```
src/
  app.js
  server.js
  db.js
  routes/
  services/
  middlewares/
  utils/
config/config.js
migrations/
seeders/
```
