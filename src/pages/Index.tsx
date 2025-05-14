
import { Box, Typography, Paper, Container, InputBase, IconButton } from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/search');
  };

  return (
    <Container 
      maxWidth="md" 
      sx={{ 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        flexGrow: 1,
        py: 10,
        minHeight: 'calc(100vh - 120px)'
      }}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center',
          mb: 8
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
        component="form"
        onSubmit={handleSearch}
        sx={{ 
          width: '100%', 
          p: 1,
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <InputBase
          sx={{ ml: 2, flex: 1 }}
          placeholder="Search custodian data..."
          inputProps={{ 'aria-label': 'search custodian data' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>
      
      <Box sx={{ mt: 6, display: 'flex', justifyContent: 'center', gap: 2 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary" mb={1}>
            Popular searches
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Paper sx={{ px: 2, py: 0.5, borderRadius: 4 }}>Portfolio holdings</Paper>
            <Paper sx={{ px: 2, py: 0.5, borderRadius: 4 }}>Q1 performance</Paper>
            <Paper sx={{ px: 2, py: 0.5, borderRadius: 4 }}>ESG metrics</Paper>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Index;
