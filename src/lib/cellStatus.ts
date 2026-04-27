import type { CellStatus } from "@/types/vellum";

export const STATUS_CARD_CLASSES: Record<CellStatus, string> = {
  pass: "bg-green-50 text-green-800 border-green-200",
  warn: "bg-amber-50 text-amber-800 border-amber-200",
  breach: "bg-red-50 text-red-800 border-red-200",
  fail: "bg-red-50 text-red-800 border-red-200",
  running: "bg-blue-50 text-blue-800 border-blue-200",
  pending: "bg-gray-100 text-gray-600 border-gray-200",
};

export const STATUS_DOT_CLASSES: Record<CellStatus, string> = {
  pass: "bg-green-500",
  warn: "bg-amber-500",
  breach: "bg-red-500",
  fail: "bg-red-500",
  running: "bg-blue-500",
  pending: "bg-gray-400",
};

export const STATUS_LABEL: Record<CellStatus, string> = {
  pass: "PASS",
  warn: "WARN",
  breach: "BREACH",
  fail: "FAIL",
  running: "RUNNING",
  pending: "PENDING",
};
