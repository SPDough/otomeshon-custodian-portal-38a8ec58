import { useState } from 'react';
import { useIntl } from 'react-intl';
import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, CardHeader, TextField, Button, Switch, FormControlLabel, Select, MenuItem, FormControl, InputLabel, Paper, Accordion, AccordionSummary, AccordionDetails, Alert } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Save as SaveIcon, Settings as SettingsIcon, Memory as MemoryIcon, Speed as SpeedIcon } from '@mui/icons-material';
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";

const WorkflowConfiguration = () => {
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const [config, setConfig] = useState({
    langchain: { llmProvider: 'openai', model: 'gpt-4', temperature: 0.7, maxTokens: 2000, apiKey: '', baseUrl: '', enableLogging: true, enableCaching: false, retryAttempts: 3, timeout: 30000 },
    langgraph: { executionMode: 'sequential', maxIterations: 10, enableCheckpoints: true, persistenceBackend: 'memory', enableParallel: false, errorHandling: 'continue', debugMode: false, stateSchema: '' },
    workflows: { autoSave: true, versionControl: true, enableMetrics: true, logLevel: 'info', enableWebhooks: false, webhookUrl: '' }
  });

  const handleConfigChange = (section: string, field: string, value: any) => {
    setConfig(prev => ({ ...prev, [section]: { ...prev[section as keyof typeof prev], [field]: value } }));
  };

  const resetToDefaults = () => {
    setConfig({
      langchain: { llmProvider: 'openai', model: 'gpt-4', temperature: 0.7, maxTokens: 2000, apiKey: '', baseUrl: '', enableLogging: true, enableCaching: false, retryAttempts: 3, timeout: 30000 },
      langgraph: { executionMode: 'sequential', maxIterations: 10, enableCheckpoints: true, persistenceBackend: 'memory', enableParallel: false, errorHandling: 'continue', debugMode: false, stateSchema: '' },
      workflows: { autoSave: true, versionControl: true, enableMetrics: true, logLevel: 'info', enableWebhooks: false, webhookUrl: '' }
    });
  };

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AppBreadcrumb crumbs={[{ labelId: "breadcrumb.middleOffice", path: "/middle-office" }, { labelId: "breadcrumb.workflowConfig" }]} />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h3" component="h1" gutterBottom>{fm("workflowConfig.title")}</Typography>
            <Typography variant="h6" color="text.secondary">{fm("workflowConfig.subtitle")}</Typography>
          </Box>
          <Alert severity="info" sx={{ mb: 3 }}>{fm("workflowConfig.changeNotice")}</Alert>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Accordion defaultExpanded sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><MemoryIcon color="primary" /><Typography variant="h5">{fm("workflowConfig.langchainTitle")}</Typography></Box></AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl fullWidth><InputLabel>{fm("workflowConfig.llmProvider")}</InputLabel><Select value={config.langchain.llmProvider} label={fm("workflowConfig.llmProvider")} onChange={(e) => handleConfigChange('langchain', 'llmProvider', e.target.value)}><MenuItem value="openai">OpenAI</MenuItem><MenuItem value="anthropic">Anthropic</MenuItem><MenuItem value="azure">Azure OpenAI</MenuItem><MenuItem value="google">Google AI</MenuItem><MenuItem value="cohere">Cohere</MenuItem></Select></FormControl>
                  <FormControl fullWidth><InputLabel>{fm("workflowConfig.model")}</InputLabel><Select value={config.langchain.model} label={fm("workflowConfig.model")} onChange={(e) => handleConfigChange('langchain', 'model', e.target.value)}><MenuItem value="gpt-4">GPT-4</MenuItem><MenuItem value="gpt-4-turbo">GPT-4 Turbo</MenuItem><MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem><MenuItem value="claude-3-opus">Claude 3 Opus</MenuItem><MenuItem value="claude-3-sonnet">Claude 3 Sonnet</MenuItem></Select></FormControl>
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <TextField fullWidth label={fm("workflowConfig.temperature")} type="number" inputProps={{ min: 0, max: 2, step: 0.1 }} value={config.langchain.temperature} onChange={(e) => handleConfigChange('langchain', 'temperature', parseFloat(e.target.value))} helperText={fm("workflowConfig.temperatureHelper")} />
                  <TextField fullWidth label={fm("workflowConfig.maxTokens")} type="number" inputProps={{ min: 1, max: 32000 }} value={config.langchain.maxTokens} onChange={(e) => handleConfigChange('langchain', 'maxTokens', parseInt(e.target.value))} helperText={fm("workflowConfig.maxTokensHelper")} />
                </Box>
                <TextField fullWidth label={fm("workflowConfig.apiKey")} type="password" value={config.langchain.apiKey} onChange={(e) => handleConfigChange('langchain', 'apiKey', e.target.value)} helperText={fm("workflowConfig.apiKeyHelper")} />
                <TextField fullWidth label={fm("workflowConfig.baseUrl")} value={config.langchain.baseUrl} onChange={(e) => handleConfigChange('langchain', 'baseUrl', e.target.value)} helperText={fm("workflowConfig.baseUrlHelper")} />
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                  <TextField label={fm("workflowConfig.retryAttempts")} type="number" inputProps={{ min: 0, max: 10 }} value={config.langchain.retryAttempts} onChange={(e) => handleConfigChange('langchain', 'retryAttempts', parseInt(e.target.value))} />
                  <TextField label={fm("workflowConfig.timeout")} type="number" inputProps={{ min: 1000, max: 300000 }} value={config.langchain.timeout} onChange={(e) => handleConfigChange('langchain', 'timeout', parseInt(e.target.value))} />
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1 }}>
                    <FormControlLabel control={<Switch checked={config.langchain.enableLogging} onChange={(e) => handleConfigChange('langchain', 'enableLogging', e.target.checked)} />} label={fm("workflowConfig.enableLogging")} />
                    <FormControlLabel control={<Switch checked={config.langchain.enableCaching} onChange={(e) => handleConfigChange('langchain', 'enableCaching', e.target.checked)} />} label={fm("workflowConfig.enableCaching")} />
                  </Box>
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded sx={{ mb: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><SpeedIcon color="primary" /><Typography variant="h5">{fm("workflowConfig.langgraphTitle")}</Typography></Box></AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl fullWidth><InputLabel>{fm("workflowConfig.executionMode")}</InputLabel><Select value={config.langgraph.executionMode} label={fm("workflowConfig.executionMode")} onChange={(e) => handleConfigChange('langgraph', 'executionMode', e.target.value)}><MenuItem value="sequential">{fm("workflowConfig.sequential")}</MenuItem><MenuItem value="parallel">{fm("workflowConfig.parallel")}</MenuItem><MenuItem value="dynamic">{fm("workflowConfig.dynamic")}</MenuItem></Select></FormControl>
                  <TextField fullWidth label={fm("workflowConfig.maxIterations")} type="number" inputProps={{ min: 1, max: 1000 }} value={config.langgraph.maxIterations} onChange={(e) => handleConfigChange('langgraph', 'maxIterations', parseInt(e.target.value))} helperText={fm("workflowConfig.maxIterationsHelper")} />
                </Box>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl fullWidth><InputLabel>{fm("workflowConfig.persistenceBackend")}</InputLabel><Select value={config.langgraph.persistenceBackend} label={fm("workflowConfig.persistenceBackend")} onChange={(e) => handleConfigChange('langgraph', 'persistenceBackend', e.target.value)}><MenuItem value="memory">Memory</MenuItem><MenuItem value="redis">Redis</MenuItem><MenuItem value="postgresql">PostgreSQL</MenuItem><MenuItem value="sqlite">SQLite</MenuItem></Select></FormControl>
                  <FormControl fullWidth><InputLabel>{fm("workflowConfig.errorHandling")}</InputLabel><Select value={config.langgraph.errorHandling} label={fm("workflowConfig.errorHandling")} onChange={(e) => handleConfigChange('langgraph', 'errorHandling', e.target.value)}><MenuItem value="continue">{fm("workflowConfig.continueOnError")}</MenuItem><MenuItem value="stop">{fm("workflowConfig.stopOnError")}</MenuItem><MenuItem value="retry">{fm("workflowConfig.retryOnError")}</MenuItem></Select></FormControl>
                </Box>
                <TextField fullWidth label={fm("workflowConfig.stateSchema")} multiline rows={4} value={config.langgraph.stateSchema} onChange={(e) => handleConfigChange('langgraph', 'stateSchema', e.target.value)} helperText={fm("workflowConfig.stateSchemaHelper")} placeholder='{"messages": "list", "current_step": "string"}' />
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                  <FormControlLabel control={<Switch checked={config.langgraph.enableCheckpoints} onChange={(e) => handleConfigChange('langgraph', 'enableCheckpoints', e.target.checked)} />} label={fm("workflowConfig.enableCheckpoints")} />
                  <FormControlLabel control={<Switch checked={config.langgraph.enableParallel} onChange={(e) => handleConfigChange('langgraph', 'enableParallel', e.target.checked)} />} label={fm("workflowConfig.enableParallel")} />
                  <FormControlLabel control={<Switch checked={config.langgraph.debugMode} onChange={(e) => handleConfigChange('langgraph', 'debugMode', e.target.checked)} />} label={fm("workflowConfig.debugMode")} />
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded sx={{ mb: 3 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}><Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><SettingsIcon color="primary" /><Typography variant="h5">{fm("workflowConfig.workflowSettings")}</Typography></Box></AccordionSummary>
            <AccordionDetails>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <FormControl sx={{ minWidth: 200 }}><InputLabel>{fm("workflowConfig.logLevel")}</InputLabel><Select value={config.workflows.logLevel} label={fm("workflowConfig.logLevel")} onChange={(e) => handleConfigChange('workflows', 'logLevel', e.target.value)}><MenuItem value="debug">Debug</MenuItem><MenuItem value="info">Info</MenuItem><MenuItem value="warning">Warning</MenuItem><MenuItem value="error">Error</MenuItem></Select></FormControl>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1 }}>
                    <FormControlLabel control={<Switch checked={config.workflows.autoSave} onChange={(e) => handleConfigChange('workflows', 'autoSave', e.target.checked)} />} label={fm("workflowConfig.autoSave")} />
                    <FormControlLabel control={<Switch checked={config.workflows.versionControl} onChange={(e) => handleConfigChange('workflows', 'versionControl', e.target.checked)} />} label={fm("workflowConfig.versionControl")} />
                    <FormControlLabel control={<Switch checked={config.workflows.enableMetrics} onChange={(e) => handleConfigChange('workflows', 'enableMetrics', e.target.checked)} />} label={fm("workflowConfig.enableMetrics")} />
                  </Box>
                </Box>
                <Box>
                  <FormControlLabel control={<Switch checked={config.workflows.enableWebhooks} onChange={(e) => handleConfigChange('workflows', 'enableWebhooks', e.target.checked)} />} label={fm("workflowConfig.enableWebhooks")} />
                  {config.workflows.enableWebhooks && <TextField fullWidth label={fm("workflowConfig.webhookUrl")} value={config.workflows.webhookUrl} onChange={(e) => handleConfigChange('workflows', 'webhookUrl', e.target.value)} helperText={fm("workflowConfig.webhookUrlHelper")} sx={{ mt: 2 }} />}
                </Box>
              </Box>
            </AccordionDetails>
          </Accordion>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paper sx={{ p: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button variant="outlined" onClick={resetToDefaults}>{fm("workflowConfig.resetDefaults")}</Button>
            <Button variant="contained" startIcon={<SaveIcon />} onClick={() => console.log('Saving:', config)} size="large">{fm("workflowConfig.saveConfig")}</Button>
          </Paper>

          <Card sx={{ mt: 3 }}>
            <CardHeader title={fm("workflowConfig.configPreview")} />
            <CardContent>
              <pre style={{ background: '#f5f5f5', padding: '16px', borderRadius: '4px', overflow: 'auto', fontSize: '12px' }}>{JSON.stringify(config, null, 2)}</pre>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default WorkflowConfiguration;