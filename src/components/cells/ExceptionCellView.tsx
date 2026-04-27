import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { CheckCircle2, AlertTriangle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <Card className="border bg-green-50 text-green-800 border-green-200">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" />
              <CardTitle className="text-sm">
                {cell.label ?? "Exception"} — Resolved
              </CardTitle>
            </div>
            <span className="inline-flex items-center rounded-full border border-green-200 bg-green-50 px-2 py-0.5 text-[10px] font-bold tracking-wider">
              RESOLVED
            </span>
          </div>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-wide opacity-70">Decision</div>
            <div className="font-semibold">{chosen?.label ?? cell.resolution.option_id}</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-wide opacity-70">Rationale</div>
            <div className="whitespace-pre-wrap">{cell.resolution.rationale}</div>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-1 text-xs opacity-80">
            <span>By {cell.resolution.decided_by}</span>
            <span>{new Date(cell.resolution.decided_at).toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Unresolved state
  const canSubmit = optionId !== "" && rationale.trim().length > 0 && !mutation.isPending;

  return (
    <Card className="border bg-red-50 text-red-800 border-red-200">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            <CardTitle className="text-sm">
              {cell.label ?? "Exception"} — Action required
            </CardTitle>
          </div>
          <span className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-[10px] font-bold tracking-wider">
            {SEVERITY_LABEL[cell.severity]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-5">
        <p className="text-sm">{cell.description}</p>

        <div className="space-y-2">
          <Label className="text-xs uppercase tracking-wide opacity-70">
            Choose remediation
          </Label>
          <RadioGroup value={optionId} onValueChange={setOptionId} className="gap-2">
            {cell.remediation_options.map((opt) => {
              const id = `opt-${cell.cell_id}-${opt.id}`;
              const selected = optionId === opt.id;
              return (
                <label
                  key={opt.id}
                  htmlFor={id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-md border bg-white/60 p-3 transition-colors",
                    selected ? "border-red-400 ring-1 ring-red-300" : "border-red-200 hover:bg-white",
                  )}
                >
                  <RadioGroupItem
                    id={id}
                    value={opt.id}
                    className="mt-0.5 border-red-400 text-red-700"
                  />
                  <div className="space-y-0.5">
                    <div className="text-sm font-semibold">{opt.label}</div>
                    <div className="text-xs opacity-80">{opt.description}</div>
                  </div>
                </label>
              );
            })}
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label
            htmlFor={`rationale-${cell.cell_id}`}
            className="text-xs uppercase tracking-wide opacity-70"
          >
            Rationale (required)
          </Label>
          <Textarea
            id={`rationale-${cell.cell_id}`}
            value={rationale}
            onChange={(e) => setRationale(e.target.value)}
            placeholder="Explain the basis for this decision. This will be attached to the audit record."
            className="bg-white/80 border-red-200 text-foreground placeholder:text-muted-foreground"
            rows={4}
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <Button
            type="button"
            disabled={!canSubmit}
            onClick={() => mutation.mutate()}
            className="bg-red-600 text-white hover:bg-red-700"
          >
            {mutation.isPending ? "Recording…" : "Confirm decision"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
