import { motion } from "framer-motion";
import { Container, Typography, Box, Card, CardContent, Avatar, Chip, Button, Paper } from '@mui/material';
import { TrendingUp, Security, Analytics, Business, LinkedIn, Email } from '@mui/icons-material';
import AnimatedPage, { fadeInUp, staggerContainer } from "@/components/AnimatedPage";
import { useIntl } from "react-intl";

const About = () => {
  const intl = useIntl();

  const teamMembers = [
    { name: 'Sarah Chen', role: 'Chief Executive Officer', bio: 'Former State Street VP with 15+ years in custody operations and automation technology.', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face', linkedin: '#', email: 'sarah.chen@company.com' },
    { name: 'Michael Rodriguez', role: 'Chief Technology Officer', bio: 'Ex-BNY Mellon technology lead specializing in custodial systems and automation platforms.', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face', linkedin: '#', email: 'michael.rodriguez@company.com' },
    { name: 'Dr. Emma Thompson', role: 'Head of Operations Intelligence', bio: 'PhD in Operations Research from MIT, former Northern Trust specialist in custody workflow optimization.', image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop&crop=face', linkedin: '#', email: 'emma.thompson@company.com' },
    { name: 'James Park', role: 'Head of Product', bio: 'Former Citi product manager with deep expertise in custodial services and regulatory compliance.', image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face', linkedin: '#', email: 'james.park@company.com' },
  ];

  const values = [
    { icon: <Analytics color="primary" />, title: intl.formatMessage({ id: 'about.operationalExcellence' }), description: intl.formatMessage({ id: 'about.operationalExcellenceDesc' }) },
    { icon: <Security color="primary" />, title: intl.formatMessage({ id: 'about.securityCompliance' }), description: intl.formatMessage({ id: 'about.securityComplianceDesc' }) },
    { icon: <TrendingUp color="primary" />, title: intl.formatMessage({ id: 'about.continuousInnovation' }), description: intl.formatMessage({ id: 'about.continuousInnovationDesc' }) },
    { icon: <Business color="primary" />, title: intl.formatMessage({ id: 'about.clientPartnership' }), description: intl.formatMessage({ id: 'about.clientPartnershipDesc' }) },
  ];

  return (
    <AnimatedPage>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <motion.div variants={fadeInUp}>
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="h2" component="h1" gutterBottom>{intl.formatMessage({ id: 'about.title' })}</Typography>
            <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
              {intl.formatMessage({ id: 'about.subtitle' })}
            </Typography>
          </Box>
        </motion.div>

        <motion.div variants={fadeInUp}>
          <Paper sx={{ p: 4, mb: 6, bgcolor: 'primary.main', color: 'white' }}>
            <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>{intl.formatMessage({ id: 'about.missionTitle' })}</Typography>
            <Typography variant="h6" sx={{ color: 'grey.100' }}>{intl.formatMessage({ id: 'about.missionText' })}</Typography>
          </Paper>
        </motion.div>

        <Box sx={{ mb: 8 }}>
          <motion.div variants={fadeInUp}><Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>{intl.formatMessage({ id: 'about.valuesTitle' })}</Typography></motion.div>
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
              {values.map((value, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card sx={{ height: '100%', textAlign: 'center', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' }, transition: 'all 0.2s ease' }}>
                    <CardContent>
                      <Box sx={{ mb: 2 }}>{value.icon}</Box>
                      <Typography variant="h6" gutterBottom>{value.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{value.description}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        <Box sx={{ mb: 8 }}>
          <motion.div variants={fadeInUp}>
            <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>{intl.formatMessage({ id: 'about.teamTitle' })}</Typography>
            <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>{intl.formatMessage({ id: 'about.teamSubtitle' })}</Typography>
          </motion.div>
          <motion.div variants={staggerContainer} initial="initial" animate="animate">
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
              {teamMembers.map((member, index) => (
                <motion.div key={index} variants={fadeInUp}>
                  <Card sx={{ height: '100%', textAlign: 'center', '&:hover': { boxShadow: 4, transform: 'translateY(-4px)' }, transition: 'all 0.2s ease' }}>
                    <CardContent>
                      <Avatar src={member.image} alt={member.name} sx={{ width: 120, height: 120, mx: 'auto', mb: 2, border: '4px solid', borderColor: 'primary.main' }} />
                      <Typography variant="h6" gutterBottom>{member.name}</Typography>
                      <Chip label={member.role} color="primary" variant="outlined" sx={{ mb: 2 }} />
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>{member.bio}</Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                        <Button size="small" startIcon={<LinkedIn />} href={member.linkedin} sx={{ minWidth: 'auto' }} />
                        <Button size="small" startIcon={<Email />} href={`mailto:${member.email}`} sx={{ minWidth: 'auto' }} />
                      </Box>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </Box>
          </motion.div>
        </Box>

        <motion.div variants={fadeInUp}>
          <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
            <Typography variant="h4" gutterBottom>{intl.formatMessage({ id: 'about.byTheNumbers' })}</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 4, mt: 4 }}>
              {[
                { val: '50+', label: intl.formatMessage({ id: 'about.enterpriseClients' }) },
                { val: '$10B+', label: intl.formatMessage({ id: 'about.assetsUnderCustody' }) },
                { val: '99.9%', label: intl.formatMessage({ id: 'about.platformUptime' }) },
                { val: '24/7', label: intl.formatMessage({ id: 'about.expertSupport' }) },
              ].map((s) => (
                <Box key={s.label}><Typography variant="h3" color="primary.main" gutterBottom>{s.val}</Typography><Typography variant="h6" color="text.secondary">{s.label}</Typography></Box>
              ))}
            </Box>
          </Paper>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default About;
