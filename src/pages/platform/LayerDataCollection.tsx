import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme,
} from "@mui/material";
import {
  Storage as StorageIcon, CloudDownload, Schedule, CheckCircle, Error as ErrorIcon,
} from "@mui/icons-material";
import { useIntl } from "react-intl";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import PlatformBreadcrumb from "@/components/PlatformBreadcrumb";

const sources = [
  { name: "Bloomberg Terminal", type: "Market Data", status: "active", schedule: "Real-time", records: "2.4M/day" },
  { name: "Custodian SFTP", type: "Positions", status: "active", schedule: "Daily 6:00 AM", records: "45K/day" },
  { name: "Trade Blotter API", type: "Trades", status: "active", schedule: "Real-time", records: "1.2K/day" },
  { name: "Corporate Actions Feed", type: "Events", status: "error", schedule: "Hourly", records: "200/day" },
  { name: "NAV Reconciliation", type: "Accounting", status: "active", schedule: "Daily 8:00 PM", records: "5K/day" },
  { name: "Client Portal Upload", type: "Documents", status: "pending", schedule: "On-demand", records: "50/day" },
];

const LayerDataCollection = () => {
  const theme = useTheme();
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });
  const color = theme.palette.info.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PlatformBreadcrumb layerNumber={0} layerName="Data Collection" />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label={fm("layer0.chip")} size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              {fm("layer0.title")}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              {fm("layer0.subtitle")}
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {sources.map((src) => (
              <motion.div key={src.name} variants={fadeInUp}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                        {src.status === 'error' ? <ErrorIcon /> : <CloudDownload />}
                      </Box>
                      <Chip
                        icon={src.status === 'active' ? <CheckCircle sx={{ fontSize: 14 }} /> : undefined}
                        label={src.status === 'active' ? fm("layer0.statusActive") : src.status === 'error' ? fm("layer0.statusError") : fm("layer0.statusPending")}
                        size="small"
                        sx={{
                          bgcolor: src.status === 'active' ? alpha(theme.palette.success.main, 0.1) : src.status === 'error' ? alpha(theme.palette.error.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                          color: src.status === 'active' ? 'success.main' : src.status === 'error' ? 'error.main' : 'warning.main',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{src.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{src.type}</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Schedule sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">{src.schedule}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <StorageIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                        <Typography variant="caption" color="text.secondary">{src.records}</Typography>
                      </Box>
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

export default LayerDataCollection;
