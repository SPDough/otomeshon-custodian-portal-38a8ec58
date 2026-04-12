import { useParams, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, Chip, alpha, useTheme,
  TextField, MenuItem, Button, IconButton, Tooltip, Divider,
} from "@mui/material";
import {
  ArrowBack, Delete as DeleteIcon, SmartToy as AgentIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { useAgents, type Agent } from "@/hooks/useAgents";

const MODELS = ["gemini-2.5-flash", "gemini-2.5-pro", "gpt-5-mini", "gpt-5"];

const AgentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });
  const { agents, isLoading, updateAgent, deleteAgent } = useAgents();

  const agent = agents.find((a) => a.id === id);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [persona, setPersona] = useState("");
  const [model, setModel] = useState("gemini-2.5-flash");
  const [status, setStatus] = useState<"enabled" | "disabled">("enabled");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setDescription(agent.description ?? "");
      setPersona(agent.persona ?? "");
      setModel(agent.model ?? "gemini-2.5-flash");
      setStatus(agent.status);
      setDirty(false);
    }
  }, [agent]);

  const handleSave = () => {
    if (!agent || !name.trim()) return;
    updateAgent.mutate(
      { id: agent.id, name: name.trim(), description, persona, model, status },
      {
        onSuccess: () => { toast.success(fm("agents.editSave")); setDirty(false); },
        onError: () => toast.error("Save failed"),
      },
    );
  };

  const handleDelete = () => {
    if (!agent) return;
    deleteAgent.mutate(agent.id, {
      onSuccess: () => { toast.success(fm("agents.deleteSuccess")); navigate("/agents"); },
      onError: () => toast.error("Delete failed"),
    });
  };

  if (isLoading) {
    return (
      <AnimatedPage>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography>{fm("agents.loading")}</Typography>
        </Container>
      </AnimatedPage>
    );
  }

  if (!agent) {
    return (
      <AnimatedPage>
        <Container maxWidth="md" sx={{ py: 6 }}>
          <Typography>{fm("agents.notFound")}</Typography>
          <Button startIcon={<ArrowBack />} onClick={() => navigate("/agents")} sx={{ mt: 2 }}>
            {fm("agents.backToAgents")}
          </Button>
        </Container>
      </AnimatedPage>
    );
  }

  const color = theme.palette.primary.main;

  return (
    <AnimatedPage>
      <Container maxWidth="md" sx={{ py: { xs: 4, md: 6 } }}>
        <AppBreadcrumb crumbs={[
          { labelId: "breadcrumb.agents", path: "/agents" },
          { labelId: `__literal:${agent.name}` },
        ]} />

        <motion.div variants={fadeInUp}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 4 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Box sx={{ p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                <AgentIcon />
              </Box>
              <Box>
                <Typography variant="h4" fontWeight={600}>{agent.name}</Typography>
                <Chip
                  label={status === "enabled" ? fm("agents.statusEnabled") : fm("agents.statusDisabled")}
                  size="small"
                  sx={{
                    mt: 0.5,
                    bgcolor: alpha(status === "enabled" ? theme.palette.success.main : theme.palette.error.main, 0.1),
                    color: status === "enabled" ? theme.palette.success.main : theme.palette.error.main,
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
            <Tooltip title={fm("agents.deleteAgent")}>
              <IconButton color="error" onClick={handleDelete}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </motion.div>

        <Card>
          <CardContent sx={{ display: "flex", flexDirection: "column", gap: 3, p: 4 }}>
            <TextField
              label={fm("agents.createName")}
              value={name}
              onChange={(e) => { setName(e.target.value); setDirty(true); }}
              fullWidth
              inputProps={{ maxLength: 100 }}
            />
            <TextField
              label={fm("agents.createDescription")}
              value={description}
              onChange={(e) => { setDescription(e.target.value); setDirty(true); }}
              fullWidth
              multiline
              rows={2}
              inputProps={{ maxLength: 500 }}
            />
            <TextField
              label={fm("agents.createPersona")}
              value={persona}
              onChange={(e) => { setPersona(e.target.value); setDirty(true); }}
              fullWidth
              multiline
              rows={3}
              inputProps={{ maxLength: 500 }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                select
                label={fm("agents.createModel")}
                value={model}
                onChange={(e) => { setModel(e.target.value); setDirty(true); }}
                fullWidth
              >
                {MODELS.map((m) => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </TextField>
              <TextField
                select
                label={fm("agents.editStatus")}
                value={status}
                onChange={(e) => { setStatus(e.target.value as "enabled" | "disabled"); setDirty(true); }}
                fullWidth
              >
                <MenuItem value="enabled">{fm("agents.statusEnabled")}</MenuItem>
                <MenuItem value="disabled">{fm("agents.statusDisabled")}</MenuItem>
              </TextField>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
              <Button variant="outlined" onClick={() => navigate("/agents")}>{fm("agents.editCancel")}</Button>
              <Button variant="contained" onClick={handleSave} disabled={!dirty || !name.trim()}>
                {fm("agents.editSave")}
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </AnimatedPage>
  );
};

export default AgentDetail;
