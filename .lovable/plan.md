

## Plan: Remove Radix/shadcn and consolidate on MUI

### Summary
Delete all shadcn/Radix UI components and unused wrapper components, replace the one active usage (Skeleton in `LoadingSkeleton.tsx`) with MUI's Skeleton, and remove all related npm dependencies.

### What changes

**1. Replace shadcn Skeleton with MUI Skeleton in `LoadingSkeleton.tsx`**
- Swap `import { Skeleton } from "@/components/ui/skeleton"` with `import { Skeleton } from "@mui/material"`
- Convert Tailwind class-based sizing (`className="h-8 w-80"`) to MUI sx props (`sx={{ height: 32, width: 320 }}`) or use MUI Skeleton's `variant`, `width`, `height` props

**2. Delete the entire `src/components/ui/` directory**
- All ~40 shadcn component files (button, input, dialog, command, sidebar, toast, etc.)
- These are either unused or replaced by MUI equivalents already in use

**3. Delete unused legacy wrapper components**
- `src/components/SearchBar.tsx` (replaced by `EnhancedSearchBar.tsx`)
- `src/components/Sidebar.tsx` (replaced by `MaterialSidebar.tsx`)
- `src/components/Navbar.tsx` (replaced by `MaterialNavbar.tsx`)
- `src/components/ResultsTable.tsx` (not imported anywhere)

**4. Delete unused utility/hook files**
- `src/hooks/use-toast.ts` (depends on shadcn toast; app uses sonner directly)
- `src/hooks/use-mobile.tsx` (only used by shadcn sidebar)
- `src/components/ui/use-toast.ts` (if separate from hooks version)

**5. Clean up `src/lib/utils.ts`**
- Keep the file (may be used elsewhere) but verify; `cn()` uses `tailwind-merge` + `clsx` which are still useful with Tailwind

**6. Remove npm dependencies**
Uninstall all `@radix-ui/*` packages plus shadcn-related libraries:
- All 27 `@radix-ui/react-*` packages
- `cmdk`, `embla-carousel-react`, `input-otp`, `react-day-picker`, `react-resizable-panels`, `vaul`
- `class-variance-authority` (only used by shadcn components)
- `next-themes` (only used by shadcn sonner wrapper)
- `tailwindcss-animate` (only used for shadcn animation classes)

Keep: `sonner` (toast library used directly), `lucide-react` (icon library used in non-shadcn components), `clsx`, `tailwind-merge`, `react-hook-form`, `@hookform/resolvers`, `zod`

**7. Clean up config files**
- Delete `components.json` (shadcn config)
- Remove `tailwindcss-animate` plugin from `tailwind.config.ts` if present

### Technical details

| Area | Before | After |
|------|--------|-------|
| UI library | MUI + shadcn/Radix (dual) | MUI only |
| Component count in `ui/` | ~40 files | 0 (deleted) |
| Radix packages | 27 | 0 |
| Bundle size | ~150KB+ of unused Radix code | Eliminated |

### Risk
- Low risk: the shadcn components are confirmed unused by active pages/layout. The only active usage is `Skeleton` in `LoadingSkeleton.tsx`, which gets a straightforward MUI swap.
- `sonner` toast will continue working (it's independent of shadcn).

