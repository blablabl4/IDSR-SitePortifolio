# Plano de execução — prompts prontos e divisão por modelo

Referência: `docs/AUDITORIA-2026-09-akita.md`. Decisão fixa: **preço Starter = R$ 997/mês**.

## Regra de divisão

| Modelo | Quando usar |
|---|---|
| **Sonnet** | Tarefa mecânica, bem especificada, escopo fechado, critério de pronto verificável por comando (lint, build, teste). |
| **Opus / Fable** | Tarefa que exige decisão de negócio, copy, ou mexe em muitos arquivos com dependência entre eles. |
| **Humano (Rocha)** | DNS, Vercel, senha, dados de cases, vídeo. |

Regra prática: se o prompt cabe em 5 linhas e o "pronto" é um comando passando, é Sonnet.

## Ordem e responsável

| Ordem | Item | Modelo | Por quê |
|---|---|---|---|
| 0 | P0 #4 Commitar working tree + apagar GIF | Sonnet | mecânico |
| 1 | P0 #5 `npm audit fix` | Sonnet | mecânico |
| 2 | P0 #6 CI | Sonnet | yaml padrão |
| 3 | P0 #3 `offer.ts` tabela de verdade | **Opus** | decisão de oferta, 5 consumidores |
| 4 | P0 #2 Notificar lead | Sonnet | spec fechada abaixo |
| 5 | P0 #8 Endurecer `/api/chat` | Sonnet | spec fechada abaixo |
| 6 | P0 #7a Lint: unused vars, entidades, comentários JSX, `any` | Sonnet | mecânico |
| 7 | P0 #7b Lint: `react-hooks/refs`, `purity`, `set-state-in-effect` | **Opus** | bugs de render, precisa entender o componente |
| 8 | P0 #1 Deploy idsr.com.br | **Humano** + Sonnet prepara `vercel.json`/env | infra |
| 9 | P1 #10 GENESIS → `/lab` | Sonnet | mover pasta + rota |
| 10 | P1 #9 Home nova | **Opus** | copy + UX + decisão |
| 11 | P1 #11 Montar chat | Sonnet | 1 import + widget |
| 12 | P1 #12 SEO | Sonnet | padrão Next |
| 13 | P1 #13 Analytics | Sonnet | padrão |
| 14 | P1 #14 CTA diagnóstico | Sonnet | depois do offer.ts |
| 15 | P1 #15 Cases | **Humano** dá dados, **Opus** escreve | copy |
| 16 | P1 #16 Limpeza + README fiel | Sonnet | mecânico |
| 17 | P2 #17 Calculadora | Opus desenha, Sonnet implementa | |
| 18 | P2 #20 Cobertura 70% | Sonnet | testes |
| 19 | P2 #21 reduced-motion / LCP | Sonnet | |
| 20 | P2 #22 `/admin` | Sonnet | spec fechada |
| 21 | P2 #18 vídeo, #19 blog | Humano / Opus copy | |

Estimativa: ~70% do backlog é Sonnet.

---

## Prompts prontos

Cada prompt começa com a mesma linha de contexto. Cole inteiro.

### 0. Commitar working tree (Sonnet) — na sessão local `idsr-web`

```
Leia docs/AUDITORIA-2026-09-akita.md (se não existir, ignore). Faça o item P0 #4:
1. Apague o GIF de ~4,3 MB da raiz do projeto e garanta que *.gif grandes estão no .gitignore.
2. Commite a working tree em commits pequenos, um por área: (a) src/app/api/contact + testes, (b) src/components/home, (c) src/components/showcase e assessor, (d) src/lib e src/hooks, (e) páginas em src/app, (f) PROJECT_GUIDE.md e config (vitest, eslint, package.json).
3. Antes de cada commit rode `npx tsc --noEmit`; se quebrar, não commite, me avise.
4. git push origin main.
Não altere código, só commite. Ao final mostre `git log --oneline -10`.
```

### 1. Audit fix (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P0 #5.
Rode `npm audit --omit=dev`, depois `npm audit fix` (sem --force). Atualize next para a versão que corrige a CVE crítica (>= 16.3.6) e uuid. Rode `npm run build` e `npx vitest run`. Se algo quebrar, corrija só o necessário. Commite: "chore: corrigir vulnerabilidades do npm audit (next, uuid)". Mostre o `npm audit --omit=dev` final.
```

### 2. CI (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P0 #6.
Crie .github/workflows/ci.yml rodando em push e pull_request para main: node 20, npm ci, depois em ordem: npm run lint, npx tsc --noEmit, npx vitest run, npm audit --omit=dev --audit-level=high, npm run build. Cache do npm. Se não existir script "test" no package.json, adicione "test": "vitest run" e "typecheck": "tsc --noEmit". Commite: "ci: lint, tipos, testes, audit e build em todo push".
```

