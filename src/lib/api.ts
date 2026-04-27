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

/**
 * Mock authenticated session.
 *
 * In production this will be replaced by the FastAPI backend deriving the
 * caller identity and role from the verified JWT. The frontend MUST NOT
 * supply identity claims; any client-provided `signed_by` / `decided_by`
 * value is ignored here as well to mirror that contract.
 */
function getSessionIdentity(): { user: string; role: string } {
  return { user: "current.user@vellum.ops", role: "Fund Controller" };
}

/**
 * Wrap raw errors so internal identifiers (cell IDs, option IDs, document IDs)
 * never reach the UI. Full details are still logged for developers.
 */
function sanitizeError(err: unknown, fallback: string): Error {
  console.error("[vellum api]", err);
  return new Error(fallback);
}

export async function getDocument(id: string): Promise<ProcedureDocument> {
  await delay(jitter());
  try {
    if (id !== documentStore.id) {
      throw new Error(`Document not found: ${id}`);
    }
    return structuredClone(documentStore);
  } catch (err) {
    throw sanitizeError(err, "Unable to load procedure document.");
  }
}

export async function decideException(
  cellId: string,
  payload: ExceptionDecisionRequest,
): Promise<ExceptionDecisionResponse> {
  await delay(jitter());
  try {
    const cell = documentStore.cells.find((c) => c.cell_id === cellId);
    if (!cell || cell.cell_role !== "exception") {
      throw new Error(`Exception cell not found: ${cellId}`);
    }
    const exceptionCell = cell as ExceptionCell;
    const option = exceptionCell.remediation_options.find(
      (o) => o.id === payload.option_id,
    );
    if (!option)
      throw new Error(`Unknown remediation option: ${payload.option_id}`);

    const session = getSessionIdentity();

    exceptionCell.resolution = {
      option_id: payload.option_id,
      rationale: payload.rationale,
      // Identity is derived from the session, never from client input.
      decided_by: session.user,
      decided_at: new Date().toISOString(),
    };

    return {
      cell_id: cellId,
      resolution: exceptionCell.resolution,
    };
  } catch (err) {
    throw sanitizeError(err, "Unable to record decision. Please try again.");
  }
}

export async function signOffCell(
  cellId: string,
  _payload: SignoffRequest,
): Promise<SignoffResponse> {
  await delay(jitter());
  try {
    const cell = documentStore.cells.find((c) => c.cell_id === cellId);
    if (!cell || cell.cell_role !== "signoff") {
      throw new Error(`Signoff cell not found: ${cellId}`);
    }

    const signoffCell = cell as SignoffCell;
    const session = getSessionIdentity();

    // Enforce the required-role check at the API boundary, not just in the UI.
    if (
      signoffCell.required_role &&
      session.role !== signoffCell.required_role
    ) {
      throw sanitizeError(
        new Error(
          `Role ${session.role} cannot sign as ${signoffCell.required_role}`,
        ),
        `You do not have permission to sign off as ${signoffCell.required_role}.`,
      );
    }

    // Block signoff if any exception is unresolved.
    const unresolved = documentStore.cells.find(
      (c) => c.cell_role === "exception" && !(c as ExceptionCell).resolution,
    );
    if (unresolved) {
      throw sanitizeError(
        new Error("Unresolved exceptions present"),
        "Cannot sign off while exceptions remain unresolved.",
      );
    }

    const signed_at = new Date().toISOString();
    // Identity is derived from the session, never from client input.
    signoffCell.signed_by = session.user;
    signoffCell.signed_at = signed_at;
    documentStore.status = "signed";

    return { cell_id: cellId, signed_by: session.user, signed_at };
  } catch (err) {
    if (err instanceof Error && err.message.startsWith("You ")) throw err;
    if (err instanceof Error && err.message.startsWith("Cannot ")) throw err;
    throw sanitizeError(err, "Unable to record signoff. Please try again.");
  }
}

// Test helper — not used by the app, useful in dev console.
export function __resetMock() {
  documentStore = structuredClone(mockDocument);
}
