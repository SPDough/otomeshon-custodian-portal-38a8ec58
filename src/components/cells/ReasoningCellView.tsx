import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ReasoningCell } from "@/types/vellum";

export function ReasoningCellView({ cell }: { cell: ReasoningCell }) {
  const [open, setOpen] = useState(!cell.collapsed_by_default);
  return (
    <Card className="bg-muted/40">
      <CardHeader className="pb-3">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2 text-left"
        >
          {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          <CardTitle className="text-sm text-muted-foreground">
            {cell.label ?? "Agent reasoning"}
          </CardTitle>
        </button>
      </CardHeader>
      {open && (
        <CardContent>
          <p className="text-xs leading-relaxed text-muted-foreground whitespace-pre-wrap font-mono">
            {cell.body}
          </p>
        </CardContent>
      )}
    </Card>
  );
}
