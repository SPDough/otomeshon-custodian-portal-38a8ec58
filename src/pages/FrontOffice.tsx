import { useNavigate } from "react-router-dom";
import { useIntl } from "react-intl";
import { motion } from "framer-motion";
import {
  Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme,
} from "@mui/material";
import {
  FolderOpen as PortfolioIcon, TrendingUp, Hub as HubIcon,
  Search as SearchIcon, BusinessCenter as BriefcaseIcon, ArrowForward,
} from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import AppBreadcrumb from "@/components/AppBreadcrumb";

const FrontOffice = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const features = [
    { title: fm("frontOffice.portfolios"), description: fm("frontOffice.portfoliosDesc"), icon: <PortfolioIcon />, path: "/portfolios", stats: fm("frontOffice.portfoliosStats"), color: theme.palette.primary.main },
    { title: fm("frontOffice.performance"), description: fm("frontOffice.performanceDesc"), icon: <TrendingUp />, path: "/portfolios", stats: fm("frontOffice.performanceStats"), color: theme.palette.success.main },
    { title: fm("frontOffice.corporateActions"), description: fm("frontOffice.corporateActionsDesc"), icon: <BriefcaseIcon />, path: "/portfolios", stats: fm("frontOffice.corporateActionsStats"), color: theme.palette.warning.main },
    { title: fm("frontOffice.knowledgeGraph"), description: fm("frontOffice.knowledgeGraphDesc"), icon: <HubIcon />, path: "/knowledge-graph", stats: fm("frontOffice.knowledgeGraphStats"), color: theme.palette.info.main },
    { title: fm("frontOffice.knowledgeBase"), description: fm("frontOffice.knowledgeBaseDesc"), icon: <SearchIcon />, path: "/knowledge-base", stats: fm("frontOffice.knowledgeBaseStats"), color: theme.palette.secondary.main },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <AppBreadcrumb crumbs={[{ labelId: "breadcrumb.frontOffice" }]} />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label={fm("frontOffice.chip")} size="small" sx={{ mb: 2, bgcolor: alpha(theme.palette.primary.main, 0.1), color: 'primary.main', fontWeight: 500 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>{fm("frontOffice.title")}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>{fm("frontOffice.subtitle")}</Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {features.map((feature) => (
              <motion.div key={feature.title} variants={fadeInUp}>
                <Card sx={{ height: '100%', cursor: 'pointer', position: 'relative', overflow: 'hidden', '&:hover': { boxShadow: `0 8px 30px ${alpha(feature.color, 0.15)}`, transform: 'translateY(-4px)', '& .arrow-icon': { transform: 'translateX(4px)', opacity: 1 } }, transition: 'all 0.3s ease' }} onClick={() => navigate(feature.path)}>
                  <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: feature.color }} />
                  <CardContent sx={{ p: 3, pl: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(feature.color, 0.1), color: feature.color }}>{feature.icon}</Box>
                      <Chip label={feature.stats} size="small" variant="outlined" sx={{ borderColor: 'divider' }} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 500, mb: 1 }}>{feature.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, lineHeight: 1.6 }}>{feature.description}</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
                      <Typography variant="body2" fontWeight={500}>{fm("frontOffice.explore")}</Typography>
                      <ArrowForward className="arrow-icon" sx={{ ml: 0.5, fontSize: 16, opacity: 0, transition: 'all 0.2s ease' }} />
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