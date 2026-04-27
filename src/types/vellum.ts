export type CellRole =
  | "narrative"
  | "reasoning"
  | "validation"
  | "result"
  | "exception"
  | "signoff";

export type CellStatus =
  | "pass"
  | "warn"
  | "breach"
  | "fail"
  | "running"
  | "pending";

export interface BaseCell {
  cell_id: string;
  position: number;
  cell_role: CellRole;
  label?: string;
}

export interface NarrativeCell extends BaseCell {
  cell_role: "narrative";
  body: string;
}

export interface ReasoningCell extends BaseCell {
  cell_role: "reasoning";
  body: string;
  collapsed_by_default?: boolean;
}

export interface ValidationCell extends BaseCell {
  cell_role: "validation";
  rule_id: string;
  status: CellStatus;
}

export interface ResultMetric {
  label: string;
  value: string;
}

export interface ResultCell extends BaseCell {
  cell_role: "result";
  status: CellStatus;
  summary: string;
  metrics?: ResultMetric[];
}

export interface RemediationOption {
  id: string;
  label: string;
  description: string;
}

export interface ExceptionResolution {
  option_id: string;
  rationale: string;
  decided_by: string;
  decided_at: string;
}

export interface ExceptionCell extends BaseCell {
  cell_role: "exception";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  remediation_options: RemediationOption[];
  linked_result_cell_id?: string;
  resolution?: ExceptionResolution;
}

export interface SignoffCell extends BaseCell {
  cell_role: "signoff";
  required_role: string;
  signed_by?: string;
  signed_at?: string;
}

export type Cell =
  | NarrativeCell
  | ReasoningCell
  | ValidationCell
  | ResultCell
  | ExceptionCell
  | SignoffCell;

export type DocumentStatus =
  | "draft"
  | "running"
  | "awaiting_review"
  | "signed"
  | "rejected";

export interface ProcedureDocument {
  id: string;
  title: string;
  fund_code: string;
  as_of_date: string;
  status: DocumentStatus;
  cells: Cell[];
}

export interface ExceptionDecisionRequest {
  option_id: string;
  rationale: string;
}

export interface ExceptionDecisionResponse {
  cell_id: string;
  resolution: ExceptionResolution;
}
