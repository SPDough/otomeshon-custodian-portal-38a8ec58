
import { Box, Typography, Paper, Container } from "@mui/material";

const Index = () => {
  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        py: 8
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 6
        }}
      >
        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontWeight: 'bold', 
            color: 'primary.main',
            mb: 2
          }}
        >
          Otomeshon
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ textAlign: 'center' }}>
          Access global custodian data for asset managers and pension funds
        </Typography>
      </Box>

      <Paper 
        elevation={1}
        sx={{ 
          width: '100%', 
          p: 2,
          borderRadius: 2
        }}
      >
        {/* This is where the search bar will go */}
        <Box 
          sx={{ 
            height: '48px',
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 4,
            display: 'flex',
            alignItems: 'center',
            px: 2
          }}
        >
          <Typography color="text.secondary">Search custodian data...</Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Index;
