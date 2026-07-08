<p align="center">
  <img src="public/logo_dass.png" alt="Grupo Dass" width="220" />
</p>

<h1 align="center">Brindes — Grupo Dass</h1>

<p align="center">
  Front-end para gerenciamento do cadastro de tamanhos de camiseta e calçado dos<br />
  funcionários do Grupo Dass, usado na distribuição de brindes de fim de ano.
</p>

<p align="center">
  <img alt="Vue" src="https://img.shields.io/badge/Vue-3.5-42b883?logo=vuedotjs&logoColor=white">
  <img alt="Vuex" src="https://img.shields.io/badge/Vuex-4-42b883?logo=vuedotjs&logoColor=white">
  <img alt="Vue Router" src="https://img.shields.io/badge/Vue_Router-4-42b883?logo=vuedotjs&logoColor=white">
  <img alt="Vite" src="https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white">
  <img alt="Node" src="https://img.shields.io/badge/Node-%3E%3D20.19-339933?logo=nodedotjs&logoColor=white">
</p>

---

## Sobre o projeto

Este repositório contém o front-end da aplicação de brindes do Grupo Dass. A
aplicação consome a API do [back-end (`bck-dass-gift`)](https://github.com/J3ffn/bck-dass-gift)
e permite cadastrar, editar, excluir e listar funcionários com seus respectivos
tamanhos de camiseta e calçado.

## Demonstração

Aplicação em produção: **[ui-dass-gift.vercel.app](https://ui-dass-gift.vercel.app/)**

Consumindo o back-end em produção: [bck-dass-gift.onrender.com](https://bck-dass-gift.onrender.com/)
(hospedado no Render. A primeira requisição vai demorar um pouco).

## Funcionalidades

- **Cadastro e edição de funcionários**: modal com formulário para nome, CPF,
  e-mail, tamanho de camiseta (PP, P, M, G, GG, XG) e tamanho de calçado (34–48).
- **Exclusão de funcionários**: com diálogo de confirmação antes de remover.
- **Listagem de funcionários**: tabela no desktop e cards no mobile, com
  cabeçalho fixo e rolagem interna quando a lista é longa.
- **Busca/filtros**: por nome, CPF, e-mail, tamanho de camiseta e tamanho de
  calçado, combináveis entre si.
- **Validação de formulário**: CPF, e-mail e tamanhos validados no front-end
  antes do envio, além de exibir erros retornados pela API (ex.: CPF/e-mail
  já cadastrados).
- **Feedback ao usuário**: mensagens de sucesso/erro via toast para todas as
  ações (criar, editar, excluir).
- **Responsivo**: layout adaptado para desktop, tablet e mobile.

## Tecnologias

| Categoria        | Ferramenta                              |
| ----------------- | ---------------------------------------- |
| Framework          | [Vue 3](https://vuejs.org/) |
| Gerência de estado | [Vuex 4](https://vuex.vuejs.org/)        |
| Roteamento         | [Vue Router 4](https://router.vuejs.org/) |
| Build tool          | [Vite](https://vitejs.dev/)              |
| HTTP client         | [Axios](https://axios-http.com/)         |
| Máscara de campos   | [Maska](https://github.com/beholdr/maska) (CPF) |
| Ícones              | [Lucide](https://lucide.dev/)            |
| Lint                | ESLint (`eslint-plugin-vue`)             |

## Pré-requisitos

- **Node.js** `>=20.19.0`
- **Algum gerenicador de dependências** como: npm, yan, pnpm, etc.
- O [back-end (`bck-dass-gift`)](https://github.com/J3ffn/bck-dass-gift) rodando local (veja as instruções de instalação por lá) ou aponte para PRD seguindo: [Configuração](#configuração)

## Instalação

```bash
git clone https://github.com/J3ffn/ui-dass-gift.git
cd ui-dass-gift
npm install
```

## Configuração

Copie o `.env.example` para `.env`:

| Variável        | Descrição                          | Exemplo                  |
| ---------------- | ------------------------------------ | -------------------------- |
| `VITE_API_URL`   | URL base da API do back-end          | `http://localhost:3000`    |

`VITE_API_URL` pode apontar para:

- **back-end local**: `http://localhost:3000`, rodando conforme as instruções do repositório do back-end;
- **back-end em PRD**: `https://bck-dass-gift.onrender.com`.

## Executando o projeto

Com o back-end no ar e o `.env` configurado:

```bash
npm run dev
```

A aplicação sobe em `http://localhost:5173`

## Build para produção

```bash
npm run build     # gera o build na pasta dist
npm run preview   # roda o build localmente para teste
```

## Lint

```bash
npm run lint
```

## Estrutura do projeto

O projeto segue os princípios de **Atomic Design** para organizar os
componentes Vue:

```
src/
├── components/
│   ├── atoms/            # Átomos unitários, ex.: Button
│   ├── molecules/        # Molécolas que compõem atoms, ex.: Modal
│   ├── organisms/        # Organismos que compõem moleculas, ex: AppToaster
│   └── templates/        # Templates para as telas, ex.: DefaultLayout
├── views/                # Telas compostas por components, ex: EmployeeListView
├── router/               # Configuração das rotas
├── store/                # Vuex — módulos employee e notification
├── services/             # Cliente HTTP (Axios) e service de employee
├── utils/                # Validadores e tratamento de erros da API
└── style.css             # Tokens de design e estilos globais
```

## Design

O design da aplicação no Figma: **[Grupo Dass - Gestão de Brindes (UI)](https://www.figma.com/design/mGeLtetXpdgIUVTTl9vPrp/Grupo-Dass---Gest%C3%A3o-de-Brindes--UI-?node-id=4-15)**

## Projeto relacionado

- **Back-end:** [bck-dass-gift](https://github.com/J3ffn/bck-dass-gift) — API Node.js + Express + Prisma (PostgreSQL) consumida por esta aplicação.
