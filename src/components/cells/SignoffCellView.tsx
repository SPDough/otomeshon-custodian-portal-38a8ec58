import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, FileSignature } from "lucide-react";
import type { SignoffCell } from "@/types/vellum";
import { cn } from "@/lib/utils";

export function SignoffCellView({ cell }: { cell: SignoffCell }) {
  const signed = Boolean(cell.signed_by && cell.signed_at);
  return (
    <Card
      className={cn(
        "border",
        signed
          ? "bg-green-50 text-green-800 border-green-200"
          : "bg-gray-100 text-gray-600 border-gray-200",
      )}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2">
          {signed ? (
            <CheckCircle2 className="h-4 w-4" />
          ) : (
            <FileSignature className="h-4 w-4" />
          )}
          <CardTitle className="text-sm">
            {cell.label ?? "Signoff"} — {cell.required_role}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        {signed ? (
          <div>
            Signed by <span className="font-semibold">{cell.signed_by}</span> on{" "}
            {new Date(cell.signed_at!).toLocaleString()}
          </div>
        ) : (
          <>
            <div>Awaiting signoff from a {cell.required_role}.</div>
            <Button type="button" disabled variant="outline">
              Sign off (not available in Phase 1)
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
