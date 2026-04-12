import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme,
  LinearProgress, Divider,
} from "@mui/material";
import {
  SmartToy as AgentIcon, Storage as DataIcon, Calculate as CalcIcon,
  Gavel as RulesIcon, AccountTree as WorkflowIcon, ArrowForward,
  Settings as ConfigIcon, CheckCircle, Circle,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";

type FeatureStatus = "active" | "configured" | "needsSetup";

const statusConfig: Record<FeatureStatus, { colorKey: "success" | "info" | "warning"; labelId: string }> = {
  active:     { colorKey: "success", labelId: "agents.statusActive" },
  configured: { colorKey: "info",    labelId: "agents.statusConfigured" },
  needsSetup: { colorKey: "warning", labelId: "agents.statusNeedsSetup" },
};

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
      status: "active" as FeatureStatus,
      progress: 80,
      itemsId: "agents.agentBuilderItems",
    },
    {
      title: fm("agents.dataBindings"),
      description: fm("agents.dataBindingsDesc"),
      icon: <DataIcon />,
      stats: fm("agents.dataBindingsStats"),
      color: theme.palette.info.main,
      path: "/platform-config/layer-0",
      status: "configured" as FeatureStatus,
      progress: 100,
      itemsId: "agents.dataBindingsItems",
    },
    {
      title: fm("agents.calculationPolicies"),
      description: fm("agents.calculationPoliciesDesc"),
      icon: <CalcIcon />,
      stats: fm("agents.calculationPoliciesStats"),
      color: theme.palette.success.main,
      path: "/platform-config/layer-2",
      status: "configured" as FeatureStatus,
      progress: 100,
      itemsId: "agents.calculationPoliciesItems",
    },
    {
      title: fm("agents.ruleSets"),
      description: fm("agents.ruleSetsDesc"),
      icon: <RulesIcon />,
      stats: fm("agents.ruleSetsStats"),
      color: theme.palette.warning.main,
      path: "/platform-config/layer-3",
      status: "active" as FeatureStatus,
      progress: 65,
      itemsId: "agents.ruleSetsItems",
    },
    {
      title: fm("agents.workflowOrchestration"),
      description: fm("agents.workflowOrchestrationDesc"),
      icon: <WorkflowIcon />,
      stats: fm("agents.workflowOrchestrationStats"),
      color: theme.palette.secondary.main,
      path: "/platform-config/layer-6",
      status: "active" as FeatureStatus,
      progress: 50,
      itemsId: "agents.workflowOrchestrationItems",
    },
    {
      title: fm("agents.agentConfig"),
      description: fm("agents.agentConfigDesc"),
      icon: <ConfigIcon />,
      stats: fm("agents.agentConfigStats"),
      color: theme.palette.error.main,
      path: "/workflow-config",
      status: "needsSetup" as FeatureStatus,
      progress: 25,
      itemsId: "agents.agentConfigItems",
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
            {features.map((feature) => {
              const sc = statusConfig[feature.status];
              const statusColor = theme.palette[sc.colorKey].main;
              const items = fm(feature.itemsId).split(", ");

              return (
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
                      {/* Header row */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box sx={{ display: "inline-flex", p: 1.5, borderRadius: 2, bgcolor: alpha(feature.color, 0.1), color: feature.color }}>
                          {feature.icon}
                        </Box>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          <Chip
                            icon={<CheckCircle sx={{ fontSize: 14 }} />}
                            label={fm(sc.labelId)}
                            size="small"
                            sx={{
                              bgcolor: alpha(statusColor, 0.1),
                              color: statusColor,
                              fontWeight: 500,
                              fontSize: "0.7rem",
                              "& .MuiChip-icon": { color: statusColor },
                            }}
                          />
                          <Chip label={feature.stats} size="small" variant="outlined" sx={{ borderColor: "divider" }} />
                        </Box>
                      </Box>

                      {/* Title & description */}
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>{feature.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {feature.description}
                      </Typography>

                      {/* Progress bar */}
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={feature.progress}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            bgcolor: alpha(feature.color, 0.1),
                            "& .MuiLinearProgress-bar": {
                              borderRadius: 2,
                              bgcolor: feature.color,
                            },
                          }}
                        />
                      </Box>

                      {/* Configured items */}
                      <Divider sx={{ mb: 1.5 }} />
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5, mb: 2 }}>
                        {items.map((item) => (
                          <Box
                            key={item}
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              gap: 0.5,
                              px: 1,
                              py: 0.25,
                              borderRadius: 1,
                              bgcolor: alpha(feature.color, 0.05),
                            }}
                          >
                            <Circle sx={{ fontSize: 6, color: feature.color }} />
                            <Typography variant="caption" color="text.secondary">
                              {item}
                            </Typography>
                          </Box>
                        ))}
                      </Box>

                      {/* Action link */}
                      <Box sx={{ display: "flex", alignItems: "center", color: "primary.main" }}>
                        <Typography variant="body2" fontWeight={500}>{fm("agents.configure")}</Typography>
                        <ArrowForward className="arrow-icon" sx={{ ml: 0.5, fontSize: 16, opacity: 0, transition: "all 0.2s ease" }} />
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

export default Agents;
