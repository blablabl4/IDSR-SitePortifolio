# Auditoria técnica, visual e de negócio — IDSR Web contra a régua do Akita e o mercado

> Origem: sessão "Akita site análise e melhorias" (projeto local `idsr-web`), 2026-09-25.
> Artifact original: https://claude.ai/artifact/Wx7TBN68A2zeGf4MeHDLFc
> Avaliado pelo código da working tree local, pelo site rodando localmente, pelo build de produção, por lint/tipos/testes/audit e por quatro concorrentes lidos ao vivo.
> Régua: os critérios objetivos do artigo "Do zero a pós-produção em 1 semana" (Akita, fev/2026).
> Estado na data: `C:\Users\Rael Sousa\idsr-web` · 16 testes · 63 erros de lint · next 16.1.0.

---

## 1. Placar

| Área | Nota | Por quê |
|---|---|---|
| Processo (Akita) | **2/10** | 20 commits no total, último em jan/2026. 52 arquivos fora do git. Sem CI. Testes = 2% do código. |
| Segurança | **5/10** | Headers bons, Zod no contato. CVE crítica no next (fix pronto). Chat sem rate limit nem limite de tamanho. |
| Código | **4/10** | tsc e build limpos. 63 erros de lint. 3 famílias de componentes mortas. README descreve o que não existe. |
| Visual / UX | **5/10** | Internas limpas e OK no mobile. Home é gate de 5 s com scroll-jacking, zero links e copy de estúdio. |
| Negócio | **3/10** | Domínio em 404. Preço contraditório. Chat de IA não montado. Lead não avisa ninguém. |

### Os cinco problemas que mais custam dinheiro hoje

1. **Site fora do ar.** `https://idsr.com.br` responde 404. Nada abaixo importa enquanto isso durar.
2. **Lead cai no vazio.** `POST /api/contact` grava no Redis (se configurado) e faz `console.info`. Nenhum e-mail, WhatsApp ou webhook avisa o Rocha. A promessa "triagem em até 2 horas úteis" depende de alguém abrir o Redis.
3. **Oferta contraditória.** `/precos`: Starter R$ 997/mês. Prompt do chat: "a partir de R$ 297/mês", setup R$ 497. JSON-LD, PROJECT_GUIDE e chat falam de Pulse/LeadFlow/ScheduleFlow/OpsFlow; `/produtos` vende "Automações Comerciais, Sites & Dashboards, RPA, Agentes IA, Sob Medida". Telefone do JSON-LD é 99999-9999.
4. **Chat de IA é código morto.** `ChatInterface` e `useChatDiagnostic` só são importados por `components/home` e `components/assessor`, e nenhuma rota em `src/app` importa essas pastas. O endpoint `/api/chat` fica no ar sem front.
5. **Home não vende.** Splash "GENESIS: explore suas ideias, recrie e reimagine sem limites", 5 s de animação obrigatória, depois "Fugir do óbvio exige mais do que uma ideia". Sem proposta para varejo/restaurante/agenda, sem preço, sem WhatsApp, zero `<a>` no DOM.

---

## 2. Contra os critérios objetivos do Akita

Dos 12 critérios, 2 passam. O PROJECT_GUIDE cita o Akita na primeira linha; o projeto está, hoje, do lado que ele chama de "brinquedo".

