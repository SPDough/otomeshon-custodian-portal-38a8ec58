import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  alpha,
  Paper,
  Chip,
  useTheme,
  TextField,
  InputAdornment,
} from "@mui/material";
import {
  Storage as StorageIcon,
  MenuBook as MenuBookIcon,
  Functions as FunctionsIcon,
  Gavel as GavelIcon,
  Psychology as PsychologyIcon,
  AutoStories as AutoStoriesIcon,
  AccountTree as AccountTreeIcon,
  Assessment as AssessmentIcon,
  CloudUpload as CloudUploadIcon,
  ArrowForward,
  Layers as LayersIcon,
  CheckCircle,
  HourglassEmpty,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const layers = [
  {
    number: 8,
    name: "Outbound Data & System Integration",
    description: "API endpoints, export targets, and downstream system integrations",
    icon: <CloudUploadIcon />,
    path: "/platform-config/layer-8",
    status: "pending",
    colorGroup: "orange",
  },
  {
    number: 7,
    name: "Agent-Enabled Reporting & Operations Dashboards",
    description: "Dashboard builder, report templates, and autonomous agent status",
    icon: <AssessmentIcon />,
    path: "/platform-config/layer-7",
    status: "pending",
    colorGroup: "purple",
  },
  {
    number: 6,
    name: "Workflow Orchestration (Agentic + Deterministic)",
    description: "Workflow designer with agent and deterministic execution modes",
    icon: <AccountTreeIcon />,
    path: "/platform-config/layer-6",
    status: "configured",
    colorGroup: "purple",
  },
  {
    number: 5,
    name: "RAG / Industry Knowledge",
    description: "Document corpus, embedding pipelines, and knowledge source management",
    icon: <AutoStoriesIcon />,
    path: "/platform-config/layer-5",
    status: "configured",
    colorGroup: "green",
  },
  {
    number: 4,
    name: "Intelligence & Anomaly Detection (ML + LLM)",
    description: "Machine learning models, anomaly alerts, and LLM configuration",
    icon: <PsychologyIcon />,
    path: "/platform-config/layer-4",
    status: "pending",
    colorGroup: "green",
  },
  {
    number: 3,
    name: "Rules & Validation (Deterministic)",
    description: "Rule sets, validation logic, exception handling, and compliance checks",
    icon: <GavelIcon />,
    path: "/platform-config/layer-3",
    status: "configured",
    colorGroup: "green",
  },
  {
    number: 2,
    name: "Calculations",
    description: "Calculation library, formula definitions, and test result validation",
    icon: <FunctionsIcon />,
    path: "/platform-config/layer-2",
    status: "configured",
    colorGroup: "blue",
  },
  {
    number: 1,
    name: "Ontology & Data Dictionaries",
    description: "Entity types, field mappings, taxonomy definitions, and FIBO alignment",
    icon: <MenuBookIcon />,
    path: "/platform-config/layer-1",
    status: "configured",
    colorGroup: "blue",
  },
  {
    number: 0,
    name: "Data Collection & Automations",
    description: "Data source connections, ingestion schedules, and automation rules",
    icon: <StorageIcon />,
    path: "/platform-config/layer-0",
    status: "configured",
    colorGroup: "blue",
  },
];

const PlatformConfig = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [filter, setFilter] = useState<'all' | 'configured' | 'pending'>('all');

  const filteredLayers = filter === 'all' ? layers : layers.filter(l => l.status === filter);

  const getColor = (group: string) => {
    switch (group) {
      case "blue": return theme.palette.info.main;
      case "green": return theme.palette.success.main;
      case "purple": return theme.palette.secondary.main;
      case "orange": return theme.palette.warning.main;
      default: return theme.palette.primary.main;
    }
  };

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip
              label="Platform Configuration"
              size="small"
              icon={<LayersIcon sx={{ fontSize: 16 }} />}
              sx={{
                mb: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: 'primary.main',
                fontWeight: 500,
              }}
            />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              Capability Stack
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.6 }}>
              Configure each layer of the platform to build end-to-end automation capabilities for your client. Layers build on each other from data collection through outbound integration.
            </Typography>
          </Box>
        </motion.div>

        {/* Stats Summary Bar */}
        <motion.div variants={fadeInUp}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr' }, gap: 2, mb: 4 }}>
            <Paper
              variant="outlined"
              onClick={() => setFilter('all')}
              sx={{
                p: 2.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer',
                borderColor: filter === 'all' ? 'primary.main' : 'divider',
                bgcolor: filter === 'all' ? alpha(theme.palette.primary.main, 0.04) : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: 'primary.main' },
              }}
            >
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', display: 'flex' }}>
                <LayersIcon />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{layers.length}</Typography>
                <Typography variant="body2" color="text.secondary">Total Layers</Typography>
              </Box>
            </Paper>
            <Paper
              variant="outlined"
              onClick={() => setFilter(filter === 'configured' ? 'all' : 'configured')}
              sx={{
                p: 2.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer',
                borderColor: filter === 'configured' ? 'success.main' : 'divider',
                bgcolor: filter === 'configured' ? alpha(theme.palette.success.main, 0.04) : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: 'success.main' },
              }}
            >
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.success.main, 0.1), color: 'success.main', display: 'flex' }}>
                <CheckCircle />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{layers.filter(l => l.status === 'configured').length}</Typography>
                <Typography variant="body2" color="text.secondary">Configured</Typography>
              </Box>
            </Paper>
            <Paper
              variant="outlined"
              onClick={() => setFilter(filter === 'pending' ? 'all' : 'pending')}
              sx={{
                p: 2.5, borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer',
                borderColor: filter === 'pending' ? 'warning.main' : 'divider',
                bgcolor: filter === 'pending' ? alpha(theme.palette.warning.main, 0.04) : 'transparent',
                transition: 'all 0.2s ease',
                '&:hover': { borderColor: 'warning.main' },
              }}
            >
              <Box sx={{ p: 1, borderRadius: 1.5, bgcolor: alpha(theme.palette.warning.main, 0.1), color: 'warning.main', display: 'flex' }}>
                <HourglassEmpty />
              </Box>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{layers.filter(l => l.status === 'pending').length}</Typography>
                <Typography variant="body2" color="text.secondary">Pending</Typography>
              </Box>
            </Paper>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate" key={filter}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {filteredLayers.map((layer) => {
              const color = getColor(layer.colorGroup);
              return (
                <motion.div key={layer.number} variants={fadeInUp}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      position: 'relative',
                      overflow: 'hidden',
                      '&:hover': {
                        boxShadow: `0 8px 30px ${alpha(color, 0.15)}`,
                        transform: 'translateY(-2px)',
                        '& .arrow-icon': { transform: 'translateX(4px)', opacity: 1 },
                      },
                      transition: 'all 0.3s ease',
                    }}
                    onClick={() => navigate(layer.path)}
                  >
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: 4,
                        height: '100%',
                        bgcolor: color,
                      }}
                    />
                    <CardContent sx={{ p: 2.5, pl: 4 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box
                          sx={{
                            display: 'inline-flex',
                            p: 1.25,
                            borderRadius: 2,
                            bgcolor: alpha(color, 0.1),
                            color: color,
                          }}
                        >
                          {layer.icon}
                        </Box>

                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 28,
                            height: 28,
                            borderRadius: '50%',
                            bgcolor: alpha(color, 0.1),
                            color: color,
                            fontWeight: 700,
                            fontSize: '0.75rem',
                          }}
                        >
                          L{layer.number}
                        </Box>

                        <Box sx={{ flex: 1, minWidth: 0 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                            {layer.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {layer.description}
                          </Typography>
                        </Box>

                        <Chip
                          label={layer.status === 'configured' ? 'Configured' : 'Pending'}
                          size="small"
                          sx={{
                            bgcolor: layer.status === 'configured'
                              ? alpha(theme.palette.success.main, 0.1)
                              : alpha(theme.palette.warning.main, 0.1),
                            color: layer.status === 'configured'
                              ? 'success.main'
                              : 'warning.main',
                            fontWeight: 500,
                          }}
                        />

                        <ArrowForward
                          className="arrow-icon"
                          sx={{ fontSize: 18, color: 'text.secondary', opacity: 0, transition: 'all 0.2s ease' }}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default PlatformConfig;
