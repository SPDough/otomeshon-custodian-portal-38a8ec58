import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Search,
  Dashboard as DashboardIcon,
  Analytics,
  AccountTree,
  Storage,
  TrendingUp,
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
      description: "Real-time insights and metrics", 
      icon: <DashboardIcon />, 
      path: "/dashboard" 
    },
    { 
      title: "Workflows", 
      description: "Automated financial processes", 
      icon: <AccountTree />, 
      path: "/workflows" 
    },
    { 
      title: "Data Management", 
      description: "Comprehensive data solutions", 
      icon: <Storage />, 
      path: "/data" 
    },
    { 
      title: "Analytics", 
      description: "Performance insights", 
      icon: <Analytics />, 
      path: "/results" 
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section with Search */}
      <Box sx={{ textAlign: 'center', mb: 8, mt: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Financial Intelligence Platform
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 6 }}>
          Search, analyze, and gain insights from your financial data
        </Typography>
        
        {/* Central Search Bar */}
        <Box sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search portfolios, data, workflows, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 8,
                fontSize: '1.1rem',
                py: 1,
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search sx={{ color: 'primary.main' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button 
                    variant="contained" 
                    onClick={handleSearch}
                    sx={{ borderRadius: 6 }}
                  >
                    Search
                  </Button>
                </InputAdornment>
              ),
            }}
          />
        </Box>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Try searching for "portfolio performance", "risk analysis", or "workflow status"
        </Typography>
      </Box>

      {/* Quick Access Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
        {quickActions.map((action, index) => (
          <Card 
            key={index} 
            sx={{ 
              cursor: 'pointer', 
              '&:hover': { 
                boxShadow: 6, 
                transform: 'translateY(-2px)',
                transition: 'all 0.2s ease-in-out'
              } 
            }} 
            onClick={() => navigate(action.path)}
          >
            <CardHeader 
              avatar={
                <Box sx={{ color: 'primary.main', display: 'flex', alignItems: 'center' }}>
                  {action.icon}
                </Box>
              }
              title={action.title}
              titleTypographyProps={{ variant: 'h6' }}
            />
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body2" color="text.secondary">
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