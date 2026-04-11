import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { Functions, CheckCircle, Warning } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const calculations = [
  { name: "TWR Performance", category: "Returns", tests: 24, passing: 24, status: "passing" },
  { name: "MWR / IRR", category: "Returns", tests: 18, passing: 18, status: "passing" },
  { name: "Duration & Convexity", category: "Fixed Income", tests: 12, passing: 11, status: "warning" },
  { name: "VaR (Parametric)", category: "Risk", tests: 30, passing: 30, status: "passing" },
  { name: "Sharpe / Sortino Ratios", category: "Risk-Adjusted", tests: 8, passing: 8, status: "passing" },
  { name: "Accrued Interest", category: "Fixed Income", tests: 15, passing: 14, status: "warning" },
];

const LayerCalculations = () => {
  const theme = useTheme();
  const color = theme.palette.info.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label="Layer 2" size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>Calculations</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Calculation library, formula definitions, and automated test result validation.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {calculations.map((calc) => (
              <motion.div key={calc.name} variants={fadeInUp}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                        <Functions />
                      </Box>
                      <Chip
                        icon={calc.status === 'passing' ? <CheckCircle sx={{ fontSize: 14 }} /> : <Warning sx={{ fontSize: 14 }} />}
                        label={`${calc.passing}/${calc.tests} tests`}
                        size="small"
                        sx={{
                          bgcolor: calc.status === 'passing' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.warning.main, 0.1),
                          color: calc.status === 'passing' ? 'success.main' : 'warning.main',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{calc.name}</Typography>
                    <Typography variant="body2" color="text.secondary">{calc.category}</Typography>
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

export default LayerCalculations;
