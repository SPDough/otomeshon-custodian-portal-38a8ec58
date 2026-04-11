import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Typography, Box, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";

const NotFound = () => {
  return (
    <AnimatedPage>
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div variants={fadeInUp}>
          <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 800, mb: 2 }}>
            404
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Page Not Found
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
            The page you're looking for doesn't exist or has been moved.
          </Typography>
          <Button
            component={Link}
            to="/"
            variant="contained"
            size="large"
            startIcon={<HomeIcon />}
          >
            Return Home
          </Button>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default NotFound;
