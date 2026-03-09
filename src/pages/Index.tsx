import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  IconButton,
  alpha,
  Chip,
  Grid,
} from "@mui/material";
import {
  Search,
  Dashboard as DashboardIcon,
  Analytics,
  AccountTree,
  Storage,
  ArrowForward,
  TrendingUp,
  Shield,
  Speed,
} from "@mui/icons-material";

const Index = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      handleSearch();
    }
  };

  const quickActions = [
    { 
      title: "Dashboard", 
      description: "Real-time insights and performance metrics at a glance", 
      icon: <DashboardIcon />, 
      path: "/dashboard" 
    },
    { 
      title: "Workflows", 
      description: "Automated financial processes and task management", 
      icon: <AccountTree />, 
      path: "/workflows" 
    },
    { 
      title: "Data Management", 
      description: "Comprehensive data solutions and analytics tools", 
      icon: <Storage />, 
      path: "/data" 
    },
    { 
      title: "Analytics", 
      description: "Deep performance insights and trend analysis", 
      icon: <Analytics />, 
      path: "/results" 
    },
  ];

  const searchSuggestions = [
    "Portfolio performance",
    "Risk analysis",
    "Workflow status",
    "Settlement reports",
  ];

  const stats = [
    { label: "Active Portfolios", value: "127", icon: <TrendingUp /> },
    { label: "Automated Workflows", value: "48", icon: <Speed /> },
    { label: "Risk Alerts", value: "3", icon: <Shield /> },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, mt: { xs: 4, md: 8 } }}>
        <Typography 
          variant="h1" 
          component="h1" 
          sx={{ 
            mb: 2,
            fontSize: { xs: '2rem', md: '3rem' },
            fontWeight: 600,
          }}
        >
          Custodian Automation Platform
        </Typography>
        <Typography 
          variant="h5" 
          color="text.secondary" 
          sx={{ 
            mb: 5,
            maxWidth: 600,
            mx: 'auto',
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.25rem' },
            lineHeight: 1.6,
          }}
        >
          Search, analyze, and gain insights from your financial data with intelligent automation
        </Typography>
        
        {/* Search Bar */}
        <Box sx={{ maxWidth: 640, mx: 'auto', mb: 3 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search portfolios, data, workflows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'background.paper',
                transition: 'all 0.2s ease',
                '&:hover': {
                  boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
                }
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button 
                    variant="contained" 
                    onClick={handleSearch}
                    sx={{ 
                      borderRadius: 2,
                      px: 3,
                      py: 1,
                    }}
                    endIcon={<ArrowForward sx={{ fontSize: 18 }} />}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        {/* Search suggestions */}
        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
            Try:
          </Typography>
          {searchSuggestions.map((suggestion) => (
            <Chip
              key={suggestion}
              label={suggestion}
              size="small"
              variant="outlined"
              onClick={() => {
                setSearchQuery(suggestion);
                navigate(`/search?q=${encodeURIComponent(suggestion)}`);
              }}
              sx={{ 
                borderColor: 'divider',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: alpha('#000', 0.04),
                  borderColor: 'text.secondary',
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* Stats Overview */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: { xs: 2, md: 6 }, 
          mb: { xs: 6, md: 10 },
          flexWrap: 'wrap',
        }}
      >
        {stats.map((stat) => (
          <Box key={stat.label} sx={{ textAlign: 'center', minWidth: 120 }}>
            <Box 
              sx={{ 
                display: 'inline-flex',
                p: 1.5,
                borderRadius: 2,
                bgcolor: alpha('#000', 0.04),
                color: 'text.secondary',
                mb: 1,
              }}
            >
              {stat.icon}
            </Box>
            <Typography variant="h4" fontWeight={600}>
              {stat.value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Quick Access Cards */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Quick Access
        </Typography>
      </Box>
      
      <Box 
        sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, 
          gap: 3 
        }}
      >
        {quickActions.map((action) => (
          <Card 
            key={action.title}
            sx={{ 
              height: '100%',
              cursor: 'pointer', 
              '&:hover': { 
                boxShadow: 4, 
                transform: 'translateY(-4px)',
                '& .action-icon': {
                  bgcolor: 'primary.main',
                  color: 'primary.contrastText',
                }
              },
              transition: 'all 0.2s ease',
            }} 
            onClick={() => navigate(action.path)}
          >
            <CardContent sx={{ p: 3 }}>
              <Box 
                className="action-icon"
                sx={{ 
                  display: 'inline-flex',
                  p: 1.5,
                  borderRadius: 2,
                  bgcolor: alpha('#000', 0.04),
                  color: 'text.secondary',
                  mb: 2,
                  transition: 'all 0.2s ease',
                }}
              >
                {action.icon}
              </Box>
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
                {action.title}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
                {action.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default Index;