| Critério | Meta | IDSR hoje | Veredito |
|---|---|---|---|
| Commits production-ready, vários por dia | ~34/dia com XP | 20 commits em 3 dias (dez/2025, jan/2026). Depois: 15 modificados + 36 novos + 1 deletado sem commit, ~8 meses. | ❌ falha |
| CI em todo commit | lint + audit + security + testes, sem exceção | Sem `.github/workflows`, sem husky. Checklist do guia é manual, marcado `[x]` sem evidência. | ❌ falha |
| Mais teste que código | ratio ≥ 1,5x | 307 linhas de teste / 16.525 de código = **0,02x**. 16 testes. `/api/chat` sem teste. Sem coverage. | ❌ falha |
| Cobertura linha / branch | 82–87% / 70%+ | Não medida. | ❌ falha |
| Segurança como hábito, 0 warnings | scanner limpo em todo commit | `npm audit --omit=dev`: 1 crítica (next 16.1.0 → 16.3.6), 2 altas (postcss, sharp), 2 moderadas (uuid, baseline-browser-mapping). Tudo com fix. | ⚠️ barato |
| Refactoring contínuo | ~10% dos commits | 3 gerações de home no repo: `home` (13 arquivos, 0 imports), `showcase` (0), `assessor` (0). Deps sem uso: `@google/generative-ai`, `@vercel/kv`. | ❌ falha |
| Maior arquivo | ≤ ~2.000 LOC | 597 (morto) / 514 vivo (`ParticleSceneCanvas`). | ✅ passa |
| Documentação viva fiel ao código | CLAUDE.md bate com o repo | README afirma Gemini + OpenAI, streaming, rate limit em Redis, @vercel/kv. Nenhum dos quatro existe. Guia diz "page.tsx em 7 blocos modulares" (os blocos são a pasta morta). | ❌ falha |
| Lint limpo | 0 | 63 erros, 54 avisos: 49 vars não usadas, 18 entidades, 13 comentários em JSX, 11 `any`, 9 `react-hooks/refs`, 3 `set-state-in-effect`, 3 `purity`. | ❌ falha |
| Tipos e build | limpos | `tsc --noEmit` 0 erros. `next build` OK, 14 páginas estáticas. | ✅ passa |
| Em produção | Dia 8 | Domínio 404. Build funciona; deploy não. | ❌ falha |
| Freio humano em over-engineering | agente executa, humano freia | Home com three + gsap + lenis + framer-motion, shader WebGL próprio, cursor magnético, máquina de estados de 430 linhas para 5 seções. É o "agente sem freio" do artigo. | ❌ falha |

---

## 3. Visual e UX

### Home

- **Gate de entrada.** Splash "GENESIS" com "clique ou role para iniciar [5.0s de montagem]". Depois do clique, 5 s de animação com `main` em `opacity: 0`. Numa das cargas de teste (800×450) a tela ficou preta por mais de 30 s.
- **Scroll-jacking total.** `wheel` e `touchmove` com `preventDefault`. No celular, rolar vira "trocar de seção" com blocos 3D. `prefers-reduced-motion` aparece em 20 arquivos e não desliga o gate.
- **Zero links.** `querySelectorAll('a').length === 0`. Navegação é um HUD de botões JS. Googlebot indexa uma home sem link interno; leitor de tela não acha navegação.
- **Copy de estúdio criativo.** "Explore suas ideias, recrie e reimagine sem limites", "Fugir do óbvio exige mais do que uma ideia", "Arquitetura de software · alta performance". O dono de restaurante que perde reserva não se reconhece. A `/produtos` já tem o tom certo: "Eliminamos a perda de leads, o retrabalho braçal e os gargalos de software da sua operação."
- **Duas identidades.** O design system do guia é obsidian + mist + emerald #0D7C66 + gold #B8956A, e as internas seguem isso. A home usa ciano #38e0e0, gradiente arco-íris e blocos cobre.

### Páginas internas

- Coerentes entre si, hierarquia clara, header com CTA WhatsApp fixo, sem overflow no mobile (375 px), 6 CTAs contextuais em `/precos`. `getWhatsAppUrl` por origem/produto/plano/ticket está acima da média do mercado.
- **SEO.** As 9 páginas são `'use client'` e nenhuma exporta `metadata`: todas têm o mesmo título. Sem sitemap, robots, imagem OG, `not-found`.
- **Analytics.** Nenhum. A política de privacidade cita Google Analytics que não existe. Sem evento nos cliques de WhatsApp.
- **Prova social.** 2 logos (Casa Rael, Zapão). Sem depoimento, sem número, sem case. `/precos` promete "reduz no-show em até 80%" sem caso que sustente.
- **Acessibilidade.** 14 `aria-label` no projeto; labels a 40% de opacidade sobre #0a0a0a ficam abaixo de WCAG AA.

---

## 4. Comparativo de mercado

Referências lidas ao vivo em setembro/2026: Chatsac (atendimento WhatsApp, R$ 60–199/usuário), Brendi (delivery com IA, +8.500 restaurantes), Leads360 (CRM + anti no-show, R$ 297–797), Automagencia (agência de automação e IA para PME, o modelo mais parecido com a IDSR).

