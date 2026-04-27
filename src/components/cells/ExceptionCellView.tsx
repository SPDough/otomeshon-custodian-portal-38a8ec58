import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { decideException } from "@/lib/api";
import type { ExceptionCell } from "@/types/vellum";

interface Props {
  cell: ExceptionCell;
  documentId: string;
}

const SEVERITY_LABEL: Record<ExceptionCell["severity"], string> = {
  low: "LOW",
  medium: "MEDIUM",
  high: "HIGH",
  critical: "CRITICAL",
};

export function ExceptionCellView({ cell, documentId }: Props) {
  const queryClient = useQueryClient();
  const [optionId, setOptionId] = useState<string>("");
  const [rationale, setRationale] = useState<string>("");

  const mutation = useMutation({
    mutationFn: () =>
      decideException(cell.cell_id, {
        option_id: optionId,
        rationale: rationale.trim(),
      }),
    onSuccess: () => {
      toast.success("Exception decision recorded");
      queryClient.invalidateQueries({ queryKey: ["document", documentId] });
    },
    onError: (err: Error) => {
      toast.error(err.message ?? "Failed to record decision");
    },
  });

  // Resolved state
  if (cell.resolution) {
    const chosen = cell.remediation_options.find(
      (o) => o.id === cell.resolution!.option_id,
    );
    return (
      <div className="flex flex-col bg-green-50 text-green-800 border-green-200">
        <div className="flex items-center justify-between gap-3 border-b border-green-200 px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5" />
            <span className="text-[11px] font-semibold uppercase tracking-wider">
              {cell.label ?? "Exception"} — Resolved
            </span>
          </div>
          <span className="inline-flex items-center rounded-sm border border-green-300 bg-white/40 px-1.5 py-0.5 text-[10px] font-bold tracking-wider">
            RESOLVED
          </span>
        </div>
        <div className="space-y-2 px-3 py-2 text-[13px] leading-snug">
          <div>
            <div className="text-[10px] uppercase tracking-wide opacity-70">Decision</div>
            <div className="font-semibold">{chosen?.label ?? cell.resolution.option_id}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-wide opacity-70">Rationale</div>
            <div className="whitespace-pre-wrap">{cell.resolution.rationale}</div>
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-0.5 text-[11px] opacity-80">
            <span>By {cell.resolution.decided_by}</span>
            <span>{new Date(cell.resolution.decided_at).toLocaleString()}</span>
          </div>
        </div>
      </div>
    );
  }

  // Unresolved state
  const canSubmit =
    optionId !== "" && rationale.trim().length > 0 && !mutation.isPending;

  return (
    <div className="flex flex-col bg-red-50 text-red-800 border-red-200">
      <div className="flex items-center justify-between gap-3 border-b border-red-200 px-3 py-1.5">
        <div className="flex items-center gap-1.5">
          <AlertTriangle className="h-3.5 w-3.5" />
          <span className="text-[11px] font-semibold uppercase tracking-wider">
            {cell.label ?? "Exception"} — Action required
          </span>
        </div>
        <span className="inline-flex items-center rounded-sm border border-red-300 bg-white/40 px-1.5 py-0.5 text-[10px] font-bold tracking-wider">
          {SEVERITY_LABEL[cell.severity]}
        </span>
      </div>
      <div className="space-y-3 px-3 py-2">
        <p className="text-[13px] leading-snug">{cell.description}</p>

        <div className="space-y-1.5">
          <Label className="text-[10px] uppercase tracking-wide opacity-70">
            Choose remediation
          </Label>
          <RadioGroup value={optionId} onValueChange={setOptionId} className="gap-1">
            {cell.remediation_options.map((opt) => {
              const id = `opt-${cell.cell_id}-${opt.id}`;
              const selected = optionId === opt.id;
              return (
                <label
                  key={opt.id}
                  htmlFor={id}
                  className={cn(
                    "flex cursor-pointer items-start gap-2 border bg-white/60 px-2 py-1.5 transition-colors",
                    selected
                      ? "border-red-400 ring-1 ring-red-300"
                      : "border-red-200 hover:bg-white",
                  )}
                >
                  <RadioGroupItem
                    id={id}
                    value={opt.id}
                    className="mt-0.5 border-red-400 text-red-700"
                  />
                  <div className="space-y-0.5">
                    <div className="text-[13px] font-semibold leading-snug">
                      {opt.label}
                    </div>
                    <div className="text-[11px] leading-snug opacity-80">
                      {opt.description}
                    </div>
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>

        <div className="space-y-1.5">
          <Label
            htmlFor={`rationale-${cell.cell_id}`}
            className="text-[10px] uppercase tracking-wide opacity-70"
          >
            Rationale (required)
          </Label>
          <Textarea
            id={`rationale-${cell.cell_id}`}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Explain the basis for this decision. This will be attached to the audit record."
            className="bg-white/80 border-red-200 text-foreground placeholder:text-muted-foreground rounded-none text-[13px] min-h-0"
            rows={3}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            size="sm"
            disabled={!canSubmit}
            onClick={() => mutation.mutate()}
            className="bg-red-600 text-white hover:bg-red-700 rounded-none h-8"
          >
            {mutation.isPending ? "Recording…" : "Confirm decision"}
          </Button>
        </div>
      </div>
    </div>
  );
}
