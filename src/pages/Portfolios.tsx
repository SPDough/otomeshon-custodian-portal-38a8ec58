
import { Container, Typography, Grid, Card, CardContent, CardActions, Button, Box } from "@mui/material";

const Portfolios = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 4, fontWeight: 'bold', color: 'primary.main' }}>
        Portfolio Services
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'primary.light' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                Portfolio Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Analyze your portfolio holdings and performance metrics in one place. 
                Get comprehensive insights into your investments and make informed decisions.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary" variant="contained">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'primary.light' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                Risk Assessment
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Evaluate risk exposure and compliance across your investments.
                Our tools help you identify and mitigate potential risks in your portfolio.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary" variant="contained">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', borderColor: 'primary.light' }}>
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'primary.dark', fontWeight: 'bold' }}>
                ESG Integration
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Incorporate environmental, social, and governance factors into your strategies.
                Make sustainable investment decisions aligned with your values.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="medium" color="primary" variant="contained">
                Learn More
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Portfolios;
