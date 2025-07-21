import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  CardActions, 
  Button, 
  TextField, 
  Grid, 
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from '@mui/material';
import { 
  PlayArrow, 
  Stop, 
  Settings, 
  Code, 
  Timeline,
  SmartToy,
  AccountTree
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`workflow-tabpanel-${index}`}
      aria-labelledby={`workflow-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const Workflows = () => {
  const [tabValue, setTabValue] = useState(0);
  const [droolsRules, setDroolsRules] = useState('');
  const [langchainPrompt, setLangchainPrompt] = useState('');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const droolsWorkflows = [
    { id: 1, name: 'Risk Assessment Rules', status: 'Active', rules: 12 },
    { id: 2, name: 'Portfolio Validation', status: 'Draft', rules: 8 },
    { id: 3, name: 'Compliance Checks', status: 'Active', rules: 15 }
  ];

  const langchainWorkflows = [
    { id: 1, name: 'Document Analysis', status: 'Active', model: 'GPT-4' },
    { id: 2, name: 'Report Generation', status: 'Active', model: 'Claude-3' },
    { id: 3, name: 'Data Classification', status: 'Draft', model: 'GPT-3.5' }
  ];

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography 
          variant="h4" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 2
          }}
        >
          Workflow Configurations
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Configure and manage Drools 9 business rules and Langchain AI workflows
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="workflow tabs">
            <Tab 
              label="Drools 9 Rules" 
              icon={<AccountTree />} 
              iconPosition="start"
              id="workflow-tab-0"
              aria-controls="workflow-tabpanel-0"
            />
            <Tab 
              label="Langchain Workflows" 
              icon={<SmartToy />} 
              iconPosition="start"
              id="workflow-tab-1"
              aria-controls="workflow-tabpanel-1"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Rule Editor
                    </Typography>
                    <TextField
                      multiline
                      rows={12}
                      fullWidth
                      value={droolsRules}
                      onChange={(e) => setDroolsRules(e.target.value)}
                      placeholder={`package com.example.rules

rule "High Risk Portfolio Alert"
when
    $portfolio : Portfolio(riskScore > 0.8)
then
    insert(new Alert("High risk detected in portfolio: " + $portfolio.getId()));
end

rule "Compliance Check"
when
    $trade : Trade(amount > 10000000)
then
    insert(new ComplianceCheck($trade));
end`}
                      sx={{ fontFamily: 'monospace' }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" startIcon={<PlayArrow />}>
                      Deploy Rules
                    </Button>
                    <Button variant="outlined" startIcon={<Code />}>
                      Validate Syntax
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Active Rule Sets
                    </Typography>
                    <List>
                      {droolsWorkflows.map((workflow) => (
                        <ListItem key={workflow.id} divider>
                          <ListItemIcon>
                            <Timeline color={workflow.status === 'Active' ? 'success' : 'disabled'} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={workflow.name}
                            secondary={
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip 
                                  label={workflow.status} 
                                  size="small" 
                                  color={workflow.status === 'Active' ? 'success' : 'default'}
                                />
                                <Chip 
                                  label={`${workflow.rules} rules`} 
                                  size="small" 
                                  variant="outlined"
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 8 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Langchain Workflow Builder
                    </Typography>
                    <TextField
                      multiline
                      rows={12}
                      fullWidth
                      value={langchainPrompt}
                      onChange={(e) => setLangchainPrompt(e.target.value)}
                      placeholder={`# Document Analysis Workflow

from langchain.chains import LLMChain
from langchain.prompts import PromptTemplate

# Define the analysis prompt
analysis_prompt = PromptTemplate(
    input_variables=["document_text"],
    template="""
    Analyze the following financial document and extract:
    1. Key financial metrics
    2. Risk factors
    3. Investment recommendations
    
    Document: {document_text}
    
    Analysis:
    """
)

# Create the chain
analysis_chain = LLMChain(
    llm=llm,
    prompt=analysis_prompt
)`}
                      sx={{ fontFamily: 'monospace' }}
                    />
                  </CardContent>
                  <CardActions>
                    <Button variant="contained" startIcon={<PlayArrow />}>
                      Deploy Workflow
                    </Button>
                    <Button variant="outlined" startIcon={<Settings />}>
                      Configure Models
                    </Button>
                  </CardActions>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Active Workflows
                    </Typography>
                    <List>
                      {langchainWorkflows.map((workflow) => (
                        <ListItem key={workflow.id} divider>
                          <ListItemIcon>
                            <SmartToy color={workflow.status === 'Active' ? 'primary' : 'disabled'} />
                          </ListItemIcon>
                          <ListItemText 
                            primary={workflow.name}
                            secondary={
                              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                                <Chip 
                                  label={workflow.status} 
                                  size="small" 
                                  color={workflow.status === 'Active' ? 'success' : 'default'}
                                />
                                <Chip 
                                  label={workflow.model} 
                                  size="small" 
                                  variant="outlined"
                                />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>

                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Model Configuration
                    </Typography>
                    <Divider sx={{ mb: 2 }} />
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        label="API Key"
                        type="password"
                        size="small"
                        fullWidth
                      />
                      <TextField
                        label="Temperature"
                        type="number"
                        size="small"
                        defaultValue={0.7}
                        inputProps={{ min: 0, max: 1, step: 0.1 }}
                      />
                      <TextField
                        label="Max Tokens"
                        type="number"
                        size="small"
                        defaultValue={2048}
                      />
                      <Button variant="outlined" size="small">
                        Save Configuration
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </Paper>
    </Container>
  );
};

export default Workflows;