import { useQuery } from "@tanstack/react-query";
import { getDocument } from "@/lib/api";
import { AppShell } from "@/components/AppShell";
import { NarrativeCellView } from "@/components/cells/NarrativeCellView";
import { ReasoningCellView } from "@/components/cells/ReasoningCellView";
import { ResultCellView } from "@/components/cells/ResultCellView";
import { ExceptionCellView } from "@/components/cells/ExceptionCellView";
import { SignoffCellView } from "@/components/cells/SignoffCellView";
import type { Cell } from "@/types/vellum";

const DOCUMENT_ID = "doc-apac-eq-01-2026-04-24";

export default function ProcedureViewer() {
  const { data: doc, isLoading, isError, error } = useQuery({
    queryKey: ["document", DOCUMENT_ID],
    queryFn: () => getDocument(DOCUMENT_ID),
    refetchInterval: 15000,
  });

  return (
    <AppShell document={doc}>
      {isLoading && (
        <div className="text-sm text-muted-foreground">Loading procedure document…</div>
      )}
      {isError && (
        <div className="rounded border bg-red-50 text-red-800 border-red-200 p-4 text-sm">
          Failed to load document: {(error as Error)?.message}
        </div>
      )}
      {doc && (
        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">{doc.title}</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Fund <span className="font-mono">{doc.fund_code}</span> · NAV as of{" "}
              {doc.as_of_date} · Status:{" "}
              <span className="font-semibold">{doc.status.replace("_", " ")}</span>
            </p>
          </div>
          <div className="space-y-4">
            {(() => {
              const unresolvedExceptions = doc.cells.filter(
                (c) => c.cell_role === "exception" && !c.resolution,
              ).length;
              const signoffBlocked = unresolvedExceptions > 0;
              const blockedReason =
                unresolvedExceptions > 0
                  ? `Resolve ${unresolvedExceptions} open exception${unresolvedExceptions === 1 ? "" : "s"} before signing off.`
                  : undefined;

              return [...doc.cells]
                .sort((a, b) => a.position - b.position)
                .filter((c) => c.cell_role !== "validation")
                .map((cell) => (
                  <div
                    key={cell.cell_id}
                    id={`cell-${cell.cell_id}`}
                    className="scroll-mt-6"
                  >
                    {renderCell(cell, doc.id, { signoffBlocked, blockedReason })}
                  </div>
                ));
            })()}
          </div>
        </div>
      )}
    </AppShell>
  );
}

interface RenderOpts {
  signoffBlocked: boolean;
  blockedReason?: string;
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
        />
      );
    case "validation":
      return null;
    default:
      return null;
  }
}
