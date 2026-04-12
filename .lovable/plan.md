

## Plan: Add Mobile Text Truncation to Breadcrumbs

### What changes
Add CSS truncation (`text-overflow: ellipsis`) to breadcrumb items that kicks in on small screens, preventing long labels from wrapping awkwardly.

### Technical details

**Single file edit: `src/components/AppBreadcrumb.tsx`**

1. Change the outer `Breadcrumbs` container `width` from `"fit-content"` to `{ xs: "100%", sm: "fit-content" }` so it constrains on mobile.

2. Add a shared truncation style object used by both `Typography` (last crumb) and `Link` (parent crumbs):
   ```ts
   const truncationSx = {
     maxWidth: { xs: 150, sm: "none" },
     overflow: "hidden",
     textOverflow: "ellipsis",
     whiteSpace: "nowrap",
   };
   ```
   - On `xs` screens, each crumb label is capped at ~150px and truncated with an ellipsis.
   - On `sm`+ screens, no truncation applies.

3. Merge `truncationSx` into the `sx` prop of both the `Typography` and `Link` elements. For the `Link`, add `display: "inline-flex"` so the home icon and text stay on one line.

No new dependencies, no changes to other files.

