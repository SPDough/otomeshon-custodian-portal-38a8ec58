import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { Assessment, Dashboard, PictureAsPdf, SmartToy, Schedule } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import PlatformBreadcrumb from "@/components/PlatformBreadcrumb";

const reports = [
  { name: "Daily P&L Dashboard", type: "Dashboard", agent: true, schedule: "Daily 7 AM", status: "active" },
  { name: "Monthly Client Statement", type: "PDF Report", agent: true, schedule: "Monthly", status: "active" },
  { name: "Risk Exposure Summary", type: "Dashboard", agent: false, schedule: "Real-time", status: "active" },
  { name: "Regulatory Reporting (Form PF)", type: "PDF Report", agent: true, schedule: "Quarterly", status: "active" },
  { name: "Portfolio Attribution", type: "Dashboard", agent: false, schedule: "Daily", status: "draft" },
  { name: "Exception Summary", type: "Email Digest", agent: true, schedule: "Daily 8 AM", status: "active" },
];

const LayerReporting = () => {
  const theme = useTheme();
  const color = theme.palette.secondary.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PlatformBreadcrumb layerNumber={7} layerName="Reporting" />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label="Layer 7" size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>Agent-Enabled Reporting</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Dashboard builder, report templates, and autonomous agent configuration for operations reporting.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {reports.map((report) => (
              <motion.div key={report.name} variants={fadeInUp}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                        {report.type === 'Dashboard' ? <Dashboard /> : <PictureAsPdf />}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {report.agent && <Chip icon={<SmartToy sx={{ fontSize: 14 }} />} label="Agent" size="small" variant="outlined" sx={{ borderColor: 'divider' }} />}
                        <Chip
                          label={report.status === 'active' ? 'Active' : 'Draft'}
                          size="small"
                          sx={{
                            bgcolor: report.status === 'active' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.text.secondary, 0.1),
                            color: report.status === 'active' ? 'success.main' : 'text.secondary',
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{report.name}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">{report.schedule}</Typography>
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

export default LayerReporting;
