import { cn } from "@/lib/utils";
import { STATUS_CARD_CLASSES, STATUS_LABEL } from "@/lib/cellStatus";
import type { ResultCell } from "@/types/vellum";

export function ResultCellView({ cell }: { cell: ResultCell }) {
  const statusClasses = STATUS_CARD_CLASSES[cell.status];
  return (
    <div className={cn("flex flex-col", statusClasses)}>
      <div className="flex items-center justify-between gap-3 border-b border-current/20 px-3 py-1.5">
        <span className="text-[11px] font-semibold uppercase tracking-wider">
          {cell.label ?? "Result"}
        </span>
        <span className="inline-flex items-center rounded-sm border border-current/30 bg-white/40 px-1.5 py-0.5 text-[10px] font-bold tracking-wider">
          {STATUS_LABEL[cell.status]}
        </span>
      </div>
      <div className="space-y-2 px-3 py-2">
        <p className="text-[13px] font-medium leading-snug">{cell.summary}</p>
        {cell.metrics && cell.metrics.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-4 gap-y-1 sm:grid-cols-4">
            {cell.metrics.map((m) => (
              <div key={m.label} className="space-y-0.5">
                <dt className="text-[10px] uppercase tracking-wide opacity-70">
                  {m.label}
                </dt>
                <dd className="text-[13px] font-semibold tabular-nums leading-tight">
                  {m.value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </div>
  );
}
