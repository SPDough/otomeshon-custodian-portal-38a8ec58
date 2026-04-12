import { useParams, useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, Chip, alpha, useTheme,
  TextField, MenuItem, Button, IconButton, Tooltip, Divider,
} from "@mui/material";
import {
  ArrowBack, Delete as DeleteIcon, SmartToy as AgentIcon,
  Add as AddIcon, Close as CloseIcon,
} from "@mui/icons-material";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";
import { useAgents, type Agent } from "@/hooks/useAgents";

const MODELS = ["gemini-2.5-flash", "gemini-2.5-pro", "gpt-5-mini", "gpt-5"];

const AVAILABLE_TOOLS = [
  "web_search", "code_interpreter", "file_reader", "api_caller",
  "calculator", "email_sender", "pdf_parser", "data_visualizer",
];

const AVAILABLE_DATA_BINDINGS = [
  "Market Data API", "Fund Holdings", "Benchmark Indices", "Counterparty DB",
  "NAV Feed", "FX Rates", "Corporate Actions Feed", "Regulatory Reports",
];

const AVAILABLE_CALC_POLICIES = [
  "NAV Computation", "Fee Accruals", "FX Conversion", "P&L Attribution",
  "Risk Metrics", "Performance Attribution", "Tax Lot Accounting",
];

const AVAILABLE_RULE_SETS = [
  "Trade Limits", "Concentration Checks", "Regulatory Thresholds", "Approval Gates",
  "Compliance Screening", "Margin Requirements", "Counterparty Exposure",
];

