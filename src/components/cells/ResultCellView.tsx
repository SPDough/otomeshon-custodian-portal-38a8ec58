import { Box, Typography } from "@mui/material";
import { STATUS_CARD_SX, STATUS_LABEL } from "@/lib/cellStatus";
import type { ResultCell } from "@/types/vellum";

export function ResultCellView({ cell }: { cell: ResultCell }) {
  const { bgcolor, color, borderColor } = STATUS_CARD_SX[cell.status];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor, color }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 1.5,
          borderBottom: "1px solid",
          borderColor,
          px: 1.5,
          py: 0.75,
        }}
      >
        <Typography sx={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
          {cell.label ?? "Result"}
        </Typography>
        <Box
          component="span"
          sx={{
            display: "inline-flex",
            alignItems: "center",
            borderRadius: "2px",
            border: "1px solid",
            borderColor,
            bgcolor: "rgba(255,255,255,0.4)",
            px: 0.75,
            py: 0.25,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            color,
          }}
        >
          {STATUS_LABEL[cell.status]}
        </Box>
      </Box>

      <Box sx={{ px: 1.5, py: 1 }}>
        <Typography sx={{ fontSize: 13, fontWeight: 500, lineHeight: 1.4, mb: cell.metrics?.length ? 1 : 0 }}>
          {cell.summary}
        </Typography>
        {cell.metrics && cell.metrics.length > 0 && (
          <Box
            component="dl"
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              columnGap: 2,
              rowGap: 0.5,
              m: 0,
              "@media (min-width:600px)": { gridTemplateColumns: "repeat(4, 1fr)" },
            }}
          >
            {cell.metrics.map((m) => (
              <Box key={m.label}>
                <Typography component="dt" sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7 }}>
                  {m.label}
                </Typography>
                <Typography component="dd" sx={{ fontSize: 13, fontWeight: 600, fontVariantNumeric: "tabular-nums", lineHeight: 1.3, m: 0 }}>
                  {m.value}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
}
