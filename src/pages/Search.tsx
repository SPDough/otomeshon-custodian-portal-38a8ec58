import { useState } from 'react';
import { useIntl } from 'react-intl';
import { motion } from "framer-motion";
import { Container, Typography, Box, TextField, Button, Card, CardContent, Chip, List, ListItem, ListItemText, ListItemIcon, Tabs, Tab, InputAdornment } from '@mui/material';
import { Search as SearchIcon, TableChart, AccountTree, Analytics, FilterList } from '@mui/icons-material';
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (<div role="tabpanel" hidden={value !== index} {...other}>{value === index && <Box sx={{ p: 3 }}>{children}</Box>}</div>);
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const dataResults = [
    { name: 'Portfolio Returns Q3', type: 'Dataset', description: 'Quarterly portfolio performance data' },
    { name: 'Risk Metrics', type: 'Table', description: 'Risk assessment calculations' },
    { name: 'Market Data', type: 'Stream', description: 'Real-time market information' },
  ];
  const workflowResults = [
    { name: 'Risk Assessment Workflow', type: 'Drools', description: 'Automated risk evaluation rules' },
    { name: 'Portfolio Optimization', type: 'Langchain', description: 'AI-driven portfolio suggestions' },
    { name: 'Compliance Check', type: 'Drools', description: 'Regulatory compliance validation' },
  ];
  const ontologyResults = [
    { name: 'Financial Instrument', type: 'FIBO Class', description: 'Securities and derivatives classification' },
    { name: 'Market Participant', type: 'FIBO Entity', description: 'Organizations in financial markets' },
    { name: 'Risk Measure', type: 'FIBO Property', description: 'Risk quantification attributes' },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <AppBreadcrumb crumbs={[{ labelId: "breadcrumb.search" }]} />
        <motion.div variants={fadeInUp}>
          <Typography variant="h4" component="h1" gutterBottom>{fm("search.title")}</Typography>
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                <TextField fullWidth variant="outlined" placeholder={fm("search.placeholder")} value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
                <Button variant="contained" sx={{ minWidth: 100 }}>{fm("search.searchBtn")}</Button>
              </Box>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                <Chip label={fm("search.advancedFilters")} icon={<FilterList />} variant="outlined" />
                <Chip label="Recent: Portfolio" size="small" />
                <Chip label="Recent: Risk" size="small" />
                <Chip label="Recent: FIBO" size="small" />
              </Box>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)}>
              <Tab label={fm("search.tabData")} icon={<TableChart />} />
              <Tab label={fm("search.tabWorkflows")} icon={<AccountTree />} />
              <Tab label={fm("search.tabOntology")} icon={<Analytics />} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            <Typography variant="h6" gutterBottom>{fm("search.dataResults")}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              {dataResults.map((r, i) => (
                <Card key={i} sx={{ '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s ease' }}>
                  <CardContent><Typography variant="h6">{r.name}</Typography><Chip label={r.type} size="small" sx={{ mb: 1 }} /><Typography variant="body2" color="text.secondary">{r.description}</Typography></CardContent>
                </Card>
              ))}
            </Box>
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Typography variant="h6" gutterBottom>{fm("search.workflowResults")}</Typography>
            <List>{workflowResults.map((r, i) => (<ListItem key={i} divider><ListItemIcon><AccountTree /></ListItemIcon><ListItemText primary={r.name} secondary={<Box><Chip label={r.type} size="small" sx={{ mr: 1 }} />{r.description}</Box>} /></ListItem>))}</List>
          </TabPanel>

          <TabPanel value={tabValue} index={2}>
            <Typography variant="h6" gutterBottom>{fm("search.ontologyResults")}</Typography>
            <List>{ontologyResults.map((r, i) => (<ListItem key={i} divider><ListItemIcon><Analytics /></ListItemIcon><ListItemText primary={r.name} secondary={<Box><Chip label={r.type} size="small" sx={{ mr: 1 }} />{r.description}</Box>} /></ListItem>))}</List>
          </TabPanel>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default Search;