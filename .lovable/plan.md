

# i18n Translations for Remaining Pages

## Scope
Add FormatJS message keys and translations to **15 untranslated pages** across 4 JSON resource files and update each component to use `useIntl()`.

## Pages to translate

| Page | Estimated new keys |
|------|-------------------|
| FrontOffice | ~12 |
| MiddleOffice | ~15 |
| BackOffice | ~20 |
| Workflows | ~18 |
| WorkflowConfiguration | ~30 |
| KnowledgeGraph | ~18 |
| KnowledgeBase | ~15 |
| Data | ~6 |
| Search | ~14 |
| Results | ~25 |
| PlatformConfig | ~10 |
| LayerDataCollection | ~8 |
| LayerOntology | ~6 |
| LayerCalculations | ~6 |
| LayerRulesValidation | ~6 |
| LayerIntelligence | ~8 |
| LayerRAG | ~6 |
| LayerReporting | ~6 |
| LayerOutbound | ~6 |
| LayerWorkflowOrchestration | ~6 |

**Total: ~240 new message keys** across all 4 locale files.

## Implementation steps

1. **Add ~240 keys to `en.json`** — grouped by page prefix (e.g., `frontOffice.*`, `middleOffice.*`, `workflows.*`, `platform.*`, `layer0.*` through `layer8.*`)

2. **Add matching translations to `ja.json`, `es.json`, `fr.json`** — all keys translated to Japanese, Spanish, and French respectively

3. **Update all 20 page components** to import `useIntl` from `react-intl` and replace every hardcoded string with `intl.formatMessage({ id: "key" })` or `<FormattedMessage>`. This includes:
   - Page titles and subtitles
   - Card titles, descriptions, stats labels
   - Table headers (BackOffice, Results)
   - Tab labels (Workflows, KnowledgeGraph, Search)
   - Form labels and placeholders (WorkflowConfiguration)
   - Button text
   - Status chips (Active, Draft, Pending, etc.)
   - Helper text and descriptions

## Technical approach
- Follow exact same pattern as existing translated pages (Dashboard, Portfolios, Auth)
- Use `intl.formatMessage()` for string props and data arrays
- Use ICU interpolation where needed (e.g., `{count} documents`)
- No database changes, no new dependencies

