import { Box, Card, CardContent, CardHeader, Skeleton } from "@mui/material";

export const DashboardSkeleton = () => (
  <Box sx={{ py: 4 }}>
    <Skeleton variant="text" width={320} height={40} sx={{ mb: 1 }} />
    <Skeleton variant="text" width={384} height={28} sx={{ mb: 3 }} />
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 2, mb: 3 }}>
      {[...Array(4)].map((_, i) => (
        <Card key={i}>
          <CardContent>
            <Skeleton variant="text" width={96} height={28} sx={{ mb: 1.5 }} />
            <Skeleton variant="rectangular" width={128} height={40} sx={{ mb: 1 }} />
            <Skeleton variant="text" width={80} height={20} />
          </CardContent>
        </Card>
      ))}
    </Box>
    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
      <Card><CardContent><Skeleton variant="rectangular" height={192} /></CardContent></Card>
      <Card><CardContent><Skeleton variant="rectangular" height={192} /></CardContent></Card>
    </Box>
  </Box>
);

export const TableSkeleton = ({ rows = 5 }: { rows?: number }) => (
  <Card>
    <CardHeader title={<Skeleton variant="text" width={160} height={32} />} />
    <CardContent>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {[...Array(5)].map((_, i) => (
            <Skeleton key={i} variant="text" sx={{ flex: 1 }} height={20} />
          ))}
        </Box>
        {[...Array(rows)].map((_, i) => (
          <Box key={i} sx={{ display: 'flex', gap: 2 }}>
            {[...Array(5)].map((_, j) => (
              <Skeleton key={j} variant="rectangular" sx={{ flex: 1 }} height={32} />
            ))}
          </Box>
        ))}
      </Box>
    </CardContent>
  </Card>
);

export const GraphSkeleton = () => (
  <Card>
    <CardContent>
      <Skeleton variant="text" width={192} height={32} sx={{ mb: 2 }} />
      <Skeleton variant="rectangular" height={400} sx={{ borderRadius: 1 }} />
    </CardContent>
  </Card>
);