const AVAILABLE_WORKFLOWS = [
  "Trade Settlement", "Corporate Actions", "Reconciliation", "Client Onboarding",
  "NAV Calculation Pipeline", "Regulatory Filing", "Rebalancing",
];

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
  const [tools, setTools] = useState<string[]>([]);
  const [dataBindings, setDataBindings] = useState<string[]>([]);
  const [calcPolicies, setCalcPolicies] = useState<string[]>([]);
  const [ruleSets, setRuleSets] = useState<string[]>([]);
  const [workflows, setWorkflows] = useState<string[]>([]);
  const [newTool, setNewTool] = useState("");
  const [newBinding, setNewBinding] = useState("");
  const [newCalc, setNewCalc] = useState("");
  const [newRule, setNewRule] = useState("");
  const [newWorkflow, setNewWorkflow] = useState("");
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    if (agent) {
      setName(agent.name);
      setDescription(agent.description ?? "");
      setPersona(agent.persona ?? "");
      setModel(agent.model ?? "gemini-2.5-flash");
      setStatus(agent.status);
      setTools(agent.tools ?? []);
      setDataBindings(agent.data_bindings ?? []);
      setCalcPolicies(agent.calculation_policies ?? []);
      setRuleSets(agent.rule_sets ?? []);
      setWorkflows(agent.workflows ?? []);
      setDirty(false);
    }
  }, [agent]);

  const handleSave = () => {
    if (!agent || !name.trim()) return;
    updateAgent.mutate(
      { id: agent.id, name: name.trim(), description, persona, model, status, tools, data_bindings: dataBindings, calculation_policies: calcPolicies, rule_sets: ruleSets, workflows },
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

  const addCustomItem = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
    inputSetter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const trimmed = value.trim();
    if (!trimmed || list.includes(trimmed)) return;
    setter([...list, trimmed]);
    inputSetter("");
    setDirty(true);
  };

  const toggleChip = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setter(list.includes(value) ? list.filter((v) => v !== value) : [...list, value]);
    setDirty(true);
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

        <Card sx={{ mb: 3 }}>
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
          </CardContent>
        </Card>

        {/* Tools */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {fm("agents.toolsTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {fm("agents.toolsDesc")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {AVAILABLE_TOOLS.map((tool) => {
                const selected = tools.includes(tool);
                return (
                  <Chip
                    key={tool}
                    label={tool}
                    onClick={() => toggleChip(tool, tools, setTools)}
                    color={selected ? "primary" : "default"}
                    variant={selected ? "filled" : "outlined"}
                    sx={{ fontWeight: selected ? 600 : 400 }}
                  />
                );
              })}
              {/* Custom tools (not in predefined list) */}
              {tools.filter((t) => !AVAILABLE_TOOLS.includes(t)).map((tool) => (
                <Chip
                  key={tool}
                  label={tool}
                  color="primary"
                  onDelete={() => { setTools(tools.filter((t) => t !== tool)); setDirty(true); }}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder={fm("agents.addCustomTool")}
                value={newTool}
                onChange={(e) => setNewTool(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomItem(newTool, tools, setTools, setNewTool); } }}
                inputProps={{ maxLength: 60 }}
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => addCustomItem(newTool, tools, setTools, setNewTool)}
                disabled={!newTool.trim()}
              >
                {fm("agents.addButton")}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Data Bindings */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {fm("agents.dataBindingsTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {fm("agents.dataBindingsDetailDesc")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {AVAILABLE_DATA_BINDINGS.map((binding) => {
                const selected = dataBindings.includes(binding);
                return (
                  <Chip
                    key={binding}
                    label={binding}
                    onClick={() => toggleChip(binding, dataBindings, setDataBindings)}
                    color={selected ? "secondary" : "default"}
                    variant={selected ? "filled" : "outlined"}
                    sx={{ fontWeight: selected ? 600 : 400 }}
                  />
                );
              })}
              {/* Custom bindings */}
              {dataBindings.filter((b) => !AVAILABLE_DATA_BINDINGS.includes(b)).map((binding) => (
                <Chip
                  key={binding}
                  label={binding}
                  color="secondary"
                  onDelete={() => { setDataBindings(dataBindings.filter((b) => b !== binding)); setDirty(true); }}
                  sx={{ fontWeight: 600 }}
                />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField
                size="small"
                placeholder={fm("agents.addCustomBinding")}
                value={newBinding}
                onChange={(e) => setNewBinding(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomItem(newBinding, dataBindings, setDataBindings, setNewBinding); } }}
                inputProps={{ maxLength: 60 }}
                sx={{ flex: 1 }}
              />
              <Button
                variant="outlined"
                size="small"
                startIcon={<AddIcon />}
                onClick={() => addCustomItem(newBinding, dataBindings, setDataBindings, setNewBinding)}
                disabled={!newBinding.trim()}
              >
                {fm("agents.addButton")}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Calculation Policies */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {fm("agents.calcPoliciesTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {fm("agents.calcPoliciesDesc")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {AVAILABLE_CALC_POLICIES.map((p) => {
                const selected = calcPolicies.includes(p);
                return (
                  <Chip key={p} label={p} onClick={() => toggleChip(p, calcPolicies, setCalcPolicies)}
                    color={selected ? "primary" : "default"} variant={selected ? "filled" : "outlined"}
                    sx={{ fontWeight: selected ? 600 : 400 }} />
                );
              })}
              {calcPolicies.filter((p) => !AVAILABLE_CALC_POLICIES.includes(p)).map((p) => (
                <Chip key={p} label={p} color="primary"
                  onDelete={() => { setCalcPolicies(calcPolicies.filter((v) => v !== p)); setDirty(true); }}
                  sx={{ fontWeight: 600 }} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField size="small" placeholder={fm("agents.addCustomCalc")} value={newCalc}
                onChange={(e) => setNewCalc(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomItem(newCalc, calcPolicies, setCalcPolicies, setNewCalc); } }}
                inputProps={{ maxLength: 60 }} sx={{ flex: 1 }} />
              <Button variant="outlined" size="small" startIcon={<AddIcon />}
                onClick={() => addCustomItem(newCalc, calcPolicies, setCalcPolicies, setNewCalc)}
                disabled={!newCalc.trim()}>{fm("agents.addButton")}</Button>
            </Box>
          </CardContent>
        </Card>

        {/* Rule Sets */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {fm("agents.ruleSetsTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {fm("agents.ruleSetsDetailDesc")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {AVAILABLE_RULE_SETS.map((r) => {
                const selected = ruleSets.includes(r);
                return (
                  <Chip key={r} label={r} onClick={() => toggleChip(r, ruleSets, setRuleSets)}
                    color={selected ? "secondary" : "default"} variant={selected ? "filled" : "outlined"}
                    sx={{ fontWeight: selected ? 600 : 400 }} />
                );
              })}
              {ruleSets.filter((r) => !AVAILABLE_RULE_SETS.includes(r)).map((r) => (
                <Chip key={r} label={r} color="secondary"
                  onDelete={() => { setRuleSets(ruleSets.filter((v) => v !== r)); setDirty(true); }}
                  sx={{ fontWeight: 600 }} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField size="small" placeholder={fm("agents.addCustomRule")} value={newRule}
                onChange={(e) => setNewRule(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomItem(newRule, ruleSets, setRuleSets, setNewRule); } }}
                inputProps={{ maxLength: 60 }} sx={{ flex: 1 }} />
              <Button variant="outlined" size="small" startIcon={<AddIcon />}
                onClick={() => addCustomItem(newRule, ruleSets, setRuleSets, setNewRule)}
                disabled={!newRule.trim()}>{fm("agents.addButton")}</Button>
            </Box>
          </CardContent>
        </Card>

        {/* Workflow Orchestration */}
        <Card sx={{ mb: 3 }}>
          <CardContent sx={{ p: 4 }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
              {fm("agents.workflowsTitle")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {fm("agents.workflowsDetailDesc")}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
              {AVAILABLE_WORKFLOWS.map((w) => {
                const selected = workflows.includes(w);
                return (
                  <Chip key={w} label={w} onClick={() => toggleChip(w, workflows, setWorkflows)}
                    color={selected ? "primary" : "default"} variant={selected ? "filled" : "outlined"}
                    sx={{ fontWeight: selected ? 600 : 400 }} />
                );
              })}
              {workflows.filter((w) => !AVAILABLE_WORKFLOWS.includes(w)).map((w) => (
                <Chip key={w} label={w} color="primary"
                  onDelete={() => { setWorkflows(workflows.filter((v) => v !== w)); setDirty(true); }}
                  sx={{ fontWeight: 600 }} />
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <TextField size="small" placeholder={fm("agents.addCustomWorkflow")} value={newWorkflow}
                onChange={(e) => setNewWorkflow(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addCustomItem(newWorkflow, workflows, setWorkflows, setNewWorkflow); } }}
                inputProps={{ maxLength: 60 }} sx={{ flex: 1 }} />
              <Button variant="outlined" size="small" startIcon={<AddIcon />}
                onClick={() => addCustomItem(newWorkflow, workflows, setWorkflows, setNewWorkflow)}
                disabled={!newWorkflow.trim()}>{fm("agents.addButton")}</Button>
            </Box>
          </CardContent>
        </Card>

        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
          <Button variant="outlined" onClick={() => navigate("/agents")}>{fm("agents.editCancel")}</Button>
          <Button variant="contained" onClick={handleSave} disabled={!dirty || !name.trim()}>
            {fm("agents.editSave")}
          </Button>
        </Box>
      </Container>
    </AnimatedPage>
  );
};

export default AgentDetail;
