# Gerenciador de Usuários (CRUD)

Este é um projeto desenvolvido em Next.js que implementa um sistema completo de gestão de usuários (CRUD) com autenticação. O objetivo é demonstrar competências em arquitetura de componentes, gestão de estado, integração com API e design responsivo utilizando tecnologias modernas.

## Tecnologias Utilizadas

- **Next.js 15 (App Router):** Framework React para renderização e roteamento.
- **React 19:** Biblioteca para construção da interface.
- **TypeScript:** Tipagem estática para maior segurança e manutenibilidade.
- **Tailwind CSS:** Framework de utilitários CSS para estilização.
- **Shadcn/UI:** Conjunto de componentes acessíveis e personalizáveis.
- **Json-Server:** Simulação de uma API REST completa para o backend.
- **Next-Themes:** Gestão de temas (Claro/Escuro).
- **Axios:** Cliente HTTP para requisições à API.

## Funcionalidades

### Autenticação
- **Login:** Sistema de login utilizando credenciais armazenadas.
- **Registro:** Criação de novas contas de administrador.
- **Proteção de Rotas:** Middleware ou componentes de ordem superior (HOC) que impedem acesso não autorizado ao painel.
- **Persistência:** Sessão mantida via LocalStorage para simulação de autenticação persistente.

### Gestão de Usuários (Dashboard)
- **Listagem:** Visualização de todos os usuários cadastrados com avatar do GitHub.
- **Cadastro:** Adição de novos usuários informando nome e username do GitHub.
- **Edição:** Atualização dos dados de um usuário existente.
- **Exclusão:** Remoção de usuários da lista.

### Interface (UI/UX)
- **Design Responsivo:** Layout adaptável para dispositivos móveis e desktop.
- **Modo Escuro:** Alternância entre tema claro e escuro.
- **Feedback Visual:** Indicadores de carregamento (loading states) e mensagens de erro amigáveis.

## Pré-requisitos

Antes de iniciar, certifique-se de ter instalado:
- Node.js (versão 18 ou superior)
- Gerenciador de pacotes (NPM, Yarn, PNPM ou Bun)

## Configuração do Banco de Dados

Este projeto utiliza o `json-server` para simular um banco de dados. É necessário criar um arquivo `db.json` na raiz do projeto com a estrutura inicial.

1. Crie um arquivo chamado `db.json` na raiz do projeto.
2. Cole o seguinte conteúdo no arquivo:

```json
{
  "accounts": [],
  "users": []
}
```

- **accounts:** Armazenará os dados de login (administradores do sistema).
- **users:** Armazenará os usuários gerenciados no CRUD.

## Instalação e Execução

Siga os passos abaixo para rodar o projeto localmente.

### 1. Instalar dependências

Execute o comando no terminal para instalar as bibliotecas necessárias:

```bash
npm install
```

### 2. Iniciar o Servidor Backend (API)
Em um terminal separado, inicie o json-server. Ele rodará na porta 3333 para não conflitar com o Next.js.

```bash
npm run json:server
```

### 3. Iniciar o Frontend (Next.js)
Em outro terminal, inicie a aplicação web:

```bash
npm run dev
```
**A aplicação estará disponível em: http://localhost:3000**

## Como Testar

- **Acesse a página inicial. Você será redirecionado para o Login.**
- **Como é o primeiro acesso, clique em "Registre-se" e crie uma conta.**
- **Após o registro, você será redirecionado para o Dashboard.**
- **No Dashboard, tente:**
- **Alternar o tema (Botão no canto superior direito).**
- **Cadastrar um novo usuário (ex: use um username válido do GitHub para ver a foto).**
- **Editar o nome de um usuário.**
- **Excluir um usuário.**
- **Fazer logout e tentar acessar a rota /users manualmente (deverá ser redirecionado para o login).**

## Estrutura de Pastas Importantes

- `app/`: Páginas e rotas da aplicação (Login, Registro, Users).
- `components/`: Componentes reutilizáveis (Formulários, Listas, Botões, UI do Shadcn).
- `lib/`: Configurações utilitárias (Cliente Axios API, funções auxiliares).
- `types/`: Definições de tipos TypeScript (Account, UserEntry).
