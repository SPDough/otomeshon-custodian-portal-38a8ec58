# Vellum Operations Workstation — Phase 1 Plan

Build the foundation of an internal NAV-validation workstation. Phase 1 delivers a working scaffold, the core data model, a mock document, an app shell, the procedure viewer, and a fully functional ExceptionCell.

The current project is an unrelated Lovable app heavily built around Material UI and Supabase. Phase 1 will replace the user-facing surface with a clean shadcn/ui-based shell and route the root to the new ProcedureViewer. We will leave existing files in place but stop routing to them, so nothing is destroyed.

## What gets built

### 1. Scaffold verification & shadcn/ui setup
The required stack is already installed (React 18, TypeScript, Vite, Tailwind v3, React Router v6, TanStack Query v5, lucide-react, tailwind-merge, sonner). Missing pieces:
- Add `class-variance-authority` and `@radix-ui/react-slot`, `@radix-ui/react-radio-group`, `@radix-ui/react-label` (needed for the shadcn primitives we use in Phase 1).
- Enable TS strict mode in `tsconfig.app.json` (`strict: true`, `strictNullChecks: true`, `noImplicitAny: true`).
- Create `src/components/ui/` with the small set of shadcn components Phase 1 needs: `button`, `card`, `badge`, `input`, `textarea`, `label`, `radio-group`, `separator`, `scroll-area`. Each is a minimal hand-written shadcn-style component (Radix + cva + Tailwind), no other library.

### 2. Type definitions — `src/types/vellum.ts`
Define the discriminated union for cells and the document shape:
- `CellRole = 'narrative' | 'reasoning' | 'validation' | 'result' | 'exception' | 'signoff'`
- `CellStatus = 'pass' | 'warn' | 'breach' | 'fail' | 'running' | 'pending'`
- `BaseCell` with `cell_id`, `position`, `cell_role`
- `NarrativeCell`, `ReasoningCell`, `ValidationCell`, `ResultCell` (with `status`, `summary`, `metrics`), `ExceptionCell` (with `severity`, `description`, `remediation_options: { id; label; description }[]`, `resolution?: { option_id; rationale; decided_by; decided_at }`), `SignoffCell` (with `signed_by?`, `signed_at?`, `required_role`)
- `Cell = NarrativeCell | ReasoningCell | ValidationCell | ResultCell | ExceptionCell | SignoffCell`
- `ProcedureDocument` with `id`, `title`, `fund_code`, `as_of_date`, `status`, `cells: Cell[]`
- `ExceptionDecisionRequest` and response types for `POST /exceptions/:cell_id/decide`

### 3. Mock API — `src/lib/mockData.ts` and `src/lib/api.ts`
- `mockData.ts` exports one realistic `ProcedureDocument` for **Fund APAC-EQ-01, NAV as of 2026-04-24**, containing in order:
  1. NarrativeCell — "NAV validation overview" markdown
  2. ResultCell (pass) — "Pricing source coverage: 247/247 securities priced"
  3. NarrativeCell — "Tolerance checks"
  4. ResultCell (breach) — "Day-over-day NAV move 4.2% exceeds 2% tolerance"
  5. ExceptionCell (unresolved) — tied to the breach, with 3 remediation options (accept with rationale, escalate to PM, reject and rerun pricing)
  6. SignoffCell — controller signoff, unsigned
- `api.ts` exposes `getDocument(id)` and `decideException(cellId, payload)` returning Promises with a 300–600 ms delay so TanStack Query behaves realistically. `decideException` mutates the in-memory mock so the document re-fetches with the resolution applied.

### 4. AppShell — `src/components/AppShell.tsx`
- CSS Grid layout: `grid-template-columns: 220px 1fr` and `grid-template-rows: 52px 1fr`.
- Topbar (52px): product name "Vellum", current document title and fund code on the right.
- Left sidebar (220px): step list derived from the document's cells, each row showing a status dot (pass/warn/breach/running/pending colors from the spec) and the cell's short label. Clicking scrolls the main pane to that cell.
- Main: scrollable container that renders `children`.
- Desktop-only; no mobile breakpoints.

### 5. ProcedureViewer page — `src/pages/ProcedureViewer.tsx`
- Route: `/` (replaces the existing Index route in `App.tsx`). Old routes stay defined but the topbar/sidebar only references the new page for Phase 1.
- Uses `useQuery(['document', docId], …)` to load the mock document.
- Renders cells in `position` order, each via a switch on `cell_role` to the matching component:
  - `NarrativeCellView` — plain prose card
  - `ReasoningCellView` — muted card with collapsible body (placeholder render fine, no reasoning cell in mock)
  - `ResultCellView` — card whose border/background uses the spec's status Tailwind classes; shows summary + key metrics
  - `ExceptionCellView` — see below
  - `SignoffCellView` — card showing required role and signed/unsigned state (button is non-functional in Phase 1)
  - Validation cells are filtered out of rendering (per spec)

### 6. ExceptionCell — `src/components/cells/ExceptionCellView.tsx`
This is the critical component.
- **Unresolved state**: red-border card (`border-red-200 bg-red-50`), severity badge, description text, a `RadioGroup` of remediation options (each option shows label + description), a required `Textarea` for rationale, and a `Confirm` button.
- Confirm is disabled until an option is selected and rationale length > 0.
- Confirm calls `useMutation` wrapping `api.decideException(cell_id, { option_id, rationale })`. On success: `queryClient.invalidateQueries({ queryKey: ['document', docId] })` and `toast.success(...)` via sonner.
- **Resolved state** (when `cell.resolution` is present after refetch): green border/background, shows chosen option label, rationale, decider, and timestamp. No form.

### 7. Wire-up
- `src/main.tsx` and `src/App.tsx` updated to provide `QueryClientProvider`, `BrowserRouter`, `Toaster`, and route `/` → `<AppShell><ProcedureViewer /></AppShell>`. We will keep the existing routes file intact but the new App.tsx for Phase 1 will only mount the new shell.

## Out of scope for Phase 1 (explicitly not built)
- Authentication / login UI
- Dashboard page
- Audit page
- Real backend wiring (mock only)
- Signoff mutation (display only)
- Reasoning cell content (type defined, no instance in mock)

## Technical notes
- All status styling uses **only** the Tailwind class strings from the spec — no theme tokens, no custom colors.
- Polling is set up via `refetchInterval` on the document query (default 15s, easily tunable) so Phase 2 can swap in the real API with no component changes.
- shadcn components are written by hand (no CLI) to keep the dependency surface small and match the "shadcn/ui + Radix only" rule.
- Existing Material UI / Supabase / custodian-portal code is left untouched on disk but disconnected from the root route. It can be deleted in a later phase once Phase 2/3 are validated.

## Files created or modified
- create `src/types/vellum.ts`
- create `src/lib/mockData.ts`
- create `src/lib/api.ts`
- create `src/lib/utils.ts` (cn helper) — already exists, will verify/extend
- create `src/components/ui/{button,card,badge,input,textarea,label,radio-group,separator,scroll-area}.tsx`
- create `src/components/AppShell.tsx`
- create `src/components/cells/{NarrativeCellView,ReasoningCellView,ResultCellView,ExceptionCellView,SignoffCellView}.tsx`
- create `src/pages/ProcedureViewer.tsx`
- modify `src/App.tsx` (route `/` to new shell + viewer; keep QueryClient and Toaster)
- modify `tsconfig.app.json` (enable strict mode)
- modify `package.json` (add cva + radix radio-group/label/slot)
