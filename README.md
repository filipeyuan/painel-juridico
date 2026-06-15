# Painel Jurídico — Full Stack React + Node.js

Aplicação web full stack para visualização e análise de dados de agendamentos jurídicos.

---

## Requisitos

- Node.js v18+
- npm v9+

---

## Como executar o back-end

```bash
cd backend
npm install
node index.js
```

O servidor sobe em `http://localhost:3001`

---

## Como executar o front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação abre em `http://localhost:5173`

---

## Rotas da API

| Método | Rota | Descrição |
|--------|------|-----------|
| GET | /api/atendimentos | Lista com filtros e paginação |
| GET | /api/atendimentos/metricas | KPIs e dados para gráficos |
| GET | /api/atendimentos/:id | Busca por ID |

Parâmetros disponíveis em `/api/atendimentos`:

| Parâmetro | Tipo | Descrição |
|-----------|------|-----------|
| busca | string | Filtra por cliente, advogado ou organização |
| realizado | string | Filtra por "Sim" ou "Não" |
| pagina | number | Número da página (default: 1) |
| limite | number | Itens por página (default: 10, máx: 500) |

---

## Dependências e justificativas

### Back-end

| Pacote | Justificativa |
|--------|--------------|
| express | Framework HTTP para criação da API REST |
| cors | Permite requisições cross-origin do front-end React |

### Front-end

| Pacote | Justificativa |
|--------|--------------|
| react + vite | Base do front-end com hot reload e build rápido |
| tailwindcss | Estilização utilitária com design tokens centralizados |
| recharts | Gráficos de linha e barras com suporte a responsividade |
| jspdf + jspdf-autotable | Exportação de relatórios em PDF no navegador |
| lucide-react | Ícones consistentes com o design system |
| @radix-ui/react-slot | Base dos componentes shadcn/ui |
| class-variance-authority + clsx + tailwind-merge | Composição de classes CSS com variantes |

---

## Decisões técnicas

**Sem banco de dados real**
Os dados são servidos a partir de um arquivo `atendimentos.json` conforme especificado no desafio. Em produção, seria substituído por PostgreSQL.

**Design tokens centralizados**
Todas as cores, tipografia, sombras e espaçamentos ficam em `src/styles/tokens.js`. Nenhum valor de cor está fixado nos componentes, facilitando manutenção e consistência visual.

**Componentes reutilizáveis**
Cada parte do dashboard é um componente isolado com responsabilidade única: `KPICard`, `GraficoLinha`, `GraficoBarras`, `TabelaAtendimentos`, `ExportarDados`, `Navbar`.

**Paginação e filtros no back-end**
A filtragem e paginação acontecem na API, evitando trafegar os 499 registros a cada requisição.

**Exportação com filtros ativos**
CSV e PDF buscam todos os registros filtrados antes de exportar, não apenas a página atual. O PDF exibe os filtros ativos no cabeçalho do relatório.

**Navegação por tabs**
Em vez de rotas separadas, a navegação entre Dashboard e Agendamentos usa estado local com tabs, mantendo o código simples e sem dependência do React Router.

---

## Estrutura do projeto

```
painel-juridico/
├── backend/
│   ├── controllers/
│   │   └── atendimentosController.js
│   ├── data/
│   │   └── atendimentos.json
│   ├── routes/
│   │   └── atendimentos.js
│   └── index.js
└── frontend/
    └── src/
        ├── components/
        │   ├── ui/
        │   │   └── button.jsx
        │   ├── ExportarDados.jsx
        │   ├── GraficoBarras.jsx
        │   ├── GraficoLinha.jsx
        │   ├── KPICard.jsx
        │   ├── Navbar.jsx
        │   └── TabelaAtendimentos.jsx
        ├── pages/
        │   ├── Agendamentos.jsx
        │   └── Dashboard.jsx
        ├── styles/
        │   └── tokens.js
        └── App.jsx
```

---

## Limitações conhecidas e melhorias futuras

- Campo "Receita Total" não implementado — o dataset fornecido não contém informações financeiras
- Busca por área jurídica não implementada — o dataset fornecido não contém esse campo
- Dados estáticos em JSON — em produção seria substituído por PostgreSQL com migrations
- Sem autenticação — evolução natural seria adicionar JWT com refresh token
- Busca sem debounce — cada keystroke dispara uma requisição à API
- Gráficos com dados de apenas 2 meses — limitação do dataset fornecido
- Sem testes automatizados — próximo passo seria adicionar Jest + Testing Library
