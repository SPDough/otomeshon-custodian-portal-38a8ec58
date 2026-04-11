

# Evaluation: Otomeshon vs. Linear / Retool / Mercury / Ramp

## What you've built well
- Clean MUI-based design system with Inter, consistent spacing, dark mode
- Collapsible sidebar with section grouping and active-state highlighting
- Command palette (Cmd+K), AI chat with streaming + persistence
- Context-aware AI assistant with conversation history
- Good page structure: lazy loading, error boundaries, animated transitions

## The gaps — organized by category

### 1. All data is hardcoded / mock
**The single biggest gap.** Linear, Retool, Mercury, and Ramp are all fundamentally data-driven. Every number on your dashboard, portfolio table, and activity feed is a static constant. There are no database queries, no real CRUD operations, no loading/error/empty states driven by actual data. The "Create Portfolio" dialog doesn't persist anything. The login button sets a local boolean.

**What to build:**
- Database-backed portfolios, workflows, and activity feeds
- Real authentication (email/password + Google OAuth)
- Proper loading/error/empty states on every data-fetching page
- Optimistic updates and cache invalidation via React Query

### 2. No real interactivity or state management
Linear and Retool feel alive because every click does something meaningful. Here, most sidebar items are dead links (no `path`), quick actions navigate to placeholder pages, and there's no drag-and-drop, inline editing, filtering, sorting, or pagination.

**What to build:**
- Functional data tables with sort, filter, search, pagination (like Retool's tables)
- Inline editing for portfolio names, values, risk levels
- Bulk actions (select rows, bulk delete/export)
- Drill-down from summary cards into filtered detail views

### 3. Shallow information density
Mercury and Ramp pack dense, scannable information into every pixel. Your dashboard has 4 stat cards and 3 progress bars — it feels like a template. Linear's sidebar shows counts, badges, and status indicators.

**What to build:**
- Sparkline charts in stat cards showing trends over time
- Real charting (Recharts/Nivo) — portfolio performance over time, asset allocation donuts, risk heatmaps
- Sidebar badges showing counts (e.g., "3" next to Risk Alerts)
- Data-dense tables with compact row heights and more columns

### 4. No notification/feedback system
Ramp and Mercury have toast notifications, in-app notification centers, and status banners. You have `sonner` installed but only use it for chat errors.

**What to build:**
- Notification center (bell icon in navbar with dropdown)
- Real-time alerts for workflow completions, risk threshold breaches
- Success/error toasts on all CRUD operations

### 5. Navigation feels incomplete
~15 sidebar items have no `path` (Performance, Corporate Actions, Risk Management, etc.). Users clicking these get nothing. Linear never has dead-end nav items.

**What to build:**
- Either wire up all nav items to real pages, or remove unimplemented ones and add a "Coming Soon" state
- Breadcrumbs on every page (you have PlatformBreadcrumb but it's not used broadly)

### 6. No keyboard-driven workflows
Linear is famous for keyboard shortcuts. You have Cmd+K but nothing else.

**What to build:**
- Keyboard shortcuts for common actions (N for new, E for edit, / for search)
- Shortcut hints in tooltips and command palette
- Focus management and keyboard navigation in tables

### 7. No settings, preferences, or profile page
Mercury and Ramp have extensive settings. You have nothing — no user profile, no preferences, no API key management, no team settings.

### 8. Typography and spacing polish
Linear uses extremely tight, purposeful spacing. Your pages have generous padding but inconsistent density. Card headers use `CardHeader` defaults which are large. Tables have default MUI row heights which feel loose compared to Linear's compact rows.

---

## Recommended implementation order

| Priority | Work item | Impact |
|----------|-----------|--------|
| 1 | Real auth + database-backed portfolios | Transforms from prototype to app |
| 2 | Data tables with sort/filter/pagination | Core interaction pattern |
| 3 | Charts and data visualization | Information density |
| 4 | Wire up all sidebar nav items | Eliminates dead ends |
| 5 | Notification center | Feedback loop |
| 6 | Keyboard shortcuts | Power-user experience |
| 7 | Settings/profile pages | Completeness |
| 8 | Spacing/density polish pass | Visual refinement |

### Technical approach
- Use Lovable Cloud for auth (email + Google) and all data persistence
- Use React Query (already installed) for server state
- Use Recharts for charting (lightweight, React-native)
- Add RLS policies so users only see their own data
- Compact MUI theme overrides for tighter table/card density

Shall I start implementing from priority 1 (real authentication + database-backed portfolios)?

