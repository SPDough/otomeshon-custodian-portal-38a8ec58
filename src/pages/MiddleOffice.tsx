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
  LinearProgress,
  useTheme,
} from "@mui/material";
import {
  Shield as ShieldIcon,
  PlayArrow as AutomationIcon,
  AccountTree as WorkflowIcon,
  Schedule as ScheduleIcon,
  Analytics as AnalyticsIcon,
  ArrowForward,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const MiddleOffice = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    { 
      title: "Risk Management", 
      description: "Monitor and manage portfolio risk with real-time alerts and compliance checks",
      icon: <ShieldIcon />, 
      path: "/workflows",
      stats: "Low Risk",
      color: theme.palette.success.main
    },
    { 
      title: "Automation Rules", 
      description: "Configure event-driven automation for trade execution and reconciliation",
      icon: <AutomationIcon />, 
      path: "/workflows",
      stats: "24 Active",
      color: theme.palette.primary.main
    },
    { 
      title: "Process Flows", 
      description: "Design and manage multi-step operational workflows",
      icon: <WorkflowIcon />, 
      path: "/workflow-config",
      stats: "8 Running",
      color: theme.palette.info.main
    },
    { 
      title: "Scheduled Tasks", 
      description: "Schedule recurring jobs for reports, reconciliation, and data syncs",
      icon: <ScheduleIcon />, 
      path: "/workflow-config",
      stats: "12 Scheduled",
      color: theme.palette.warning.main
    },
    { 
      title: "Analytics", 
      description: "Operational metrics and performance insights across all processes",
      icon: <AnalyticsIcon />, 
      path: "/results",
      stats: "Real-time",
      color: theme.palette.secondary.main
    },
  ];

  const activeProcesses = [
    { name: "Daily Reconciliation", progress: 78, status: "running" },
    { name: "Risk Assessment", progress: 100, status: "complete" },
    { name: "NAV Calculation", progress: 45, status: "running" },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip 
              label="Middle Office" 
              size="small" 
              sx={{ 
                mb: 2, 
                bgcolor: alpha(theme.palette.info.main, 0.1), 
                color: 'info.main',
                fontWeight: 500 
              }} 
            />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              Operations & Automation
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Streamline middle office operations with intelligent automation, risk management, and process orchestration.
            </Typography>
          </Box>
        </motion.div>

        {/* Active Processes */}
        <motion.div variants={fadeInUp}>
          <Card sx={{ mb: 4, bgcolor: alpha(theme.palette.background.paper, 0.7) }}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} sx={{ mb: 3 }}>
                Active Processes
              </Typography>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                {activeProcesses.map((process) => (
                  <Box key={process.name}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{process.name}</Typography>
                      <Typography variant="body2" color="text.secondary">{process.progress}%</Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={process.progress} 
                      color={process.status === 'complete' ? 'success' : 'primary'}
                      sx={{ height: 6, borderRadius: 3 }}
                    />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
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
                      <Typography variant="body2" fontWeight={500}>Configure</Typography>
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

export default MiddleOffice;
