import { ReactNode, useEffect, useRef } from "react";
import { Box, Typography } from "@mui/material";
import { GridOn } from "@mui/icons-material";
import type { Cell, CellStatus, ProcedureDocument } from "@/types/vellum";
import { STATUS_DOT_COLOR } from "@/lib/cellStatus";

interface Props {
  document?: ProcedureDocument;
  activeCellId?: string | null;
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
    case "narrative":  return "Notes";
    case "reasoning":  return "Reasoning";
    case "result":     return "Result";
    case "exception":  return "Exception";
    case "signoff":    return "Signoff";
    default:           return "Step";
  }
}

function deriveStatus(c: Cell): CellStatus {
  switch (c.cell_role) {
    case "result":    return c.status;
    case "exception": return c.resolution ? "pass" : "breach";
    case "signoff":   return c.signed_by ? "pass" : "pending";
    default:          return "pending";
  }
}

export function AppShell({ document: doc, activeCellId, children }: Props) {
  const steps = deriveSteps(doc);
  const navRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const handleJump = (cellId: string) => {
    const el = window.document.getElementById(`cell-${cellId}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // Keep the active step visible inside the sidebar's own scroll area.
  useEffect(() => {
    if (!activeCellId) return;
    const btn = buttonRefs.current[activeCellId];
    const nav = navRef.current;
    if (!btn || !nav) return;
    const btnTop = btn.offsetTop;
    const btnBottom = btnTop + btn.offsetHeight;
    const viewTop = nav.scrollTop;
    const viewBottom = viewTop + nav.clientHeight;
    if (btnTop < viewTop + 8) {
      nav.scrollTo({ top: btnTop - 8, behavior: "smooth" });
    } else if (btnBottom > viewBottom - 8) {
      nav.scrollTo({ top: btnBottom - nav.clientHeight + 8, behavior: "smooth" });
    }
  }, [activeCellId]);

  return (
    <Box
      sx={{
        display: "grid",
        height: "100vh",
        width: "100%",
        gridTemplateColumns: "220px 1fr",
        gridTemplateRows: "52px 1fr",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Topbar */}
      <Box
        component="header"
        sx={{
          gridColumn: "1 / -1",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          px: 2,
          height: 52,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <GridOn sx={{ fontSize: 20, color: "primary.main" }} />
          <Typography sx={{ fontSize: 14, fontWeight: 700, letterSpacing: "-0.02em" }}>Vellum</Typography>
          <Typography sx={{ ml: 1, fontSize: 12, color: "text.secondary" }}>Operations workstation</Typography>
        </Box>
        {doc && (
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, fontSize: 12 }}>
            <Typography sx={{ fontSize: 12, fontWeight: 600 }}>{doc.title}</Typography>
            <Typography sx={{ color: "text.secondary" }}>·</Typography>
            <Box
              component="span"
              sx={{ borderRadius: "2px", bgcolor: "action.selected", px: 1, py: 0.25, fontFamily: "monospace", fontSize: 11 }}
            >
              {doc.fund_code}
            </Box>
            <Typography sx={{ fontSize: 12, color: "text.secondary" }}>{doc.as_of_date}</Typography>
          </Box>
        )}
      </Box>

      {/* Sidebar */}
      <Box
        ref={navRef}
        component="aside"
        sx={{
          gridRow: 2,
          borderRight: "1px solid",
          borderColor: "divider",
          bgcolor: "background.paper",
          overflowY: "auto",
          width: 220,
        }}
      >
        <Box
          sx={{
            px: 1.5,
            py: 1,
            fontSize: 11,
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            color: "text.secondary",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
        >
          Steps
        </Box>
        <Box component="nav" sx={{ px: 0.5, py: 0.5 }}>
          {steps.map((s, i) => {
            const isActive = s.cell_id === activeCellId;
            return (
              <Box
                key={s.cell_id}
                ref={(el: HTMLButtonElement | null) => { buttonRefs.current[s.cell_id] = el; }}
                component="button"
                type="button"
                onClick={() => handleJump(s.cell_id)}
                aria-current={isActive ? "true" : undefined}
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  gap: 1,
                  borderRadius: "2px",
                  px: isActive ? "calc(8px - 2px)" : 1,
                  py: 0.5,
                  textAlign: "left",
                  fontSize: 13,
                  background: "none",
                  border: "none",
                  borderLeft: isActive ? "2px solid" : "2px solid transparent",
                  borderLeftColor: isActive ? "primary.main" : "transparent",
                  bgcolor: isActive ? "action.selected" : "transparent",
                  fontWeight: isActive ? 500 : 400,
                  cursor: "pointer",
                  color: "text.primary",
                  transition: "background-color 0.1s",
                  "&:hover": { bgcolor: isActive ? "action.selected" : "action.hover" },
                  ml: isActive ? "-2px" : 0,
                }}
              >
                <Box
                  component="span"
                  sx={{ width: 8, height: 8, flexShrink: 0, borderRadius: "50%", bgcolor: STATUS_DOT_COLOR[s.status] }}
                />
                <Typography
                  component="span"
                  sx={{ fontSize: 11, color: "text.secondary", fontVariantNumeric: "tabular-nums", width: 20, flexShrink: 0 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </Typography>
                <Typography component="span" sx={{ fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {s.label}
                </Typography>
              </Box>
            );
          })}
          {steps.length === 0 && (
            <Typography sx={{ px: 1, py: 1.5, fontSize: 12, color: "text.secondary" }}>No steps yet.</Typography>
          )}
        </Box>
      </Box>

      {/* Main */}
      <Box
        component="main"
        sx={{ gridRow: 2, gridColumn: 2, overflowY: "auto", bgcolor: "background.default" }}
      >
        {children}
      </Box>
    </Box>
  );
}
