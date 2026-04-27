import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, FileSignature } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
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
  /** Subjects/labels of the unresolved exceptions, in document order. */
  openExceptionSubjects?: string[];
}

function OpenExceptionsBadge({
  count,
  subjects,
}: {
  count: number;
  subjects: string[];
}) {
  const none = count === 0;
  const badge = (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-sm border px-1.5 py-0.5 text-[10px] font-semibold tabular-nums cursor-default",
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

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger asChild>{badge}</TooltipTrigger>
      <TooltipContent side="top" align="end">
        {none ? (
          <span>No unresolved exceptions</span>
        ) : (
          <div className="space-y-1">
            <div className="font-semibold">
              {count} unresolved exception{count === 1 ? "" : "s"}
            </div>
            <ul className="list-disc pl-4 space-y-0.5">
              {subjects.map((s, i) => (
                <li key={i} className="leading-snug">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}
      </TooltipContent>
    </Tooltip>
  );
}

const DEFAULT_SIGNER = "current.user@vellum.ops";

export function SignoffCellView({
  cell,
  documentId,
  blocked,
  blockedReason,
  openExceptions = 0,
  openExceptionSubjects = [],
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
      <div className="flex flex-col bg-green-50 text-green-800 border-green-200">
        <div className="flex items-center justify-between gap-3 border-b border-green-200 px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              {cell.label ?? "Signoff"} — Signed
            </span>
          </div>
          <div className="flex items-center gap-2">
            <OpenExceptionsBadge count={openExceptions} subjects={openExceptionSubjects} />
            <span className="inline-flex items-center rounded-sm border border-green-300 bg-white/40 px-1.5 py-0.5 text-[10px] font-bold tracking-wider">
              SIGNED
            </span>
          </div>
        </div>
        <div className="space-y-1 px-3 py-2 text-[13px] leading-snug">
          <div>
            <div className="text-[10px] uppercase tracking-wide opacity-70">
              Required role
            </div>
            <div className="font-semibold">{cell.required_role}</div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] opacity-80">
            <span>By {cell.signed_by}</span>
            <span>{new Date(cell.signed_at!).toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  const canSubmit = !blocked && signer.trim().length > 0 && !mutation.isPending;

  return (
    <div
      className={cn(
        "flex flex-col",
        blocked
          ? "bg-gray-100 text-gray-600 border-gray-200"
          : "bg-amber-50 text-amber-800 border-amber-200",
      )}
    >
      <div
        className={cn(
          "flex items-center justify-between gap-3 border-b px-3 py-1.5",
          blocked ? "border-gray-200" : "border-amber-200",
        )}
      >
        <div className="flex items-center gap-1.5">
          <FileSignature className="h-3.5 w-3.5" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            {cell.label ?? "Signoff"} — {cell.required_role}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <OpenExceptionsBadge count={openExceptions} subjects={openExceptionSubjects} />
          <span
            className={cn(
              "inline-flex items-center rounded-sm border bg-white/40 px-1.5 py-0.5 text-[10px] font-bold tracking-wider",
              blocked ? "border-gray-300" : "border-amber-300",
            )}
          >
            {blocked ? "BLOCKED" : "AWAITING SIGNOFF"}
          </span>
        </div>
      </div>
      <div className="space-y-2 px-3 py-2">
        <p className="text-[13px] leading-snug">
          {blocked
            ? blockedReason ??
              "Signoff is blocked. Resolve all open exceptions before signing."
            : `Confirm review and sign off as ${cell.required_role}. This action will be recorded in the audit log.`}
        </p>

        <div className="flex items-end gap-2">
          <div className="flex-1 space-y-1">
            <Label
              htmlFor={`signer-${cell.cell_id}`}
              className="text-[10px] uppercase tracking-wide opacity-70"
            >
              Signing as
            </Label>
            <Input
              id={`signer-${cell.cell_id}`}
              value={signer}
              onChange={(e) => setSigner(e.target.value)}
              disabled={blocked || mutation.isPending}
              className="bg-white/80 text-foreground rounded-none h-8 text-[13px]"
              placeholder="name@example.com"
            />
          </div>
          <Button
            type="button"
            size="sm"
            disabled={!canSubmit}
            onClick={() => mutation.mutate()}
            className={cn(
              "rounded-none h-8",
              !blocked && "bg-amber-600 text-white hover:bg-amber-700",
            )}
          >
            {mutation.isPending ? "Signing…" : "Sign off"}
          </Button>
        </div>
      </div>
    </div>
  );
}
