import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  alpha,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material";
import {
  CheckCircle as CheckIcon,
  Description as FileTextIcon,
  Assessment as ReportIcon,
  Storage as DatabaseIcon,
  CloudUpload as ImportIcon,
  TableChart as TableIcon,
  ArrowForward,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const BackOffice = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    { 
      title: "Trade Confirms", 
      description: "Validate and confirm trade executions with counterparties",
      icon: <CheckIcon />, 
      path: "/data",
      stats: "156 Today",
      color: theme.palette.success.main
    },
    { 
      title: "Settlements", 
      description: "Track settlement status and manage fails across markets",
      icon: <FileTextIcon />, 
      path: "/data",
      stats: "98% STP",
      color: theme.palette.primary.main
    },
    { 
      title: "Report Generation", 
      description: "Generate regulatory, client, and internal reports on demand",
      icon: <ReportIcon />, 
      path: "/results",
      stats: "24 Reports",
      color: theme.palette.info.main
    },
    { 
      title: "Data Sources", 
      description: "Manage connections to market data, custodians, and prime brokers",
      icon: <DatabaseIcon />, 
      path: "/data",
      stats: "18 Connected",
      color: theme.palette.warning.main
    },
    { 
      title: "Import/Export", 
      description: "Bulk data operations with support for multiple formats",
      icon: <ImportIcon />, 
      path: "/data",
      stats: "CSV, XML, JSON",
      color: theme.palette.secondary.main
    },
    { 
      title: "Data Tables", 
      description: "Interactive data grids for viewing and editing records",
      icon: <TableIcon />, 
      path: "/data",
      stats: "Full CRUD",
      color: theme.palette.error.main
    },
  ];

  const pendingSettlements = [
    { id: "SET-001", security: "AAPL", qty: "1,000", value: "$189,500", status: "Pending", date: "Today" },
    { id: "SET-002", security: "MSFT", qty: "500", value: "$210,250", status: "Matched", date: "Today" },
    { id: "SET-003", security: "GOOGL", qty: "200", value: "$280,400", status: "Pending", date: "Tomorrow" },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip 
              label="Back Office" 
              size="small" 
              sx={{ 
                mb: 2, 
                bgcolor: alpha(theme.palette.warning.main, 0.1), 
                color: 'warning.main',
                fontWeight: 500 
              }} 
            />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              Settlement & Validation
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Manage trade confirmations, settlements, reporting, and data operations to ensure accurate record-keeping.
            </Typography>
          </Box>
        </motion.div>

        {/* Pending Settlements Table */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4, overflow: 'hidden' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Pending Settlements
                </Typography>
              </Box>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                    <TableCell>ID</TableCell>
                    <TableCell>Security</TableCell>
                    <TableCell align="right">Quantity</TableCell>
                    <TableCell align="right">Value</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Settlement Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {pendingSettlements.map((row) => (
                    <TableRow key={row.id} sx={{ '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.02) } }}>
                      <TableCell sx={{ fontFamily: 'monospace', fontSize: '0.85rem' }}>{row.id}</TableCell>
                      <TableCell sx={{ fontWeight: 500 }}>{row.security}</TableCell>
                      <TableCell align="right">{row.qty}</TableCell>
                      <TableCell align="right">{row.value}</TableCell>
                      <TableCell>
                        <Chip 
                          label={row.status} 
                          size="small"
                          color={row.status === 'Matched' ? 'success' : 'warning'}
                          sx={{ minWidth: 70 }}
                        />
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: `0 8px 30px ${alpha(feature.color, 0.15)}`,
                      transform: 'translateY(-4px)',
                      '& .arrow-icon': { transform: 'translateX(4px)', opacity: 1 }
                    },
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 4,
                      height: '100%',
                      bgcolor: feature.color,
                    }}
                  />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: alpha(feature.color, 0.1),
                          color: feature.color,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Chip 
                        label={feature.stats} 
                        size="small" 
                        variant="outlined"
                        sx={{ borderColor: 'divider' }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                      <Typography variant="body2" fontWeight={500}>Manage</Typography>
                      <ArrowForward 
                        className="arrow-icon"
                        sx={{ ml: 0.5, fontSize: 16, opacity: 0, transition: 'all 0.2s ease' }} 
                      />
                    </Box>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default BackOffice;
