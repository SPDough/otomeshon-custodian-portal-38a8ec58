import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { CloudUpload, Api, Send, Storage, CheckCircle, Error as ErrorIcon } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const integrations = [
  { name: "OMS (Charles River)", type: "REST API", direction: "Outbound", status: "healthy", latency: "45ms" },
  { name: "Custodian SWIFT", type: "SWIFT MT", direction: "Outbound", status: "healthy", latency: "1.2s" },
  { name: "Bloomberg AIM", type: "FIX 4.4", direction: "Bidirectional", status: "healthy", latency: "12ms" },
  { name: "Client Portal API", type: "GraphQL", direction: "Outbound", status: "degraded", latency: "890ms" },
  { name: "Regulatory Filing (EDGAR)", type: "SFTP", direction: "Outbound", status: "healthy", latency: "3.2s" },
  { name: "Data Warehouse Export", type: "Snowflake", direction: "Outbound", status: "healthy", latency: "2.1s" },
];

const LayerOutbound = () => {
  const theme = useTheme();
  const color = theme.palette.warning.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label="Layer 8" size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>Outbound Data & System Integration</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              API endpoints, export targets, and downstream system integration health monitoring.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {integrations.map((int) => (
              <motion.div key={int.name} variants={fadeInUp}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                        {int.type.includes('API') || int.type === 'GraphQL' ? <Api /> : <Send />}
                      </Box>
                      <Chip
                        icon={int.status === 'healthy' ? <CheckCircle sx={{ fontSize: 14 }} /> : <ErrorIcon sx={{ fontSize: 14 }} />}
                        label={int.status === 'healthy' ? 'Healthy' : 'Degraded'}
                        size="small"
                        sx={{
                          bgcolor: int.status === 'healthy' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                          color: int.status === 'healthy' ? 'success.main' : 'warning.main',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{int.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{int.type} · {int.direction}</Typography>
                    <Typography variant="caption" color="text.secondary">Latency: {int.latency}</Typography>
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

export default LayerOutbound;
