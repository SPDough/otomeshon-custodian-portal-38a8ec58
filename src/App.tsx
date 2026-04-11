import { useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { lightTheme, darkTheme } from "./theme";
import { ThemeModeProvider, useThemeMode } from "./contexts/ThemeModeContext";
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