| Elemento | Chatsac | Brendi | Leads360 | Automagencia | **IDSR** |
|---|---|---|---|---|---|
| Headline centrada na dor do cliente | ✓ | ✓ | ✓ | ✓ | ✗ home / ✓ produtos |
| Preço visível | ✓ 3 planos | → /planos | ✓ 4 planos | ✗ após diagnóstico | ✓ contraditório |
| Entrada sem risco (trial / diagnóstico) | 7 dias sem cartão | 15 dias | 7 dias | diagnóstico grátis | ✗ (R$ 997 de cara) |
| Cases com número | ✓ 3 vídeos | logos + métricas | depoimentos | ✓ 3 cases | ✗ |
| Logos de clientes | 6 | 13 | – | ferramentas | 2 |
| Números de operação | ✓ | ✓ | – | ✓ simulados | ✗ |
| Vídeo / demo | ✓ | – | ✓ | ✓ | ✗ (simulador morto) |
| FAQ | ✓ | ✓ 11 | ✗ | ✓ 11 | ✓ 6 |
| Formulário de diagnóstico | ✗ | ✓ | ✗ | ✓ | ✓ |
| Blog / SEO de conteúdo | ✓ | ✗ | ✓ | ✓ | ✗ |
| Sem fidelidade, explícito | ✓ | ✓ | – | – | vago |
| Fundador com foto | – | – | – | ✓ | nome só |
| Chat / IA na página | ✓ | ✓ | – | ✓ simulador | existe, não montado |
| Calculadora de perda | ✓ | – | – | ✓ antes/depois | ✗ |

> **O que só a IDSR tem:** WhatsApp contextual por origem, protocolo de ticket no ato, manifesto de engenharia ("quem escreve o código atende você"), páginas legais completas. Nada disso está na home.
>
> **Preço:** Starter R$ 997/mês é 5–10x o SaaS de atendimento e o patamar de agência. É defensável se a página vender serviço + software + engenheiro, como a Automagencia faz sem preço. Hoje a `/precos` usa layout de SaaS para preço de agência, e o chat oferece R$ 297. Escolher um.
>
> **Decisão (Rocha, 2026-09-25): o preço é R$ 997.** Toda referência a R$ 297 / setup R$ 497 deve ser alinhada a isso.

---

## 5. Backlog priorizado

Esforço: **P** horas · **M** 1–2 dias · **G** 1 semana. Cada item vira commits pequenos com teste.

### P0 — Antes de qualquer marketing

| # | Item | Tipo | Esf. |
|---|---|---|---|
| 1 | Colocar idsr.com.br no ar (Vercel ou Docker standalone do README). DNS, env vars, `NEXT_PUBLIC_SITE_URL`. | Infra | P |
| 2 | **Notificar lead**: no contato, disparar e-mail (Resend) e/ou WhatsApp/Telegram do Rocha com nome, segmento, gargalo e protocolo. Falha vira 500 visível. Teste com mock. | Negócio | P |
| 3 | **Uma tabela de verdade da oferta**: decidir módulos e preços. Um `src/lib/offer.ts` alimenta produtos, preços, JSON-LD, prompt do chat e WhatsApp. Corrigir telefone. | Negócio | M |
| 4 | Commitar a working tree em commits pequenos por área. Apagar o GIF de 4,3 MB da raiz. | Processo | P |
| 5 | `npm audit fix` (next 16.3.6, uuid). Build + testes depois. | Segurança | P |
| 6 | CI: eslint → tsc → vitest → audit (high) → build. Bloquear main se falhar. | Processo | P |
| 7 | Zerar 63 erros de lint. `react-hooks/refs` e `purity` em ParticleSceneCanvas são bugs de render, não estilo. | Qualidade | M |
| 8 | Endurecer `/api/chat`: Zod, mensagem ≤ 1.000 chars, histórico ≤ 20 msgs / 8k chars, rate limit por IP no Redis (20 req/10 min), timeout 20 s. Hoje qualquer script gasta a chave OpenAI sem limite. | Segurança | M |

### P1 — Conversão, próximas 2 semanas

