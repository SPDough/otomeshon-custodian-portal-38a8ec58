import { mockDocument } from "./mockData";
import type {
  ExceptionCell,
  ExceptionDecisionRequest,
  ExceptionDecisionResponse,
  ProcedureDocument,
  SignoffCell,
  SignoffRequest,
  SignoffResponse,
} from "@/types/vellum";

// In-memory mutable copy so the mock mutation is reflected on refetch.
let documentStore: ProcedureDocument = structuredClone(mockDocument);

const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));
const jitter = () => 300 + Math.floor(Math.random() * 300);

export async function getDocument(id: string): Promise<ProcedureDocument> {
  await delay(jitter());
  if (id !== documentStore.id) {
    throw new Error(`Document not found: ${id}`);
  }
  return structuredClone(documentStore);
}

export async function decideException(
  cellId: string,
  payload: ExceptionDecisionRequest,
): Promise<ExceptionDecisionResponse> {
  await delay(jitter());
  const cell = documentStore.cells.find((c) => c.cell_id === cellId);
  if (!cell || cell.cell_role !== "exception") {
    throw new Error(`Exception cell not found: ${cellId}`);
  }
  const exceptionCell = cell as ExceptionCell;
  const option = exceptionCell.remediation_options.find(
    (o) => o.id === payload.option_id,
  );
  if (!option) throw new Error(`Unknown remediation option: ${payload.option_id}`);

  exceptionCell.resolution = {
    option_id: payload.option_id,
    rationale: payload.rationale,
    decided_by: "current.user@vellum.ops",
    decided_at: new Date().toISOString(),
  };

  return {
    cell_id: cellId,
    resolution: exceptionCell.resolution,
  };
}

// Test helper — not used by the app, useful in dev console.
export function __resetMock() {
  documentStore = structuredClone(mockDocument);
}
