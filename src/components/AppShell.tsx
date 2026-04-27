import { ReactNode } from "react";
import { Boxes } from "lucide-react";
import type { Cell, CellStatus, ProcedureDocument } from "@/types/vellum";
import { cn } from "@/lib/utils";
import { STATUS_DOT_CLASSES } from "@/lib/cellStatus";

interface Props {
  document?: ProcedureDocument;
  children: ReactNode;
}

interface SidebarStep {
  cell_id: string;
  label: string;
  status: CellStatus;
}

function deriveSteps(doc?: ProcedureDocument): SidebarStep[] {
  if (!doc) return [];
  return doc.cells
    .filter((c) => c.cell_role !== "validation")
    .map((c) => ({
      cell_id: c.cell_id,
      label: c.label ?? defaultLabel(c),
      status: deriveStatus(c),
    }));
}

function defaultLabel(c: Cell): string {
  switch (c.cell_role) {
    case "narrative":
      return "Notes";
    case "reasoning":
      return "Reasoning";
    case "result":
      return "Result";
    case "exception":
      return "Exception";
    case "signoff":
      return "Signoff";
    default:
      return "Step";
  }
}

function deriveStatus(c: Cell): CellStatus {
  switch (c.cell_role) {
    case "result":
      return c.status;
    case "exception":
      return c.resolution ? "pass" : "breach";
    case "signoff":
      return c.signed_by ? "pass" : "pending";
    default:
      return "pending";
  }
}

export function AppShell({ document: doc, children }: Props) {
  const steps = deriveSteps(doc);

  const handleJump = (cellId: string) => {
    const el = window.document.getElementById(`cell-${cellId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div
      className="grid h-screen w-full bg-background text-foreground"
      style={{ gridTemplateColumns: "220px 1fr", gridTemplateRows: "52px 1fr" }}
    >
      {/* Topbar */}
      <header
        className="col-span-2 flex items-center justify-between border-b bg-card px-4"
        style={{ height: 52 }}
      >
        <div className="flex items-center gap-2">
          <Boxes className="h-5 w-5 text-accent" />
          <span className="text-sm font-bold tracking-tight">Vellum</span>
          <span className="ml-2 text-xs text-muted-foreground">Operations workstation</span>
        </div>
        {doc && (
          <div className="flex items-center gap-3 text-xs">
            <span className="font-semibold">{doc.title}</span>
            <span className="text-muted-foreground">·</span>
            <span className="rounded bg-muted px-2 py-0.5 font-mono text-[11px]">
              {doc.fund_code}
            </span>
            <span className="text-muted-foreground">{doc.as_of_date}</span>
          </div>
        )}
      </header>

      {/* Sidebar */}
      <aside
        className="row-start-2 border-r bg-card overflow-y-auto"
        style={{ width: 220 }}
      >
        <div className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground border-b">
          Steps
        </div>
        <nav className="px-1 py-1">
          {steps.map((s, i) => (
            <button
              key={s.cell_id}
              type="button"
              onClick={() => handleJump(s.cell_id)}
              className="flex w-full items-center gap-2 rounded-sm px-2 py-1 text-left text-[13px] hover:bg-muted transition-colors"
            >
              <span
                className={cn(
                  "h-2 w-2 shrink-0 rounded-full",
                  STATUS_DOT_CLASSES[s.status],
                )}
              />
              <span className="text-[11px] text-muted-foreground tabular-nums w-5">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="truncate">{s.label}</span>
            </button>
          ))}
          {steps.length === 0 && (
            <div className="px-2 py-3 text-xs text-muted-foreground">No steps yet.</div>
          )}
        </nav>
      </aside>

      {/* Main */}
      <main className="row-start-2 col-start-2 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}
