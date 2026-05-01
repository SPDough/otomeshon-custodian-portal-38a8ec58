import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { CheckCircleOutline, DriveFileRenameOutline } from "@mui/icons-material";
import { signOffCell } from "@/lib/api";
import type { SignoffCell } from "@/types/vellum";

interface Props {
  cell: SignoffCell;
  documentId: string;
  blocked?: boolean;
  blockedReason?: string;
  openExceptions?: number;
  openExceptionSubjects?: string[];
}

const GREEN  = { bgcolor: "#f0fdf4", color: "#166534", borderColor: "#bbf7d0" };
const AMBER  = { bgcolor: "#fffbeb", color: "#92400e", borderColor: "#fde68a" };
const GRAY   = { bgcolor: "#f3f4f6", color: "#4b5563", borderColor: "#e5e7eb" };

function OpenExceptionsBadge({ count, subjects }: { count: number; subjects: string[] }) {
  const none = count === 0;
  const colors = none ? GREEN : { color: "#991b1b", borderColor: "#fecaca", bgcolor: "#fef2f2" };

  const badge = (
    <Box
      component="span"
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 0.5,
        borderRadius: "2px",
        border: "1px solid",
        borderColor: colors.borderColor,
        bgcolor: colors.bgcolor,
        px: 0.75,
        py: 0.25,
        fontSize: 10,
        fontWeight: 600,
        fontVariantNumeric: "tabular-nums",
        cursor: "default",
        color: colors.color,
      }}
    >
      <Box
        component="span"
        sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: none ? "#22c55e" : "#ef4444", flexShrink: 0 }}
      />
      {count} open
    </Box>
  );

  const tooltipContent = none ? (
    <span>No unresolved exceptions</span>
  ) : (
    <Box>
      <Typography sx={{ fontSize: 12, fontWeight: 600 }}>
        {count} unresolved exception{count === 1 ? "" : "s"}
      </Typography>
      <Box component="ul" sx={{ pl: 2, mt: 0.5, mb: 0 }}>
        {subjects.map((s, i) => (
          <li key={i}><Typography sx={{ fontSize: 12, lineHeight: 1.4 }}>{s}</Typography></li>
        ))}
      </Box>
    </Box>
  );

  return (
    <Tooltip title={tooltipContent} placement="top" arrow>
      {badge}
    </Tooltip>
  );
}

// `signed_by` is ignored by the API; identity comes from the session.
const SESSION_USER_LABEL = "current.user@vellum.ops";

export function SignoffCellView({
  cell,
  documentId,
  blocked,
  blockedReason,
  openExceptions = 0,
  openExceptionSubjects = [],
}: Props) {
  const queryClient = useQueryClient();
  const signed = Boolean(cell.signed_by && cell.signed_at);

  const mutation = useMutation({
    mutationFn: () => signOffCell(documentId, cell.cell_id, { signed_by: SESSION_USER_LABEL }),
    onSuccess: () => {
      toast.success("Document signed off");
      queryClient.invalidateQueries({ queryKey: ["document", documentId] });
    },
    onError: (err: Error) => toast.error(err.message ?? "Failed to record signoff"),
  });

  if (signed) {
    return (
      <CellShell colors={GREEN} icon={<CheckCircleOutline sx={{ fontSize: 14 }} />} title={`${cell.label ?? "Signoff"} — Signed`} badge="SIGNED" badgeExtra={<OpenExceptionsBadge count={openExceptions} subjects={openExceptionSubjects} />}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 0.5, fontSize: 13, lineHeight: 1.4 }}>
          <Box>
            <Typography sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7 }}>Required role</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 600 }}>{cell.required_role}</Typography>
          </Box>
          <Typography sx={{ fontSize: 11, opacity: 0.8 }}>
            By {cell.signed_by} · {new Date(cell.signed_at!).toLocaleString()}
          </Typography>
        </Box>
      </CellShell>
    );
  }

  const colors = blocked ? GRAY : AMBER;
  const canSubmit = !blocked && !mutation.isPending;

  return (
    <CellShell
      colors={colors}
      icon={<DriveFileRenameOutline sx={{ fontSize: 14 }} />}
      title={`${cell.label ?? "Signoff"} — ${cell.required_role}`}
      badge={blocked ? "BLOCKED" : "AWAITING SIGNOFF"}
      badgeExtra={<OpenExceptionsBadge count={openExceptions} subjects={openExceptionSubjects} />}
    >
      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <Typography sx={{ fontSize: 13, lineHeight: 1.4 }}>
          {blocked
            ? blockedReason ?? "Signoff is blocked. Resolve all open exceptions before signing."
            : `Confirm review and sign off as ${cell.required_role}. This action will be recorded in the audit log.`}
        </Typography>
        <Box sx={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: 1 }}>
          <Box sx={{ flex: 1 }}>
            <Typography sx={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.05em", opacity: 0.7 }}>Signing as</Typography>
            <Typography sx={{ fontFamily: "monospace", fontSize: 12, fontWeight: 600, opacity: 0.9 }}>{SESSION_USER_LABEL}</Typography>
            <Typography sx={{ fontSize: 10, opacity: 0.7 }}>Identity is taken from your authenticated session.</Typography>
          </Box>
          <Button
            type="button"
            size="small"
            variant="contained"
            disabled={!canSubmit}
            onClick={() => mutation.mutate()}
            sx={{
              borderRadius: 0,
              height: 32,
              fontSize: 13,
              ...(blocked
                ? {}
                : { bgcolor: "#d97706", "&:hover": { bgcolor: "#b45309" } }),
            }}
          >
            {mutation.isPending ? "Signing…" : "Sign off"}
          </Button>
        </Box>
      </Box>
    </CellShell>
  );
}

function CellShell({
  colors,
  icon,
  title,
  badge,
  badgeExtra,
  children,
}: {
  colors: { bgcolor: string; color: string; borderColor: string };
  icon: React.ReactNode;
  title: string;
  badge: string;
  badgeExtra?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", bgcolor: colors.bgcolor, color: colors.color }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1.5, borderBottom: "1px solid", borderColor: colors.borderColor, px: 1.5, py: 0.75 }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
          {icon}
          <Typography sx={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            {title}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          {badgeExtra}
          <Box
            component="span"
            sx={{ display: "inline-flex", alignItems: "center", borderRadius: "2px", border: "1px solid", borderColor: colors.borderColor, bgcolor: "rgba(255,255,255,0.4)", px: 0.75, py: 0.25, fontSize: 10, fontWeight: 700, letterSpacing: "0.06em", color: colors.color }}
          >
            {badge}
          </Box>
        </Box>
      </Box>
      <Box sx={{ px: 1.5, py: 1 }}>{children}</Box>
    </Box>
  );
}
