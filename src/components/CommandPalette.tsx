import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  Box,
  TextField,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  InputAdornment,
  Chip,
  alpha,
  Divider,
} from "@mui/material";
import {
  Search,
  Dashboard,
  AccountTree,
  Storage,
  Analytics,
  TrendingUp,
  MenuBook,
  Hub,
  Settings,
  Description,
} from "@mui/icons-material";

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  category: string;
}

const commands: CommandItem[] = [
  { id: "home", label: "Home", description: "Go to landing page", icon: <Dashboard />, path: "/", category: "Navigation" },
  { id: "dashboard", label: "Dashboard", description: "Financial intelligence overview", icon: <Analytics />, path: "/dashboard", category: "Navigation" },
  { id: "search", label: "Search", description: "Search financial data", icon: <Search />, path: "/search", category: "Navigation" },
  { id: "portfolios", label: "Portfolios", description: "Manage portfolio holdings", icon: <TrendingUp />, path: "/portfolios", category: "Navigation" },
  { id: "data", label: "Data Sandbox", description: "Interactive data exploration", icon: <Storage />, path: "/data", category: "Navigation" },
  { id: "workflows", label: "Workflows", description: "Drools & Langchain automation", icon: <AccountTree />, path: "/workflows", category: "Navigation" },
  { id: "workflow-config", label: "Workflow Config", description: "Configure workflow settings", icon: <Settings />, path: "/workflow-config", category: "Navigation" },
  { id: "knowledge-graph", label: "Knowledge Graph", description: "FIBO ontology visualization", icon: <Hub />, path: "/knowledge-graph", category: "Navigation" },
  { id: "knowledge-base", label: "Knowledge Base", description: "Documentation & guides", icon: <MenuBook />, path: "/knowledge-base", category: "Navigation" },
  { id: "results", label: "Results", description: "View analysis results", icon: <Description />, path: "/results", category: "Navigation" },
  { id: "about", label: "About", description: "About the platform", icon: <Description />, path: "/about", category: "Navigation" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette = ({ open, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    if (!open) {
      setQuery("");
      setSelectedIndex(0);
    }
  }, [open]);

  const handleSelect = useCallback(
    (item: CommandItem) => {
      navigate(item.path);
      onClose();
    },
    [navigate, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      handleSelect(filtered[selectedIndex]);
    }
  };

  // Group by category
  const grouped = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: "hidden",
          position: "fixed",
          top: "20%",
          m: 0,
        },
      }}
      slotProps={{
        backdrop: {
          sx: { bgcolor: alpha("#000", 0.4), backdropFilter: "blur(4px)" },
        },
      }}
    >
      <Box onKeyDown={handleKeyDown}>
        <TextField
          autoFocus
          fullWidth
          placeholder="Type a command or search…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary", ml: 1 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Chip
                  label="ESC"
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.65rem", height: 22, mr: 1, borderColor: "divider" }}
                />
              </InputAdornment>
            ),
            sx: { py: 1.5, px: 1, fontSize: "1rem" },
          }}
        />
        <Divider />
        <List sx={{ maxHeight: 360, overflow: "auto", py: 1 }}>
          {filtered.length === 0 && (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                No results found for "{query}"
              </Typography>
            </Box>
          )}
          {Object.entries(grouped).map(([category, items]) => (
            <Box key={category}>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ px: 2, py: 0.5, display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                {category}
              </Typography>
              {items.map((item) => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <ListItemButton
                    key={item.id}
                    selected={idx === selectedIndex}
                    onClick={() => handleSelect(item)}
                    sx={{
                      mx: 1,
                      borderRadius: 1.5,
                      py: 1,
                      "&.Mui-selected": {
                        bgcolor: alpha("#000", 0.06),
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item.label}
                      secondary={item.description}
                      primaryTypographyProps={{ fontWeight: 500, fontSize: "0.9rem" }}
                      secondaryTypographyProps={{ fontSize: "0.75rem" }}
                    />
                  </ListItemButton>
                );
              })}
            </Box>
          ))}
        </List>
      </Box>
    </Dialog>
  );
};

export default CommandPalette;
