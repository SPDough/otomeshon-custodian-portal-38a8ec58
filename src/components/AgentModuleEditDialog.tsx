import { useState, useCallback } from "react";
import { useIntl } from "react-intl";
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Box,
  TextField, Slider, MenuItem, Typography, Chip, IconButton, alpha, useTheme,
} from "@mui/material";
import { Add, Close } from "@mui/icons-material";
import type { AgentModuleStatus } from "@/hooks/useAgentModules";

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (data: { status: AgentModuleStatus; progress: number; configured_items: string[]; stats_label: string }) => void;
  initialData: {
    status: AgentModuleStatus;
    progress: number;
    configured_items: string[];
    stats_label: string;
  };
  title: string;
  color: string;
}

const AgentModuleEditDialog = ({ open, onClose, onSave, initialData, title, color }: Props) => {
  const intl = useIntl();
  const theme = useTheme();
  const fm = (id: string) => intl.formatMessage({ id });

  const [status, setStatus] = useState<AgentModuleStatus>(initialData.status);
  const [progress, setProgress] = useState(initialData.progress);
  const [items, setItems] = useState<string[]>(initialData.configured_items);
  const [statsLabel, setStatsLabel] = useState(initialData.stats_label);
  const [newItem, setNewItem] = useState("");

  const handleAddItem = useCallback(() => {
    const trimmed = newItem.trim();
    if (trimmed && !items.includes(trimmed) && trimmed.length <= 100) {
      setItems((prev) => [...prev, trimmed]);
      setNewItem("");
    }
  }, [newItem, items]);

  const handleRemoveItem = useCallback((item: string) => {
    setItems((prev) => prev.filter((i) => i !== item));
  }, []);

  const handleSave = () => {
    onSave({ status, progress, configured_items: items, stats_label: statsLabel.trim().slice(0, 50) });
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Box sx={{ width: 4, height: 24, borderRadius: 1, bgcolor: color }} />
        {fm("agents.editTitle")} — {title}
      </DialogTitle>
      <DialogContent dividers sx={{ display: "flex", flexDirection: "column", gap: 3, pt: 3 }}>
        {/* Status */}
        <TextField
          select
          label={fm("agents.editStatus")}
          value={status}
          onChange={(e) => setStatus(e.target.value as AgentModuleStatus)}
          fullWidth
          size="small"
        >
          <MenuItem value="active">{fm("agents.statusActive")}</MenuItem>
          <MenuItem value="configured">{fm("agents.statusConfigured")}</MenuItem>
          <MenuItem value="needs_setup">{fm("agents.statusNeedsSetup")}</MenuItem>
        </TextField>

        {/* Stats label */}
        <TextField
          label={fm("agents.editStatsLabel")}
          value={statsLabel}
          onChange={(e) => setStatsLabel(e.target.value)}
          fullWidth
          size="small"
          inputProps={{ maxLength: 50 }}
        />

        {/* Progress */}
        <Box>
          <Typography variant="body2" gutterBottom>
            {fm("agents.editProgress")}: {progress}%
          </Typography>
          <Slider
            value={progress}
            onChange={(_, v) => setProgress(v as number)}
            min={0}
            max={100}
            step={5}
            sx={{ color }}
          />
        </Box>

        {/* Configured items */}
        <Box>
          <Typography variant="body2" gutterBottom>
            {fm("agents.editItems")}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 1.5 }}>
            {items.map((item) => (
              <Chip
                key={item}
                label={item}
                size="small"
                onDelete={() => handleRemoveItem(item)}
                sx={{ bgcolor: alpha(color, 0.1), color: theme.palette.text.primary }}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", gap: 1 }}>
            <TextField
              size="small"
              placeholder={fm("agents.editAddItem")}
              value={newItem}
              onChange={(e) => setNewItem(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddItem(); } }}
              fullWidth
              inputProps={{ maxLength: 100 }}
            />
            <IconButton onClick={handleAddItem} color="primary" disabled={!newItem.trim()}>
              <Add />
            </IconButton>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} color="inherit">{fm("agents.editCancel")}</Button>
        <Button onClick={handleSave} variant="contained" sx={{ bgcolor: color, "&:hover": { bgcolor: alpha(color, 0.85) } }}>
          {fm("agents.editSave")}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AgentModuleEditDialog;
