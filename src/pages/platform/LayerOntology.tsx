import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, alpha, Chip, useTheme } from "@mui/material";
import { MenuBook, Category, Schema, Link as LinkIcon } from "@mui/icons-material";
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import PlatformBreadcrumb from "@/components/PlatformBreadcrumb";

const entities = [
  { name: "Financial Instrument", fields: 47, mapped: 42, standard: "FIBO" },
  { name: "Legal Entity", fields: 32, mapped: 30, standard: "LEI" },
  { name: "Portfolio", fields: 28, mapped: 28, standard: "Custom" },
  { name: "Transaction", fields: 35, mapped: 31, standard: "FpML" },
  { name: "Market Data Point", fields: 18, mapped: 18, standard: "FIBO" },
  { name: "Corporate Action", fields: 24, mapped: 19, standard: "ISO 15022" },
];

const LayerOntology = () => {
  const theme = useTheme();
  const color = theme.palette.info.main;

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        <PlatformBreadcrumb layerNumber={1} layerName="Ontology" />
        <motion.div variants={fadeInUp}>
          <Box sx={{ mb: 6 }}>
            <Chip label="Layer 1" size="small" sx={{ mb: 2, bgcolor: alpha(color, 0.1), color, fontWeight: 600 }} />
            <Typography variant="h3" component="h1" sx={{ fontWeight: 600, mb: 2 }}>
              Ontology & Data Dictionaries
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, lineHeight: 1.6 }}>
              Define entity types, field mappings, taxonomy structures, and alignment to industry standards like FIBO.
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={staggerContainer} initial="initial" animate="animate">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
            {entities.map((entity) => {
              const pct = Math.round((entity.mapped / entity.fields) * 100);
              return (
                <motion.div key={entity.name} variants={fadeInUp}>
                  <Card sx={{ height: '100%', position: 'relative', overflow: 'hidden' }}>
                    <Box sx={{ position: 'absolute', top: 0, left: 0, width: 4, height: '100%', bgcolor: color }} />
                    <CardContent sx={{ p: 3, pl: 4 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                        <Box sx={{ display: 'inline-flex', p: 1.5, borderRadius: 2, bgcolor: alpha(color, 0.1), color }}>
                          <Category />
                        </Box>
                        <Chip label={entity.standard} size="small" variant="outlined" sx={{ borderColor: 'divider' }} />
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 500, mb: 0.5 }}>{entity.name}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {entity.mapped}/{entity.fields} fields mapped ({pct}%)
                      </Typography>
                      <Box sx={{ width: '100%', height: 4, borderRadius: 2, bgcolor: alpha(color, 0.1) }}>
                        <Box sx={{ width: `${pct}%`, height: '100%', borderRadius: 2, bgcolor: pct === 100 ? 'success.main' : color }} />
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

export default LayerOntology;
