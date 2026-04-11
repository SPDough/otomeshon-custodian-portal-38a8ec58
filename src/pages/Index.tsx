import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip } from "@mui/material";
import {
  Dashboard as DashboardIcon, Analytics, AccountTree, Storage,
  TrendingUp, Shield, Speed,
} from "@mui/icons-material";
import EnhancedSearchBar from "@/components/EnhancedSearchBar";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import { useIntl } from "react-intl";

const Index = () => {
  const navigate = useNavigate();
  const intl = useIntl();

  const quickActions = [
    { title: intl.formatMessage({ id: "index.dashboard" }), description: intl.formatMessage({ id: "index.dashboardDesc" }), icon: <DashboardIcon />, path: "/dashboard" },
    { title: intl.formatMessage({ id: "index.workflows" }), description: intl.formatMessage({ id: "index.workflowsDesc" }), icon: <AccountTree />, path: "/workflows" },
    { title: intl.formatMessage({ id: "index.dataManagement" }), description: intl.formatMessage({ id: "index.dataManagementDesc" }), icon: <Storage />, path: "/data" },
    { title: intl.formatMessage({ id: "index.analytics" }), description: intl.formatMessage({ id: "index.analyticsDesc" }), icon: <Analytics />, path: "/results" },
  ];

  const searchSuggestions = [
    intl.formatMessage({ id: "index.suggestion.portfolioPerformance" }),
    intl.formatMessage({ id: "index.suggestion.riskAnalysis" }),
    intl.formatMessage({ id: "index.suggestion.workflowStatus" }),
    intl.formatMessage({ id: "index.suggestion.settlementReports" }),
  ];

  const stats = [
    { label: intl.formatMessage({ id: "index.activePortfolios" }), value: "127", icon: <TrendingUp /> },
    { label: intl.formatMessage({ id: "index.automatedWorkflows" }), value: "48", icon: <Speed /> },
    { label: intl.formatMessage({ id: "index.riskAlerts" }), value: "3", icon: <Shield /> },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 10 }, mt: { xs: 4, md: 8 } }}>
            <Typography variant="h1" component="h1" sx={{ mb: 2, fontSize: { xs: '2rem', md: '3rem' }, fontWeight: 600 }}>
              {intl.formatMessage({ id: "index.title" })}
            </Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 5, maxWidth: 600, mx: 'auto', fontWeight: 400, fontSize: { xs: '1rem', md: '1.25rem' }, lineHeight: 1.6 }}>
              {intl.formatMessage({ id: "index.subtitle" })}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <EnhancedSearchBar />
            </Box>
            <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>{intl.formatMessage({ id: "index.try" })}</Typography>
              {searchSuggestions.map((suggestion) => (
                <Chip key={suggestion} label={suggestion} size="small" variant="outlined"
                  onClick={() => navigate(`/search?q=${encodeURIComponent(suggestion)}`)}
                  sx={{ borderColor: 'divider', cursor: 'pointer', '&:hover': { bgcolor: alpha('#000', 0.04), borderColor: 'text.secondary' } }} />
              ))}
            </Box>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: { xs: 2, md: 6 }, mb: { xs: 6, md: 10 }, flexWrap: 'wrap' }}>
            {stats.map((stat) => (
              <Box key={stat.label} sx={{ textAlign: 'center', minWidth: 120 }}>
                <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha('#000', 0.04), color: 'text.secondary', mb: 1 }}>
                  {stat.icon}
                </Box>
                <Typography variant="h4" fontWeight={600}>{stat.value}</Typography>
                <Typography variant="body2" color="text.secondary">{stat.label}</Typography>
              </Box>
            ))}
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 2 }}><Typography variant="h6" sx={{ mb: 3 }}>{intl.formatMessage({ id: "index.quickAccess" })}</Typography></Box>
        </motion.div>
        
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 3 }}>
            {quickActions.map((action) => (
              <motion.div key={action.title} variants={fadeInUp}>
                <Card sx={{ height: '100%', cursor: 'pointer', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)', '& .action-icon': { bgcolor: 'primary.main', color: 'primary.contrastText' } }, transition: 'all 0.2s ease' }}
                  onClick={() => navigate(action.path)}>
                  <CardContent sx={{ p: 3 }}>
                    <Box className="action-icon" sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha('#000', 0.04), color: 'text.secondary', mb: 2, transition: 'all 0.2s ease' }}>
                      {action.icon}
                    </Box>
                    <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>{action.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>{action.description}</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </Box>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default Index;
