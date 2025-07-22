
import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  Chip,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  IconButton
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterIcon,
  Description as DocumentIcon,
  Assessment as ReportIcon,
  Policy as PolicyIcon,
  Help as HelpIcon,
  History as HistoryIcon,
  FileDownload as DownloadIcon,
  Bookmark as BookmarkIcon
} from '@mui/icons-material';

const KnowledgeBase = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const documentTypes = [
    { value: 'policy', label: 'Financial Policies', icon: PolicyIcon },
    { value: 'report', label: 'Research Reports', icon: ReportIcon },
    { value: 'procedure', label: 'Procedures', icon: DocumentIcon },
    { value: 'faq', label: 'FAQs', icon: HelpIcon }
  ];

  const recentSearches = [
    'Portfolio risk assessment procedures',
    'ESG investment guidelines',
    'Compliance reporting requirements',
    'Asset allocation frameworks',
    'Due diligence checklists'
  ];

  const mockSearchResults = [
    {
      id: 1,
      title: 'Portfolio Risk Management Guidelines',
      type: 'Policy',
      excerpt: 'Comprehensive guidelines for managing portfolio risk across different asset classes and investment strategies...',
      lastUpdated: '2024-01-15',
      tags: ['Risk Management', 'Compliance', 'Investment Strategy'],
      size: '2.3 MB'
    },
    {
      id: 2,
      title: 'ESG Investment Framework',
      type: 'Research Report',
      excerpt: 'Detailed framework for evaluating environmental, social, and governance factors in investment decisions...',
      lastUpdated: '2024-01-10',
      tags: ['ESG', 'Sustainability', 'Framework'],
      size: '1.8 MB'
    },
    {
      id: 3,
      title: 'Quarterly Performance Analysis Procedure',
      type: 'Procedure',
      excerpt: 'Step-by-step procedure for conducting quarterly performance analysis and reporting...',
      lastUpdated: '2024-01-08',
      tags: ['Performance', 'Analysis', 'Reporting'],
      size: '856 KB'
    },
    {
      id: 4,
      title: 'Client Onboarding FAQ',
      type: 'FAQ',
      excerpt: 'Frequently asked questions and answers regarding the client onboarding process...',
      lastUpdated: '2024-01-05',
      tags: ['Client Services', 'Onboarding', 'FAQ'],
      size: '324 KB'
    }
  ];

  const popularDocuments = [
    'Investment Policy Statement Template',
    'Risk Assessment Checklist',
    'Compliance Manual 2024',
    'Market Analysis Framework',
    'Client Communication Guidelines'
  ];

  const handleSearch = () => {
    console.log('Searching for:', searchQuery);
  };

  const getDocumentIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'policy': return <PolicyIcon />;
      case 'research report': return <ReportIcon />;
      case 'procedure': return <DocumentIcon />;
      case 'faq': return <HelpIcon />;
      default: return <DocumentIcon />;
    }
  };

  return (
    <Box sx={{ p: 3, maxWidth: 1200, mx: 'auto' }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ color: 'primary.main', fontWeight: 'bold' }}>
          Knowledge Base
        </Typography>
        <Typography variant="subtitle1" sx={{ color: 'text.secondary' }}>
          Search and explore our comprehensive knowledge repository
        </Typography>
      </Box>

      {/* Search Section */}
      <Card sx={{ mb: 4, elevation: 2 }}>
        <CardContent>
          <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              placeholder="Search knowledge base..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            />
            <Button
              variant="contained"
              onClick={handleSearch}
              sx={{ minWidth: 120 }}
            >
              Search
            </Button>
            <IconButton
              onClick={() => setShowFilters(!showFilters)}
              color={showFilters ? 'primary' : 'default'}
            >
              <FilterIcon />
            </IconButton>
          </Box>

          {/* Filters */}
          {showFilters && (
            <Box sx={{ display: 'flex', gap: 2, pt: 2, borderTop: 1, borderColor: 'divider' }}>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Document Type</InputLabel>
                <Select
                  value={documentType}
                  label="Document Type"
                  onChange={(e) => setDocumentType(e.target.value)}
                >
                  <MenuItem value="">All Types</MenuItem>
                  {documentTypes.map((type) => (
                    <MenuItem key={type.value} value={type.value}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl size="small" sx={{ minWidth: 150 }}>
                <InputLabel>Date Range</InputLabel>
                <Select
                  value={dateRange}
                  label="Date Range"
                  onChange={(e) => setDateRange(e.target.value)}
                >
                  <MenuItem value="">All Dates</MenuItem>
                  <MenuItem value="week">Last Week</MenuItem>
                  <MenuItem value="month">Last Month</MenuItem>
                  <MenuItem value="quarter">Last Quarter</MenuItem>
                  <MenuItem value="year">Last Year</MenuItem>
                </Select>
              </FormControl>
            </Box>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={3}>
        {/* Main Content */}
        <Grid item xs={12} md={8}>
          {/* Document Categories */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Browse by Category
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {documentTypes.map((type) => {
                  const IconComponent = type.icon;
                  return (
                    <Chip
                      key={type.value}
                      icon={<IconComponent />}
                      label={type.label}
                      variant="outlined"
                      clickable
                      sx={{ mb: 1 }}
                    />
                  );
                })}
              </Box>
            </CardContent>
          </Card>

          {/* Search Results */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Search Results ({mockSearchResults.length} documents found)
              </Typography>
              {mockSearchResults.map((result, index) => (
                <Box key={result.id}>
                  <Paper
                    sx={{
                      p: 2,
                      mb: 2,
                      border: 1,
                      borderColor: 'divider',
                      '&:hover': {
                        bgcolor: 'action.hover',
                        cursor: 'pointer'
                      }
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ color: 'primary.main', mt: 0.5 }}>
                        {getDocumentIcon(result.type)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {result.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                          {result.excerpt}
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
                          {result.tags.map((tag) => (
                            <Chip key={tag} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>
                        <Typography variant="caption" color="text.secondary">
                          {result.type} • Updated {result.lastUpdated} • {result.size}
                        </Typography>
                      </Box>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                        <IconButton size="small" color="primary">
                          <DownloadIcon />
                        </IconButton>
                        <IconButton size="small">
                          <BookmarkIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Paper>
                  {index < mockSearchResults.length - 1 && <Divider />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar */}
        <Grid item xs={12} md={4}>
          {/* Recent Searches */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <HistoryIcon /> Recent Searches
              </Typography>
              <List dense>
                {recentSearches.map((search, index) => (
                  <ListItem
                    key={index}
                    button
                    onClick={() => setSearchQuery(search)}
                    sx={{ pl: 0 }}
                  >
                    <ListItemText
                      primary={search}
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: '0.875rem',
                          color: 'text.secondary'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>

          {/* Popular Documents */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Popular Documents
              </Typography>
              <List dense>
                {popularDocuments.map((doc, index) => (
                  <ListItem key={index} button sx={{ pl: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <DocumentIcon fontSize="small" color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc}
                      sx={{
                        '& .MuiTypography-root': {
                          fontSize: '0.875rem'
                        }
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default KnowledgeBase;
