import { useMemo, lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";
import { ThemeModeProvider, useThemeMode } from "./contexts/ThemeModeContext";
import MaterialLayout from "./components/MaterialLayout";
import { DashboardSkeleton } from "./components/LoadingSkeleton";
import RouteErrorBoundary from "./components/RouteErrorBoundary";

const withErrorBoundary = (Component: React.LazyExoticComponent<React.ComponentType>) => (
  <RouteErrorBoundary><Component /></RouteErrorBoundary>
);

// Lazy-loaded pages
const Index = lazy(() => import("./pages/Index"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Search = lazy(() => import("./pages/Search"));
const Results = lazy(() => import("./pages/Results"));
const About = lazy(() => import("./pages/About"));
const Portfolios = lazy(() => import("./pages/Portfolios"));
const Data = lazy(() => import("./pages/Data"));
const Workflows = lazy(() => import("./pages/Workflows"));
const WorkflowConfiguration = lazy(() => import("./pages/WorkflowConfiguration"));
const KnowledgeGraph = lazy(() => import("./pages/KnowledgeGraph"));
const KnowledgeBase = lazy(() => import("./pages/KnowledgeBase"));
const FrontOffice = lazy(() => import("./pages/FrontOffice"));
const MiddleOffice = lazy(() => import("./pages/MiddleOffice"));
const BackOffice = lazy(() => import("./pages/BackOffice"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlatformConfig = lazy(() => import("./pages/PlatformConfig"));
const LayerDataCollection = lazy(() => import("./pages/platform/LayerDataCollection"));
const LayerOntology = lazy(() => import("./pages/platform/LayerOntology"));
const LayerCalculations = lazy(() => import("./pages/platform/LayerCalculations"));
const LayerRulesValidation = lazy(() => import("./pages/platform/LayerRulesValidation"));
const LayerIntelligence = lazy(() => import("./pages/platform/LayerIntelligence"));
const LayerRAG = lazy(() => import("./pages/platform/LayerRAG"));
const LayerWorkflowOrchestration = lazy(() => import("./pages/platform/LayerWorkflowOrchestration"));
const LayerReporting = lazy(() => import("./pages/platform/LayerReporting"));
const LayerOutbound = lazy(() => import("./pages/platform/LayerOutbound"));

const queryClient = new QueryClient();

const AnimatedRoutes = () => {
  const location = useLocation();
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search" element={<Search />} />
          <Route path="/results" element={<Results />} />
          <Route path="/portfolios" element={<Portfolios />} />
          <Route path="/data" element={<Data />} />
          <Route path="/workflows" element={<Workflows />} />
          <Route path="/workflow-config" element={<WorkflowConfiguration />} />
          <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/front-office" element={<FrontOffice />} />
          <Route path="/middle-office" element={<MiddleOffice />} />
          <Route path="/back-office" element={<BackOffice />} />
          <Route path="/platform-config" element={<PlatformConfig />} />
          <Route path="/platform-config/layer-0" element={<LayerDataCollection />} />
          <Route path="/platform-config/layer-1" element={<LayerOntology />} />
          <Route path="/platform-config/layer-2" element={<LayerCalculations />} />
          <Route path="/platform-config/layer-3" element={<LayerRulesValidation />} />
          <Route path="/platform-config/layer-4" element={<LayerIntelligence />} />
          <Route path="/platform-config/layer-5" element={<LayerRAG />} />
          <Route path="/platform-config/layer-6" element={<LayerWorkflowOrchestration />} />
          <Route path="/platform-config/layer-7" element={<LayerReporting />} />
          <Route path="/platform-config/layer-8" element={<LayerOutbound />} />
          <Route path="/about" element={<About />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
};

const ThemedApp = () => {
  const { mode } = useThemeMode();
  const theme = useMemo(() => (mode === 'dark' ? darkTheme : lightTheme), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MaterialLayout>
          <AnimatedRoutes />
        </MaterialLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeModeProvider>
      <ThemedApp />
    </ThemeModeProvider>
  </QueryClientProvider>
);

export default App;
