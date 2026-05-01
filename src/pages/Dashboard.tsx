import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, CardHeader, Button,
  Paper, LinearProgress, Chip, alpha,
} from "@mui/material";
import {
  TrendingUp, Analytics, AccountTree, Storage, Search, Assessment, Timeline, Speed,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import { useIntl } from "react-intl";

const Dashboard = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  const dashboardStats = [
    { title: intl.formatMessage({ id: "dashboard.portfolioValue" }), value: "$1,247,500", change: "+12.45%", icon: <TrendingUp />, color: "success" },
    { title: intl.formatMessage({ id: "dashboard.activeWorkflows" }), value: "8", change: intl.formatMessage({ id: "dashboard.running" }, { count: 3 }), icon: <AccountTree />, color: "info" },
    { title: intl.formatMessage({ id: "dashboard.dataSources" }), value: "24", change: intl.formatMessage({ id: "dashboard.newToday" }, { count: 2 }), icon: <Storage />, color: "primary" },
    { title: intl.formatMessage({ id: "dashboard.riskScore" }), value: intl.formatMessage({ id: "dashboard.medium" }), change: "6/10", icon: <Assessment />, color: "warning" },
  ];

  const recentActivity = [
    { type: intl.formatMessage({ id: "dashboard.activity.workflow" }), name: intl.formatMessage({ id: "dashboard.activity.riskAssessment" }), time: "2 min", status: "success" },
    { type: intl.formatMessage({ id: "dashboard.activity.data" }), name: intl.formatMessage({ id: "dashboard.activity.marketData" }), time: "15 min", status: "info" },
    { type: intl.formatMessage({ id: "dashboard.activity.portfolio" }), name: intl.formatMessage({ id: "dashboard.activity.rebalancing" }), time: "1 hour", status: "warning" },
    { type: intl.formatMessage({ id: "dashboard.activity.system" }), name: intl.formatMessage({ id: "dashboard.activity.ontologySync" }), time: "3 hours", status: "success" },
  ];

  const quickActions = [
    { title: intl.formatMessage({ id: "dashboard.exploreData" }), description: intl.formatMessage({ id: "dashboard.exploreDataDesc" }), icon: <Storage />, path: "/data" },
    { title: intl.formatMessage({ id: "dashboard.runWorkflows" }), description: intl.formatMessage({ id: "dashboard.runWorkflowsDesc" }), icon: <AccountTree />, path: "/workflows" },
    { title: intl.formatMessage({ id: "dashboard.searchPlatform" }), description: intl.formatMessage({ id: "dashboard.searchPlatformDesc" }), icon: <Search />, path: "/search" },
    { title: intl.formatMessage({ id: "dashboard.viewAnalytics" }), description: intl.formatMessage({ id: "dashboard.viewAnalyticsDesc" }), icon: <Analytics />, path: "/results" },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {intl.formatMessage({ id: "dashboard.title" })}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {intl.formatMessage({ id: "dashboard.subtitle" })}
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3, mb: 4 }}>
            {dashboardStats.map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card sx={{ '&:hover': { boxShadow: 4, transform: 'translateY(-2px)' }, transition: 'all 0.2s ease' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Box sx={{ color: `${stat.color}.main` }}>{stat.icon}</Box>
                      <Typography variant="h6" sx={{ ml: 1 }}>{stat.title}</Typography>
                    </Box>
                    <Typography variant="h4" color={`${stat.color}.main`}>{stat.value}</Typography>
                    <Typography variant="body2" color="text.secondary">{stat.change}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 4, mb: 4 }}>
            <Card>
              <CardHeader title={intl.formatMessage({ id: "dashboard.quickActions" })} />
              <CardContent>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 2 }}>
                  {quickActions.map((action, index) => (
                    <Paper key={index} sx={{ p: 2, cursor: 'pointer', '&:hover': { bgcolor: 'action.hover', transform: 'translateY(-2px)', boxShadow: 2 }, transition: 'all 0.2s ease' }}
                      onClick={() => navigate(action.path)}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        {action.icon}
                        <Typography variant="h6" sx={{ ml: 1 }}>{action.title}</Typography>
                      </Box>
                      <Typography variant="body2" color="text.secondary">{action.description}</Typography>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>

            <Card>
              <CardHeader title={intl.formatMessage({ id: "dashboard.recentActivity" })} />
              <CardContent>
                <Box sx={{ maxHeight: 300, overflow: 'auto' }}>
                  {recentActivity.map((activity, index) => (
                    <Box key={index} sx={{ mb: 2, pb: 2, borderBottom: index < recentActivity.length - 1 ? 1 : 0, borderColor: 'divider' }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
                        <Typography variant="subtitle2">{activity.name}</Typography>
                        <Chip label={activity.type} size="small" variant="outlined" color={activity.status as any} />
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        {intl.formatMessage({ id: "dashboard.activity.timeAgo" }, { time: activity.time })}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Card>
            <CardHeader title={intl.formatMessage({ id: "dashboard.systemPerformance" })} />
            <CardContent>
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr 1fr' }, gap: 3 }}>
                {[
                  { label: intl.formatMessage({ id: "dashboard.workflowEngine" }), value: 92, color: "success" as const },
                  { label: intl.formatMessage({ id: "dashboard.dataProcessing" }), value: 87, color: "primary" as const },
                  { label: intl.formatMessage({ id: "dashboard.knowledgeGraph" }), value: 95, color: "success" as const },
                ].map((perf) => (
                  <Box key={perf.label} sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2">{perf.label}</Typography>
                      <Typography variant="body2">{perf.value}%</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={perf.value} color={perf.color} sx={{ height: 6, borderRadius: 3 }} />
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default Dashboard;
