import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { Psychology, Memory, BubbleChart, SmartToy } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import PlatformBreadcrumb from "@/components/PlatformBreadcrumb";

const models = [
  { name: "Trade Anomaly Detector", type: "ML Classification", accuracy: "97.3%", status: "active", lastTrained: "2 days ago" },
  { name: "NAV Deviation Predictor", type: "Time Series", accuracy: "94.1%", status: "active", lastTrained: "1 week ago" },
  { name: "Document Classifier", type: "LLM (GPT-4o)", accuracy: "99.2%", status: "active", lastTrained: "N/A" },
  { name: "Cash Flow Forecaster", type: "Regression", accuracy: "91.8%", status: "training", lastTrained: "In progress" },
  { name: "Sentiment Analyzer", type: "LLM (Claude)", accuracy: "96.5%", status: "active", lastTrained: "N/A" },
  { name: "Fraud Pattern Detector", type: "Ensemble", accuracy: "98.7%", status: "inactive", lastTrained: "3 weeks ago" },
];

const LayerIntelligence = () => {
  const theme = useTheme();
  const color = theme.palette.success.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PlatformBreadcrumb layerNumber={4} layerName="Intelligence" />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label="Layer 4" size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>Intelligence & Anomaly Detection</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Machine learning models, anomaly alerting, and LLM configuration for intelligent automation.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {models.map((model) => (
              <motion.div key={model.name} variants={fadeInUp}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                        {model.type.includes('LLM') ? <SmartToy /> : <BubbleChart />}
                      </Box>
                      <Chip
                        label={model.status === 'active' ? 'Active' : model.status === 'training' ? 'Training' : 'Inactive'}
                        size="small"
                        sx={{
                          bgcolor: model.status === 'active' ? alpha(theme.palette.success.main, 0.1) : model.status === 'training' ? alpha(theme.palette.info.main, 0.1) : alpha(theme.palette.text.secondary, 0.1),
                          color: model.status === 'active' ? 'success.main' : model.status === 'training' ? 'info.main' : 'text.secondary',
                          fontWeight: 500,
                        }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{model.name}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>{model.type}</Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Typography variant="caption" color="text.secondary">Accuracy: {model.accuracy}</Typography>
                      <Typography variant="caption" color="text.secondary">Trained: {model.lastTrained}</Typography>
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

export default LayerIntelligence;
