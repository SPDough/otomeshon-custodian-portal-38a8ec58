
import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  ButtonGroup,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  LinearProgress,
} from '@mui/material';
import {
  TrendingUp,
  Assessment,
  Download,
  Share,
  Refresh,
  Analytics,
} from '@mui/icons-material';

const Results = () => {
  const [viewMode, setViewMode] = useState('overview');

  const workflowResults = [
    { name: 'Risk Assessment', status: 'Completed', progress: 100, duration: '2.3s' },
    { name: 'Portfolio Optimization', status: 'Running', progress: 75, duration: '5.1s' },
    { name: 'Compliance Check', status: 'Queued', progress: 0, duration: '-' },
  ];

  const analysisData = [
    { metric: 'Total Return', value: '12.45%', change: '+2.1%', trend: 'up' },
    { metric: 'Sharpe Ratio', value: '1.87', change: '+0.15', trend: 'up' },
    { metric: 'Max Drawdown', value: '-4.2%', change: '-0.8%', trend: 'down' },
    { metric: 'VaR (95%)', value: '-2.1%', change: '+0.3%', trend: 'up' },
  ];

  const portfolioData = [
    { asset: 'AAPL', allocation: '15.2%', value: '$152,000', return: '+8.4%' },
    { asset: 'GOOGL', allocation: '12.8%', value: '$128,000', return: '+12.1%' },
    { asset: 'MSFT', allocation: '11.5%', value: '$115,000', return: '+6.7%' },
    { asset: 'TSLA', allocation: '8.3%', value: '$83,000', return: '-2.1%' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" component="h1">
          Results & Analytics
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button startIcon={<Refresh />} variant="outlined">
            Refresh
          </Button>
          <Button startIcon={<Download />} variant="outlined">
            Export
          </Button>
          <Button startIcon={<Share />} variant="contained">
            Share
          </Button>
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <ButtonGroup variant="outlined">
          <Button
            variant={viewMode === 'overview' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('overview')}
          >
            Overview
          </Button>
          <Button
            variant={viewMode === 'detailed' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('detailed')}
          >
            Detailed Analysis
          </Button>
          <Button
            variant={viewMode === 'workflows' ? 'contained' : 'outlined'}
            onClick={() => setViewMode('workflows')}
          >
            Workflow Results
          </Button>
        </ButtonGroup>
      </Box>

      {viewMode === 'overview' && (
        <>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 3 }}>
            <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><TrendingUp color="primary" /><Typography variant="h6" sx={{ ml: 1 }}>Portfolio Value</Typography></Box><Typography variant="h4" color="primary">$1,247,500</Typography><Typography variant="body2" color="success.main">+12.45% YTD</Typography></CardContent></Card>
            <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><Assessment color="primary" /><Typography variant="h6" sx={{ ml: 1 }}>Risk Score</Typography></Box><Typography variant="h4" color="warning.main">Medium</Typography><Typography variant="body2" color="text.secondary">Risk Level: 6/10</Typography></CardContent></Card>
            <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><Analytics color="primary" /><Typography variant="h6" sx={{ ml: 1 }}>Active Workflows</Typography></Box><Typography variant="h4" color="info.main">3</Typography><Typography variant="body2" color="text.secondary">2 Running, 1 Queued</Typography></CardContent></Card>
            <Card><CardContent><Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}><TrendingUp color="primary" /><Typography variant="h6" sx={{ ml: 1 }}>Compliance</Typography></Box><Typography variant="h4" color="success.main">98.5%</Typography><Typography variant="body2" color="text.secondary">All checks passed</Typography></CardContent></Card>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
            <Card><CardHeader title="Key Performance Metrics" /><CardContent><TableContainer><Table><TableHead><TableRow><TableCell>Metric</TableCell><TableCell align="right">Value</TableCell><TableCell align="right">Change</TableCell><TableCell align="right">Trend</TableCell></TableRow></TableHead><TableBody>{analysisData.map((row) => (<TableRow key={row.metric}><TableCell>{row.metric}</TableCell><TableCell align="right">{row.value}</TableCell><TableCell align="right"><Chip label={row.change} color={row.trend === 'up' ? 'success' : 'error'} size="small" /></TableCell><TableCell align="right"><TrendingUp color={row.trend === 'up' ? 'success' : 'error'} sx={{ transform: row.trend === 'down' ? 'rotate(180deg)' : 'none' }} /></TableCell></TableRow>))}</TableBody></Table></TableContainer></CardContent></Card>
            <Card><CardHeader title="Top Holdings" /><CardContent>{portfolioData.map((holding) => (<Box key={holding.asset} sx={{ mb: 2 }}><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="subtitle2">{holding.asset}</Typography><Typography variant="body2" color={holding.return.startsWith('+') ? 'success.main' : 'error.main'}>{holding.return}</Typography></Box><Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2" color="text.secondary">{holding.allocation}</Typography><Typography variant="body2">{holding.value}</Typography></Box></Box>))}</CardContent></Card>
          </Box>
        </>
      )}

      {viewMode === 'workflows' && (
        <Card>
          <CardHeader title="Workflow Execution Results" />
          <CardContent>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Workflow</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Progress</TableCell>
                    <TableCell>Duration</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {workflowResults.map((workflow) => (
                    <TableRow key={workflow.name}>
                      <TableCell>{workflow.name}</TableCell>
                      <TableCell>
                        <Chip
                          label={workflow.status}
                          color={
                            workflow.status === 'Completed' ? 'success' :
                            workflow.status === 'Running' ? 'warning' : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={workflow.progress}
                            sx={{ width: 100 }}
                          />
                          <Typography variant="body2">{workflow.progress}%</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{workflow.duration}</TableCell>
                      <TableCell>
                        <Button size="small" variant="outlined">
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default Results;
