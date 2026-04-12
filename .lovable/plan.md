

## Plan: Add Breadcrumbs Across Protected Pages

### Summary
Create a reusable `AppBreadcrumb` component and add it to 11 pages that currently lack navigation context.

### Approach
1. **Create `src/components/AppBreadcrumb.tsx`** — a generic breadcrumb component accepting an array of `{ label, path? }` crumb items. Uses MUI `Breadcrumbs` with the same styling as the existing `PlatformBreadcrumb`. Dashboard is always the first crumb.

2. **Add breadcrumbs to these pages:**

```text
Page                  Trail
─────────────────────────────────────────────
Front Office          Dashboard › Front Office
Portfolios            Dashboard › Front Office › Portfolios
Knowledge Graph       Dashboard › Front Office › Knowledge Graph
Knowledge Base        Dashboard › Front Office › Knowledge Base
Middle Office         Dashboard › Middle Office
Workflow Config       Dashboard › Middle Office › Workflow Config
Back Office           Dashboard › Back Office
Data Sandbox          Dashboard › Back Office › Data Sandbox
Workflows             Dashboard › Workflows
Search                Dashboard › Search
Results               Dashboard › Search › Results
```

3. **Refactor `PlatformBreadcrumb`** to use `AppBreadcrumb` internally (Dashboard › Capability Stack › L*N*: Name), keeping backward compatibility.

4. **Add i18n keys** for breadcrumb labels in all 4 locale files (en, es, fr, ja).

### Technical details
- Each page gets a single `<AppBreadcrumb crumbs={[...]} />` inserted at the top of its content area, before the title.
- The component renders MUI `<Breadcrumbs>` with `NavigateNext` separator, matching existing platform breadcrumb styling.
- Last crumb is plain `<Typography>` (current page); all others are `<Link component={RouterLink}>`.
- No changes to routing, sidebar, or layout.

