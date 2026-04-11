import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Container, Typography, Box, Button } from "@mui/material";
import { Home as HomeIcon } from "@mui/icons-material";
import AnimatedPage, { fadeInUp } from "@/components/AnimatedPage";
import { useIntl } from "react-intl";

const NotFound = () => {
  const intl = useIntl();

  return (
    <AnimatedPage>
      <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
        <motion.div variants={fadeInUp}>
          <Typography variant="h1" color="primary" sx={{ fontSize: '6rem', fontWeight: 800, mb: 2 }}>
            404
          </Typography>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            {intl.formatMessage({ id: "notFound.title" })}
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 5 }}>
            {intl.formatMessage({ id: "notFound.description" })}
          </Typography>
          <Button component={Link} to="/" variant="contained" size="large" startIcon={<HomeIcon />}>
            {intl.formatMessage({ id: "notFound.returnHome" })}
          </Button>
        </motion.div>
      </Container>
    </AnimatedPage>
  );
};

export default NotFound;
