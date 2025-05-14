
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Box,
  Chip,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemIcon,
  useTheme,
} from "@mui/material";
import { 
  Menu as MenuIcon, 
  Person as UserIcon, 
  Login as LoginIcon,
  Logout as LogoutIcon
} from "@mui/icons-material";

const MaterialNavbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleLogin = () => {
    // Simulate login for demonstration
    setIsLoggedIn(true);
    setUsername("John Doe");
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("");
    handleMenuClose();
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static" elevation={1}>
      <Toolbar>
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            color: "primary.main",
            fontWeight: 700,
            textDecoration: "none"
          }}
        >
          Otomeshon
        </Typography>

        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="end"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem component={RouterLink} to="/search" onClick={handleMenuClose}>
                Search
              </MenuItem>
              <MenuItem component={RouterLink} to="/about" onClick={handleMenuClose}>
                About
              </MenuItem>
              {isLoggedIn ? (
                [
                  <MenuItem key="username" disabled>
                    <ListItemIcon>
                      <UserIcon fontSize="small" />
                    </ListItemIcon>
                    {username}
                  </MenuItem>,
                  <MenuItem key="logout" onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                ]
              ) : (
                <MenuItem onClick={handleLogin}>
                  <ListItemIcon>
                    <LoginIcon fontSize="small" />
                  </ListItemIcon>
                  Login
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/search"
              >
                Search
              </Button>
              <Button 
                color="inherit" 
                component={RouterLink} 
                to="/about"
              >
                About
              </Button>
              
              {isLoggedIn ? (
                <>
                  <Chip
                    icon={<UserIcon />}
                    label={username}
                    variant="outlined"
                    sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                  />
                  <Button 
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  variant="contained" 
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={handleLogin}
                >
                  Login
                </Button>
              )}
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MaterialNavbar;
