import { Box, Typography } from "@mui/material";
import type { NarrativeCell } from "@/types/vellum";

export function NarrativeCellView({ cell }: { cell: NarrativeCell }) {
  return (
    <Box sx={{ px: 1.5, py: 1 }}>
      {cell.label && (
        <Typography
          sx={{
            mb: 0.5,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "text.secondary",
          }}
        >
          {cell.label}
        </Typography>
      )}
      <Typography
        sx={{ whiteSpace: "pre-wrap", color: "text.primary", opacity: 0.9, fontSize: 13, lineHeight: 1.4 }}
      >
        {cell.body}
      </Typography>
    </Box>
  );
}
