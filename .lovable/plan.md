# Update project memory & clean up stale frontend

Two parts: (A) overwrite the project memory so future sessions know the current Vellum stack and stop re-applying Otomeshon rules, and (B) physically remove all unused legacy code, packages, and backend artifacts so the repo only contains files reachable from Vellum's `App.tsx`.

## A. Memory updates

Delete every existing memory file (all describe the old Otomeshon Custodian app and are now wrong) and replace with five focused files plus a rewritten `index.md`.

**Delete:**
- `mem://project/overview`
- `mem://style/design-system`
- `mem://architecture/operational-model`
- `mem://architecture/capability-stack`
- `mem://architecture/performance-optimization`
- `mem://features/ux-patterns`
- `mem://features/ai-assistant`
- `mem://features/internationalization`
- `mem://features/navigation`
- `mem://features/agents`
- `mem://features/agent-testing`
- `mem://features/token-monitoring`
- `mem://auth/persistence`

**Create:**
- `mem://project/overview` — Vellum is an internal NAV-validation workstation for fund controllers. ProcedureDocument → ordered Cell[] with `cell_role` discriminator. `validation` cells are not rendered. Desktop-only (≥1280px).
- `mem://style/design-system` — Stack (React 18 + TS strict + Vite + Tailwind v3 + shadcn/ui hand-written + Radix + React Router v6 + TanStack Query v5 + sonner + lucide-react + cva). Layout: 52px topbar, 220px sidebar, CSS Grid `220px 1fr`. Mandatory literal status Tailwind classes from `src/lib/cellStatus.ts` (overrides "semantic tokens only").
- `mem://features/cells` — Per-role rendering rules. Critical ExceptionCell behavior (red→green, RadioGroup + rationale, `decideException` mutation, invalidate `['document', docId]`). SignoffCell (amber/blocked/signed states, server-side block when exceptions open, "N open" badge with Radix tooltip listing labels).
- `mem://architecture/data-layer` — Mock API in `src/lib/api.ts` (`getDocument`, `decideException`, `signOffCell`) with 300–600 ms latency. Document query key `['document', docId]`, `refetchInterval: 15000`. Future backend = FastAPI at `VITE_API_URL`, JWT header — swap inside `api.ts` only. No realtime.
- `mem://constraints/stack` — Forbidden: MUI/Emotion, Next.js, Redux/MobX/Zustand/styled-components/Ant/Chakra, Supabase + `@lovable.dev/cloud-auth-js`, react-intl, framer-motion, recharts, d3, handsontable, react-hook-form, axios, mobile layouts, real-time/WebSockets. Out-of-scope (don't build): Dashboard, Audit, auth UI, code editor view.

**Rewrite `mem://index.md` Core to:**
- Project is **Vellum** — internal NAV-validation workstation. Desktop-only, min 1280px.
- Stack: React 18 + TS strict + Vite + Tailwind v3 + **shadcn/ui + Radix only** + React Router v6 + TanStack Query v5. No MUI, no Next.js, no Redux, no Supabase on the Vellum surface.
- Phase 1 uses mock API in `src/lib/api.ts`. Future backend is FastAPI at `VITE_API_URL`; swap only inside that file.
- All server state via TanStack Query; mutations invalidate `['document', docId]` and toast via sonner. Polling only — no realtime.
- Use the spec's literal status Tailwind classes from `src/lib/cellStatus.ts`. Overrides the general "semantic tokens only" rule.
- Layout fixed: 52px topbar + 220px sidebar + scrollable main, CSS Grid `220px 1fr`.
- Out of scope until later phases: Dashboard, Audit, auth UI, code editor.

## B. Frontend cleanup

Goal: every file in `src/` is either Vellum code or referenced by it. Build still passes. `package.json` no longer lists unused deps. Supabase backend artifacts removed.

### Files / directories to delete

`src/` — everything not part of Vellum:
- `src/theme.ts`, `src/App.css`, `src/tailwind.config.lov.json`
- `src/contexts/` (AuthContext, ThemeModeContext)
- `src/i18n/` (entire folder including locale JSONs)
- `src/services/` (axios api.ts)
- `src/integrations/` (lovable + supabase clients)
- `src/hooks/` (useAgentModules, useAgentTestHistory, useAgents, useChatStream, useTokenBudget)
- `src/pages/` — all of: About, AgentDetail, Agents, Auth, BackOffice, Dashboard, Data, FrontOffice, Index, KnowledgeBase, KnowledgeGraph, MiddleOffice, NotFound, PlatformConfig, Portfolios, Results, Search, Workflows, WorkflowConfiguration, and the entire `pages/platform/` subfolder. Keep only `src/pages/ProcedureViewer.tsx`.
- `src/components/` — all legacy components: AgentModuleEditDialog, AgentTestPanel, AnimatedPage, AppBreadcrumb, ChatDrawer, CommandPalette, CreateAgentDialog, EmptyState, EnhancedSearchBar, Footer, KnowledgeGraphVisualization, LoadingSkeleton, MaterialLayout, MaterialNavbar, MaterialSidebar, PlatformBreadcrumb, ProtectedRoute, RouteErrorBoundary. Keep `AppShell.tsx`, `cells/`, and `ui/`.

Backend / infra (not used by Vellum's mock-only Phase 1):
- `supabase/` — entire folder (config.toml, functions/agent-test, functions/chat, all migrations).
- Any `.env` Supabase entries become unused; leave the file in place but the values are dormant.

Tooling:
- `tsconfig.app.json` — restore standard `"include": ["src"]` since strict mode is now safe to apply repo-wide once legacy files are gone.

### Packages to remove from `package.json`
- `@emotion/react`, `@emotion/styled`
- `@mui/material`, `@mui/icons-material`
- `@handsontable/react`, `handsontable`
- `@hookform/resolvers`, `react-hook-form`
- `@lovable.dev/cloud-auth-js`, `@supabase/supabase-js`
- `axios`
- `d3`, `@types/d3`
- `framer-motion`
- `react-intl`
- `react-markdown`
- `recharts`
- `zod` (not currently used by Vellum; re-add if/when needed)

Keep: `react`, `react-dom`, `react-router-dom`, `@tanstack/react-query`, `tailwindcss` + plugins, `tailwind-merge`, `clsx`, `class-variance-authority`, all `@radix-ui/react-*` Vellum uses, `lucide-react`, `sonner`, `date-fns` (kept — useful and tiny; drop later if untouched), all dev deps, `lovable-tagger`.

`vite.config.ts` — drop the now-empty `manualChunks` entries for `vendor-mui`, `vendor-charts`, `vendor-grid`, `vendor-motion`, `vendor-intl`. Keep proxy off (no `/api` Django backend in Vellum).

### Verification
After cleanup: `bun install` (regenerate lockfile), `bun run build`, then `rg -l "from ['\"]@mui|@supabase|react-intl|framer-motion|recharts|handsontable|axios|react-hook-form|d3"` in `src/` returns nothing.

## Out of scope for this task
- Adding new product features.
- Touching the Vellum surface (`AppShell`, `cells/`, `ProcedureViewer`, `ui/`, `lib/api.ts`, `lib/mockData.ts`, `lib/cellStatus.ts`, `lib/utils.ts`, `types/vellum.ts`, `App.tsx`, `main.tsx`, `index.css`).
- Wiring a real FastAPI backend.
