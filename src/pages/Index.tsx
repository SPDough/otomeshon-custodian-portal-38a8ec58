import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CardHeader,
  Button,
  Paper,
  LinearProgress,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  Analytics,
  AccountTree,
  Storage,
  Search,
  Assessment,
  Timeline,
  Speed,
} from "@mui/icons-material";

const Index = () => {
  const navigate = useNavigate();

  const dashboardStats = [
    { title: "Portfolio Value", value: "$1,247,500", change: "+12.45%", icon: <TrendingUp />, color: "success" },
    { title: "Active Workflows", value: "8", change: "3 Running", icon: <AccountTree />, color: "info" },
    { title: "Data Sources", value: "24", change: "2 New Today", icon: <Storage />, color: "primary" },
    { title: "Risk Score", value: "Medium", change: "6/10", icon: <Assessment />, color: "warning" },
  ];

  const recentActivity = [
    { type: "Workflow", name: "Risk Assessment Complete", time: "2 min ago", status: "success" },
    { type: "Data", name: "Market Data Updated", time: "15 min ago", status: "info" },
    { type: "Portfolio", name: "Rebalancing Triggered", time: "1 hour ago", status: "warning" },
    { type: "System", name: "FIBO Ontology Sync", time: "3 hours ago", status: "success" },
  ];

  const quickActions = [
    { title: "Explore Data", description: "Interactive data sandbox", icon: <Storage />, path: "/data" },
    { title: "Run Workflows", description: "Configure automation", icon: <AccountTree />, path: "/workflows" },
    { title: "Search Platform", description: "Find anything quickly", icon: <Search />, path: "/search" },
    { title: "View Analytics", description: "Performance insights", icon: <Analytics />, path: "/results" },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Financial Intelligence Dashboard
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Welcome back! Here's what's happening with your financial data and workflows.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
        {dashboardStats.map((stat, index) => (
          <Card key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ color: `${stat.color}.main` }}>
                  {stat.icon}
                </Box>
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {stat.title}
                </Typography>
              </Box>
              <Typography variant="h4" color={`${stat.color}.main`}>
                {stat.value}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {stat.change}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4, mb: 4 }}>
        {/* Quick Actions */}
        <Card>
          <CardHeader title="Quick Actions" />
          <CardContent>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
              {quickActions.map((action, index) => (
                <Paper
                  key={index}
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    '&:hover': { bgcolor: 'action.hover' },
                    transition: 'background-color 0.2s',
                  }}
                  onClick={() => navigate(action.path)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {action.icon}
                    <Typography variant="h6" sx={{ ml: 1 }}>
                      {action.title}
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {action.description}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader title="Recent Activity" />
          <CardContent>
            <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
              {recentActivity.map((activity, index) => (
                <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < recentActivity.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                    <Typography variant="subtitle2">{activity.name}</Typography>
                    <Chip
                      label={activity.type}
                      size="small"
                      variant="outlined"
                      color={activity.status as any}
                    />
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {activity.time}
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* System Performance */}
      <Card>
        <CardHeader title="System Performance" />
        <CardContent>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Workflow Engine</Typography>
                <Typography variant="body2">92%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={92} color="success" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Data Processing</Typography>
                <Typography variant="body2">87%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={87} color="primary" />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2">Knowledge Graph</Typography>
                <Typography variant="body2">95%</Typography>
              </Box>
              <LinearProgress variant="determinate" value={95} color="success" />
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default Index;