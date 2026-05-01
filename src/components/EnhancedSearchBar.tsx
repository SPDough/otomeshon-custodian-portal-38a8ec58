import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Chip,
  alpha,
  ClickAwayListener,
  Popper,
} from "@mui/material";
import {
  Search,
  TrendingUp,
  History,
  ArrowForward,
} from "@mui/icons-material";

const SEARCH_HISTORY_KEY = "otomeshon_search_history";

const suggestions = [
  { label: "Portfolio performance", category: "Portfolios" },
  { label: "Risk analysis report", category: "Analytics" },
  { label: "Settlement status", category: "Workflows" },
  { label: "AAPL holdings", category: "Data" },
  { label: "Compliance alerts", category: "Workflows" },
  { label: "Market data feed", category: "Data" },
  { label: "Rebalancing workflow", category: "Workflows" },
  { label: "NAV calculation", category: "Portfolios" },
];

interface EnhancedSearchBarProps {
  initialQuery?: string;
}

const EnhancedSearchBar = ({ initialQuery = "" }: EnhancedSearchBarProps) => {
  const [query, setQuery] = useState(initialQuery);
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const anchorRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {
        // ignore
      }
    }
  }, []);

  const saveToHistory = (term: string) => {
    const updated = [term, ...history.filter((h) => h !== term)].slice(0, 5);
    setHistory(updated);
    localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(updated));
  };

  const handleSearch = (term: string) => {
    if (term.trim()) {
      saveToHistory(term.trim());
      navigate(`/search?q=${encodeURIComponent(term.trim())}`);
    }
    setOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch(query);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  const filtered = suggestions.filter(
    (s) =>
      s.label.toLowerCase().includes(query.toLowerCase()) ||
      s.category.toLowerCase().includes(query.toLowerCase())
  );

  const showHistory = history.length > 0 && query.length === 0;
  const showSuggestions = filtered.length > 0 && query.length > 0;

  return (
    <ClickAwayListener onClickAway={() => setOpen(false)}>
      <Box sx={{ position: "relative", width: "100%", maxWidth: 640 }} ref={anchorRef}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Search portfolios, data, workflows..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={handleKeyDown}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: 3,
              bgcolor: "background.paper",
              transition: "all 0.2s ease",
              "&:hover": { boxShadow: "0 4px 12px rgba(0,0,0,0.08)" },
              "&.Mui-focused": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
            endAdornment: query && (
              <InputAdornment position="end">
                <Chip
                  label="Search"
                  size="small"
                  icon={<ArrowForward sx={{ fontSize: 14 }} />}
                  onClick={() => handleSearch(query)}
                  sx={{ cursor: "pointer" }}
                />
              </InputAdornment>
            ),
          }}
        />

        <Popper
          open={open && (showHistory || showSuggestions)}
          anchorEl={anchorRef.current}
          placement="bottom-start"
          style={{ width: anchorRef.current?.offsetWidth, zIndex: 1300 }}
        >
          <Paper sx={{ mt: 1, borderRadius: 2, overflow: "hidden", boxShadow: 4 }}>
            <List sx={{ py: 0.5 }}>
              {showHistory && (
                <>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ px: 2, py: 1, display: "block", fontWeight: 600 }}
                  >
                    Recent Searches
                  </Typography>
                  {history.map((term) => (
                    <ListItemButton
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        handleSearch(term);
                      }}
                      sx={{ py: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <History sx={{ fontSize: 18, color: "text.secondary" }} />
                      </ListItemIcon>
                      <ListItemText primary={term} primaryTypographyProps={{ fontSize: "0.875rem" }} />
                    </ListItemButton>
                  ))}
                </>
              )}

              {showSuggestions && (
                <>
                  <Typography
                    variant="caption"
                    color="text.secondary"
                    sx={{ px: 2, py: 1, display: "block", fontWeight: 600 }}
                  >
                    Suggestions
                  </Typography>
                  {filtered.slice(0, 6).map((item) => (
                    <ListItemButton
                      key={item.label}
                      onClick={() => {
                        setQuery(item.label);
                        handleSearch(item.label);
                      }}
                      sx={{ py: 1 }}
                    >
                      <ListItemIcon sx={{ minWidth: 32 }}>
                        <TrendingUp sx={{ fontSize: 18, color: "text.secondary" }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.label}
                        primaryTypographyProps={{ fontSize: "0.875rem" }}
                      />
                      <Chip
                        label={item.category}
                        size="small"
                        variant="outlined"
                        sx={{ fontSize: "0.7rem", height: 20 }}
                      />
                    </ListItemButton>
                  ))}
                </>
              )}
            </List>
          </Paper>
        </Popper>
      </Box>
    </ClickAwayListener>
  );
};

export default EnhancedSearchBar;
