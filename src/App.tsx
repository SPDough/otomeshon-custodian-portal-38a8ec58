import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import MaterialLayout from "./components/MaterialLayout";

// Import pages
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Search from "./pages/Search";
import Results from "./pages/Results";
import About from "./pages/About";
import Portfolios from "./pages/Portfolios";
import Data from "./pages/Data";
import Workflows from "./pages/Workflows";
import WorkflowConfiguration from "./pages/WorkflowConfiguration";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import KnowledgeBase from "./pages/KnowledgeBase";
import FrontOffice from "./pages/FrontOffice";
import MiddleOffice from "./pages/MiddleOffice";
import BackOffice from "./pages/BackOffice";
import NotFound from "./pages/NotFound";
import PlatformConfig from "./pages/PlatformConfig";
import LayerDataCollection from "./pages/platform/LayerDataCollection";
import LayerOntology from "./pages/platform/LayerOntology";
import LayerCalculations from "./pages/platform/LayerCalculations";
import LayerRulesValidation from "./pages/platform/LayerRulesValidation";
import LayerIntelligence from "./pages/platform/LayerIntelligence";
import LayerRAG from "./pages/platform/LayerRAG";
import LayerWorkflowOrchestration from "./pages/platform/LayerWorkflowOrchestration";
import LayerReporting from "./pages/platform/LayerReporting";
import LayerOutbound from "./pages/platform/LayerOutbound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <MaterialLayout>
          <Routes>
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
        </MaterialLayout>
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
