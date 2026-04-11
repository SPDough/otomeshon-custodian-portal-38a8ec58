import { useState } from 'react';
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, CardHeader, Button, ButtonGroup,
  Chip, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, LinearProgress,
} from '@mui/material';
import { TrendingUp, Assessment, Download, Share, Refresh, Analytics } from '@mui/icons-material';
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

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
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">Results & Analytics</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button startIcon={<Refresh />} variant="outlined">Refresh</Button>
              <Button startIcon={<Download />} variant="outlined">Export</Button>
              <Button startIcon={<Share />} variant="contained">Share</Button>
            </Box>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 3 }}>
            <ButtonGroup variant="outlined">
              {['overview', 'detailed', 'workflows'].map((mode) => (
                <Button key={mode} variant={viewMode === mode ? 'contained' : 'outlined'} onClick={() => setViewMode(mode)}>
                  {mode === 'overview' ? 'Overview' : mode === 'detailed' ? 'Detailed Analysis' : 'Workflow Results'}
                </Button>
              ))}
            </ButtonGroup>
          </Box>
        </motion.div>

        {viewMode === 'overview' && (
          <>
            <motion.div variants={staggerContainer} initial="initial" animate="animate">
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 3 }}>
                {[
                  { icon: <TrendingUp color="primary" />, title: "Portfolio Value", value: "$1,247,500", sub: "+12.45% YTD", color: "primary" },
                  { icon: <Assessment color="primary" />, title: "Risk Score", value: "Medium", sub: "Risk Level: 6/10", color: "warning.main" },
                  { icon: <Analytics color="primary" />, title: "Active Workflows", value: "3", sub: "2 Running, 1 Queued", color: "info.main" },
                  { icon: <TrendingUp color="primary" />, title: "Compliance", value: "98.5%", sub: "All checks passed", color: "success.main" },
                ].map((s) => (
                  <motion.div key={s.title} variants={fadeInUp}>
                    <Card sx={{ '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s ease' }}>
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>{s.icon}<Typography variant="h6" sx={{ ml: 1 }}>{s.title}</Typography></Box>
                        <Typography variant="h4" color={s.color}>{s.value}</Typography>
                        <Typography variant="body2" color="text.secondary">{s.sub}</Typography>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </Box>
            </motion.div>

            <motion.div variants={fadeInUp}>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                <Card>
                  <CardHeader title="Key Performance Metrics" />
                  <CardContent>
                    <TableContainer>
                      <Table>
                        <TableHead><TableRow><TableCell>Metric</TableCell><TableCell align="right">Value</TableCell><TableCell align="right">Change</TableCell><TableCell align="right">Trend</TableCell></TableRow></TableHead>
                        <TableBody>
                          {analysisData.map((row) => (
                            <TableRow key={row.metric}>
                              <TableCell>{row.metric}</TableCell>
                              <TableCell align="right">{row.value}</TableCell>
                              <TableCell align="right"><Chip label={row.change} color={row.trend === 'up' ? 'success' : 'error'} size="small" /></TableCell>
                              <TableCell align="right"><TrendingUp color={row.trend === 'up' ? 'success' : 'error'} sx={{ transform: row.trend === 'down' ? 'rotate(180deg)' : 'none' }} /></TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader title="Top Holdings" />
                  <CardContent>
                    {portfolioData.map((h) => (
                      <Box key={h.asset} sx={{ mb: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="subtitle2">{h.asset}</Typography><Typography variant="body2" color={h.return.startsWith('+') ? 'success.main' : 'error.main'}>{h.return}</Typography></Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}><Typography variant="body2" color="text.secondary">{h.allocation}</Typography><Typography variant="body2">{h.value}</Typography></Box>
                      </Box>
                    ))}
                  </CardContent>
                </Card>
              </Box>
            </motion.div>
          </>
        )}

        {viewMode === 'workflows' && (
          <motion.div variants={fadeInUp}>
            <Card>
              <CardHeader title="Workflow Execution Results" />
              <CardContent>
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead><TableRow><TableCell>Workflow</TableCell><TableCell>Status</TableCell><TableCell>Progress</TableCell><TableCell>Duration</TableCell><TableCell>Actions</TableCell></TableRow></TableHead>
                    <TableBody>
                      {workflowResults.map((w) => (
                        <TableRow key={w.name}>
                          <TableCell>{w.name}</TableCell>
                          <TableCell><Chip label={w.status} color={w.status === 'Completed' ? 'success' : w.status === 'Running' ? 'warning' : 'default'} size="small" /></TableCell>
                          <TableCell><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><LinearProgress variant="determinate" value={w.progress} sx={{ width: 100, height: 6, borderRadius: 3 }} /><Typography variant="body2">{w.progress}%</Typography></Box></TableCell>
                          <TableCell>{w.duration}</TableCell>
                          <TableCell><Button size="small" variant="outlined">View Details</Button></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </Container>
    </AnimatedPage>
  );
};

export default Results;
