# Estacionamento do Condomínio

Aplicação frontend para controle das vagas de estacionamento de um condomínio. Permite listar as vagas, filtrar por placa/número e situação, além de cadastrar, visualizar, editar e excluir reservas.

Não há backend: todos os dados são fictícios e ficam armazenados **em memória** (são reiniciados ao recarregar a página).

## Tecnologias

- [Node.js](https://nodejs.org/) 20.19+ (ou 22.12+)
- [React](https://react.dev/) 19 + [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/) 7
- [shadcn/ui](https://ui.shadcn.com/) (base Radix, estilo Nova) + [Tailwind CSS](https://tailwindcss.com/) 4
- [Lucide Icons](https://lucide.dev/)
- [Sonner](https://sonner.emilkowal.ski/) (notificações, via shadcn)
- ESLint 10 + Prettier 3

## Como executar

```bash
npm install
npm run dev
```

Acesse `http://localhost:5173`.

### Scripts

| Script                 | Descrição                                   |
| ---------------------- | ------------------------------------------- |
| `npm run dev`          | Servidor de desenvolvimento                 |
| `npm run build`        | Build de produção em `dist/`                |
| `npm run preview`      | Servidor local para o build de produção     |
| `npm run lint`         | Análise estática com ESLint                 |
| `npm run lint:fix`     | Corrige automaticamente problemas do ESLint |
| `npm run format`       | Formata o código com Prettier               |
| `npm run format:check` | Verifica a formatação                       |

## Rotas

| Rota                        | Página                | Descrição                                                                    |
| --------------------------- | --------------------- | ---------------------------------------------------------------------------- |
| `/`                         | -                     | Redireciona para `/vagas`                                                    |
| `/vagas`                    | `ListagemVagasPage`   | Listagem das vagas com filtros e paginação                                   |
| `/reservas/nova?vagaId=:id` | `CadastroReservaPage` | Cadastro de reserva (o parâmetro `vagaId` é opcional e pré-seleciona a vaga) |
| `/reservas/:reservaId`      | `DetalharReservaPage` | Visualização/edição/exclusão de uma reserva                                  |
| `*`                         | `NaoEncontradaPage`   | Página não encontrada                                                        |

## Funcionalidades

### Listagem de vagas (`/vagas`)

- Cabeçalho "Vagas do Estacionamento" / "Listagem das vagas de estacionamento do condomínio".
- Campo **Pesquisar** por placa do veículo ou número da vaga, com _debounce_ de 200 ms e botão **X** (tooltip "Limpar") que limpa a pesquisa e atualiza a listagem imediatamente.
- Filtro **Situação** (radio group): Disponível (`DISPONIVEL`), Ocupada (`OCUPADA`) e Todas (`TODAS`), aplicado imediatamente.
- Tabela com número da vaga, situação, placa (ou `-` quando disponível) e menu **Ações**:
  - **Realizar reserva**: visível apenas para vagas disponíveis; abre o cadastro com a vaga pré-selecionada.
  - **Visualizar reserva**: abre o detalhamento da reserva (desabilitado em vagas disponíveis, pois não há reserva).
  - **Excluir reserva**: pede confirmação em um _dialog_ e torna a vaga disponível (desabilitado em vagas disponíveis).
- Paginação com 10 itens por página (alterável para 20 ou 50) e botões **Voltar**/**Próxima** habilitados somente quando há página anterior/posterior.
- Mensagem "Nenhum resultado encontrado" quando não há registros.

### Cadastro / visualização de reserva

- Título "Nova reserva" ou "Visualizar reserva".
- Áreas do formulário:
  - **Vaga**: Número (somente vagas sem reserva; na edição inclui a vaga atual).
  - **Apartamento**: Bloco e Apartamento (o apartamento depende do bloco selecionado).
  - **Veículo**: Placa (padrão Mercosul `AAA0A00`, ex.: `ABC1D23`), Modelo (9 opções no formato "Marca - Modelo" + "Outro"), Cor (9 opções + "Outro") e Proprietário.
- Todos os campos são obrigatórios; os erros aparecem após o campo ser visitado.
- **Salvar**: habilitado apenas quando houver alteração **e** o formulário estiver válido. Ao salvar, o payload é impresso no console do navegador (`console.log`) e um _pop-up_ informa que o cadastro foi realizado com sucesso.
- **Voltar**: se houver alterações não salvas, pede confirmação para descartá-las.
- **Excluir**: alinhado à direita, visível apenas ao visualizar/editar; pede confirmação antes de excluir.

## Arquitetura

O projeto segue o padrão **MVVM (Model-View-ViewModel)**:

```
src/
├── app.jsx                       # Providers globais (Router, Tooltip, Toaster)
├── main.jsx                      # Ponto de entrada
├── index.css                     # Tailwind + tema do shadcn
├── data/                         # Camada de dados em memória
│   ├── banco-memoria.js          # "Tabelas" em memória e operações CRUD genéricas
│   └── dados-iniciais.js         # Dados fictícios (blocos, apartamentos, vagas, reservas)
├── models/                       # Model: regras de negócio, constantes e validações
│   ├── reserva-model.js
│   ├── situacao-vaga.js
│   └── veiculo-model.js
├── services/                     # Model: acesso aos dados (listar, obter, salvar, remover)
│   ├── apartamento-service.js
│   ├── bloco-service.js
│   ├── reserva-service.js
│   └── vaga-service.js
├── viewmodels/                   # ViewModel: hooks com estado e ações das telas
│   ├── use-listagem-vagas-view-model.js
│   └── use-reserva-form-view-model.js
├── hooks/                        # Hooks utilitários reutilizáveis
│   └── use-debounce.js
├── routes/
│   └── rotas.jsx                 # Definição das rotas (React Router)
├── pages/                        # View: páginas (sufixo "-page")
│   ├── nao-encontrada-page.jsx
│   ├── reserva/
│   │   ├── cadastro-reserva-page.jsx
│   │   └── detalhar-reserva-page.jsx
│   └── vaga/
│       └── listagem-vagas-page.jsx
├── components/
│   ├── ui/                       # Componentes shadcn gerados pelo CLI
│   └── app/                      # Componentes da aplicação (baseados em shadcn)
│       ├── comum/                # campo-select, campo-texto-input, confirmacao-dialog,
│       │                         # sucesso-dialog, pagina-header, paginacao-nav
│       ├── layout/               # app-layout
│       ├── reserva/              # reserva-form, reserva-form-container
│       ├── vaga/                 # vagas-table, filtro-vagas-bar, pesquisa-vagas-input,
│       │                         # situacao-vaga-radio-group, situacao-vaga-badge,
│       │                         # acoes-vaga-dropdown
│       └── veiculo/              # placa-veiculo-badge
└── lib/
    └── utils.js                  # Utilitário `cn` do shadcn
```

Fluxo: **Page (View)** → usa um **ViewModel** (hook) → que chama os **Services** → que leem/escrevem no **banco em memória**. Componentes visuais recebem dados e callbacks via _props_ e não acessam serviços diretamente.

### Entidades

| Entidade      | Campos                                                                                                |
| ------------- | ----------------------------------------------------------------------------------------------------- |
| `Bloco`       | `id`, `nome`                                                                                          |
| `Apartamento` | `id`, `numero`, `blocoId`                                                                             |
| `Vaga`        | `id`, `numero` (único)                                                                                |
| `Reserva`     | `id`, `vagaId`, `apartamentoId`, `veiculoPlaca`, `veiculoCor`, `veiculoModelo`, `veiculoProprietario` |

A situação da vaga (`DISPONIVEL`/`OCUPADA`) é derivada da existência de uma reserva para ela.

### Dados fictícios

- 4 blocos (A a D), cada um com 16 apartamentos (101–104, 201–204, 301–304, 401–404).
- 60 vagas (1 a 60).
- 18 reservas iniciais.

## Convenções

- Código, nomes de variáveis e textos em **pt-BR**, sem comentários.
- Arquivos em `kebab-case`, com sufixo indicando o tipo de componente (`-page`, `-table`, `-form`, `-dialog`, `-badge`, `-input`, `-select`, `-radio-group`, `-dropdown`, `-bar`, `-nav`, `-header`, `-layout`, `-container`).
- Todos os componentes visuais são construídos sobre componentes shadcn (`src/components/ui`).
- Imports absolutos com o alias `@/` (aponta para `src/`).
- Formatação pelo Prettier (sem ponto e vírgula, aspas simples, 100 colunas) e configurações de editor no `.editorconfig`.

### Adicionando componentes shadcn

```bash
npx shadcn@latest add <componente>
```
