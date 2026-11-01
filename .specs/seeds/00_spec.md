# Spec: Portfolio Web (Front-end)

> Versão 1.0 (primeira versão, sujeita a revisão)

## 1. Visão geral

Site/portfólio pessoal para apresentar perfil, tecnologias e projetos, com foco em conseguir a primeira vaga na área (estágio/júnior). O conteúdo é mantido em arquivos JSON dentro do projeto Next.js e lido no servidor.

**Objetivo principal:** em ~30 segundos, o recrutador entende quem eu sou, o que sei fazer e consegue abrir meus projetos e meus contatos.

**Público-alvo:** recrutadores, tech leads e pessoas de engenharia avaliando candidatos a estágio/júnior (front-end, back-end e full stack).

## 2. Stack

| Área | Escolha |
|---|---|
| Framework | Next.js (App Router) |
| Linguagem | TypeScript |
| Estilos | Tailwind CSS |
| Lint/Format | Biome |
| Deploy | Vercel |
| Fonte de dados | Arquivos JSON locais em `src/data/` |

## 3. Escopo da v1

### Dentro do escopo
- Quatro páginas: `/`, `/projects`, `/about`, `/contact`
- Header e footer compartilhados nas páginas; footer com copyright e links de contato vindos de `profile.json`.
- Leitura dos dados JSON locais no servidor (Server Components)
- Filtro de projetos por tecnologia com estado na URL
- Tema claro/escuro
- Tratamento de erro, carregamento e 404
- SEO básico (metadata e Open Graph)
- CI com lint e typecheck

### Fora do escopo (fica para evolução)
- Internacionalização (somente português na v1)
- Formulário de contato (v1 usa links diretos)
- Página de detalhe de projeto (`/projects/[slug]`)
- Testes automatizados (opcional)
- Animações elaboradas

## 4. Páginas

### 4.1 `/` (Home / Hero)
- **Hero:** breve apresentação com `name`, `role`, `slogan`, `location` e `availability` (como badge), além da imagem de perfil.
- A Home não inclui CTAs, projetos em destaque, skills nem resumo da seção "Sobre". Essas informações ficam nas páginas adjacentes.
- **Dados:** ler somente os dados locais de perfil necessários para o Hero.

### 4.2 `/projects`
- Lista completa de projetos, ordenada pelo campo `order`.
- Cada card: `cover` (imagem + `alt`), `title`, `summary`, tecnologias, `features` e links: `links.github` sempre e `links.live` somente quando não for `null`.
- O campo `description` fica reservado para a futura página `/projects/[slug]`; `gallery` é ignorado na v1.
- **Filtro por tecnologia:** controlado por query string (`/projects?tech=react`), lido via `searchParams` no Server Component. Sem fetch no cliente. Com apenas 3 projetos (todos usam React), o filtro agrega pouco hoje; implementar depois da lista base e manter simples.
- Estado vazio quando nenhum projeto corresponde ao filtro.
- **Dados:** projetos e tecnologias locais em `src/data/projects.json` e `src/data/technologies.json`.

### 4.3 `/about`
- `about` (texto) e `photos.about`.
- Abas interativas de Skills, Idiomas, Educação e Experiência Profissional; somente o componente das abas é Client Component, enquanto os dados são lidos no servidor e passados como props serializáveis.
- Skills exibem apenas os logos monocromáticos das tecnologias com `showInSkills: true`, adaptados às cores do tema; Idiomas usam `levelLabel`.
- **Formação:** `education.degrees` (Ciência da Computação, Estácio de Sá, em andamento, previsão 2028).
- **Cursos:** `education.courses` em uma lista visual compacta.
- **Experiência:** `experience` está vazio hoje; a aba exibe um estado vazio informativo até que haja itens.
- Seção curta "Como este site foi feito": Next.js → arquivos JSON locais, com link para o repositório do site.
- **Dados:** perfil local em `src/data/profile.json`.

### 4.4 `/contact`
- Cartões responsivos com links diretos a partir de `contacts` (`type`, `name`, `handle`, `url`): LinkedIn, GitHub e e-mail.
- O link para download do currículo será exibido quando o arquivo estiver disponível em `public/`.
- Sem formulário na v1.
- **Dados:** perfil local em `src/data/profile.json` (campo `contacts`).

## 5. Dados locais

