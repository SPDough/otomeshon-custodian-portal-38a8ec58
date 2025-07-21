
import { useState } from 'react';
import {
  Container,
  Typography,
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tabs,
  Tab,
  InputAdornment,
} from '@mui/material';
import {
  Search as SearchIcon,
  TableChart,
  AccountTree,
  Analytics,
  FilterList,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [tabValue, setTabValue] = useState(0);

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

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
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Global Search
      </Typography>
      
      <Card sx={{ mb: 4 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search across data, workflows, and knowledge graph..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ minWidth: 100 }}
            >
              Search
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            <Chip label="Advanced Filters" icon={<FilterList />} variant="outlined" />
            <Chip label="Recent: Portfolio" size="small" />
            <Chip label="Recent: Risk" size="small" />
            <Chip label="Recent: FIBO" size="small" />
          </Box>
        </CardContent>
      </Card>

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Data" icon={<TableChart />} />
          <Tab label="Workflows" icon={<AccountTree />} />
          <Tab label="Ontology" icon={<Analytics />} />
        </Tabs>
      </Box>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>Data Results</Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          {dataResults.map((result, index) => (
            <Card key={index}>
              <CardContent>
                <Typography variant="h6">{result.name}</Typography>
                <Chip label={result.type} size="small" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">
                  {result.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Typography variant="h6" gutterBottom>Workflow Results</Typography>
        <List>
          {workflowResults.map((result, index) => (
            <ListItem key={index} divider>
              <ListItemIcon>
                <AccountTree />
              </ListItemIcon>
              <ListItemText
                primary={result.name}
                secondary={
                  <Box>
                    <Chip label={result.type} size="small" sx={{ mr: 1 }} />
                    {result.description}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>Ontology Results</Typography>
        <List>
          {ontologyResults.map((result, index) => (
            <ListItem key={index} divider>
              <ListItemIcon>
                <Analytics />
              </ListItemIcon>
              <ListItemText
                primary={result.name}
                secondary={
                  <Box>
                    <Chip label={result.type} size="small" sx={{ mr: 1 }} />
                    {result.description}
                  </Box>
                }
              />
            </ListItem>
          ))}
        </List>
      </TabPanel>
    </Container>
  );
};

export default Search;
