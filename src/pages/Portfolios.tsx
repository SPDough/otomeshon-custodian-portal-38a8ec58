import { useState } from 'react';
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, CardHeader, Button,
  Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
  Paper, Chip, IconButton, Menu, MenuItem, Fab, CircularProgress,
  Select, FormControl, InputLabel, Alert,
} from '@mui/material';
import {
  Add, MoreVert, Edit, Delete, ContentCopy, Analytics,
  TrendingUp, AccountBalance,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import { toast } from 'sonner';

type RiskLevel = 'Low' | 'Medium' | 'High';

interface PortfolioForm {
  name: string;
  description: string;
  initial_investment: number;
  risk_level: RiskLevel;
}

const emptyForm: PortfolioForm = { name: '', description: '', initial_investment: 0, risk_level: 'Medium' };

const Portfolios = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [openDialog, setOpenDialog] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<PortfolioForm>(emptyForm);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuPortfolioId, setMenuPortfolioId] = useState<string | null>(null);

  const { data: portfolios = [], isLoading, error } = useQuery({
    queryKey: ['portfolios'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('portfolios')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (form: PortfolioForm) => {
      const { error } = await supabase.from('portfolios').insert({
        user_id: user!.id,
        name: form.name,
        description: form.description || null,
        initial_investment: form.initial_investment,
        risk_level: form.risk_level,
      });
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolios'] }); toast.success('Portfolio created'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, form }: { id: string; form: PortfolioForm }) => {
      const { error } = await supabase.from('portfolios').update({
        name: form.name,
        description: form.description || null,
        initial_investment: form.initial_investment,
        risk_level: form.risk_level,
      }).eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolios'] }); toast.success('Portfolio updated'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from('portfolios').delete().eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ['portfolios'] }); toast.success('Portfolio deleted'); },
    onError: (err: Error) => toast.error(err.message),
  });

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>, id: string) => {
    setAnchorEl(event.currentTarget);
    setMenuPortfolioId(id);
  };
  const handleMenuClose = () => { setAnchorEl(null); setMenuPortfolioId(null); };

  const openCreate = () => { setEditingId(null); setForm(emptyForm); setOpenDialog(true); };
  const openEdit = (p: typeof portfolios[0]) => {
    setEditingId(p.id);
    setForm({ name: p.name, description: p.description || '', initial_investment: Number(p.initial_investment), risk_level: p.risk_level as RiskLevel });
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleSubmit = () => {
    if (!form.name.trim()) return;
    if (editingId) {
      updateMutation.mutate({ id: editingId, form });
    } else {
      createMutation.mutate(form);
    }
    setOpenDialog(false);
  };

  const handleDelete = (id: string) => { deleteMutation.mutate(id); handleMenuClose(); };

  const formatCurrency = (value: number) => new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value);
  const getRiskColor = (risk: string) => {
    switch (risk) { case 'Low': return 'success'; case 'Medium': return 'warning'; case 'High': return 'error'; default: return 'default'; }
  };

  const totalValue = portfolios.reduce((sum, p) => sum + Number(p.initial_investment), 0);

  if (error) return <Container maxWidth="lg" sx={{ py: 4 }}><Alert severity="error">Failed to load portfolios</Alert></Container>;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Typography variant="h4" component="h1">Portfolio Management</Typography>
            <Button variant="contained" startIcon={<Add />} onClick={openCreate}>Create Portfolio</Button>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            {[
              { icon: <AccountBalance color="primary" />, title: "Total Investment", value: formatCurrency(totalValue), sub: `Across ${portfolios.length} portfolios` },
              { icon: <TrendingUp color="primary" />, title: "Portfolios", value: String(portfolios.length), sub: "Active portfolios" },
              { icon: <Analytics color="primary" />, title: "Risk Distribution", value: `${portfolios.filter(p => p.risk_level === 'Low').length}L / ${portfolios.filter(p => p.risk_level === 'Medium').length}M / ${portfolios.filter(p => p.risk_level === 'High').length}H`, sub: "Low / Medium / High" },
            ].map((card) => (
              <motion.div key={card.title} variants={fadeInUp}>
                <Card sx={{ '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s ease' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>{card.icon}<Typography variant="h6" sx={{ ml: 1 }}>{card.title}</Typography></Box>
                    <Typography variant="h4">{card.value}</Typography>
                    <Typography variant="body2" color="text.secondary">{card.sub}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader title="Your Portfolios" />
            <CardContent>
              {isLoading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}><CircularProgress /></Box>
              ) : portfolios.length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 6 }}>
                  <Typography variant="h6" color="text.secondary" mb={1}>No portfolios yet</Typography>
                  <Typography variant="body2" color="text.secondary" mb={3}>Create your first portfolio to get started.</Typography>
                  <Button variant="contained" startIcon={<Add />} onClick={openCreate}>Create Portfolio</Button>
                </Box>
              ) : (
                <TableContainer component={Paper} variant="outlined">
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Portfolio Name</TableCell>
                        <TableCell align="right">Investment</TableCell>
                        <TableCell align="center">Risk Level</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell align="right">Created</TableCell>
                        <TableCell align="right">Actions</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {portfolios.map((portfolio) => (
                        <TableRow key={portfolio.id} hover>
                          <TableCell><Typography variant="subtitle2">{portfolio.name}</Typography></TableCell>
                          <TableCell align="right"><Typography variant="h6">{formatCurrency(Number(portfolio.initial_investment))}</Typography></TableCell>
                          <TableCell align="center"><Chip label={portfolio.risk_level} color={getRiskColor(portfolio.risk_level) as any} size="small" /></TableCell>
                          <TableCell><Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 200 }}>{portfolio.description || '—'}</Typography></TableCell>
                          <TableCell align="right"><Typography variant="body2" color="text.secondary">{new Date(portfolio.created_at).toLocaleDateString()}</Typography></TableCell>
                          <TableCell align="right"><IconButton onClick={(e) => handleMenuClick(e, portfolio.id)} size="small"><MoreVert /></IconButton></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              )}
            </CardContent>
          </Card>
        </motion.div>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={() => { const p = portfolios.find(p => p.id === menuPortfolioId); if (p) openEdit(p); }}>
            <Edit sx={{ mr: 1 }} fontSize="small" />Edit
          </MenuItem>
          <MenuItem onClick={() => menuPortfolioId && handleDelete(menuPortfolioId)} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} fontSize="small" />Delete
          </MenuItem>
        </Menu>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
          <DialogTitle>{editingId ? 'Edit Portfolio' : 'Create New Portfolio'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <TextField fullWidth label="Portfolio Name" value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })} sx={{ mb: 2 }} required />
              <TextField fullWidth label="Initial Investment" type="number" value={form.initial_investment}
                onChange={(e) => setForm({ ...form, initial_investment: Number(e.target.value) })} sx={{ mb: 2 }} />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Risk Level</InputLabel>
                <Select value={form.risk_level} label="Risk Level"
                  onChange={(e) => setForm({ ...form, risk_level: e.target.value as RiskLevel })}>
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
              <TextField fullWidth label="Description" multiline rows={3} value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })} />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={handleSubmit} disabled={!form.name.trim()}>
              {editingId ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        <Fab color="primary" aria-label="add portfolio" sx={{ position: 'fixed', bottom: 16, right: 16 }} onClick={openCreate}><Add /></Fab>
      </Container>
    </AnimatedPage>
  );
};

export default Portfolios;
