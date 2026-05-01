import { useState } from "react";
import { Box, Collapse, Typography } from "@mui/material";
import { ChevronRight, ExpandMore } from "@mui/icons-material";
import type { ReasoningCell } from "@/types/vellum";

export function ReasoningCellView({ cell }: { cell: ReasoningCell }) {
  const [open, setOpen] = useState(!cell.collapsed_by_default);

  return (
    <Box sx={{ bgcolor: "action.hover", px: 1.5, py: 1 }}>
      <Box
        component="button"
        type="button"
        onClick={() => setOpen((v) => !v)}
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 0.75,
          background: "none",
          border: "none",
          cursor: "pointer",
          p: 0,
          color: "inherit",
        }}
      >
        {open
          ? <ExpandMore sx={{ fontSize: 14, color: "text.secondary" }} />
          : <ChevronRight sx={{ fontSize: 14, color: "text.secondary" }} />
        }
        <Typography
          sx={{
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "text.secondary",
          }}
        >
          {cell.label ?? "Agent reasoning"}
        </Typography>
      </Box>
      <Collapse in={open}>
        <Typography
          component="pre"
          sx={{
            mt: 0.5,
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            fontSize: 12,
            lineHeight: 1.4,
            color: "text.secondary",
            m: 0,
          }}
        >
          {cell.body}
        </Typography>
      </Collapse>
    </Box>
  );
}
