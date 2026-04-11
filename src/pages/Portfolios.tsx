import { useState } from 'react';
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Fab,
} from '@mui/material';
import {
  Add,
  MoreVert,
  Edit,
  Delete,
  ContentCopy,
  Analytics,
  TrendingUp,
  AccountBalance,
} from '@mui/icons-material';
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

interface Portfolio {
  id: string;
  name: string;
  value: number;
  return: number;
  risk: 'Low' | 'Medium' | 'High';
  assets: number;
  lastUpdated: string;
}

const Portfolios = () => {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([
    { id: '1', name: 'Conservative Growth', value: 450000, return: 8.2, risk: 'Low', assets: 12, lastUpdated: '2024-01-15' },
    { id: '2', name: 'Aggressive Tech', value: 275000, return: 15.7, risk: 'High', assets: 8, lastUpdated: '2024-01-15' },
    { id: '3', name: 'Balanced Income', value: 520000, return: 6.4, risk: 'Medium', assets: 15, lastUpdated: '2024-01-14' },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPortfolio, setSelectedPortfolio] = useState<Portfolio | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuPortfolioId, setMenuPortfolioId] = useState<string | null>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, portfolioId: string) => {
    setAnchorEl(event.currentTarget);
    setMenuPortfolioId(portfolioId);
  };
  const handleMenuClose = () => { setAnchorEl(null); setMenuPortfolioId(null); };
  const handleCreatePortfolio = () => { setSelectedPortfolio(null); setOpenDialog(true); };
  const handleEditPortfolio = (portfolio: Portfolio) => { setSelectedPortfolio(portfolio); setOpenDialog(true); handleMenuClose(); };
  const handleDeletePortfolio = (portfolioId: string) => { setPortfolios(portfolios.filter(p => p.id !== portfolioId)); handleMenuClose(); };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  const getRiskColor = (risk: string) => { switch (risk) { case 'Low': return 'success'; case 'Medium': return 'warning'; case 'High': return 'error'; default: return 'default'; } };

  const totalValue = portfolios.reduce((sum, p) => sum + p.value, 0);
  const avgReturn = portfolios.reduce((sum, p) => sum + p.return, 0) / portfolios.length;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">Portfolio Management</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={handleCreatePortfolio}>Create Portfolio</Button>
          </Box>
        </motion.div>

        {/* Summary Cards */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            {[
              { icon: <AccountBalance color="primary" />, title: "Total Value", value: formatCurrency(totalValue), sub: `Across ${portfolios.length} portfolios`, color: "primary" },
              { icon: <TrendingUp color="primary" />, title: "Average Return", value: `+${avgReturn.toFixed(1)}%`, sub: "Weighted average", color: "success.main" },
              { icon: <Analytics color="primary" />, title: "Best Performer", value: "Aggressive Tech", sub: "+15.7% return", color: "success.main" },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeInUp}>
                <Card sx={{ '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s ease' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>{card.icon}<Typography variant="h6" sx={{ ml: 1 }}>{card.title}</Typography></Box>
                    <Typography variant="h4" color={card.color}>{card.value}</Typography>
                    <Typography variant="body2" color="text.secondary">{card.sub}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        {/* Portfolios Table */}
        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader title="Your Portfolios" />
            <CardContent>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Portfolio Name</TableCell>
                      <TableCell align="right">Value</TableCell>
                      <TableCell align="right">Return</TableCell>
                      <TableCell align="center">Risk Level</TableCell>
                      <TableCell align="right">Assets</TableCell>
                      <TableCell align="right">Last Updated</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {portfolios.map((portfolio) => (
                      <TableRow key={portfolio.id} hover sx={{ '&:hover': { transform: 'scale(1.001)' }, transition: 'all 0.15s ease' }}>
                        <TableCell><Typography variant="subtitle2">{portfolio.name}</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6">{formatCurrency(portfolio.value)}</Typography></TableCell>
                        <TableCell align="right"><Typography variant="h6" color="success.main">+{portfolio.return}%</Typography></TableCell>
                        <TableCell align="center"><Chip label={portfolio.risk} color={getRiskColor(portfolio.risk) as any} size="small" /></TableCell>
                        <TableCell align="right"><Typography variant="body2">{portfolio.assets} assets</Typography></TableCell>
                        <TableCell align="right"><Typography variant="body2" color="text.secondary">{portfolio.lastUpdated}</Typography></TableCell>
                        <TableCell align="right"><IconButton onClick={(e) => handleMenuClick(e, portfolio.id)} size="small"><MoreVert /></IconButton></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </motion.div>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { const p = portfolios.find(p => p.id === menuPortfolioId); if (p) handleEditPortfolio(p); }}><Edit sx={{ mr: 1 }} fontSize="small" />Edit</MenuItem>
          <MenuItem onClick={handleMenuClose}><ContentCopy sx={{ mr: 1 }} fontSize="small" />Duplicate</MenuItem>
          <MenuItem onClick={handleMenuClose}><Analytics sx={{ mr: 1 }} fontSize="small" />Analyze</MenuItem>
          <MenuItem onClick={() => menuPortfolioId && handleDeletePortfolio(menuPortfolioId)} sx={{ color: 'error.main' }}><Delete sx={{ mr: 1 }} fontSize="small" />Delete</MenuItem>
        </Menu>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{selectedPortfolio ? 'Edit Portfolio' : 'Create New Portfolio'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField fullWidth label="Portfolio Name" defaultValue={selectedPortfolio?.name || ''} sx={{ mb: 2 }} />
              <TextField fullWidth label="Initial Investment" type="number" defaultValue={selectedPortfolio?.value || ''} sx={{ mb: 2 }} />
              <TextField fullWidth label="Description" multiline rows={3} placeholder="Describe your investment strategy..." />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setOpenDialog(false)}>{selectedPortfolio ? 'Update' : 'Create'}</Button>
          </DialogActions>
        </Dialog>

        <Fab color="primary" aria-label="add portfolio" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={handleCreatePortfolio}><Add /></Fab>
      </Container>
    </AnimatedPage>
  );
};

export default Portfolios;
