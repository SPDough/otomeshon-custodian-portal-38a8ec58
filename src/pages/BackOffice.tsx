import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, Table, TableBody, TableCell, TableHead, TableRow, useTheme } from "@mui/material";
import { CheckCircle as CheckIcon, Description as FileTextIcon, Assessment as ReportIcon, Storage as DatabaseIcon, CloudUpload as ImportIcon, TableChart as TableIcon, ArrowForward } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const BackOffice = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const features = [
    { title: fm("backOffice.tradeConfirms"), description: fm("backOffice.tradeConfirmsDesc"), icon: <CheckIcon />, path: "/data", stats: fm("backOffice.tradeConfirmsStats"), color: theme.palette.success.main },
    { title: fm("backOffice.settlements"), description: fm("backOffice.settlementsDesc"), icon: <FileTextIcon />, path: "/data", stats: fm("backOffice.settlementsStats"), color: theme.palette.primary.main },
    { title: fm("backOffice.reportGeneration"), description: fm("backOffice.reportGenerationDesc"), icon: <ReportIcon />, path: "/results", stats: fm("backOffice.reportGenerationStats"), color: theme.palette.info.main },
    { title: fm("backOffice.dataSources"), description: fm("backOffice.dataSourcesDesc"), icon: <DatabaseIcon />, path: "/data", stats: fm("backOffice.dataSourcesStats"), color: theme.palette.warning.main },
    { title: fm("backOffice.importExport"), description: fm("backOffice.importExportDesc"), icon: <ImportIcon />, path: "/data", stats: fm("backOffice.importExportStats"), color: theme.palette.secondary.main },
    { title: fm("backOffice.dataTables"), description: fm("backOffice.dataTablesDesc"), icon: <TableIcon />, path: "/data", stats: fm("backOffice.dataTablesStats"), color: theme.palette.error.main },
  ];

  const pendingSettlements = [
    { id: "SET-001", security: "AAPL", qty: "1,000", value: "$189,500", status: fm("backOffice.statusPending"), date: fm("backOffice.today") },
    { id: "SET-002", security: "MSFT", qty: "500", value: "$210,250", status: fm("backOffice.statusMatched"), date: fm("backOffice.today") },
    { id: "SET-003", security: "GOOGL", qty: "200", value: "$280,400", status: fm("backOffice.statusPending"), date: fm("backOffice.tomorrow") },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label={fm("backOffice.chip")} size="small" sx={{ mb: 2, bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main', fontWeight: 500 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>{fm("backOffice.title")}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>{fm("backOffice.subtitle")}</Typography>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4, overflow: 'hidden' }}>
            <CardContent sx={{ p: 0 }}>
              <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                <Typography variant="subtitle1" fontWeight={600}>{fm("backOffice.pendingSettlements")}</Typography>
              </Box>
              <Table>
                <TableHead>
                  <TableRow sx={{ bgcolor: alpha(theme.palette.background.default, 0.5) }}>
                    <TableCell>{fm("backOffice.colId")}</TableCell>
                    <TableCell>{fm("backOffice.colSecurity")}</TableCell>
                    <TableCell align="right">{fm("backOffice.colQuantity")}</TableCell>
                    <TableCell align="right">{fm("backOffice.colValue")}</TableCell>
                    <TableCell>{fm("backOffice.colStatus")}</TableCell>
                    <TableCell>{fm("backOffice.colSettlementDate")}</TableCell>
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
                        <Chip label={row.status} size="small" color={row.status === fm("backOffice.statusMatched") ? 'success' : 'warning'} sx={{ minWidth: 70 }} />
                      </TableCell>
                      <TableCell>{row.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card sx={{ height: '100%', cursor: 'pointer', position: 'relative', overflow: 'hidden', '&:hover': { boxShadow: `0 8px 30px ${alpha(feature.color, 0.15)}`, transform: 'translateY(-4px)', '& .arrow-icon': { transform: 'translateX(4px)', opacity: 1 } }, transition: 'all 0.3s ease' }} onClick={() => navigate(feature.path)}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: feature.color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(feature.color, 0.1), color: feature.color }}>{feature.icon}</Box>
                      <Chip label={feature.stats} size="small" variant="outlined" sx={{ borderColor: 'divider' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>{feature.description}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                      <Typography variant="body2" fontWeight={500}>{fm("backOffice.manage")}</Typography>
                      <ArrowForward className="arrow-icon" sx={{ ml: 0.5, fontSize: 16, opacity: 0, transition: 'all 0.2s ease' }} />
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