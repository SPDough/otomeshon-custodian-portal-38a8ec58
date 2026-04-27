import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import type { ReasoningCell } from "@/types/vellum";

export function ReasoningCellView({ cell }: { cell: ReasoningCell }) {
  const [open, setOpen] = useState(!cell.collapsed_by_default);
  return (
    <div className="bg-muted/40 px-3 py-2">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-1.5 text-left"
      >
        {open ? (
          <ChevronDown className="h-3.5 w-3.5" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5" />
        )}
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {cell.label ?? "Agent reasoning"}
        </span>
      </button>
      {open && (
        <p className="mt-1 whitespace-pre-wrap font-mono text-[12px] leading-snug text-muted-foreground">
          {cell.body}
        </p>
      )}
    </div>
  );
}
