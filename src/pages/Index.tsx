import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  Search,
  Analytics,
  AccountTree,
  Storage,
} from "@mui/icons-material";

const Index = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Hero Section */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Financial Intelligence Platform
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4 }}>
          Advanced analytics, automated workflows, and comprehensive data management for financial intelligence
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<DashboardIcon />}
          onClick={() => navigate('/dashboard')}
          sx={{ mr: 2 }}
        >
          View Dashboard
        </Button>
        <Button
          variant="outlined"
          size="large"
          startIcon={<Search />}
          onClick={() => navigate('/search')}
        >
          Start Searching
        </Button>
      </Box>

      {/* Feature Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 4 }}>
        <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => navigate('/dashboard')}>
          <CardHeader 
            avatar={<DashboardIcon color="primary" />}
            title="Dashboard"
            subheader="Real-time insights and metrics"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Monitor portfolio performance, workflow status, and system health in one unified view.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => navigate('/workflows')}>
          <CardHeader 
            avatar={<AccountTree color="primary" />}
            title="Workflows"
            subheader="Automated financial processes"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Configure and manage automated workflows for risk assessment, data processing, and more.
            </Typography>
          </CardContent>
        </Card>

        <Card sx={{ cursor: 'pointer', '&:hover': { boxShadow: 6 } }} onClick={() => navigate('/data')}>
          <CardHeader 
            avatar={<Storage color="primary" />}
            title="Data Management"
            subheader="Comprehensive data solutions"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Access and analyze financial data from multiple sources with advanced visualization tools.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Index;