
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  Divider,
  Button,
  Paper,
} from '@mui/material';
import {
  Analytics,
  AccountTree,
  Storage,
  Search,
  Security,
  Speed,
  Support,
  AutoAwesome,
  GitHub,
  Description,
} from '@mui/icons-material';

const About = () => {
  const features = [
    {
      icon: <Storage />,
      title: 'Data Sandbox',
      description: 'Interactive data manipulation with HandsonTable for real-time analysis',
    },
    {
      icon: <AccountTree />,
      title: 'Workflow Engine',
      description: 'Drools 9 rules engine and Langchain AI workflows for automated processes',
    },
    {
      icon: <Analytics />,
      title: 'Knowledge Graph',
      description: 'FIBO ontology integration for semantic data relationships and insights',
    },
    {
      icon: <Search />,
      title: 'Global Search',
      description: 'Unified search across data, workflows, and ontology elements',
    },
    {
      icon: <AutoAwesome />,
      title: 'Portfolio Management',
      description: 'Create, analyze, and optimize investment portfolios with advanced metrics',
    },
    {
      icon: <Speed />,
      title: 'Real-time Analytics',
      description: 'Live dashboard with performance metrics and risk assessments',
    },
  ];

  const technologies = [
    { name: 'React 18', category: 'Frontend' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'Material-UI', category: 'UI Framework' },
    { name: 'HandsonTable', category: 'Data Grid' },
    { name: 'Drools 9', category: 'Rules Engine' },
    { name: 'Langchain', category: 'AI/ML' },
    { name: 'FIBO Ontology', category: 'Knowledge Base' },
    { name: 'React Query', category: 'Data Fetching' },
  ];

  const systemInfo = [
    { label: 'Version', value: '1.0.0' },
    { label: 'Build', value: 'Production' },
    { label: 'Last Updated', value: 'January 2024' },
    { label: 'License', value: 'MIT' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Financial Intelligence Platform
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
          Advanced data analysis, workflow automation, and knowledge management for financial services
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" startIcon={<Description />}>
            Documentation
          </Button>
          <Button variant="outlined" startIcon={<GitHub />}>
            View Source
          </Button>
          <Button variant="outlined" startIcon={<Support />}>
            Support
          </Button>
        </Box>
      </Box>

      <Grid container spacing={4}>
        {/* Features Section */}
        <Grid item xs={12}>
          <Typography variant="h4" gutterBottom>
            Key Features
          </Typography>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} key={index}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      {feature.icon}
                      <Typography variant="h6" sx={{ ml: 1 }}>
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Technology Stack */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardHeader title="Technology Stack" />
            <CardContent>
              <Grid container spacing={2}>
                {technologies.map((tech, index) => (
                  <Grid item xs={12} sm={6} key={index}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 1 }}>
                      <Typography variant="body1">{tech.name}</Typography>
                      <Chip label={tech.category} size="small" variant="outlined" />
                    </Box>
                    {index < technologies.length - 1 && <Divider />}
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* System Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="System Information" />
            <CardContent>
              <List dense>
                {systemInfo.map((info, index) => (
                  <ListItem key={index} sx={{ px: 0 }}>
                    <ListItemText
                      primary={info.label}
                      secondary={info.value}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Architecture Overview */}
        <Grid item xs={12}>
          <Card>
            <CardHeader title="Architecture Overview" />
            <CardContent>
              <Typography variant="body1" paragraph>
                This platform is built as a modern single-page application with a microservices-oriented 
                architecture. The frontend leverages React 18 with TypeScript for type safety and 
                Material-UI for consistent design patterns.
              </Typography>
              
              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Core Components:
              </Typography>
              
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Storage color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Data Layer"
                    secondary="HandsonTable provides an Excel-like interface for data manipulation with real-time collaboration features"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AccountTree color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Workflow Engine"
                    secondary="Drools 9 rules engine for business logic and Langchain for AI-powered workflow automation"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Analytics color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Knowledge Base"
                    secondary="FIBO (Financial Industry Business Ontology) integration for semantic data relationships"
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Security color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary="Security & Compliance"
                    secondary="Enterprise-grade security with role-based access control and audit trails"
                  />
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Usage Guidelines */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, bgcolor: 'grey.50' }}>
            <Typography variant="h6" gutterBottom>
              Getting Started
            </Typography>
            <Typography variant="body1" paragraph>
              Navigate through the different sections using the sidebar to explore the platform's capabilities:
            </Typography>
            <Typography variant="body2" component="div">
              <strong>Data:</strong> Import and manipulate datasets using the interactive table interface<br/>
              <strong>Workflows:</strong> Configure and execute automated processes using Drools rules and AI workflows<br/>
              <strong>Knowledge Graph:</strong> Explore data relationships through the FIBO ontology browser<br/>
              <strong>Search:</strong> Find information across all platform components<br/>
              <strong>Portfolios:</strong> Create and analyze investment portfolios with advanced metrics<br/>
              <strong>Results:</strong> View workflow outputs and analytical insights
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