### 3. Tabela de verdade da oferta (Opus)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P0 #3 e seção 4. Decisão fixa: Starter = R$ 997/mês. Não existe plano de R$ 297 nem setup de R$ 497.
Crie src/lib/offer.ts como única fonte de verdade da oferta: módulos/produtos (nome, slug, dor que resolve, o que entrega), planos (nome, preço, o que inclui, sem fidelidade), telefone/WhatsApp reais (pegar de src/lib/whatsapp ou env, nunca 99999-9999), segmentos atendidos.
Depois faça TODOS estes consumidores lerem de offer.ts, sem texto duplicado: /produtos, /precos, JSON-LD do layout, prompt do chat (src/lib/prompt*), getWhatsAppUrl. Onde houver conflito entre nomes (Pulse/LeadFlow/ScheduleFlow/OpsFlow vs Automações Comerciais/Sites & Dashboards/RPA/Agentes IA/Sob Medida), use os nomes de /produtos e liste os antigos como "codinome" no offer.ts para eu decidir depois.
Escreva teste em src/lib/offer.test.ts garantindo: nenhum preço fora de offer.ts aparece em src/ (grep por "R\$"), telefone válido, todo plano tem preço > 0.
Commits pequenos por consumidor. Me mostre no final a tabela de módulos e planos que ficou.
```

### 4. Notificar lead (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P0 #2.
Em src/app/api/contact/route.ts, depois de validar com Zod e salvar no Redis, envie notificação com nome, e-mail, telefone, segmento, gargalo e protocolo do ticket. Implemente src/lib/notify.ts com duas saídas, ambas atrás de env: RESEND_API_KEY + LEAD_NOTIFY_EMAIL (e-mail via Resend, fetch direto na API, sem SDK novo) e LEAD_NOTIFY_WEBHOOK (POST JSON, serve para WhatsApp/Telegram via n8n/Make). Se nenhuma env estiver configurada, logar warning e seguir. Se as duas configuradas falharem, responder 500 com mensagem clara ao usuário e logar o erro. Timeout de 8 s por chamada. Teste com fetch mockado cobrindo: sucesso, uma falha, ambas falham, nenhuma configurada. Documente as envs no .env.example e README. Commite: "feat(contato): notificar lead por e-mail e webhook".
```

### 5. Endurecer /api/chat (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P0 #8.
Em src/app/api/chat/route.ts: validar body com Zod (message string 1..1000 chars; history array máx 20 itens, cada content máx 1000 chars, total máx 8000 chars; role só "user"|"assistant"); rate limit por IP no Redis usando src/lib/kv.ts, 20 requisições por 10 min, responder 429 com Retry-After; se Redis indisponível, limite em memória por processo como fallback; timeout de 20 s na chamada ao OpenAI (AbortController) respondendo 504; nunca vazar mensagem de erro do provedor ao cliente. Testes com OpenAI e Redis mockados: payload inválido 400, 21ª request 429, timeout 504, fluxo feliz 200. Commite: "fix(chat): validação, rate limit e timeout no /api/chat".
```

### 6. Lint mecânico (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P0 #7.
Rode `npm run lint`. Corrija SOMENTE estas categorias: variáveis/imports não usados (remover), react/no-unescaped-entities (usar &apos; etc.), comentários dentro de JSX (converter para {/* */} ou remover), @typescript-eslint/no-explicit-any (tipar corretamente; se não der, unknown + narrowing). NÃO toque em react-hooks/refs, react-hooks/purity, react-hooks/set-state-in-effect: liste esses ao final com arquivo:linha. Não desabilite regras nem use eslint-disable. Depois: npx tsc --noEmit e npm run build passando. Um commit por pasta.
```

### 7. Lint de hooks (Opus)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P0 #7. O lint mecânico já foi feito; sobraram os erros react-hooks/refs, react-hooks/purity e react-hooks/set-state-in-effect (rode npm run lint para a lista).
Corrija cada um entendendo a causa: ref lido durante render vira estado ou useSyncExternalStore; Math.random/Date.now em render vai para useMemo com seed ou para efeito; setState em efeito vira estado derivado ou callback. Em ParticleSceneCanvas, explique em 2 linhas por commit qual era o bug de render e como ficou. Sem eslint-disable. Ao final: lint 0 erros, tsc limpo, build ok, e abra a home e uma página interna com a ferramenta de browser para confirmar que nada quebrou visualmente.
```

### 9. GENESIS → /lab (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P1 #10.
Mova a home atual (splash GENESIS, three/gsap/lenis, HUD) de src/app/page.tsx para src/app/lab/page.tsx sem alterar comportamento. Deixe src/app/page.tsx renderizando temporariamente o conteúdo de /produtos (import do mesmo componente) até a home nova existir. Adicione link "Modo cinema" para /lab no footer. Garanta que /lab tem metadata própria e robots noindex. Build passando. Commite: "refactor: mover experiência GENESIS para /lab".
```

