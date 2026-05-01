import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Box, Typography, Alert } from "@mui/material";
import { getDocument } from "@/lib/api";
import { AppShell } from "@/components/AppShell";
import { NarrativeCellView } from "@/components/cells/NarrativeCellView";
import { ReasoningCellView } from "@/components/cells/ReasoningCellView";
import { ResultCellView } from "@/components/cells/ResultCellView";
import { ExceptionCellView } from "@/components/cells/ExceptionCellView";
import { SignoffCellView } from "@/components/cells/SignoffCellView";
import { STATUS_DOT_COLOR } from "@/lib/cellStatus";
import type { Cell, CellStatus } from "@/types/vellum";

const DOCUMENT_ID = "doc-apac-eq-01-2026-04-24";

const ROLE_LABEL: Record<Cell["cell_role"], string> = {
  narrative:  "NARRATIVE",
  reasoning:  "REASONING",
  validation: "VALIDATION",
  result:     "RESULT",
  exception:  "EXCEPTION",
  signoff:    "SIGNOFF",
};

function rowStatus(c: Cell): CellStatus {
  switch (c.cell_role) {
    case "result":    return c.status;
    case "exception": return c.resolution ? "pass" : "breach";
    case "signoff":   return c.signed_by ? "pass" : "pending";
    default:          return "pending";
  }
}

