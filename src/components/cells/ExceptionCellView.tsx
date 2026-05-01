import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Box,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { CheckCircleOutline, WarningAmber } from "@mui/icons-material";
import { decideException } from "@/lib/api";
import type { ExceptionCell } from "@/types/vellum";

interface Props {
  cell: ExceptionCell;
  documentId: string;
}

const SEVERITY_LABEL: Record<ExceptionCell["severity"], string> = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
  critical: "CRITICAL",
};

const GREEN = { bgcolor: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" };
const RED   = { bgcolor: "#fef2f2", color: "#991b1b", borderColor: "#fecaca" };

export function ExceptionCellView({ cell, documentId }: Props) {
  const queryClient = useQueryClient();
  const [optionId, setOptionId] = useState("");
  const [rationale, setRationale] = useState("");

  const mutation = useMutation({
    mutationFn: () => decideException(documentId, cell.cell_id, { option_id: optionId, rationale: rationale.trim() }),
    onSuccess: () => {
      toast.success("Exception decision recorded");
      queryClient.invalidateQueries({ queryKey: ["document", documentId] });
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to record decision"),
  });

  if (cell.resolution) {
    const chosen = cell.remediation_options.find((o) => o.id === cell.resolution!.option_id);
    return (
      <Box sx={{ display: "flex", flexDirection: "column", ...GREEN }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, borderBottom: "1px solid", borderColor: GREEN.borderColor, px: 1.5, py: 0.75 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
            <CheckCircleOutline sx={{ fontSize: 14 }} />
            <Typography sx={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {cell.label ?? "Exception"} — Resolved
            </Typography>
          </Box>
          <StatusBadge label="RESOLVED" borderColor={GREEN.borderColor} color={GREEN.color} />
        </Box>
        <Box sx={{ px: 1.5, py: 1, display: "flex", flexDirection: "column", gap: 1, fontSize: 13, lineHeight: 1.4 }}>
          <FieldRow label="Decision" value={chosen?.label ?? cell.resolution.option_id} />
          <FieldRow label="Rationale" value={cell.resolution.rationale} />
          <Typography sx={{ fontSize: 11, opacity: 0.8 }}>
            By {cell.resolution.decided_by} · {new Date(cell.resolution.decided_at).toLocaleString()}
          </Typography>
        </Box>
      </Box>
    );
  }

  const canSubmit = optionId !== "" && rationale.trim().length > 0 && !mutation.isPending;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", ...RED }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, borderBottom: "1px solid", borderColor: RED.borderColor, px: 1.5, py: 0.75 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          <WarningAmber sx={{ fontSize: 14 }} />
          <Typography sx={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {cell.label ?? "Exception"} — Action required
          </Typography>
        </Box>
        <StatusBadge label={SEVERITY_LABEL[cell.severity]} borderColor={RED.borderColor} color={RED.color} />
      </Box>

      <Box sx={{ px: 1.5, py: 1, display: "flex", flexDirection: "column", gap: 1.5 }}>
        <Typography sx={{ fontSize: 13, lineHeight: 1.4 }}>{cell.description}</Typography>

        <Box>
          <Typography sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.7, mb: 0.75 }}>
            Choose remediation
          </Typography>
          <RadioGroup value={optionId} onChange={(e) => setOptionId(e.target.value)} sx={{ gap: 0.5 }}>
            {cell.remediation_options.map((opt) => (
              <Box
                key={opt.id}
                onClick={() => setOptionId(opt.id)}
                sx={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 1,
                  border: "1px solid",
                  borderColor: optionId === opt.id ? "#f87171" : RED.borderColor,
                  bgcolor: optionId === opt.id ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.6)",
                  px: 1,
                  py: 0.75,
                  cursor: "pointer",
                  boxShadow: optionId === opt.id ? "0 0 0 1px #fca5a5" : "none",
                  transition: "all 0.1s",
                  "&:hover": { bgcolor: "rgba(255,255,255,0.9)" },
                }}
              >
                <Radio
                  value={opt.id}
                  size="small"
                  sx={{ p: 0, mt: 0.25, color: "#dc2626", "&.Mui-checked": { color: "#dc2626" } }}
                />
                <Box>
                  <Typography sx={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, color: RED.color }}>
                    {opt.label}
                  </Typography>
                  <Typography sx={{ fontSize: 11, lineHeight: 1.4, opacity: 0.8, color: RED.color }}>
                    {opt.description}
                  </Typography>
                </Box>
              </Box>
            ))}
          </RadioGroup>
        </Box>

        <Box>
          <Typography
            component="label"
            htmlFor={`rationale-${cell.cell_id}`}
            sx={{ display: "block", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.06em", opacity: 0.7, mb: 0.75, color: RED.color }}
          >
            Rationale (required)
          </Typography>
          <TextField
            id={`rationale-${cell.cell_id}`}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Explain the basis for this decision. This will be attached to the audit record."
            multiline
            rows={3}
            fullWidth
            size="small"
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 0,
                bgcolor: "rgba(255,255,255,0.8)",
                fontSize: 13,
                "& fieldset": { borderColor: RED.borderColor },
                "&:hover fieldset": { borderColor: "#f87171" },
                "&.Mui-focused fieldset": { borderColor: "#dc2626" },
              },
            }}
          />
        </Box>

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            type="button"
            size="small"
            variant="contained"
            disabled={!canSubmit}
            onClick={() => mutation.mutate()}
            sx={{ borderRadius: 0, bgcolor: "#dc2626", "&:hover": { bgcolor: "#b91c1c" }, height: 32, fontSize: 13 }}
          >
            {mutation.isPending ? "Recording…" : "Confirm decision"}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

function StatusBadge({ label, borderColor, color }: { label: string; borderColor: string; color: string }) {
  return (
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
      {label}
    </Box>
  );
}

function FieldRow({ label, value }: { label: string; value: string }) {
  return (
    <Box>
      <Typography sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7 }}>
        {label}
      </Typography>
      <Typography sx={{ fontSize: 13, fontWeight: 600, whiteSpace: "pre-wrap" }}>{value}</Typography>
    </Box>
  );
}
