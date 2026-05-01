import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { CloudDone, Sync } from "@mui/icons-material";
import { useIntl } from "react-intl";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import PlatformBreadcrumb from "@/components/PlatformBreadcrumb";

const knowledgeSources = [
  { name: "Regulatory Filings (SEC)", docs: 12400, embedded: 12400, status: "complete" },
  { name: "ISDA Agreements", docs: 850, embedded: 720, status: "processing" },
  { name: "Fund Prospectuses", docs: 340, embedded: 340, status: "complete" },
  { name: "Internal Procedures", docs: 180, embedded: 180, status: "complete" },
  { name: "Market Research Reports", docs: 5600, embedded: 4200, status: "processing" },
  { name: "Client Communications", docs: 2300, embedded: 2300, status: "complete" },
];

const LayerRAG = () => {
  const theme = useTheme();
  const intl = useIntl();
  const fm = (id: string, values?: Record<string, string | number>) => intl.formatMessage({ id }, values);
  const color = theme.palette.success.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PlatformBreadcrumb layerNumber={5} layerName="RAG Knowledge" />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label={fm("layer5.chip")} size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>{fm("layer5.title")}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              {fm("layer5.subtitle")}
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {knowledgeSources.map((src) => {
              const pct = Math.round((src.embedded / src.docs) * 100);
              return (
                <motion.div key={src.name} variants={fadeInUp}>
                  <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                    <CardContent sx={{ p: 3, pl: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                          {src.status === 'complete' ? <CloudDone /> : <Sync />}
                        </Box>
                        <Chip
                          label={src.status === 'complete' ? fm("layer5.statusEmbedded") : fm("layer5.statusProcessing")}
                          size="small"
                          sx={{
                            bgcolor: src.status === 'complete' ? alpha(theme.palette.success.main, 0.1) : alpha(theme.palette.info.main, 0.1),
                            color: src.status === 'complete' ? 'success.main' : 'info.main',
                            fontWeight: 500,
                          }}
                        />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{src.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {fm("layer5.docsProgress", { embedded: intl.formatNumber(src.embedded), total: intl.formatNumber(src.docs), pct })}
                      </Typography>
                      <Box sx={{ width: '100%', height: 4, borderRadius: 2, bgcolor: alpha(color, 0.1) }}>
                        <Box sx={{ width: `${pct}%`, height: '100%', borderRadius: 2, bgcolor: pct === 100 ? 'success.main' : 'info.main' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </Box>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default LayerRAG;
