import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog, Box, TextField, List, ListItemButton, ListItemIcon,
  ListItemText, Typography, InputAdornment, Chip, alpha, Divider,
} from "@mui/material";
import {
  Search, Dashboard, AccountTree, Storage, Analytics,
  TrendingUp, MenuBook, Hub, Settings, Description,
} from "@mui/icons-material";
import { useIntl } from "react-intl";

interface CommandItem {
  id: string;
  labelId: string;
  descriptionId: string;
  icon: React.ReactNode;
  path: string;
  categoryId: string;
}

const commandDefs: CommandItem[] = [
  { id: "home", labelId: "command.home", descriptionId: "command.homeDesc", icon: <Dashboard />, path: "/", categoryId: "command.navigation" },
  { id: "dashboard", labelId: "command.dashboard", descriptionId: "command.dashboardDesc", icon: <Analytics />, path: "/dashboard", categoryId: "command.navigation" },
  { id: "search", labelId: "command.search", descriptionId: "command.searchDesc", icon: <Search />, path: "/search", categoryId: "command.navigation" },
  { id: "portfolios", labelId: "command.portfolios", descriptionId: "command.portfoliosDesc", icon: <TrendingUp />, path: "/portfolios", categoryId: "command.navigation" },
  { id: "data", labelId: "command.dataSandbox", descriptionId: "command.dataSandboxDesc", icon: <Storage />, path: "/data", categoryId: "command.navigation" },
  { id: "workflows", labelId: "command.workflows", descriptionId: "command.workflowsDesc", icon: <AccountTree />, path: "/workflows", categoryId: "command.navigation" },
  { id: "workflow-config", labelId: "command.workflowConfig", descriptionId: "command.workflowConfigDesc", icon: <Settings />, path: "/workflow-config", categoryId: "command.navigation" },
  { id: "knowledge-graph", labelId: "command.knowledgeGraph", descriptionId: "command.knowledgeGraphDesc", icon: <Hub />, path: "/knowledge-graph", categoryId: "command.navigation" },
  { id: "knowledge-base", labelId: "command.knowledgeBase", descriptionId: "command.knowledgeBaseDesc", icon: <MenuBook />, path: "/knowledge-base", categoryId: "command.navigation" },
  { id: "results", labelId: "command.results", descriptionId: "command.resultsDesc", icon: <Description />, path: "/results", categoryId: "command.navigation" },
  { id: "about", labelId: "command.about", descriptionId: "command.aboutDesc", icon: <Description />, path: "/about", categoryId: "command.navigation" },
];

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

const CommandPalette = ({ open, onClose }: CommandPaletteProps) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const intl = useIntl();

  const commands = commandDefs.map((cmd) => ({
    ...cmd,
    label: intl.formatMessage({ id: cmd.labelId }),
    description: intl.formatMessage({ id: cmd.descriptionId }),
    category: intl.formatMessage({ id: cmd.categoryId }),
  }));

  const filtered = commands.filter(
    (cmd) =>
      cmd.label.toLowerCase().includes(query.toLowerCase()) ||
      cmd.description.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => { setSelectedIndex(0); }, [query]);
  useEffect(() => { if (!open) { setQuery(""); setSelectedIndex(0); } }, [open]);

  const handleSelect = useCallback(
    (item: typeof commands[0]) => { navigate(item.path); onClose(); },
    [navigate, onClose]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setSelectedIndex((i) => Math.min(i + 1, filtered.length - 1)); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setSelectedIndex((i) => Math.max(i - 1, 0)); }
    else if (e.key === "Enter" && filtered[selectedIndex]) { handleSelect(filtered[selectedIndex]); }
  };

  const grouped = filtered.reduce<Record<string, typeof commands>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  let flatIndex = -1;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth
      PaperProps={{ sx: { borderRadius: 3, overflow: "hidden", position: "fixed", top: "20%", m: 0 } }}
      slotProps={{ backdrop: { sx: { bgcolor: alpha("#000", 0.4), backdropFilter: "blur(4px)" } } }}>
      <Box onKeyDown={handleKeyDown}>
        <TextField autoFocus fullWidth
          placeholder={intl.formatMessage({ id: "command.placeholder" })}
          value={query} onChange={(e) => setQuery(e.target.value)}
          variant="standard"
          InputProps={{
            disableUnderline: true,
            startAdornment: <InputAdornment position="start"><Search sx={{ color: "text.secondary", ml: 1 }} /></InputAdornment>,
            endAdornment: <InputAdornment position="end"><Chip label="ESC" size="small" variant="outlined" sx={{ fontSize: "0.65rem", height: 22, mr: 1, borderColor: "divider" }} /></InputAdornment>,
            sx: { py: 1.5, px: 1, fontSize: "1rem" },
          }} />
        <Divider />
        <List sx={{ maxHeight: 360, overflow: "auto", py: 1 }}>
          {filtered.length === 0 && (
            <Box sx={{ py: 4, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                {intl.formatMessage({ id: "command.noResults" }, { query })}
              </Typography>
            </Box>
          )}
          {Object.entries(grouped).map(([category, items]) => (
            <Box key={category}>
              <Typography variant="caption" color="text.secondary"
                sx={{ px: 2, py: 0.5, display: "block", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {category}
              </Typography>
              {items.map((item) => {
                flatIndex++;
                const idx = flatIndex;
                return (
                  <ListItemButton key={item.id} selected={idx === selectedIndex} onClick={() => handleSelect(item)}
                    sx={{ mx: 1, borderRadius: 1.5, py: 1, "&.Mui-selected": { bgcolor: alpha("#000", 0.06) } }}>
                    <ListItemIcon sx={{ minWidth: 36, color: "text.secondary" }}>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.label} secondary={item.description}
                      primaryTypographyProps={{ fontWeight: 500, fontSize: "0.9rem" }}
                      secondaryTypographyProps={{ fontSize: "0.75rem" }} />
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