Os dados do portfólio são mantidos em JSON, versionados junto com o site, dentro de `src/data/`:

- `profile.json`: apresentação, contatos, formação, cursos, idiomas e experiência.
- `projects.json`: projetos e slugs das tecnologias utilizadas.
- `technologies.json`: nome, categoria e indicação de exibição nas skills.

### Acesso aos dados (`src/lib/data`)
Centralizar a leitura e normalização dos arquivos em funções tipadas:

```ts
getPortfolio(): Portfolio
getProfile(): Profile
getProjects(params?: { featured?: boolean }): Project[]
getTechnologies(params?: { skills?: boolean }): Technology[]
```

- Server Components importam os dados no servidor; não há chamadas HTTP para obter conteúdo do portfólio.
- A camada local resolve os slugs de `projects.json` para objetos de tecnologia usando `technologies.json`.
- Projetos são ordenados por `order`; referências a tecnologias inexistentes devem gerar erro explícito.
- Para atualizar conteúdo, editar os arquivos JSON e publicar um novo deploy do site.

### Tipos
- Os tipos de `Profile`, `Project` e `Technology` devem refletir os arquivos JSON locais.
- No tipo normalizado usado pela interface, `Project.technologies` contém objetos de tecnologia; em `projects.json`, os valores armazenados são slugs.

```ts
type TechCategory = "language" | "frontend" | "backend" | "database" | "tools";

type Technology = {
  slug: string;
  name: string;
  category: TechCategory;
  showInSkills: boolean;
};

type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  cover: { src: string; alt: string };
  gallery: unknown[]; // vazio na v1
  technologies: Technology[];
  features: string[];
  links: { github: string; live: string | null };
  featured: boolean;
  order: number;
};
```

`Profile` segue `profile.json`: `name`, `role`, `slogan`, `location`, `availability`, `about`, `photos`, `languages`, `education` (`degrees` e `courses`), `experience` e `contacts`.

### Imagens
- As imagens ficam no front, em `public/images/` (ex.: `public/images/projects/calculadora.png`), e os caminhos registrados nos arquivos locais apontam para lá.
- Usar `next/image` com `alt` vindo dos dados (`cover.alt`) e dimensões ou `fill` + `sizes` definidos.
- Se futuramente forem usadas imagens externas, configurar `images.remotePatterns` no `next.config`.
- Os nomes dos arquivos precisam bater com os caminhos dos JSONs; se mudar um, mudar o outro.
- Os tipos dos dados são definidos no front-end; validação de schema em tempo de execução pode ser avaliada posteriormente.

## 6. Tratamento de falhas e estados

| Arquivo | Função |
|---|---|
| `app/error.tsx` | Fallback quando ocorre erro de renderização, com botão "Tentar novamente" |
| `app/not-found.tsx` | Página 404 global |
| `app/loading.tsx` / `app/projects/loading.tsx` | Skeletons/indicadores de carregamento |

- Dados locais inválidos ou referências inconsistentes devem gerar erros explícitos durante desenvolvimento/build.

## 7. Design e UX

- **Vibe:** minimalista e técnico.
- **Tema:** claro e escuro, respeitando `prefers-color-scheme`, com toggle manual (persistido) e sem "flash" de tema errado no carregamento.
- **Tailwind:** definir tokens (cores, espaçamentos, tipografia) no config/tema, evitando valores soltos.
- **Fontes:** `next/font` (uma fonte sans para texto e uma mono para detalhes técnicos).
- **Ícones:** `lucide-react` (ou `react-icons`, para logos de tecnologias).
- **Responsivo:** mobile-first; layouts testados em 360px, 768px e 1280px+.
- **Movimento:** transições sutis via CSS; respeitar `prefers-reduced-motion`.

## 8. Acessibilidade, performance e SEO

- HTML semântico (`header`, `main`, `nav`, `section`, `footer`), hierarquia de títulos correta.
- Navegação completa por teclado, foco visível, contraste mínimo WCAG AA.
- `alt` descritivo em todas as imagens; usar `next/image` com dimensões definidas.
- **Meta:** Lighthouse ≥ 90 em Performance, Acessibilidade, Boas Práticas e SEO.
- `metadata` por página (título, descrição), Open Graph e imagem de preview para compartilhamento no LinkedIn.
- `sitemap.xml` e `robots.txt`.

## 9. Qualidade e CI

