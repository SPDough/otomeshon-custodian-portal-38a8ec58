import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  Chip,
  Button,
  Paper,
} from '@mui/material';
import {
  TrendingUp,
  Security,
  Analytics,
  Business,
  LinkedIn,
  Email,
} from '@mui/icons-material';

const About = () => {
  const teamMembers = [
    {
      name: 'Sarah Chen',
      role: 'Chief Executive Officer',
      bio: 'Former State Street VP with 15+ years in custody operations and automation technology.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'sarah.chen@company.com'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Technology Officer',
      bio: 'Ex-BNY Mellon technology lead specializing in custodial systems and automation platforms.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'michael.rodriguez@company.com'
    },
    {
      name: 'Dr. Emma Thompson',
      role: 'Head of Operations Intelligence',
      bio: 'PhD in Operations Research from MIT, former Northern Trust specialist in custody workflow optimization.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'emma.thompson@company.com'
    },
    {
      name: 'James Park',
      role: 'Head of Product',
      bio: 'Former Citi product manager with deep expertise in custodial services and regulatory compliance.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'james.park@company.com'
    }
  ];

  const values = [
    {
      icon: <Analytics color="primary" />,
      title: 'Operational Excellence',
      description: 'We leverage intelligent automation to streamline custodial operations and eliminate manual errors.'
    },
    {
      icon: <Security color="primary" />,
      title: 'Security & Compliance',
      description: 'Enterprise-grade security and regulatory compliance are built into every aspect of our platform.'
    },
    {
      icon: <TrendingUp color="primary" />,
      title: 'Continuous Innovation',
      description: 'We continuously advance custodial technology to deliver cutting-edge automation solutions.'
    },
    {
      icon: <Business color="primary" />,
      title: 'Client Partnership',
      description: 'Your success is our priority. We\'re dedicated to transforming your custodial operations.'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Company Overview */}
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          About Our Company
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
          We're transforming custodial operations through intelligent automation, 
          streamlined workflows, and comprehensive data management solutions.
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Paper sx={{ p: 4, mb: 6, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Our Mission
        </Typography>
        <Typography variant="h6" sx={{ color: 'grey.100' }}>
          To empower custodial professionals with intelligent automation tools that streamline operations, 
          enhance compliance, and deliver superior service to asset managers and institutional investors worldwide.
        </Typography>
      </Paper>

      {/* Company Values */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Our Values
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
          {values.map((value, index) => (
            <Card key={index} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Box sx={{ mb: 2 }}>
                  {value.icon}
                </Box>
                <Typography variant="h6" gutterBottom>
                  {value.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {value.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Team Section */}
      <Box sx={{ mb: 8 }}>
        <Typography variant="h4" gutterBottom sx={{ textAlign: 'center', mb: 4 }}>
          Meet Our Team
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center', mb: 6 }}>
          Our leadership team brings decades of experience from leading custodial banks and fintech companies.
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr 1fr' }, gap: 4 }}>
          {teamMembers.map((member, index) => (
            <Card key={index} sx={{ height: '100%', textAlign: 'center' }}>
              <CardContent>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ 
                    width: 120, 
                    height: 120, 
                    mx: 'auto', 
                    mb: 2,
                    border: '4px solid',
                    borderColor: 'primary.main'
                  }}
                />
                <Typography variant="h6" gutterBottom>
                  {member.name}
                </Typography>
                <Chip 
                  label={member.role} 
                  color="primary" 
                  variant="outlined" 
                  sx={{ mb: 2 }}
                />
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                  {member.bio}
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1 }}>
                  <Button
                    size="small"
                    startIcon={<LinkedIn />}
                    href={member.linkedin}
                    sx={{ minWidth: 'auto' }}
                  >
                  </Button>
                  <Button
                    size="small"
                    startIcon={<Email />}
                    href={`mailto:${member.email}`}
                    sx={{ minWidth: 'auto' }}
                  >
                  </Button>
                </Box>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>

      {/* Company Stats */}
      <Paper sx={{ p: 4, textAlign: 'center', bgcolor: 'grey.50' }}>
        <Typography variant="h4" gutterBottom>
          By the Numbers
        </Typography>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr 1fr 1fr' }, gap: 4, mt: 4 }}>
          <Box>
            <Typography variant="h3" color="primary.main" gutterBottom>
              50+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Enterprise Clients
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" color="primary.main" gutterBottom>
              $10B+
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Assets Under Custody
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" color="primary.main" gutterBottom>
              99.9%
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Platform Uptime
            </Typography>
          </Box>
          <Box>
            <Typography variant="h3" color="primary.main" gutterBottom>
              24/7
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Expert Support
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default About;