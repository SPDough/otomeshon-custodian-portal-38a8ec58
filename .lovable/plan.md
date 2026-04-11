

# Multilingual Enhancement with FormatJS (react-intl)

## Overview
Add full internationalization to Otomeshon supporting **English, Japanese (日本語), Spanish (Español), and French (Français)** using FormatJS/react-intl. FormatJS is the right choice here — its ICU message format handles Japanese number formatting (e.g., `¥1,247,500` vs `$1,247,500`), plural rules, and date formatting natively via the browser's `Intl` API.

## Architecture

```text
src/
├── i18n/
│   ├── messages/
│   │   ├── en.json          # English (default)
│   │   ├── ja.json          # Japanese
│   │   ├── es.json          # Spanish
│   │   └── fr.json          # French
│   ├── compiled/            # Pre-compiled AST (production perf)
│   ├── IntlContext.tsx       # Locale state + provider
│   └── types.d.ts           # TypeScript message ID autocomplete
```

## Implementation Steps

### Step 1: Install and configure FormatJS
- Install `react-intl`
- Create `IntlContext` wrapping `IntlProvider` with locale state persisted to `localStorage`
- Wrap `<ThemedApp>` with the provider in `App.tsx`

### Step 2: Create message resource files
Extract all hardcoded strings from these files into keyed JSON:
- **MaterialNavbar** — "Search", "Portfolios", "About", "Login", "Logout"
- **MaterialSidebar** — all section titles and nav item names (~30 strings)
- **Dashboard** — stat titles, activity descriptions, quick action labels
- **Portfolios** — table headers, dialog labels, form fields, toasts
- **Auth** — form labels, buttons, error messages
- **Index / About / NotFound** — page copy
- **ChatDrawer** — placeholder text, send button
- **CommandPalette** — search placeholder, category labels

Each file follows ICU message format:
```json
{
  "nav.search": "Search",
  "nav.login": "Login",
  "dashboard.portfolioValue": "Portfolio Value",
  "portfolio.totalValue": "{value, number, ::currency/USD}",
  "dashboard.timeAgo": "{time} ago"
}
```

Japanese file uses the same keys with localized currency:
```json
{
  "nav.search": "検索",
  "nav.login": "ログイン",
  "dashboard.portfolioValue": "ポートフォリオ評価額",
  "portfolio.totalValue": "{value, number, ::currency/JPY}"
}
```

### Step 3: Replace hardcoded strings in components
- Use `<FormattedMessage id="key" />` for JSX text
- Use `intl.formatMessage()` (from `useIntl()`) for props, aria-labels, and toast messages
- Use `<FormattedNumber>` for all currency and numeric values — this gives correct Japanese grouping (e.g., `1,247,500` vs `124万7500`)
- Use `<FormattedDate>` / `<FormattedRelativeTime>` for timestamps

### Step 4: Add language switcher to navbar
- Globe icon button next to the dark mode toggle
- Dropdown menu showing flag + language name in native script (English, 日本語, Español, Français)
- Persist selection to `localStorage`
- Auto-detect browser locale on first visit via `navigator.language`

### Step 5: TypeScript safety
- Define `types.d.ts` extending `FormatjsIntl.Message` with keys from `en.json`
- This gives autocomplete and compile-time errors for invalid message IDs

### Step 6: Compile messages for production
- Add `formatjs compile` script to `package.json` for AST pre-compilation
- Lazy-load locale files so only the active language is bundled

## Scope & Scale
- **~150–200 message keys** across all current pages
- **4 JSON files** (~200 lines each)
- **~15 component files** need string replacement
- No database changes required — locale preference stored client-side

## Technical Details

| Aspect | Detail |
|--------|--------|
| Library | `react-intl` (FormatJS) ~20KB gzipped |
| Number format | ICU `{value, number}` — browser Intl handles JPY, EUR, USD automatically |
| Date format | `<FormattedDate>` respects locale (年月日 for ja, dd/MM/yyyy for fr) |
| Plurals | ICU `{count, plural, one {# item} other {# items}}` |
| Fallback | Missing translations fall back to English |
| Detection | `navigator.language` on first visit |

