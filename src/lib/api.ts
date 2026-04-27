import type {
  ExceptionCell,
  ExceptionDecisionRequest,
  ExceptionDecisionResponse,
  ProcedureDocument,
  SignoffCell,
  SignoffRequest,
  SignoffResponse,
} from "@/types/vellum";
import { mockDocument } from "./mockData";

const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
const API_BASE = (import.meta.env.VITE_API_URL ?? "http://localhost:8000") as string;

// ---------------------------------------------------------------------------
// Live HTTP helpers
// ---------------------------------------------------------------------------

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json", ...init?.headers },
    ...init,
  });
  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText);
    throw new Error(text || `HTTP ${res.status}`);
  }
  return res.json() as Promise<T>;
}

function sanitizeError(err: unknown, fallback: string): Error {
  console.error("[vellum api]", err);
  return new Error(fallback);
}

// ---------------------------------------------------------------------------
// Mock store (active when VITE_USE_MOCK=true)
// ---------------------------------------------------------------------------

let _mockStore: ProcedureDocument = structuredClone(mockDocument);

const delay = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
const jitter = () => 300 + Math.floor(Math.random() * 300);

function mockGetSessionIdentity(): { user: string; role: string } {
  return { user: "current.user@vellum.ops", role: "Fund Controller" };
}

async function mockGetDocument(id: string): Promise<ProcedureDocument> {
  await delay(jitter());
  if (id !== _mockStore.id) throw new Error("Document not found");
  return structuredClone(_mockStore);
}

async function mockDecideException(
  cellId: string,
  payload: ExceptionDecisionRequest,
): Promise<ExceptionDecisionResponse> {
  await delay(jitter());
  const cell = _mockStore.cells.find((c) => c.cell_id === cellId);
  if (!cell || cell.cell_role !== "exception") throw new Error("Exception cell not found");
  const exceptionCell = cell as ExceptionCell;
  const option = exceptionCell.remediation_options.find((o) => o.id === payload.option_id);
  if (!option) throw new Error("Unknown remediation option");
  const session = mockGetSessionIdentity();
  exceptionCell.resolution = {
    option_id: payload.option_id,
    rationale: payload.rationale,
    decided_by: session.user,
    decided_at: new Date().toISOString(),
  };
  return { cell_id: cellId, resolution: exceptionCell.resolution };
}

async function mockSignOffCell(
  cellId: string,
  _payload: SignoffRequest,
): Promise<SignoffResponse> {
  await delay(jitter());
  const cell = _mockStore.cells.find((c) => c.cell_id === cellId);
  if (!cell || cell.cell_role !== "signoff") throw new Error("Signoff cell not found");
  const signoffCell = cell as SignoffCell;
  const session = mockGetSessionIdentity();
  if (signoffCell.required_role && session.role !== signoffCell.required_role) {
    throw new Error(`You do not have permission to sign off as ${signoffCell.required_role}.`);
  }
  const unresolved = _mockStore.cells.find(
    (c) => c.cell_role === "exception" && !(c as ExceptionCell).resolution,
  );
  if (unresolved) throw new Error("Cannot sign off while exceptions remain unresolved.");
  const signed_at = new Date().toISOString();
  signoffCell.signed_by = session.user;
  signoffCell.signed_at = signed_at;
  _mockStore.status = "signed";
  return { cell_id: cellId, signed_by: session.user, signed_at };
}

// ---------------------------------------------------------------------------
// Public API — signatures unchanged for getDocument; documentId added to
// decideException and signOffCell to match the REST URL structure.
// ---------------------------------------------------------------------------

export async function getDocument(id: string): Promise<ProcedureDocument> {
  if (USE_MOCK) {
    return mockGetDocument(id).catch((err) => {
      throw sanitizeError(err, "Unable to load procedure document.");
    });
  }
  try {
    return await apiFetch<ProcedureDocument>(`/api/v1/procedure-documents/${id}`);
  } catch (err) {
    throw sanitizeError(err, "Unable to load procedure document.");
  }
}

export async function decideException(
  documentId: string,
  cellId: string,
  payload: ExceptionDecisionRequest,
): Promise<ExceptionDecisionResponse> {
  if (USE_MOCK) {
    return mockDecideException(cellId, payload).catch((err) => {
      throw sanitizeError(err, "Unable to record decision. Please try again.");
    });
  }
  try {
    return await apiFetch<ExceptionDecisionResponse>(
      `/api/v1/procedure-documents/${documentId}/cells/${cellId}/exception-decision`,
      { method: "POST", body: JSON.stringify(payload) },
    );
  } catch (err) {
    throw sanitizeError(err, "Unable to record decision. Please try again.");
  }
}

export async function signOffCell(
  documentId: string,
  cellId: string,
  payload: SignoffRequest,
): Promise<SignoffResponse> {
  if (USE_MOCK) {
    return mockSignOffCell(cellId, payload).catch((err) => {
      if (err instanceof Error && (err.message.startsWith("You ") || err.message.startsWith("Cannot ")))
        throw err;
      throw sanitizeError(err, "Unable to record signoff. Please try again.");
    });
  }
  try {
    return await apiFetch<SignoffResponse>(
      `/api/v1/procedure-documents/${documentId}/cells/${cellId}/signoff`,
      { method: "POST", body: JSON.stringify(payload) },
    );
  } catch (err) {
    const msg = err instanceof Error ? err.message : "";
    if (msg.includes("unresolved") || msg.includes("permission")) throw new Error(msg);
    throw sanitizeError(err, "Unable to record signoff. Please try again.");
  }
}

export function __resetMock() {
  _mockStore = structuredClone(mockDocument);
}
