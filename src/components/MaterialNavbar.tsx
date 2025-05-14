
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
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

interface MaterialNavbarProps {
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

const MaterialNavbar = ({ toggleSidebar, isMobile }: MaterialNavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();

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
    <AppBar position="fixed" elevation={1} sx={{ zIndex: theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Sidebar toggle button */}
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Logo/Brand */}
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            flexGrow: 1, 
            color: "#fff",
            fontWeight: 700,
            textDecoration: "none"
          }}
        >
          Otomeshon
        </Typography>

        {/* Mobile Menu */}
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
              <MenuItem component={RouterLink} to="/portfolios" onClick={handleMenuClose}>
                Portfolios
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
            {/* Desktop Navigation */}
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
                to="/portfolios"
              >
                Portfolios
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
                  <Button 
                    variant="outlined"
                    color="inherit"
                    size="small"
                    startIcon={<UserIcon />}
                    sx={{ bgcolor: 'primary.dark', color: 'white' }}
                  >
                    {username}
                  </Button>
                  <Button 
                    variant="outlined"
                    color="inherit"
                    size="small"
                    startIcon={<LogoutIcon />}
                    onClick={handleLogout}
                    sx={{ borderColor: 'white', color: 'white' }}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button 
                  variant="outlined" 
                  color="inherit"
                  startIcon={<LoginIcon />}
                  onClick={handleLogin}
                  sx={{ borderColor: 'white', color: 'white' }}
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
