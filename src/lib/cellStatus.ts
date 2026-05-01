import type { CellStatus } from "@/types/vellum";

export const STATUS_DOT_COLOR: Record<CellStatus, string> = {
  pass:    "#22c55e",
  warn:    "#f59e0b",
  breach:  "#ef4444",
  fail:    "#ef4444",
  running: "#3b82f6",
  pending: "#9ca3af",
};

export const STATUS_CARD_SX: Record<
  CellStatus,
  { bgcolor: string; color: string; borderColor: string }
> = {
  pass:    { bgcolor: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" },
  warn:    { bgcolor: "#fffbeb", color: "#92400e", borderColor: "#fde68a" },
  breach:  { bgcolor: "#fef2f2", color: "#991b1b", borderColor: "#fecaca" },
  fail:    { bgcolor: "#fef2f2", color: "#991b1b", borderColor: "#fecaca" },
  running: { bgcolor: "#eff6ff", color: "#1e40af", borderColor: "#bfdbfe" },
  pending: { bgcolor: "#f3f4f6", color: "#4b5563", borderColor: "#e5e7eb" },
};

export const STATUS_LABEL: Record<CellStatus, string> = {
  pass:    "PASS",
  warn:    "WARN",
  breach:  "BREACH",
  fail:    "FAIL",
  running: "RUNNING",
  pending: "PENDING",
};
