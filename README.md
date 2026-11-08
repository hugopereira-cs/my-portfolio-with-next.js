# 💼 Portfólio de Hugo Pereira

Portfólio pessoal criado para apresentar meu perfil, conhecimentos e projetos em desenvolvimento web. O site é escrito em português e utiliza arquivos JSON locais como fonte dos dados.

🔗 **Link do site:** [https://hugopereiradev.vercel.app/](https://hugopereiradev.vercel.app/)

## ✨ O que você encontra no site

- **Início (`/`):** apresentação breve, sem botões ou conteúdo adicional de outras páginas.
- **Projetos (`/projects`):** projetos em cartões, com descrição, tecnologias e links disponíveis. É possível filtrar a lista por tecnologia; a seleção fica na URL, por exemplo, `/projects?tech=react`.
- **Sobre (`/about`):** apresentação, competências, idiomas, formação, cursos e experiência profissional, organizados em abas.
- **Contato (`/contact`):** links de contato; não há formulário de envio.
- **Tema claro e escuro:** alternância manual com preferência salva no navegador e suporte à preferência de tema do sistema.
- **SEO básico:** metadados por página, Open Graph, cartões do X/Twitter, sitemap e `robots.txt`.

O conteúdo vem de arquivos JSON do projeto e é lido no servidor. Não há uma API ou banco de dados para carregar as informações do portfólio.

## 🧰 Tecnologias utilizadas

| Tecnologia | Uso neste projeto |
|---|---|
| **Next.js 16 (App Router)** | Framework da aplicação. Organiza as páginas e layouts, gera páginas no servidor e fornece recursos como metadados, `sitemap.xml` e `robots.txt`. |
| **React 19** | Biblioteca usada para construir as interfaces e os componentes interativos, como as abas e o filtro de projetos. |
| **TypeScript 5** | Adiciona tipagem estática ao JavaScript e descreve os dados do perfil, projetos, idiomas e tecnologias. |
| **Tailwind CSS 4** | Estiliza a interface com classes utilitárias e tokens de tema definidos no CSS. |
| **`@tailwindcss/turbopack`** | Integra o processamento de CSS do Tailwind ao Turbopack configurado no Next.js. |
| **Biome 2** | Executa a verificação de lint do código-fonte. Também está disponível para verificar e formatar o código. |
| **Vitest 4** | Executa os testes unitários dos getters de dados e os testes dos componentes. |
| **Testing Library** | Renderiza componentes para testes e consulta a interface como um usuário faria. `user-event` simula ações como cliques, seleção e teclado; `jsdom` fornece um ambiente de navegador simulado. |
| **Playwright** | Executa testes E2E no Chromium, abrindo a aplicação real e verificando o fluxo do filtro de projetos. |
| **`lucide-react` e `react-icons`** | Fornecem ícones da interface e logos das tecnologias apresentadas na página Sobre. |
| **GitHub Actions** | Executa as verificações de qualidade e os testes quando há um push ou pull request para `main`. |

As fontes Geist Sans e Geist Mono são carregadas de arquivos locais usando `next/font/local`.

## 🚀 Executar localmente

O GitHub Actions usa **Node.js 24.22.1**; use essa versão para manter o ambiente local alinhado à CI e às dependências de teste.

1. Clone o repositório e entre na pasta do projeto:

   ```bash
   git clone https://github.com/hugopereira-cs/my-portfolio-with-next.js.git
   cd my-portfolio-with-next.js
   ```

2. Instale as dependências:

   ```bash
   npm ci
   ```

3. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

4. Acesse [http://localhost:3000](http://localhost:3000).

## 🧪 Testes

### Testes unitários e de componentes — Vitest

Execute todos os testes uma vez:

```bash
npm test
```

Para executar em modo de observação durante o desenvolvimento:

```bash
npm run test:watch
```

Os testes unitários verificam os getters dos dados locais: perfil, tecnologias, projetos, ordenação, filtros e a composição do portfólio. Os testes de componentes verificam as abas da página Sobre e as interações do filtro de tecnologia, incluindo estados selecionados, conteúdo exibido e navegação solicitada.

### Testes de ponta a ponta — Playwright

Instale o Chromium do Playwright uma vez:

```bash
npx playwright install chromium
```

Execute os testes E2E:

```bash
npm run test:e2e
```

O Playwright cria um build de produção, inicia a aplicação localmente na porta `3100` e testa o fluxo completo do filtro no Chromium. Os cenários verificam a filtragem por tecnologia, a limpeza do filtro e a mensagem exibida quando não há projetos correspondentes.

## ✅ Verificações e build

```bash
npm run lint       # Lint com Biome
npm run typecheck  # Verificação de tipos com TypeScript
npm run build      # Build de produção do Next.js
```

Outros comandos disponíveis:

```bash
npm run check      # Verifica lint e formatação com Biome
npm run format     # Formata os arquivos em src/
```

## 🗂️ Onde ficam os dados

Os dados do portfólio ficam em `src/data/`:

- `profile.json`: apresentação, foto, idiomas, formação, cursos, experiência e contatos.
- `projects.json`: projetos, imagens, funcionalidades, links e slugs das tecnologias utilizadas.
- `technologies.json`: nome, categoria e configuração de exibição das tecnologias.

Os tipos ficam em `src/types/`, e a leitura e normalização dos arquivos JSON é centralizada em `src/lib/data/`. Por exemplo, essa camada transforma os slugs de tecnologia dos projetos nos respectivos objetos e ordena os projetos pelo campo `order`.

As imagens estáticas ficam em `public/images/`. Os caminhos usados nos dados JSON devem corresponder aos arquivos dessa pasta.

## ⚙️ Variável de ambiente

`NEXT_PUBLIC_SITE_URL` é opcional. Ela define a URL base usada nos metadados sociais e no sitemap. Se não estiver definida, o projeto usa a URL de produção fornecida pela Vercel quando disponível; fora desse ambiente, usa `http://localhost:3000`.

## 📁 Organização principal

```text
src/
├── app/          # Páginas, layout, metadados, sitemap e robots.txt
├── components/   # Componentes de layout, projetos, Sobre e interface
├── data/         # Dados locais em JSON
├── lib/          # Acesso aos dados e utilitários
└── types/        # Tipos TypeScript
e2e/              # Testes de ponta a ponta com Playwright
```
