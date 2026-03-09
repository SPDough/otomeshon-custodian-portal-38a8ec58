import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  alpha,
  Chip,
  useTheme,
} from "@mui/material";
import {
  FolderOpen as PortfolioIcon,
  TrendingUp,
  Hub as HubIcon,
  Search as SearchIcon,
  BusinessCenter as BriefcaseIcon,
  ArrowForward,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";

const FrontOffice = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  const features = [
    { 
      title: "Portfolios", 
      description: "Track and manage investment portfolios with real-time performance metrics",
      icon: <PortfolioIcon />, 
      path: "/portfolios",
      stats: "127 Active",
      color: theme.palette.primary.main
    },
    { 
      title: "Performance", 
      description: "Analyze returns, benchmarks, and attribution across all holdings",
      icon: <TrendingUp />, 
      path: "/portfolios",
      stats: "+12.4% YTD",
      color: theme.palette.success.main
    },
    { 
      title: "Corporate Actions", 
      description: "Monitor dividends, splits, mergers, and other corporate events",
      icon: <BriefcaseIcon />, 
      path: "/portfolios",
      stats: "8 Pending",
      color: theme.palette.warning.main
    },
    { 
      title: "Knowledge Graph", 
      description: "Explore relationships between entities using FIBO ontology",
      icon: <HubIcon />, 
      path: "/knowledge-graph",
      stats: "2.4M Nodes",
      color: theme.palette.info.main
    },
    { 
      title: "Knowledge Base", 
      description: "Search and discover insights from structured financial data",
      icon: <SearchIcon />, 
      path: "/knowledge-base",
      stats: "Fast Search",
      color: theme.palette.secondary.main
    },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header */}
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip 
              label="Front Office" 
              size="small" 
              sx={{ 
                mb: 2, 
                bgcolor: alpha(theme.palette.primary.main, 0.1), 
                color: 'primary.main',
                fontWeight: 500 
              }} 
            />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              Client Support & Research
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Access portfolio management, performance analytics, and knowledge discovery tools to support client-facing operations.
            </Typography>
          </Box>
        </motion.div>

        {/* Feature Cards */}
        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {features.map((feature, index) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card
                  sx={{
                    height: '100%',
                    cursor: 'pointer',
                    position: 'relative',
                    overflow: 'hidden',
                    '&:hover': {
                      boxShadow: `0 8px 30px ${alpha(feature.color, 0.15)}`,
                      transform: 'translateY(-4px)',
                      '& .arrow-icon': { transform: 'translateX(4px)', opacity: 1 }
                    },
                    transition: 'all 0.3s ease',
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: 4,
                      height: '100%',
                      bgcolor: feature.color,
                    }}
                  />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          p: 1.5,
                          borderRadius: 2,
                          bgcolor: alpha(feature.color, 0.1),
                          color: feature.color,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      <Chip 
                        label={feature.stats} 
                        size="small" 
                        variant="outlined"
                        sx={{ borderColor: 'divider' }}
                      />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>
                      {feature.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>
                      {feature.description}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                      <Typography variant="body2" fontWeight={500}>Explore</Typography>
                      <ArrowForward 
                        className="arrow-icon"
                        sx={{ ml: 0.5, fontSize: 16, opacity: 0, transition: 'all 0.2s ease' }} 
                      />
                    </Box>
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

export default FrontOffice;
