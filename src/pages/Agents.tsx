import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme,
} from "@mui/material";
import {
  SmartToy as AgentIcon, Storage as DataIcon, Calculate as CalcIcon,
  Gavel as RulesIcon, AccountTree as WorkflowIcon, ArrowForward,
  Settings as ConfigIcon,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";

const Agents = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const features = [
    {
      title: fm("agents.agentBuilder"),
      description: fm("agents.agentBuilderDesc"),
      icon: <AgentIcon />,
      stats: fm("agents.agentBuilderStats"),
      color: theme.palette.primary.main,
      path: "/platform-config/layer-4",
    },
    {
      title: fm("agents.dataBindings"),
      description: fm("agents.dataBindingsDesc"),
      icon: <DataIcon />,
      stats: fm("agents.dataBindingsStats"),
      color: theme.palette.info.main,
      path: "/platform-config/layer-0",
    },
    {
      title: fm("agents.calculationPolicies"),
      description: fm("agents.calculationPoliciesDesc"),
      icon: <CalcIcon />,
      stats: fm("agents.calculationPoliciesStats"),
      color: theme.palette.success.main,
      path: "/platform-config/layer-2",
    },
    {
      title: fm("agents.ruleSets"),
      description: fm("agents.ruleSetsDesc"),
      icon: <RulesIcon />,
      stats: fm("agents.ruleSetsStats"),
      color: theme.palette.warning.main,
      path: "/platform-config/layer-3",
    },
    {
      title: fm("agents.workflowOrchestration"),
      description: fm("agents.workflowOrchestrationDesc"),
      icon: <WorkflowIcon />,
      stats: fm("agents.workflowOrchestrationStats"),
      color: theme.palette.secondary.main,
      path: "/platform-config/layer-6",
    },
    {
      title: fm("agents.agentConfig"),
      description: fm("agents.agentConfigDesc"),
      icon: <ConfigIcon />,
      stats: fm("agents.agentConfigStats"),
      color: theme.palette.error.main,
      path: "/workflow-config",
    },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <AppBreadcrumb crumbs={[{ labelId: "breadcrumb.agents" }]} />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip
              label={fm("agents.chip")}
              size="small"
              sx={{
                mb: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                color: "primary.main",
                fontWeight: 500,
              }}
            />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              {fm("agents.title")}
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, lineHeight: 1.6 }}>
              {fm("agents.subtitle")}
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: 3 }}>
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card
                  sx={{
                    height: "100%",
                    cursor: "pointer",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      boxShadow: `0 8px 30px ${alpha(feature.color, 0.15)}`,
                      transform: "translateY(-4px)",
                      "& .arrow-icon": { transform: "translateX(4px)", opacity: 1 },
                    },
                    transition: "all 0.3s ease",
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <Box sx={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", bgcolor: feature.color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                      <Box sx={{ display: "inline-flex", p: 1.5, borderRadius: 2, bgcolor: alpha(feature.color, 0.1), color: feature.color }}>
                        {feature.icon}
                      </Box>
                      <Chip label={feature.stats} size="small" variant="outlined" sx={{ borderColor: "divider" }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", color: "primary.main" }}>
                      <Typography variant="body2" fontWeight={500}>{fm("agents.configure")}</Typography>
                      <ArrowForward className="arrow-icon" sx={{ ml: 0.5, fontSize: 16, opacity: 0, transition: "all 0.2s ease" }} />
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

export default Agents;
