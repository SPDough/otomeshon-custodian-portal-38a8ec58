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
      bio: 'Former Goldman Sachs VP with 15+ years in financial technology and quantitative analysis.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'sarah.chen@company.com'
    },
    {
      name: 'Michael Rodriguez',
      role: 'Chief Technology Officer',
      bio: 'Ex-Bloomberg technology lead specializing in real-time financial data systems and AI.',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'michael.rodriguez@company.com'
    },
    {
      name: 'Dr. Emma Thompson',
      role: 'Head of Data Science',
      bio: 'PhD in Quantitative Finance from MIT, former JPMorgan quant researcher with expertise in machine learning.',
      image: 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'emma.thompson@company.com'
    },
    {
      name: 'James Park',
      role: 'Head of Product',
      bio: 'Former Blackrock product manager with deep expertise in portfolio management and risk analytics.',
      image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=400&h=400&fit=crop&crop=face',
      linkedin: '#',
      email: 'james.park@company.com'
    }
  ];

  const values = [
    {
      icon: <Analytics color="primary" />,
      title: 'Data-Driven Decisions',
      description: 'We believe in the power of data to transform financial decision-making and drive better outcomes.'
    },
    {
      icon: <Security color="primary" />,
      title: 'Security First',
      description: 'Enterprise-grade security and compliance are built into every aspect of our platform.'
    },
    {
      icon: <TrendingUp color="primary" />,
      title: 'Innovation',
      description: 'We continuously push the boundaries of what\'s possible in financial technology.'
    },
    {
      icon: <Business color="primary" />,
      title: 'Client Success',
      description: 'Our clients\' success is our success. We\'re committed to delivering exceptional value.'
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
          We're revolutionizing financial intelligence through advanced analytics, 
          automated workflows, and comprehensive data management solutions.
        </Typography>
      </Box>

      {/* Mission Statement */}
      <Paper sx={{ p: 4, mb: 6, bgcolor: 'primary.main', color: 'white' }}>
        <Typography variant="h4" gutterBottom sx={{ color: 'white' }}>
          Our Mission
        </Typography>
        <Typography variant="h6" sx={{ color: 'grey.100' }}>
          To empower financial professionals with intelligent tools that transform complex data 
          into actionable insights, enabling smarter decisions and better outcomes for investors worldwide.
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
          Our leadership team brings decades of experience from top financial institutions and technology companies.
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
              Assets Under Management
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