
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
import KnowledgeGraph from "./pages/KnowledgeGraph";
import NotFound from "./pages/NotFound";

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
            <Route path="/knowledge-graph" element={<KnowledgeGraph />} />
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
