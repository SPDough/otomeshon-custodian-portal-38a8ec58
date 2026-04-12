import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme,
  LinearProgress, Divider, Skeleton, IconButton, Tooltip,
} from "@mui/material";
import {
  SmartToy as AgentIcon, Storage as DataIcon, Calculate as CalcIcon,
  Gavel as RulesIcon, AccountTree as WorkflowIcon, ArrowForward,
  Settings as ConfigIcon, CheckCircle, Circle, Edit as EditIcon,
} from "@mui/icons-material";
import { toast } from "sonner";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import AgentModuleEditDialog from "@/components/AgentModuleEditDialog";
import CreateAgentDialog from "@/components/CreateAgentDialog";
import { useAgentModules, type AgentModuleStatus, type AgentModule } from "@/hooks/useAgentModules";
import { useAgents } from "@/hooks/useAgents";
import type { ReactNode } from "react";

const statusConfig: Record<AgentModuleStatus, { colorKey: "success" | "info" | "warning"; labelId: string }> = {
  active:      { colorKey: "success", labelId: "agents.statusActive" },
  configured:  { colorKey: "info",    labelId: "agents.statusConfigured" },
  needs_setup: { colorKey: "warning", labelId: "agents.statusNeedsSetup" },
};

interface ModuleMeta {
  key: string;
  titleId: string;
  descId: string;
  icon: ReactNode;
  colorKey: "primary" | "info" | "success" | "warning" | "secondary" | "error";
  path: string;
}

const MODULE_META: ModuleMeta[] = [
  { key: "agentBuilder",         titleId: "agents.agentBuilder",         descId: "agents.agentBuilderDesc",         icon: <AgentIcon />,    colorKey: "primary",   path: "/platform-config/layer-4" },
  { key: "dataBindings",         titleId: "agents.dataBindings",         descId: "agents.dataBindingsDesc",         icon: <DataIcon />,     colorKey: "info",      path: "/platform-config/layer-0" },
  { key: "calculationPolicies",  titleId: "agents.calculationPolicies",  descId: "agents.calculationPoliciesDesc",  icon: <CalcIcon />,     colorKey: "success",   path: "/platform-config/layer-2" },
  { key: "ruleSets",             titleId: "agents.ruleSets",             descId: "agents.ruleSetsDesc",             icon: <RulesIcon />,    colorKey: "warning",   path: "/platform-config/layer-3" },
  { key: "workflowOrchestration",titleId: "agents.workflowOrchestration",descId: "agents.workflowOrchestrationDesc",icon: <WorkflowIcon />, colorKey: "secondary", path: "/platform-config/layer-6" },
  { key: "agentConfig",          titleId: "agents.agentConfig",          descId: "agents.agentConfigDesc",          icon: <ConfigIcon />,   colorKey: "error",     path: "/workflow-config" },
];

const Agents = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });
  const { modules, isLoading, updateModule } = useAgentModules();

  const [editingModule, setEditingModule] = useState<{ meta: ModuleMeta; mod: AgentModule } | null>(null);

  const handleEditClick = (e: React.MouseEvent, meta: ModuleMeta, mod: AgentModule) => {
    e.stopPropagation();
    setEditingModule({ meta, mod });
  };

  const handleSave = (data: { status: AgentModuleStatus; progress: number; configured_items: string[]; stats_label: string }) => {
    if (!editingModule) return;
    updateModule.mutate(
      { module_key: editingModule.meta.key, ...data },
      {
        onSuccess: () => {
          toast.success(fm("agents.editSave"));
          setEditingModule(null);
        },
        onError: () => toast.error("Update failed"),
      },
    );
  };

  const editColor = editingModule ? theme.palette[editingModule.meta.colorKey].main : "";

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
            {MODULE_META.map((meta) => {
              const mod = modules.find((m) => m.module_key === meta.key);
              const color = theme.palette[meta.colorKey].main;

              if (isLoading) {
                return (
                  <motion.div key={meta.key} variants={fadeInUp}>
                    <Card sx={{ height: 280, p: 3 }}>
                      <Skeleton variant="rounded" width={48} height={48} sx={{ mb: 2 }} />
                      <Skeleton width="60%" height={28} sx={{ mb: 1 }} />
                      <Skeleton width="100%" height={16} />
                      <Skeleton width="80%" height={16} sx={{ mb: 2 }} />
                      <Skeleton variant="rounded" width="100%" height={4} sx={{ mb: 2 }} />
                      <Skeleton width="100%" height={60} />
                    </Card>
                  </motion.div>
                );
              }

              const status: AgentModuleStatus = mod?.status ?? "needs_setup";
              const progress = mod?.progress ?? 0;
              const items = mod?.configured_items ?? [];
              const statsLabel = mod?.stats_label ?? "";
              const sc = statusConfig[status];
              const statusColor = theme.palette[sc.colorKey].main;

              return (
                <motion.div key={meta.key} variants={fadeInUp}>
                  <Card
                    sx={{
                      height: "100%",
                      cursor: "pointer",
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        boxShadow: `0 8px 30px ${alpha(color, 0.15)}`,
                        transform: "translateY(-4px)",
                        "& .arrow-icon": { transform: "translateX(4px)", opacity: 1 },
                        "& .edit-btn": { opacity: 1 },
                      },
                      transition: "all 0.3s ease",
                    }}
                    onClick={() => navigate(meta.path)}
                  >
                    <Box sx={{ position: "absolute", top: 0, left: 0, width: 4, height: "100%", bgcolor: color }} />
                    <CardContent sx={{ p: 3, pl: 4 }}>
                      {/* Header */}
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                        <Box sx={{ display: "inline-flex", p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                          {meta.icon}
                        </Box>
                        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                          {mod && (
                            <Tooltip title={fm("agents.editButton")}>
                              <IconButton
                                className="edit-btn"
                                size="small"
                                sx={{ opacity: 0, transition: "opacity 0.2s" }}
                                onClick={(e) => handleEditClick(e, meta, mod)}
                              >
                                <EditIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          )}
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
                          {statsLabel && (
                            <Chip label={statsLabel} size="small" variant="outlined" sx={{ borderColor: "divider" }} />
                          )}
                        </Box>
                      </Box>

                      {/* Title & description */}
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>{fm(meta.titleId)}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                        {fm(meta.descId)}
                      </Typography>

                      {/* Progress */}
                      <Box sx={{ mb: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={progress}
                          sx={{
                            height: 4,
                            borderRadius: 2,
                            bgcolor: alpha(color, 0.1),
                            "& .MuiLinearProgress-bar": { borderRadius: 2, bgcolor: color },
                          }}
                        />
                      </Box>

                      {/* Configured items */}
                      {items.length > 0 && (
                        <>
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
                                  bgcolor: alpha(color, 0.05),
                                }}
                              >
                                <Circle sx={{ fontSize: 6, color }} />
                                <Typography variant="caption" color="text.secondary">{item}</Typography>
                              </Box>
                            ))}
                          </Box>
                        </>
                      )}

                      {/* Action */}
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

      {/* Edit dialog */}
      {editingModule && (
        <AgentModuleEditDialog
          open
          onClose={() => setEditingModule(null)}
          onSave={handleSave}
          initialData={{
            status: editingModule.mod.status,
            progress: editingModule.mod.progress,
            configured_items: editingModule.mod.configured_items,
            stats_label: editingModule.mod.stats_label,
          }}
          title={fm(editingModule.meta.titleId)}
          color={editColor}
        />
      )}
    </AnimatedPage>
  );
};

export default Agents;
