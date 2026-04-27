import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { STATUS_CARD_CLASSES, STATUS_LABEL } from "@/lib/cellStatus";
import type { ResultCell } from "@/types/vellum";

export function ResultCellView({ cell }: { cell: ResultCell }) {
  const statusClasses = STATUS_CARD_CLASSES[cell.status];
  return (
    <Card className={cn("border", statusClasses)}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-3">
          <CardTitle className="text-sm">{cell.label ?? "Result"}</CardTitle>
          <span
            className={cn(
              "inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold tracking-wider",
              statusClasses,
            )}
          >
            {STATUS_LABEL[cell.status]}
          </span>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm font-medium">{cell.summary}</p>
        {cell.metrics && cell.metrics.length > 0 && (
          <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
            {cell.metrics.map((m) => (
              <div key={m.label} className="space-y-0.5">
                <dt className="text-[11px] uppercase tracking-wide opacity-70">{m.label}</dt>
                <dd className="text-sm font-semibold tabular-nums">{m.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </CardContent>
    </Card>
  );
}
