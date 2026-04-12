import { useState, useCallback } from 'react';
import { useIntl } from 'react-intl';
import { motion } from "framer-motion";
import { Box, Typography, Paper, Container, Tabs, Tab, Card, CardContent, Button, TextField, Chip, List, ListItem, ListItemText, ListItemIcon, IconButton, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { AccountTree, Timeline, Search, FilterList, ZoomIn, ZoomOut, CenterFocusStrong, ExpandMore, Business, TrendingUp, Security, Category } from '@mui/icons-material';
import KnowledgeGraphVisualization from '@/components/KnowledgeGraphVisualization';
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";

interface TabPanelProps { children?: React.ReactNode; index: number; value: number; }
function TabPanel({ children, value, index, ...other }: TabPanelProps) {
  return (<div role="tabpanel" hidden={value !== index} id={`kg-tabpanel-${index}`} aria-labelledby={`kg-tab-${index}`} {...other}>{value === index && <Box sx={{ pt: 3 }}>{children}</Box>}</div>);
}

const fiboEntities = [
  { id: 'financial-instrument', name: 'Financial Instrument', type: 'Core Concept', description: 'Any contract that gives rise to both a financial asset and a financial liability', relationships: ['has-issuer', 'has-holder', 'denominated-in'] },
  { id: 'legal-entity', name: 'Legal Entity', type: 'Organization', description: 'Entity that is legally constituted and recognized', relationships: ['owns', 'manages', 'regulated-by'] },
  { id: 'portfolio', name: 'Portfolio', type: 'Collection', description: 'Collection of financial instruments held by an entity', relationships: ['contains', 'managed-by', 'benchmarked-against'] },
  { id: 'market', name: 'Market', type: 'Context', description: 'Venue or mechanism through which financial instruments are traded', relationships: ['trades', 'regulated-by', 'operates-in'] },
];

const dataConnections = [
  { source: 'Portfolio Data', target: 'Financial Instrument', relationship: 'contains' },
  { source: 'Legal Entity', target: 'Portfolio Data', relationship: 'owns' },
  { source: 'Market Data', target: 'Financial Instrument', relationship: 'prices' },
  { source: 'Regulatory Data', target: 'Legal Entity', relationship: 'governs' },
];

const KnowledgeGraph = () => {
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEntity, setSelectedEntity] = useState<any>(null);
  const handleNodeSelect = useCallback((node: any) => { setSelectedEntity(node); }, []);
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  return (
    <AnimatedPage>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <AppBreadcrumb crumbs={[{ labelId: "breadcrumb.frontOffice", path: "/front-office" }, { labelId: "breadcrumb.knowledgeGraph" }]} />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 2 }}>{fm("knowledgeGraph.title")}</Typography>
            <Typography variant="body1" color="text.secondary">{fm("knowledgeGraph.subtitle")}</Typography>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paper elevation={2} sx={{ borderRadius: 2 }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={(_, v) => setTabValue(v)} aria-label="knowledge graph tabs">
                <Tab label={fm("knowledgeGraph.tabVisualization")} icon={<AccountTree />} iconPosition="start" />
                <Tab label={fm("knowledgeGraph.tabOntology")} icon={<Category />} iconPosition="start" />
                <Tab label={fm("knowledgeGraph.tabDataMapping")} icon={<Timeline />} iconPosition="start" />
              </Tabs>
            </Box>

            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '3fr 1fr' }, gap: 3 }}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Typography variant="h6">{fm("knowledgeGraph.interactiveGraph")}</Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <IconButton size="small"><ZoomIn /></IconButton>
                          <IconButton size="small"><ZoomOut /></IconButton>
                          <IconButton size="small"><CenterFocusStrong /></IconButton>
                        </Box>
                      </Box>
                      <Box sx={{ border: '1px solid', borderColor: 'divider', borderRadius: 1, overflow: 'hidden' }}>
                        <KnowledgeGraphVisualization onNodeSelect={handleNodeSelect} />
                      </Box>
                    </CardContent>
                  </Card>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Card><CardContent><Typography variant="h6" gutterBottom>{fm("knowledgeGraph.controls")}</Typography><Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}><TextField size="small" placeholder={fm("knowledgeGraph.searchEntities")} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} /> }} /><Button variant="outlined" startIcon={<FilterList />} size="small">{fm("knowledgeGraph.applyFilters")}</Button></Box></CardContent></Card>
                    <Card><CardContent><Typography variant="h6" gutterBottom>{fm("knowledgeGraph.selectedEntity")}</Typography>{selectedEntity ? (<Box><Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{selectedEntity.label}</Typography><Chip label={selectedEntity.type} size="small" sx={{ mt: 0.5, mb: 1 }} /><Typography variant="body2" color="text.secondary">{selectedEntity.description}</Typography></Box>) : (<Typography variant="body2" color="text.secondary">{fm("knowledgeGraph.clickNode")}</Typography>)}</CardContent></Card>
                  </Box>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 3 }}>
                  <Card><CardContent><Typography variant="h6" gutterBottom>{fm("knowledgeGraph.ontologyBrowser")}</Typography>
                    {fiboEntities.map((entity) => (
                      <Accordion key={entity.id}>
                        <AccordionSummary expandIcon={<ExpandMore />}><Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}><Business color="primary" /><Box><Typography variant="subtitle1">{entity.name}</Typography><Chip label={entity.type} size="small" variant="outlined" sx={{ mt: 0.5 }} /></Box></Box></AccordionSummary>
                        <AccordionDetails><Typography variant="body2" color="text.secondary" paragraph>{entity.description}</Typography><Typography variant="subtitle2" gutterBottom>{fm("knowledgeGraph.relationships")}</Typography><Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>{entity.relationships.map((rel) => (<Chip key={rel} label={rel} size="small" color="secondary" variant="outlined" />))}</Box></AccordionDetails>
                      </Accordion>
                    ))}
                  </CardContent></Card>
                  <Card><CardContent><Typography variant="h6" gutterBottom>{fm("knowledgeGraph.fiboModules")}</Typography><List><ListItem><ListItemIcon><Business color="primary" /></ListItemIcon><ListItemText primary={fm("knowledgeGraph.foundations")} secondary={fm("knowledgeGraph.foundationsDesc")} /></ListItem><ListItem><ListItemIcon><TrendingUp color="secondary" /></ListItemIcon><ListItemText primary={fm("knowledgeGraph.businessEntities")} secondary={fm("knowledgeGraph.businessEntitiesDesc")} /></ListItem><ListItem><ListItemIcon><Security color="success" /></ListItemIcon><ListItemText primary={fm("knowledgeGraph.securities")} secondary={fm("knowledgeGraph.securitiesDesc")} /></ListItem></List></CardContent></Card>
                </Box>
              </Box>
            </TabPanel>

            <TabPanel value={tabValue} index={2}>
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                  <Card><CardContent><Typography variant="h6" gutterBottom>{fm("knowledgeGraph.dataSourceMapping")}</Typography><Typography variant="body2" color="text.secondary" paragraph>{fm("knowledgeGraph.dataSourceMappingDesc")}</Typography><List>{dataConnections.map((c, i) => (<ListItem key={i} divider><ListItemText primary={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Chip label={c.source} size="small" /><Typography variant="body2" color="text.secondary">{c.relationship}</Typography><Chip label={c.target} size="small" color="primary" /></Box>} /></ListItem>))}</List></CardContent></Card>
                  <Card><CardContent><Typography variant="h6" gutterBottom>{fm("knowledgeGraph.semanticQueryBuilder")}</Typography><Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}><TextField label={fm("knowledgeGraph.sparqlLabel")} multiline rows={8} placeholder={`PREFIX fibo: <https://spec.edmcouncil.org/fibo/ontology/>\nSELECT ?entity ?type\nWHERE {\n  ?entity rdf:type ?type .\n}`} sx={{ fontFamily: 'monospace' }} /><Button variant="contained" startIcon={<Search />}>{fm("knowledgeGraph.executeQuery")}</Button></Box></CardContent></Card>
                </Box>
              </Box>
            </TabPanel>
          </Paper>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default KnowledgeGraph;