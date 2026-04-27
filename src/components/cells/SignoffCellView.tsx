import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, FileSignature } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { signOffCell } from "@/lib/api";
import type { SignoffCell } from "@/types/vellum";

interface Props {
  cell: SignoffCell;
  documentId: string;
  /** Disable the form when there are unresolved blockers (e.g. open exceptions). */
  blocked?: boolean;
  blockedReason?: string;
  /** Number of unresolved exceptions in the document. */
  openExceptions?: number;
}

function OpenExceptionsBadge({ count }: { count: number }) {
  const none = count === 0;
  return (
    <span
      title={
        none
          ? "No unresolved exceptions"
          : `${count} unresolved exception${count === 1 ? "" : "s"}`
      }
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold tabular-nums",
        none
          ? "bg-green-50 text-green-800 border-green-200"
          : "bg-red-50 text-red-800 border-red-200",
      )}
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          none ? "bg-green-500" : "bg-red-500",
        )}
      />
      {count} open
    </span>
  );
}


const DEFAULT_SIGNER = "current.user@vellum.ops";

export function SignoffCellView({
  cell,
  documentId,
  blocked,
  blockedReason,
  openExceptions = 0,
}: Props) {
  const queryClient = useQueryClient();
  const [signer, setSigner] = useState<string>(DEFAULT_SIGNER);
  const signed = Boolean(cell.signed_by && cell.signed_at);

  const mutation = useMutation({
    mutationFn: () => signOffCell(cell.cell_id, { signed_by: signer.trim() }),
    onSuccess: () => {
      toast.success("Document signed off");
      queryClient.invalidateQueries({ queryKey: ["document", documentId] });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to record signoff");
    },
  });

  if (signed) {
    return (
      <Card className="border bg-green-50 text-green-800 border-green-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <CardTitle className="text-sm">
                {cell.label ?? "Signoff"} — Signed
              </CardTitle>
            </div>
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold tracking-wider">
              SIGNED
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-2 text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-wide opacity-70">
              Required role
            </div>
            <div className="font-semibold">{cell.required_role}</div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs opacity-80">
            <span>By {cell.signed_by}</span>
            <span>{new Date(cell.signed_at!).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  const canSubmit = !blocked && signer.trim().length > 0 && !mutation.isPending;

  return (
    <Card
      className={cn(
        "border",
        blocked
          ? "bg-gray-100 text-gray-600 border-gray-200"
          : "bg-amber-50 text-amber-800 border-amber-200",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <FileSignature className="h-4 w-4" />
            <CardTitle className="text-sm">
              {cell.label ?? "Signoff"} — {cell.required_role}
            </CardTitle>
          </div>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider",
              blocked
                ? "border-gray-200 bg-gray-100"
                : "border-amber-200 bg-amber-50",
            )}
          >
            {blocked ? "BLOCKED" : "AWAITING SIGNOFF"}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm">
          {blocked
            ? blockedReason ??
              "Signoff is blocked. Resolve all open exceptions before signing."
            : `Confirm review and sign off as ${cell.required_role}. This action will be recorded in the audit log.`}
        </p>

        <div className="space-y-2">
          <Label
            htmlFor={`signer-${cell.cell_id}`}
            className="text-xs uppercase tracking-wide opacity-70"
          >
            Signing as
          </Label>
          <Input
            id={`signer-${cell.cell_id}`}
            value={signer}
            onChange={(e) => setSigner(e.target.value)}
            disabled={blocked || mutation.isPending}
            className="bg-white/80 text-foreground"
            placeholder="name@example.com"
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            disabled={!canSubmit}
            onClick={() => mutation.mutate()}
            className={
              blocked
                ? undefined
                : "bg-amber-600 text-white hover:bg-amber-700"
            }
          >
            {mutation.isPending ? "Signing…" : "Sign off"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
