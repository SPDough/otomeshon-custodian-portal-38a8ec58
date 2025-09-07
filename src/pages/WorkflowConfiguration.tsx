import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Paper,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Alert,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Save as SaveIcon,
  Settings as SettingsIcon,
  Memory as MemoryIcon,
  Speed as SpeedIcon,
} from '@mui/icons-material';
import { useState } from 'react';

const WorkflowConfiguration = () => {
  const [config, setConfig] = useState({
    // Langchain Configuration
    langchain: {
      llmProvider: 'openai',
      model: 'gpt-4',
      temperature: 0.7,
      maxTokens: 2000,
      apiKey: '',
      baseUrl: '',
      enableLogging: true,
      enableCaching: false,
      retryAttempts: 3,
      timeout: 30000,
    },
    // Langgraph Configuration
    langgraph: {
      executionMode: 'sequential',
      maxIterations: 10,
      enableCheckpoints: true,
      persistenceBackend: 'memory',
      enableParallel: false,
      errorHandling: 'continue',
      debugMode: false,
      stateSchema: '',
    },
    // Workflow Settings
    workflows: {
      autoSave: true,
      versionControl: true,
      enableMetrics: true,
      logLevel: 'info',
      enableWebhooks: false,
      webhookUrl: '',
    }
  });

  const handleConfigChange = (section: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const handleSaveConfiguration = () => {
    // Here you would typically save to your backend
    console.log('Saving configuration:', config);
    // Show success message
  };

  const resetToDefaults = () => {
    // Reset configuration to defaults
    setConfig({
      langchain: {
        llmProvider: 'openai',
        model: 'gpt-4',
        temperature: 0.7,
        maxTokens: 2000,
        apiKey: '',
        baseUrl: '',
        enableLogging: true,
        enableCaching: false,
        retryAttempts: 3,
        timeout: 30000,
      },
      langgraph: {
        executionMode: 'sequential',
        maxIterations: 10,
        enableCheckpoints: true,
        persistenceBackend: 'memory',
        enableParallel: false,
        errorHandling: 'continue',
        debugMode: false,
        stateSchema: '',
      },
      workflows: {
        autoSave: true,
        versionControl: true,
        enableMetrics: true,
        logLevel: 'info',
        enableWebhooks: false,
        webhookUrl: '',
      }
    });
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Workflow Configuration
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Configure Langchain and Langgraph settings for your AI workflows
        </Typography>
      </Box>

      <Alert severity="info" sx={{ mb: 3 }}>
        Changes will be applied to all new workflow executions. Existing running workflows will not be affected.
      </Alert>

      {/* Langchain Configuration */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MemoryIcon color="primary" />
            <Typography variant="h5">Langchain Configuration</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>LLM Provider</InputLabel>
                <Select
                  value={config.langchain.llmProvider}
                  label="LLM Provider"
                  onChange={(e) => handleConfigChange('langchain', 'llmProvider', e.target.value)}
                >
                  <MenuItem value="openai">OpenAI</MenuItem>
                  <MenuItem value="anthropic">Anthropic</MenuItem>
                  <MenuItem value="azure">Azure OpenAI</MenuItem>
                  <MenuItem value="google">Google AI</MenuItem>
                  <MenuItem value="cohere">Cohere</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl fullWidth>
                <InputLabel>Model</InputLabel>
                <Select
                  value={config.langchain.model}
                  label="Model"
                  onChange={(e) => handleConfigChange('langchain', 'model', e.target.value)}
                >
                  <MenuItem value="gpt-4">GPT-4</MenuItem>
                  <MenuItem value="gpt-4-turbo">GPT-4 Turbo</MenuItem>
                  <MenuItem value="gpt-3.5-turbo">GPT-3.5 Turbo</MenuItem>
                  <MenuItem value="claude-3-opus">Claude 3 Opus</MenuItem>
                  <MenuItem value="claude-3-sonnet">Claude 3 Sonnet</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <TextField
                fullWidth
                label="Temperature"
                type="number"
                inputProps={{ min: 0, max: 2, step: 0.1 }}
                value={config.langchain.temperature}
                onChange={(e) => handleConfigChange('langchain', 'temperature', parseFloat(e.target.value))}
                helperText="Controls randomness (0.0 = deterministic, 2.0 = very creative)"
              />

              <TextField
                fullWidth
                label="Max Tokens"
                type="number"
                inputProps={{ min: 1, max: 32000 }}
                value={config.langchain.maxTokens}
                onChange={(e) => handleConfigChange('langchain', 'maxTokens', parseInt(e.target.value))}
                helperText="Maximum tokens in the response"
              />
            </Box>

            <TextField
              fullWidth
              label="API Key"
              type="password"
              value={config.langchain.apiKey}
              onChange={(e) => handleConfigChange('langchain', 'apiKey', e.target.value)}
              helperText="Your LLM provider API key"
            />

            <TextField
              fullWidth
              label="Base URL (Optional)"
              value={config.langchain.baseUrl}
              onChange={(e) => handleConfigChange('langchain', 'baseUrl', e.target.value)}
              helperText="Custom base URL for API calls (leave empty for default)"
            />

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
              <TextField
                label="Retry Attempts"
                type="number"
                inputProps={{ min: 0, max: 10 }}
                value={config.langchain.retryAttempts}
                onChange={(e) => handleConfigChange('langchain', 'retryAttempts', parseInt(e.target.value))}
              />

              <TextField
                label="Timeout (ms)"
                type="number"
                inputProps={{ min: 1000, max: 300000 }}
                value={config.langchain.timeout}
                onChange={(e) => handleConfigChange('langchain', 'timeout', parseInt(e.target.value))}
              />

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.langchain.enableLogging}
                      onChange={(e) => handleConfigChange('langchain', 'enableLogging', e.target.checked)}
                    />
                  }
                  label="Enable Logging"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.langchain.enableCaching}
                      onChange={(e) => handleConfigChange('langchain', 'enableCaching', e.target.checked)}
                    />
                  }
                  label="Enable Caching"
                />
              </Box>
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Langgraph Configuration */}
      <Accordion defaultExpanded sx={{ mb: 2 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SpeedIcon color="primary" />
            <Typography variant="h5">Langgraph Configuration</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Execution Mode</InputLabel>
                <Select
                  value={config.langgraph.executionMode}
                  label="Execution Mode"
                  onChange={(e) => handleConfigChange('langgraph', 'executionMode', e.target.value)}
                >
                  <MenuItem value="sequential">Sequential</MenuItem>
                  <MenuItem value="parallel">Parallel</MenuItem>
                  <MenuItem value="dynamic">Dynamic</MenuItem>
                </Select>
              </FormControl>

              <TextField
                fullWidth
                label="Max Iterations"
                type="number"
                inputProps={{ min: 1, max: 1000 }}
                value={config.langgraph.maxIterations}
                onChange={(e) => handleConfigChange('langgraph', 'maxIterations', parseInt(e.target.value))}
                helperText="Maximum number of graph iterations"
              />
            </Box>

            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Persistence Backend</InputLabel>
                <Select
                  value={config.langgraph.persistenceBackend}
                  label="Persistence Backend"
                  onChange={(e) => handleConfigChange('langgraph', 'persistenceBackend', e.target.value)}
                >
                  <MenuItem value="memory">Memory</MenuItem>
                  <MenuItem value="redis">Redis</MenuItem>
                  <MenuItem value="postgresql">PostgreSQL</MenuItem>
                  <MenuItem value="sqlite">SQLite</MenuItem>
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel>Error Handling</InputLabel>
                <Select
                  value={config.langgraph.errorHandling}
                  label="Error Handling"
                  onChange={(e) => handleConfigChange('langgraph', 'errorHandling', e.target.value)}
                >
                  <MenuItem value="continue">Continue on Error</MenuItem>
                  <MenuItem value="stop">Stop on Error</MenuItem>
                  <MenuItem value="retry">Retry on Error</MenuItem>
                </Select>
              </FormControl>
            </Box>

            <TextField
              fullWidth
              label="State Schema (JSON)"
              multiline
              rows={4}
              value={config.langgraph.stateSchema}
              onChange={(e) => handleConfigChange('langgraph', 'stateSchema', e.target.value)}
              helperText="Define the state schema for your graph workflows"
              placeholder='{"messages": "list", "current_step": "string", "metadata": "dict"}'
            />

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.langgraph.enableCheckpoints}
                    onChange={(e) => handleConfigChange('langgraph', 'enableCheckpoints', e.target.checked)}
                  />
                }
                label="Enable Checkpoints"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={config.langgraph.enableParallel}
                    onChange={(e) => handleConfigChange('langgraph', 'enableParallel', e.target.checked)}
                  />
                }
                label="Enable Parallel Execution"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={config.langgraph.debugMode}
                    onChange={(e) => handleConfigChange('langgraph', 'debugMode', e.target.checked)}
                  />
                }
                label="Debug Mode"
              />
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Workflow Settings */}
      <Accordion defaultExpanded sx={{ mb: 3 }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <SettingsIcon color="primary" />
            <Typography variant="h5">Workflow Settings</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl sx={{ minWidth: 200 }}>
                <InputLabel>Log Level</InputLabel>
                <Select
                  value={config.workflows.logLevel}
                  label="Log Level"
                  onChange={(e) => handleConfigChange('workflows', 'logLevel', e.target.value)}
                >
                  <MenuItem value="debug">Debug</MenuItem>
                  <MenuItem value="info">Info</MenuItem>
                  <MenuItem value="warning">Warning</MenuItem>
                  <MenuItem value="error">Error</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, pt: 1 }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.workflows.autoSave}
                      onChange={(e) => handleConfigChange('workflows', 'autoSave', e.target.checked)}
                    />
                  }
                  label="Auto-save Workflows"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.workflows.versionControl}
                      onChange={(e) => handleConfigChange('workflows', 'versionControl', e.target.checked)}
                    />
                  }
                  label="Enable Version Control"
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={config.workflows.enableMetrics}
                      onChange={(e) => handleConfigChange('workflows', 'enableMetrics', e.target.checked)}
                    />
                  }
                  label="Enable Metrics Collection"
                />
              </Box>
            </Box>

            <Box>
              <FormControlLabel
                control={
                  <Switch
                    checked={config.workflows.enableWebhooks}
                    onChange={(e) => handleConfigChange('workflows', 'enableWebhooks', e.target.checked)}
                  />
                }
                label="Enable Webhooks"
              />
              {config.workflows.enableWebhooks && (
                <TextField
                  fullWidth
                  label="Webhook URL"
                  value={config.workflows.webhookUrl}
                  onChange={(e) => handleConfigChange('workflows', 'webhookUrl', e.target.value)}
                  helperText="URL to send workflow events to"
                  sx={{ mt: 2 }}
                />
              )}
            </Box>
          </Box>
        </AccordionDetails>
      </Accordion>

      {/* Action Buttons */}
      <Paper sx={{ p: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
        <Button
          variant="outlined"
          onClick={resetToDefaults}
        >
          Reset to Defaults
        </Button>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveConfiguration}
          size="large"
        >
          Save Configuration
        </Button>
      </Paper>

      {/* Configuration Preview */}
      <Card sx={{ mt: 3 }}>
        <CardHeader title="Configuration Preview" />
        <CardContent>
          <pre style={{ 
            background: '#f5f5f5', 
            padding: '16px', 
            borderRadius: '4px', 
            overflow: 'auto',
            fontSize: '12px'
          }}>
            {JSON.stringify(config, null, 2)}
          </pre>
        </CardContent>
      </Card>
    </Container>
  );
};

export default WorkflowConfiguration;