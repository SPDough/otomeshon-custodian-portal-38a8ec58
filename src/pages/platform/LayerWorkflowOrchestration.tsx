import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { AccountTree, SmartToy, Settings, PlayArrow } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const workflows = [
  { name: "Trade Settlement", type: "Deterministic", steps: 12, status: "active", runs: "1.2K/day" },
  { name: "Exception Triage", type: "Agentic", steps: 8, status: "active", runs: "340/day" },
  { name: "NAV Calculation", type: "Deterministic", steps: 18, status: "active", runs: "2/day" },
  { name: "Client Report Generation", type: "Agentic", steps: 6, status: "active", runs: "50/day" },
  { name: "Regulatory Filing", type: "Hybrid", steps: 15, status: "draft", runs: "—" },
  { name: "Onboarding Pipeline", type: "Agentic", steps: 22, status: "active", runs: "5/week" },
];

const LayerWorkflowOrchestration = () => {
  const theme = useTheme();
  const color = theme.palette.secondary.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label="Layer 6" size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>Workflow Orchestration</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Design and manage workflows with agentic and deterministic execution modes.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {workflows.map((wf) => (
              <motion.div key={wf.name} variants={fadeInUp}>
                <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                        {wf.type === 'Agentic' ? <SmartToy /> : wf.type === 'Hybrid' ? <Settings /> : <AccountTree />}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip label={wf.type} size="small" variant="outlined" sx={{ borderColor: 'divider' }} />
                        <Chip
                          label={wf.status === 'active' ? 'Active' : 'Draft'}
                          size="small"
                          sx={{
                            bgcolor: wf.status === 'active' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.text.secondary, 0.1),
                            color: wf.status === 'active' ? 'success.main' : 'text.secondary',
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{wf.name}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {wf.steps} steps · {wf.runs}
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

export default LayerWorkflowOrchestration;
