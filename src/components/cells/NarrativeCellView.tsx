import type { NarrativeCell } from "@/types/vellum";

export function NarrativeCellView({ cell }: { cell: NarrativeCell }) {
  return (
    <div className="px-3 py-2 text-[13px] leading-snug">
      {cell.label && (
        <div className="mb-1 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          {cell.label}
        </div>
      )}
      <p className="whitespace-pre-wrap text-foreground/90">{cell.body}</p>
    </div>
  );
}
