import { useQuery } from "@tanstack/react-query";
import { getDocument } from "@/lib/api";
import { AppShell } from "@/components/AppShell";
import { NarrativeCellView } from "@/components/cells/NarrativeCellView";
import { ReasoningCellView } from "@/components/cells/ReasoningCellView";
import { ResultCellView } from "@/components/cells/ResultCellView";
import { ExceptionCellView } from "@/components/cells/ExceptionCellView";
import { SignoffCellView } from "@/components/cells/SignoffCellView";
import { STATUS_DOT_CLASSES } from "@/lib/cellStatus";
import { cn } from "@/lib/utils";
import type { Cell, CellStatus } from "@/types/vellum";

const DOCUMENT_ID = "doc-apac-eq-01-2026-04-24";

const ROLE_LABEL: Record<Cell["cell_role"], string> = {
  narrative: "NARRATIVE",
  reasoning: "REASONING",
  validation: "VALIDATION",
  result: "RESULT",
  exception: "EXCEPTION",
  signoff: "SIGNOFF",
};

function rowStatus(c: Cell): CellStatus {
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

export default function ProcedureViewer() {
  const { data: doc, isLoading, isError, error } = useQuery({
    queryKey: ["document", DOCUMENT_ID],
    queryFn: () => getDocument(DOCUMENT_ID),
    refetchInterval: 15000,
  });

  return (
    <AppShell document={doc}>
      {isLoading && (
        <div className="px-4 py-3 text-sm text-muted-foreground">
          Loading procedure document…
        </div>
      )}
      {isError && (
        <div className="m-4 border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
          Failed to load document: {(error as Error)?.message}
        </div>
      )}
      {doc &&
        (() => {
          const unresolvedExceptionCells = [...doc.cells]
            .sort((a, b) => a.position - b.position)
            .filter((c) => c.cell_role === "exception" && !c.resolution);
          const unresolvedExceptions = unresolvedExceptionCells.length;
          const openExceptionSubjects = unresolvedExceptionCells.map(
            (c) => c.label ?? "Exception",
          );
          const signoffBlocked = unresolvedExceptions > 0;
          const blockedReason =
            unresolvedExceptions > 0
              ? `Resolve ${unresolvedExceptions} open exception${
                  unresolvedExceptions === 1 ? "" : "s"
                } before signing off.`
              : undefined;

          const visibleCells = [...doc.cells]
            .sort((a, b) => a.position - b.position)
            .filter((c) => c.cell_role !== "validation");

          return (
            <>
              {/* Formula bar */}
              <div className="sticky top-0 z-20 flex items-center gap-3 border-b bg-card px-3 py-1.5 text-[12px]">
                <span className="font-semibold">{doc.title}</span>
                <span className="text-muted-foreground">·</span>
                <span className="font-mono text-[11px]">{doc.fund_code}</span>
                <span className="text-muted-foreground">·</span>
                <span>NAV as of {doc.as_of_date}</span>
                <span className="text-muted-foreground">·</span>
                <span className="font-semibold uppercase tracking-wide text-[10px]">
                  {doc.status.replace("_", " ")}
                </span>
              </div>

              {/* Sheet */}
              <div className="border-y border-border">
                {/* Column header row */}
                <div
                  className="sticky z-10 grid border-b bg-muted/60 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground"
                  style={{
                    top: 29 /* matches formula-bar height */,
                    gridTemplateColumns: "40px 110px 1fr",
                  }}
                >
                  <div className="border-r px-2 py-1 text-right">#</div>
                  <div className="border-r px-2 py-1">Type</div>
                  <div className="px-3 py-1">Cell</div>
                </div>

                {/* Rows */}
                {visibleCells.map((cell, i) => {
                  const status = rowStatus(cell);
                  return (
                    <div
                      key={cell.cell_id}
                      id={`cell-${cell.cell_id}`}
                      className="grid scroll-mt-16 border-b last:border-b-0"
                      style={{ gridTemplateColumns: "40px 110px 1fr" }}
                    >
                      {/* Row-number gutter */}
                      <div className="border-r bg-muted/40 px-2 py-2 text-right font-mono text-[11px] tabular-nums text-muted-foreground">
                        {String(i + 1).padStart(2, "0")}
                      </div>
                      {/* Type column */}
                      <div className="flex items-start gap-1.5 border-r bg-muted/20 px-2 py-2">
                        <span
                          className={cn(
                            "mt-1 h-1.5 w-1.5 shrink-0 rounded-full",
                            STATUS_DOT_CLASSES[status],
                          )}
                        />
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                          {ROLE_LABEL[cell.cell_role]}
                        </span>
                      </div>
                      {/* Cell column */}
                      <div className="min-h-[36px]">
                        {renderCell(cell, doc.id, {
                          signoffBlocked,
                          blockedReason,
                          openExceptions: unresolvedExceptions,
                          openExceptionSubjects,
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          );
        })()}
    </AppShell>
  );
}

interface RenderOpts {
  signoffBlocked: boolean;
  blockedReason?: string;
  openExceptions: number;
  openExceptionSubjects: string[];
}

function renderCell(cell: Cell, documentId: string, opts: RenderOpts) {
  switch (cell.cell_role) {
    case "narrative":
      return <NarrativeCellView cell={cell} />;
    case "reasoning":
      return <ReasoningCellView cell={cell} />;
    case "result":
      return <ResultCellView cell={cell} />;
    case "exception":
      return <ExceptionCellView cell={cell} documentId={documentId} />;
    case "signoff":
      return (
        <SignoffCellView
          cell={cell}
          documentId={documentId}
          blocked={opts.signoffBlocked}
          blockedReason={opts.blockedReason}
          openExceptions={opts.openExceptions}
          openExceptionSubjects={opts.openExceptionSubjects}
        />
      );
    case "validation":
      return null;
    default:
      return null;
  }
}
