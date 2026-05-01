import { useState } from 'react';
import { useIntl } from 'react-intl';
import { motion } from "framer-motion";
import { Box, Typography, Paper, Container, Tabs, Tab, Card, CardContent, CardActions, Button, TextField, Grid, Chip, Divider, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { PlayArrow, Stop, Settings, Code, Timeline, SmartToy, AccountTree } from '@mui/icons-material';
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (<div role="tabpanel" hidden={value !== index} id={`workflow-tabpanel-${index}`} aria-labelledby={`workflow-tab-${index}`} {...other}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>);
}

const Workflows = () => {
  const [tabValue, setTabValue] = useState(0);
  const [droolsRules, setDroolsRules] = useState('');
  const [langchainPrompt, setLangchainPrompt] = useState('');
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const droolsWorkflows = [
    { id: 1, name: 'Risk Assessment Rules', status: fm("workflows.statusActive"), rules: 12 },
    { id: 2, name: 'Portfolio Validation', status: fm("workflows.statusDraft"), rules: 8 },
    { id: 3, name: 'Compliance Checks', status: fm("workflows.statusActive"), rules: 15 }
  ];

  const langchainWorkflows = [
    { id: 1, name: 'Document Analysis', status: fm("workflows.statusActive"), model: 'GPT-4' },
    { id: 2, name: 'Report Generation', status: fm("workflows.statusActive"), model: 'Claude-3' },
    { id: 3, name: 'Data Classification', status: fm("workflows.statusDraft"), model: 'GPT-3.5' }
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <AppBreadcrumb crumbs={[{ labelId: "breadcrumb.workflows" }]} />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>{fm("workflows.title")}</Typography>
            <Typography variant="body1" color="text.secondary">{fm("workflows.subtitle")}</Typography>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} aria-label="workflow tabs">
                <Tab label={fm("workflows.tabDrools")} icon={<AccountTree />} iconPosition="start" />
                <Tab label={fm("workflows.tabLangchain")} icon={<SmartToy />} iconPosition="start" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                <Grid container spacing={3}>
                  <Grid size={{ xs: 12, md: 8 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{fm("workflows.ruleEditor")}</Typography>
                        <TextField multiline rows={12} fullWidth value={droolsRules} onChange={(e) => setDroolsRules(e.target.value)}
                          placeholder={`package com.example.rules\n\nrule "High Risk Portfolio Alert"\nwhen\n    $portfolio : Portfolio(riskScore > 0.8)\nthen\n    insert(new Alert("High risk detected"));\nend`}
                          sx={{ fontFamily: 'monospace' }} />
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" startIcon={<PlayArrow />}>{fm("workflows.deployRules")}</Button>
                        <Button variant="outlined" startIcon={<Code />}>{fm("workflows.validateSyntax")}</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{fm("workflows.activeRuleSets")}</Typography>
                        <List>
                          {droolsWorkflows.map((w) => (
                            <ListItem key={w.id} divider>
                              <ListItemIcon><Timeline color={w.status === fm("workflows.statusActive") ? 'success' : 'disabled'} /></ListItemIcon>
                              <ListItemText primary={w.name} secondary={<Box sx={{ display: 'flex', gap: 1, mt: 1 }}><Chip label={w.status} size="small" color={w.status === fm("workflows.statusActive") ? 'success' : 'default'} /><Chip label={intl.formatMessage({ id: "workflows.rulesCount" }, { count: w.rules })} size="small" variant="outlined" /></Box>} />
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
                        <Typography variant="h6" gutterBottom>{fm("workflows.langchainBuilder")}</Typography>
                        <TextField multiline rows={12} fullWidth value={langchainPrompt} onChange={(e) => setLangchainPrompt(e.target.value)}
                          placeholder={`# Document Analysis Workflow\nfrom langchain.chains import LLMChain\n...`}
                          sx={{ fontFamily: 'monospace' }} />
                      </CardContent>
                      <CardActions>
                        <Button variant="contained" startIcon={<PlayArrow />}>{fm("workflows.deployWorkflow")}</Button>
                        <Button variant="outlined" startIcon={<Settings />}>{fm("workflows.configureModels")}</Button>
                      </CardActions>
                    </Card>
                  </Grid>
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{fm("workflows.activeWorkflows")}</Typography>
                        <List>
                          {langchainWorkflows.map((w) => (
                            <ListItem key={w.id} divider>
                              <ListItemIcon><SmartToy color={w.status === fm("workflows.statusActive") ? 'primary' : 'disabled'} /></ListItemIcon>
                              <ListItemText primary={w.name} secondary={<Box sx={{ display: 'flex', gap: 1, mt: 1 }}><Chip label={w.status} size="small" color={w.status === fm("workflows.statusActive") ? 'success' : 'default'} /><Chip label={w.model} size="small" variant="outlined" /></Box>} />
                            </ListItem>
                          ))}
                        </List>
                      </CardContent>
                    </Card>
                    <Card sx={{ mt: 2 }}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{fm("workflows.modelConfiguration")}</Typography>
                        <Divider sx={{ mb: 2 }} />
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                          <TextField label={fm("workflows.apiKey")} type="password" size="small" fullWidth />
                          <TextField label={fm("workflows.temperature")} type="number" size="small" defaultValue={0.7} inputProps={{ min: 0, max: 1, step: 0.1 }} />
                          <TextField label={fm("workflows.maxTokens")} type="number" size="small" defaultValue={2048} />
                          <Button variant="outlined" size="small">{fm("workflows.saveConfiguration")}</Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default Workflows;