### 10. Home nova (Opus)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, itens P1 #9 e #14, seções 3 e 4. offer.ts já é a fonte de verdade.
Escreva a nova src/app/page.tsx como Server Component, sem gate, sem scroll-jacking, com <a> reais, seguindo o design system das internas (obsidian/mist/emerald #0D7C66/gold #B8956A). Acima da dobra em < 1 s: headline centrada na dor do dono de PME (varejo, restaurante, agenda), 1 parágrafo, CTA primário "Diagnóstico operacional gratuito de 30 min" (WhatsApp via getWhatsAppUrl origem=home) e secundário para /precos, logos Casa Rael e Zapão. Abaixo: dores por segmento, módulos (de offer.ts), como funciona em 3 passos, o que só a IDSR tem (WhatsApp contextual, ticket na hora, quem escreve o código atende você), preços resumidos (Starter R$ 997, link /precos), FAQ (reaproveitar), formulário de contato. Reaproveite components/home/* onde o tom já estiver certo. Sem three/gsap/lenis na home. Metadata e OG. Depois confirme no browser em 375 px e 1280 px, sem overflow horizontal, e me mostre screenshots.
```

### 11. Montar chat (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P1 #11.
Monte o ChatInterface existente (src/components/chat) como widget flutuante no canto inferior direito, carregado via next/dynamic com ssr:false, em todas as páginas pelo layout. Botão fechado ocupa < 64 px, abre painel de 380x560 no desktop e tela cheia no mobile. Persista histórico da sessão usando as funções já existentes em src/lib/kv.ts (sessionId em cookie). Não altere o prompt. Teste que o widget renderiza e que enviar mensagem chama /api/chat. Commite: "feat: widget de chat de IA em todas as páginas".
```

### 12. SEO (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P1 #12.
Para cada página em src/app (sobre, manifesto, produtos, precos, contato, suporte, termos, privacidade): exportar metadata com title único "<Página> | IDSR" e description de 150 chars a partir do conteúdo. Páginas que são só texto (sobre, manifesto, termos, privacidade) viram Server Components: extraia partes interativas para componentes client pequenos. Crie src/app/sitemap.ts, robots.ts, not-found.tsx (no design das internas) e opengraph-image.tsx com o nome IDSR e tagline. Use NEXT_PUBLIC_SITE_URL. Build passando; mostre o sitemap gerado. Um commit por página.
```

### 13. Analytics (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P1 #13.
Adicione Plausible (script no layout, domínio via NEXT_PUBLIC_PLAUSIBLE_DOMAIN, não carregar se env vazia). Crie src/lib/analytics.ts com track(event, props) que chama window.plausible se existir. Dispare "whatsapp_click" com {origem, produto, plano} em todo link gerado por getWhatsAppUrl (centralize num componente WhatsAppLink), "contact_submit" no sucesso do formulário e "chat_open" no widget. Ajuste a política de privacidade para citar Plausible em vez de Google Analytics. Teste do track com window mockado. Commite.
```

### 16. Limpeza (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P1 #16.
Para cada pasta em src/components, encontre com grep se algo em src/app a importa (direta ou indiretamente). Liste as mortas e apague: showcase, assessor, portfolio, portal se confirmadas sem uso. Remova do package.json deps sem import em src/ (@google/generative-ai, @vercel/kv e outras que achar), rode npm install. Reescreva o README para descrever só o que existe (stack, rotas, envs, como rodar, como testar). Atualize PROJECT_GUIDE.md marcando o checklist com evidência (comando + resultado). tsc, lint, build, testes passando. Um commit por pasta removida.
```

### 20. Admin mínimo (Sonnet)

```
Contexto: docs/AUDITORIA-2026-09-akita.md, item P2 #22.
Crie /admin protegido por Basic Auth no middleware (ADMIN_USER/ADMIN_PASS em env, 401 sem elas). Página Server Component listando os últimos 50 leads do Redis (nome, segmento, gargalo, protocolo, data) e top 20 FAQs do chat via getTopFAQs já existente. Tabela simples no design das internas, sem client JS. robots noindex. Teste do middleware: sem header 401, header errado 401, certo 200. Commite.
```

---

## Itens do humano (Rocha)

- **Deploy (P0 #1):** criar projeto na Vercel apontando pro GitHub, configurar `NEXT_PUBLIC_SITE_URL`, `OPENAI_API_KEY`, `REDIS_URL`, `RESEND_API_KEY`, `LEAD_NOTIFY_EMAIL`; apontar DNS de idsr.com.br. Sonnet pode gerar o checklist e o `vercel.json` se pedir.
- **Cases (P1 #15):** o que foi entregue para Casa Rael e Zapão, 1 número real de cada se existir, 2 linhas de depoimento.
- **Vídeo (P2 #18):** 60–90 s mostrando um fluxo real.
