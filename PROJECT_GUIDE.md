# IDSR Web - Project & Architecture Guide (Documento Vivo)

> *"O sistema correto emerge da iteração e da disciplina de engenharia, não de atalhos."* — Fábio Akita

Este guia é o documento de referência operacional e arquitetural do **IDSR Web**. Ele orienta desenvolvedores e agentes de IA sobre as decisões de negócio, padrões de código, design system e rotinas de qualidade do projeto.

---

## 1. Visão Geral do Negócio (IDSR)

- **Nome**: IDSR (Infraestrutura de Dados, Sistemas e Rastreabilidade)
- **Proposta de Valor**: Automação operacional com rastreabilidade real para empresas (varejo, restaurantes e serviços com agendamento). Operação que roda 24/7 sem depender de memória ou planilhas manuais.
- **Público-Alvo**: Donos de empresas e gestores operacionais que sofrem com perda de leads por demora no atendimento, no-show em agendamentos, falta de rotina padronizada na equipe e ausência de indicadores confiáveis.

### Matriz de Módulos & Soluções
1. **Pulse (Central)**: Atendimento inteligente 24/7 que qualifica, responde em segundos e roteia para o time certo. Histórico unificado de conversas.
2. **LeadFlow (Vendas)**: Pipeline visual com automação de follow-up. Impede que leads esfriem ou fiquem abandonados no funil.
3. **ScheduleFlow (Agenda)**: Gestão de agendamentos com régua de confirmação automática e lembretes por WhatsApp, reduzindo drasticamente o no-show.
4. **OpsFlow (Operação)**: Checklists rastreáveis com carimbo de execução (quem fez, quando e status em tempo real).
5. **Sob Medida**: Arquitetura dedicada para demandas complexas (integrações de ERP/PDV legados, governança e regras personalizadas).

---

## 2. Stack Tecnológico

- **Framework**: Next.js 16 (App Router + Turbopack)
- **UI & Reatividade**: React 19, Framer Motion, Lucide React
- **Estilização**: Tailwind CSS v4 + Design Tokens Dark Luxury (`globals.css`)
- **Validação de Dados**: Zod v4
- **Testes & Qualidade**: Vitest v5, React Testing Library, ESLint, TypeScript 5
- **Armazenamento / Cache**: Redis / Vercel KV (com fallback gracioso em memória/logs)
- **IA / LLM**: OpenAI GPT-4o-mini (com prompt consultivo v4 e regras estritas de escopo)

---

## 3. Design System: Dark Luxury & Silent Precision

| Token | Hex / Valor | Aplicação |
| :--- | :--- | :--- |
| `Obsidian` | `#0a0a0a` / `#0c0c0c` / `#111111` | Fundo principal, seções e cards em camadas |
| `Mist` | `#E7ECEF` | Tipografia primária (com opacidades 40%, 60%, 80%) |
| `Emerald / Forest` | `#0B3B2E` / `#0D7C66` | Acento principal, badges, botões primários e estados ativos |
| `Muted Gold` | `#B8956A` | Acento terciário para destaques de sofisticação e contratos sob medida |

**Regras Visuais**:
- Tipografia leve (`font-extralight`, `font-light`) com tracking expandido em tags e badges (`tracking-[0.2em]`, `tracking-[0.3em]`).
- Efeitos de profundidade via glassmorphism suave (`backdrop-blur-xl`, bordas translúcidas `#E7ECEF/10`).
- Micro-interações com Framer Motion: feedback tátil e suave, sem transições bruscas.

---

## 4. Estrutura de Diretórios Atualizada

```
src/
├── app/                  # Rotas do App Router (/, /produtos, /precos, /sobre, /contato, etc.)
│   ├── api/
│   │   ├── chat/         # Assistente consultivo GPT-4o-mini
│   │   └── contact/      # Rota de contato com validação Zod e geração de ticket
│   ├── globals.css       # Design tokens e animações base
│   └── layout.tsx        # Layout raiz com Schema.org, SEO e SpeedInsights
├── components/
│   ├── ui/               # Componentes visuais atômicos (GlassHeader, Footer, DotContainer, etc.)
│   ├── showcase/         # Portfólio Interativo com simulador de Pulse, LeadFlow, ScheduleFlow, OpsFlow
│   └── home/             # Seções modulares da Home (ChatDiagnosticHero, SolutionsGrid, etc.)
├── hooks/                # Custom hooks (useChatDiagnostic, etc.)
├── lib/                  # Utilitários, schemas Zod (schemas.ts), kv.ts
└── types/                # Definições de tipos TypeScript compartilhados
test/                     # Suíte de testes com Vitest e Testing Library
```

---

## 5. Hurdles e Lições Aprendidas (Extreme Programming / Akita)

1. **Evitar Monólitos na Home**:
   - `page.tsx` havia chegado a 669 linhas. Refatoramos em 7 blocos modulares atômicos. O arquivo principal agora tem menos de 45 linhas e alta manutenibilidade.
2. **Peer Dependencies em Vitest + React 19**:
   - Para rodar Vitest com React 19 no ecossistema npm, instalar com `--legacy-peer-deps` e incluir `@testing-library/dom` e `@types/node@^22`.
3. **AnimatePresence em Testes**:
   - Componentes com transições de saída (`mode="wait"`) exigem asserções assíncronas (`findByText`) no React Testing Library.
4. **Resiliência do Canal de Vendas**:
   - A rota `/api/contact` foi desenhada para nunca deixar o cliente na mão: gera protocolo único, registra log estruturado com payload, armazena no Redis se ativo e fornece o link imediato de WhatsApp para conversão direta sem atrito.

---

## 6. Checklist de Validação Pré-Commit
- [x] `npm test` passa 100% sem falhas (Vitest)
- [x] `npx tsc --noEmit` conclui com 0 erros de tipagem
- [x] `npm run build` gera o pacote de produção Turbopack sem advertências críticas
- [x] Nenhuma credencial ou chave exposta no código-fonte
