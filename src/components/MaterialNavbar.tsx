
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
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>
        
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
                  <Button 
                    variant="outlined"
                    color="primary"
                    size="small"
                    startIcon={<UserIcon />}
                    sx={{ bgcolor: 'primary.light', color: 'primary.dark' }}
                  >
                    {username}
                  </Button>
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
