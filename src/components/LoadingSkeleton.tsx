import { Box, Card, CardContent, CardHeader } from "@mui/material";
import { Skeleton } from "@/components/ui/skeleton";

export const DashboardSkeleton = () => (
  <Box sx={{ py: 4 }}>
    <Skeleton className="h-8 w-80 mb-2" />
    <Skeleton className="h-5 w-96 mb-6" />
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent>
            <Skeleton className="h-5 w-24 mb-3" />
            <Skeleton className="h-10 w-32 mb-2" />
            <Skeleton className="h-4 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="md:col-span-2">
        <Card><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
      </div>
      <Card><CardContent><Skeleton className="h-48 w-full" /></CardContent></Card>
    </div>
  </Box>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Card>
    <CardHeader title={<Skeleton className="h-6 w-40" />} />
    <CardContent>
      <div className="space-y-3">
        <div className="flex gap-4">
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1" />
          ))}
        </div>
        {[...Array(rows)].map((_, i) => (
          <div key={i} className="flex gap-4">
            {[...Array(5)].map((_, j) => (
              <Skeleton key={j} className="h-8 flex-1" />
            ))}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

export const GraphSkeleton = () => (
  <Card>
    <CardContent>
      <Skeleton className="h-6 w-48 mb-4" />
      <Skeleton className="h-[400px] w-full rounded-lg" />
    </CardContent>
  </Card>
);