- **Biome:** lint e format (`npm run lint`, `npm run format`).
- **Typecheck:** `tsc --noEmit` (`npm run typecheck`).
- **GitHub Actions:** a cada push/PR, rodar install, lint e typecheck.
- **Opcional:** Vitest + Testing Library para componentes-chave; Playwright para a jornada "home → projects".
- **README:** com screenshot, link do deploy, stack e instruções para rodar localmente.

## 10. Variáveis de ambiente

A aplicação não exige variáveis de ambiente para carregar os dados do portfólio; eles são mantidos nos arquivos JSON locais.

## 11. Estrutura de pastas sugerida

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx              # /
│   ├── loading.tsx
│   ├── error.tsx
│   ├── not-found.tsx
│   ├── projects/
│   │   ├── page.tsx
│   │   └── loading.tsx
│   ├── about/page.tsx
│   └── contact/page.tsx
├── components/
│   ├── layout/               # Header, Footer, ThemeToggle
│   ├── projects/             # ProjectCard, ProjectList, TechFilter
│   └── ui/                   # Botões, badges, seções reutilizáveis
├── lib/
│   └── data/                 # Leitura e normalização dos dados locais
├── data/                     # profile.json, projects.json e technologies.json
└── types/                    # Profile, Project, Technology
```

## 12. Roadmap por etapas

1. **Fundação:** projeto Next.js + TypeScript + Tailwind + Biome, CI, deploy inicial na Vercel.
2. **Dados locais:** JSONs em `src/data`, tipos e funções de leitura/normalização.
3. **Layout base:** header, footer, tema claro/escuro, fontes e tokens.
4. **Home:** breve apresentação no Hero, sem conteúdo adicional ou botões.
5. **Projects:** lista completa e filtro por tecnologia na URL.
6. **About e Contact.**
7. **Estados e polimento:** `error`, `not-found`, `loading`, metadata/OG, sitemap.
8. **Qualidade:** acessibilidade, Lighthouse, README e domínio próprio.

## 13. Decisões tomadas

- Dados do portfólio versionados em JSON no projeto; sem dependência de API em runtime.
- Leitura dos dados no servidor por Server Components.
- Português apenas na v1.
- Contato por links, sem formulário.
- Sem `/projects/[slug]` na v1.
- Home limitada a uma breve apresentação no Hero; projetos, skills, conteúdo "Sobre" e contato ficam nas páginas próprias.
- Vibe minimalista e técnica, com tema claro/escuro.

## 14. Evoluções futuras (fase 2+)

- Página `/projects/[slug]` com estudo de caso (problema, decisões, o que deu errado, aprendizados), usando `generateStaticParams` e `generateMetadata`.
- Formulário de contato via Route Handler (`app/api/contact/route.ts`).
- Internacionalização PT/EN (adicionar os textos traduzidos aos dados locais).
- Integração futura com uma API caso seja necessário atualizar conteúdo sem novo deploy ou compartilhar os dados com outros consumidores.
- Testes com Vitest/Testing Library e E2E com Playwright.
- Validação com Zod no front para detectar inconsistências nos arquivos locais.
- Migrar dados para uma API/CMS se a edição sem novo deploy ou o compartilhamento com outros consumidores se tornar necessário.

## 15. Dados locais (confirmados) e pontos de atenção

**Confirmado com os arquivos locais atuais:**
- `profile.json` contém `contacts`, então `/contact` pode usar os dados locais.
- `technologies.json` contém `category`, então as skills podem ser agrupadas.
- `projects.json` contém slugs de tecnologia, `cover`, `features` e links (`github` e `live`).

**Pontos de atenção:**
- **Currículo:** não existe nos dados locais. Colocar o PDF em `public/` (ou adicionar um campo `resume` ao perfil).
- **Cypress e Supabase** têm `showInSkills: false`, mas Cypress aparece no texto de `about`. Decidir se entram nas skills.
- **Projeto sem deploy:** `login-react-typescript` tem `live: null`. Um projeto com demo online costuma pesar mais para quem avalia.
- **Todos os projetos são `featured`:** se a Home voltar a exibir destaques, mostrará a mesma lista de `/projects`; revisar quando houver mais projetos.
- **`availability`:** "Em transição de carreira" é vago para quem recruta. Considerar algo como "Buscando estágio/júnior".
- **`experience` vazio:** a seção não deve aparecer na v1.
