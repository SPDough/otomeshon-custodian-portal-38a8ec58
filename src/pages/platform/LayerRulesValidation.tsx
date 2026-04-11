import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { Gavel, CheckCircle, Warning, Error as ErrorIcon } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import PlatformBreadcrumb from "@/components/PlatformBreadcrumb";

const ruleSets = [
  { name: "Trade Validation", rules: 45, active: 42, exceptions: 3, severity: "high" },
  { name: "Position Limits", rules: 18, active: 18, exceptions: 0, severity: "ok" },
  { name: "NAV Reconciliation", rules: 22, active: 20, exceptions: 7, severity: "warning" },
  { name: "Regulatory Compliance", rules: 35, active: 35, exceptions: 1, severity: "high" },
  { name: "Cash Flow Matching", rules: 12, active: 12, exceptions: 0, severity: "ok" },
  { name: "Corporate Action Processing", rules: 28, active: 25, exceptions: 5, severity: "warning" },
];

const LayerRulesValidation = () => {
  const theme = useTheme();
  const color = theme.palette.success.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PlatformBreadcrumb layerNumber={3} layerName="Rules & Validation" />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label="Layer 3" size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>Rules & Validation</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Deterministic rule sets, validation logic, exception handling, and compliance checks.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {ruleSets.map((rs) => (
              <motion.div key={rs.name} variants={fadeInUp}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                        <Gavel />
                      </Box>
                      <Chip
                        label={rs.exceptions === 0 ? 'Clean' : `${rs.exceptions} Exceptions`}
                        size="small"
                        sx={{
                          bgcolor: rs.severity === 'ok' ? alpha(theme.palette.success.main, 0.1) : rs.severity === 'warning' ? alpha(theme.palette.warning.main, 0.1) : alpha(theme.palette.error.main, 0.1),
                          color: rs.severity === 'ok' ? 'success.main' : rs.severity === 'warning' ? 'warning.main' : 'error.main',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{rs.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rs.active}/{rs.rules} rules active
                    </Typography>
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

export default LayerRulesValidation;
