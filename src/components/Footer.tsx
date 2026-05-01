import { Box, Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const Footer = () => (
  <Box
    component="footer"
    sx={{
      mt: "auto",
      borderTop: "1px solid",
      borderColor: "divider",
      bgcolor: "background.paper",
      p: 3,
    }}
  >
    <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, alignItems: "center", justifyContent: "space-between", gap: 2 }}>
      <Typography variant="body2" color="text.secondary">
        &copy; {new Date().getFullYear()} Otomeshon. All rights reserved.
      </Typography>
      <Box sx={{ display: "flex", gap: 3 }}>
        {[{ to: "/", label: "Home" }, { to: "/search", label: "Search" }, { to: "/about", label: "About" }].map(({ to, label }) => (
          <Typography
            key={to}
            component={RouterLink}
            to={to}
            variant="body2"
            sx={{ color: "text.secondary", textDecoration: "none", "&:hover": { color: "text.primary" } }}
          >
            {label}
          </Typography>
        ))}
      </Box>
    </Box>
  </Box>
);

export default Footer;
