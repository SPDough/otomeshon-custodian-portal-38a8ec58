import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { NarrativeCell } from "@/types/vellum";

export function NarrativeCellView({ cell }: { cell: NarrativeCell }) {
  return (
    <Card>
      {cell.label && (
        <CardHeader>
          <CardTitle>{cell.label}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cell.label ? "" : "pt-6"}>
        <p className="text-sm leading-relaxed text-foreground/90 whitespace-pre-wrap">
          {cell.body}
        </p>
      </CardContent>
    </Card>
  );
}
