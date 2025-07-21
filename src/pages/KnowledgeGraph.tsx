import { useState, useRef, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Container, 
  Tabs, 
  Tab, 
  Card, 
  CardContent, 
  Button, 
  TextField, 
  Grid, 
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import { 
  AccountTree, 
  Timeline, 
  Search, 
  FilterList,
  ZoomIn,
  ZoomOut,
  CenterFocusStrong,
  ExpandMore,
  Business,
  TrendingUp,
  Security,
  Category
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
      id={`kg-tabpanel-${index}`}
      aria-labelledby={`kg-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const KnowledgeGraph = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<string | null>(null);
  const graphRef = useRef<HTMLDivElement>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // FIBO ontology entities
  const fiboEntities = [
    { 
      id: 'financial-instrument', 
      name: 'Financial Instrument', 
      type: 'Core Concept',
      description: 'Any contract that gives rise to both a financial asset and a financial liability',
      relationships: ['has-issuer', 'has-holder', 'denominated-in']
    },
    { 
      id: 'legal-entity', 
      name: 'Legal Entity', 
      type: 'Organization',
      description: 'Entity that is legally constituted and recognized',
      relationships: ['owns', 'manages', 'regulated-by']
    },
    { 
      id: 'portfolio', 
      name: 'Portfolio', 
      type: 'Collection',
      description: 'Collection of financial instruments held by an entity',
      relationships: ['contains', 'managed-by', 'benchmarked-against']
    },
    { 
      id: 'market', 
      name: 'Market', 
      type: 'Context',
      description: 'Venue or mechanism through which financial instruments are traded',
      relationships: ['trades', 'regulated-by', 'operates-in']
    }
  ];

  const dataConnections = [
    { source: 'Portfolio Data', target: 'Financial Instrument', relationship: 'contains' },
    { source: 'Legal Entity', target: 'Portfolio Data', relationship: 'owns' },
    { source: 'Market Data', target: 'Financial Instrument', relationship: 'prices' },
    { source: 'Regulatory Data', target: 'Legal Entity', relationship: 'governs' }
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
          Knowledge Graph & FIBO Ontology
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Explore your financial data through the FIBO (Financial Industry Business Ontology) framework.
          Build and navigate knowledge graphs to discover relationships and insights.
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange} aria-label="knowledge graph tabs">
            <Tab 
              label="Graph Visualization" 
              icon={<AccountTree />} 
              iconPosition="start"
              id="kg-tab-0"
              aria-controls="kg-tabpanel-0"
            />
            <Tab 
              label="FIBO Ontology" 
              icon={<Category />} 
              iconPosition="start"
              id="kg-tab-1"
              aria-controls="kg-tabpanel-1"
            />
            <Tab 
              label="Data Mapping" 
              icon={<Timeline />} 
              iconPosition="start"
              id="kg-tab-2"
              aria-controls="kg-tabpanel-2"
            />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 9 }}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">
                        Interactive Knowledge Graph
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" title="Zoom In">
                          <ZoomIn />
                        </IconButton>
                        <IconButton size="small" title="Zoom Out">
                          <ZoomOut />
                        </IconButton>
                        <IconButton size="small" title="Center Graph">
                          <CenterFocusStrong />
                        </IconButton>
                      </Box>
                    </Box>
                    
                    <Box 
                      ref={graphRef}
                      sx={{ 
                        height: 500,
                        border: '1px solid',
                        borderColor: 'divider',
                        borderRadius: 1,
                        backgroundColor: 'background.paper',
                        position: 'relative',
                        overflow: 'hidden'
                      }}
                    >
                      {/* Placeholder for knowledge graph visualization */}
                      <Box sx={{ 
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center'
                      }}>
                        <AccountTree sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                          Knowledge Graph Visualization
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Interactive graph will render here using D3.js or similar library
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 3 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Graph Controls
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        size="small"
                        placeholder="Search entities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        InputProps={{
                          startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />
                        }}
                      />
                      <Button
                        variant="outlined"
                        startIcon={<FilterList />}
                        size="small"
                      >
                        Apply Filters
                      </Button>
                    </Box>
                  </CardContent>
                </Card>

                <Card sx={{ mt: 2 }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Selected Entity
                    </Typography>
                    {selectedEntity ? (
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          Entity details will appear here when selected
                        </Typography>
                      </Box>
                    ) : (
                      <Typography variant="body2" color="text.secondary">
                        Click on a node to view details
                      </Typography>
                    )}
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
                      FIBO Ontology Browser
                    </Typography>
                    
                    {fiboEntities.map((entity) => (
                      <Accordion key={entity.id}>
                        <AccordionSummary expandIcon={<ExpandMore />}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                            <Business color="primary" />
                            <Box>
                              <Typography variant="subtitle1">{entity.name}</Typography>
                              <Chip 
                                label={entity.type} 
                                size="small" 
                                variant="outlined"
                                sx={{ mt: 0.5 }}
                              />
                            </Box>
                          </Box>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography variant="body2" color="text.secondary" paragraph>
                            {entity.description}
                          </Typography>
                          <Typography variant="subtitle2" gutterBottom>
                            Relationships:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {entity.relationships.map((rel) => (
                              <Chip 
                                key={rel} 
                                label={rel} 
                                size="small"
                                color="secondary"
                                variant="outlined"
                              />
                            ))}
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    ))}
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 4 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      FIBO Modules
                    </Typography>
                    <List>
                      <ListItem>
                        <ListItemIcon>
                          <Business color="primary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Foundations"
                          secondary="Core concepts and utilities"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <TrendingUp color="secondary" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Business Entities"
                          secondary="Organizations and legal structures"
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemIcon>
                          <Security color="success" />
                        </ListItemIcon>
                        <ListItemText 
                          primary="Securities"
                          secondary="Financial instruments and contracts"
                        />
                      </ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Box sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Data Source Mapping
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Map your data sources to FIBO ontology concepts
                    </Typography>
                    
                    <List>
                      {dataConnections.map((connection, index) => (
                        <ListItem key={index} divider>
                          <ListItemText 
                            primary={
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                <Chip label={connection.source} size="small" />
                                <Typography variant="body2" color="text.secondary">
                                  {connection.relationship}
                                </Typography>
                                <Chip label={connection.target} size="small" color="primary" />
                              </Box>
                            }
                          />
                        </ListItem>
                      ))}
                    </List>
                  </CardContent>
                </Card>
              </Grid>

              <Grid size={{ xs: 12, md: 6 }}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Semantic Query Builder
                    </Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                      <TextField
                        label="SPARQL Query"
                        multiline
                        rows={8}
                        placeholder={`PREFIX fibo: <https://spec.edmcouncil.org/fibo/ontology/>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>

SELECT ?entity ?type ?label
WHERE {
  ?entity rdf:type ?type .
  ?entity rdfs:label ?label .
  FILTER(CONTAINS(?label, "Portfolio"))
}`}
                        sx={{ fontFamily: 'monospace' }}
                      />
                      <Button variant="contained" startIcon={<Search />}>
                        Execute Query
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

export default KnowledgeGraph;