

## Platform Configuration Section

A new "Platform Configuration" section with an overview landing page and individual layer pages, added to the sidebar and routing.

### Architecture

The 9 layers (0-8) represent the platform's capability stack. Each gets a dedicated page, accessible from a new sidebar section and a landing page that visualizes the full stack.

### What gets built

**1. Landing page: `src/pages/PlatformConfig.tsx`**
- Hero with title "Platform Configuration" and subtitle about client setup
- Visual stack diagram showing all 9 layers (Layer 0 at bottom, Layer 8 at top) as interactive cards
- Each layer card shows: layer number, name, brief description, status indicator (configured/pending), and click-through to its detail page
- Uses AnimatedPage wrapper with staggered entrance animations
- Color-coded layers (data layers = blue tones, logic layers = green, agent layers = purple, output layers = orange)

**2. Individual layer pages (9 files):**

| File | Layer | Key UI Elements |
|------|-------|-----------------|
| `LayerDataCollection.tsx` | L0: Data Collection & Automations | Connection cards, ingestion schedules, source status |
| `LayerOntology.tsx` | L1: Ontology & Data Dictionaries | Entity types, field mappings, taxonomy browser |
| `LayerCalculations.tsx` | L2: Calculations | Calculation library, formula editor cards, test results |
| `LayerRulesValidation.tsx` | L3: Rules & Validation | Rule sets table, validation status, exception counts |
| `LayerIntelligence.tsx` | L4: Intelligence & Anomaly Detection | ML model cards, anomaly alerts, LLM config |
| `LayerRAG.tsx` | L5: RAG / Industry Knowledge | Document corpus, embedding status, knowledge sources |
| `LayerWorkflowOrchestration.tsx` | L6: Workflow Orchestration | Workflow designer cards, agent/deterministic toggle |
| `LayerReporting.tsx` | L7: Agent-Enabled Reporting | Dashboard builder, report templates, agent status |
| `LayerOutbound.tsx` | L8: Outbound Data & Integration | API endpoints, export targets, integration health |

Each page follows the existing pattern: AnimatedPage wrapper, MUI cards, framer-motion animations, feature cards with descriptions and status chips.

**3. Sidebar update: `src/components/MaterialSidebar.tsx`**
- Add new "Platform Configuration" nav section with:
  - Overview link (`/platform-config`)
  - One link per layer (`/platform-config/layer-0` through `/platform-config/layer-8`)
- Section defaults to collapsed

**4. Routing update: `src/App.tsx`**
- Add routes for `/platform-config` and `/platform-config/layer-0` through `/platform-config/layer-8`

### Technical details
- All pages use the existing `AnimatedPage`, `fadeInUp`, `staggerContainer` pattern
- MUI components with `alpha()` for subtle backgrounds, consistent with existing pages
- Layer pages are static/mock UI for now (no backend)
- New MUI icons: `Layers`, `MenuBook`, `Functions`, `Gavel`, `Psychology`, `AutoStories`, `AccountTree`, `Assessment`, `CloudUpload`