export default function ProcedureViewer() {
  const { data: doc, isLoading, isError, error } = useQuery({
    queryKey: ["document", DOCUMENT_ID],
    queryFn: () => getDocument(DOCUMENT_ID),
    refetchInterval: 15000,
  });

  const [activeCellId, setActiveCellId] = useState<string | null>(null);
  const visibilityRef = useRef<Map<string, number>>(new Map());

  useEffect(() => {
    if (!doc) return;
    visibilityRef.current = new Map();
    const rows = Array.from(
      window.document.querySelectorAll<HTMLElement>("[data-cell-row='true']"),
    );
    if (rows.length === 0) return;

    const pick = () => {
      let bestId: string | null = null;
      let bestRatio = 0;
      for (const [id, ratio] of visibilityRef.current.entries()) {
        if (ratio > bestRatio) { bestRatio = ratio; bestId = id; }
      }
      if (bestId && bestRatio > 0) setActiveCellId(bestId);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const id = (entry.target as HTMLElement).dataset.cellId;
          if (!id) continue;
          visibilityRef.current.set(id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        pick();
      },
      {
        // Account for sticky formula bar (~29px) + column header (~22px).
        rootMargin: "-56px 0px -40% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    rows.forEach((r) => observer.observe(r));
    setActiveCellId((cur) => cur ?? rows[0]?.dataset.cellId ?? null);
    return () => observer.disconnect();
  }, [doc]);

  return (
    <AppShell document={doc} activeCellId={activeCellId}>
      {isLoading && (
        <Typography sx={{ px: 2, py: 1.5, fontSize: 14, color: "text.secondary" }}>
          Loading procedure document…
        </Typography>
      )}
      {isError && (() => {
        if (error) console.error("Failed to load procedure document", error);
        return (
          <Alert severity="error" sx={{ m: 2, borderRadius: 0 }}>
            Failed to load document. Please try again.
          </Alert>
        );
      })()}
      {doc && (() => {
        const unresolvedExceptionCells = [...doc.cells]
          .sort((a, b) => a.position - b.position)
          .filter((c) => c.cell_role === "exception" && !c.resolution);
        const unresolvedExceptions = unresolvedExceptionCells.length;
        const openExceptionSubjects = unresolvedExceptionCells.map((c) => c.label ?? "Exception");
        const signoffBlocked = unresolvedExceptions > 0;
        const blockedReason = unresolvedExceptions > 0
          ? `Resolve ${unresolvedExceptions} open exception${unresolvedExceptions === 1 ? "" : "s"} before signing off.`
          : undefined;

        const visibleCells = [...doc.cells]
          .sort((a, b) => a.position - b.position)
          .filter((c) => c.cell_role !== "validation");

        return (
          <>
            {/* Formula bar */}
            <Box
              sx={{
                position: "sticky",
                top: 0,
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                borderBottom: "1px solid",
                borderColor: "divider",
                bgcolor: "background.paper",
                px: 1.5,
                py: 0.75,
                fontSize: 12,
              }}
            >
              <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{doc.title}</Typography>
              <Typography sx={{ color: "text.secondary" }}>·</Typography>
              <Typography sx={{ fontFamily: "monospace", fontSize: 11 }}>{doc.fund_code}</Typography>
              <Typography sx={{ color: "text.secondary" }}>·</Typography>
              <Typography sx={{ fontSize: 12 }}>NAV as of {doc.as_of_date}</Typography>
              <Typography sx={{ color: "text.secondary" }}>·</Typography>
              <Typography sx={{ fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                {doc.status.replace("_", " ")}
              </Typography>
            </Box>

            {/* Sheet */}
            <Box sx={{ borderTop: "1px solid", borderBottom: "1px solid", borderColor: "divider" }}>
              {/* Column header row */}
              <Box
                sx={{
                  position: "sticky",
                  top: 29,
                  zIndex: 10,
                  display: "grid",
                  gridTemplateColumns: "40px 110px 1fr",
                  borderBottom: "1px solid",
                  borderColor: "divider",
                  bgcolor: "action.selected",
                  fontSize: 10,
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  color: "text.secondary",
                }}
              >
                <Box sx={{ borderRight: "1px solid", borderColor: "divider", px: 1, py: 0.5, textAlign: "right" }}>#</Box>
                <Box sx={{ borderRight: "1px solid", borderColor: "divider", px: 1, py: 0.5 }}>Type</Box>
                <Box sx={{ px: 1.5, py: 0.5 }}>Cell</Box>
              </Box>

              {/* Rows */}
              {visibleCells.map((cell, i) => {
                const status = rowStatus(cell);
                return (
                  <Box
                    key={cell.cell_id}
                    id={`cell-${cell.cell_id}`}
                    data-cell-row="true"
                    data-cell-id={cell.cell_id}
                    sx={{
                      display: "grid",
                      gridTemplateColumns: "40px 110px 1fr",
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      scrollMarginTop: 64,
                      "&:last-child": { borderBottom: "none" },
                    }}
                  >
                    {/* Row-number gutter */}
                    <Box
                      sx={{
                        borderRight: "1px solid",
                        borderColor: "divider",
                        bgcolor: "action.hover",
                        px: 1,
                        py: 1,
                        textAlign: "right",
                        fontFamily: "monospace",
                        fontSize: 11,
                        fontVariantNumeric: "tabular-nums",
                        color: "text.secondary",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </Box>
                    {/* Type column */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 0.75,
                        borderRight: "1px solid",
                        borderColor: "divider",
                        bgcolor: "action.hover",
                        px: 1,
                        py: 1,
                        opacity: 0.8,
                      }}
                    >
                      <Box
                        component="span"
                        sx={{
                          mt: "3px",
                          width: 6,
                          height: 6,
                          flexShrink: 0,
                          borderRadius: "50%",
                          bgcolor: STATUS_DOT_COLOR[status],
                        }}
                      />
                      <Typography
                        sx={{
                          fontSize: 10,
                          fontWeight: 600,
                          textTransform: "uppercase",
                          letterSpacing: "0.06em",
                          color: "text.secondary",
                        }}
                      >
                        {ROLE_LABEL[cell.cell_role]}
                      </Typography>
                    </Box>
                    {/* Cell column */}
                    <Box sx={{ minHeight: 36 }}>
                      {renderCell(cell, doc.id, { signoffBlocked, blockedReason, openExceptions: unresolvedExceptions, openExceptionSubjects })}
                    </Box>
                  </Box>
                );
              })}
            </Box>
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
    case "narrative":  return <NarrativeCellView cell={cell} />;
    case "reasoning":  return <ReasoningCellView cell={cell} />;
    case "result":     return <ResultCellView cell={cell} />;
    case "exception":  return <ExceptionCellView cell={cell} documentId={documentId} />;
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
    default: return null;
  }
}