| # | Item | Tipo | Esf. |
|---|---|---|---|
| 9 | **Home nova sem gate.** Acima da dobra em < 1 s: headline de dor, 1 parágrafo, CTA WhatsApp + diagnóstico, 2 logos. Abaixo: dores por segmento, módulos, 3 passos, cases, preços resumidos, FAQ, formulário. Reaproveitar `components/home/*`, que já tem o tom certo. | Negócio/UX | M |
| 10 | Mover "GENESIS" para `/lab` ou `/manifesto` como peça de portfólio, com link "modo cinema". Ou apagar. Não na raiz. | UX | P |
| 11 | Montar o chat de IA (widget flutuante ou hero). Já existe; falta 1 import. Gravar histórico via `kv.ts`, cujas funções existem e não são chamadas. | Negócio | P |
| 12 | SEO: `metadata` por página, `opengraph-image.tsx`, `sitemap.ts`, `robots.ts`, `not-found.tsx`. Sobre/manifesto/termos/privacidade viram Server Components. | SEO | M |
| 13 | Analytics (GA4 ou Plausible) + evento em todo clique de wa.me com origem/produto/plano. | Negócio | P |
| 14 | Entrada sem risco: "Diagnóstico operacional gratuito de 30 min" como CTA principal no header. | Negócio | P |
| 15 | 3 cases com número (Casa Rael, Zapão + 1). Sem métrica, dizer o que foi entregue + depoimento de 2 linhas. Tirar "até 80%" até ter caso. | Negócio | M |
| 16 | Limpeza: apagar showcase/assessor/portfolio/portal se não usados; remover deps mortas; README e guia passam a descrever o que existe. | Qualidade | M |

### P2 — Crescimento, mês 2

| # | Item | Tipo | Esf. |
|---|---|---|---|
| 17 | Calculadora "quanto você perde por mês" (leads/dia × % sem resposta × ticket), resultado compartilhável no WhatsApp. | Negócio | M |
| 18 | Vídeo de 60–90 s do Rocha com um fluxo real. Substitui o simulador 3D com mais efeito. | Negócio | M |
| 19 | Blog: 6 artigos por dor e segmento, MDX no App Router. | SEO | G |
| 20 | Cobertura: piso 70% em `src/lib` e `src/app/api`; testes de chat, WhatsApp URL, kv; 1 E2E do contato. Meta Akita: mais teste que código no negócio. | Qualidade | G |
| 21 | `prefers-reduced-motion` e Save-Data desligam WebGL de verdade; medir LCP/INP no Speed Insights após deploy, meta LCP < 2,5 s mobile. | Técnico | M |
| 22 | `/admin` mínimo com senha: leads recentes e top FAQs do chat (`getTopFAQs` já existe). Fecha o ciclo de rastreabilidade que o site promete. | Negócio | M |

---

## 6. O que está bom e fica

- Headers de segurança no `next.config.ts` (HSTS preload, nosniff, SAMEORIGIN, Permissions-Policy).
- Zod no contato com teste, protocolo de ticket, fallback sem Redis.
- `getWhatsAppUrl` contextual, melhor que o mercado.
- Prompt do chat v4 (estados S0–S5, regra do espelho, heurística de complexidade, "nunca inventar cases"). Só falta usar.
- Páginas internas: design coerente, mobile OK, FAQ, LGPD completa.
- tsc limpo, build passa, React Compiler ligado, `removeConsole` em produção.
- PROJECT_GUIDE tem a estrutura certa (hurdles, checklist). Precisa voltar a ser verdade.

---

## 7. Fontes

- Régua: [Akita, "Do zero a pós-produção em 1 semana"](https://akitaonrails.com/2026/02/20/do-zero-a-pos-producao-em-1-semana-como-usar-ia-em-projetos-de-verdade-bastidores-do-the-m-akita-chronicles/)
- [Chatsac](https://chatsac.com/) · [Brendi](https://brendi.com.br/) · [Leads360](https://leads360.com.br/) · [Automagencia](https://www.automagencia.com.br/)
- Faixas de preço: [custo de atendimento virtual no WhatsApp em 2026](https://brendi.com.br/blog/custo-atendimento-virtual-whatsapp/)

---

## 8. Estado do repositório no GitHub (observação desta sessão, 2026-09-25)

O `origin/main` do GitHub tem ~4.700 linhas de código em `src/`; a working tree local avaliada tinha ~16.500. Não existem no GitHub: `src/components/home`, `src/components/showcase`, `src/app/api/contact`, `PROJECT_GUIDE.md`, testes (`vitest`), entre outros. **O item P0 #4 (commitar a working tree) é pré-requisito para todo o resto do backlog ser executado a partir do repositório.**
