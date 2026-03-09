import { useState } from "react";
import { Link as RouterLink, useLocation } from "react-router-dom";
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
  Avatar,
  Chip,
  alpha,
} from "@mui/material";
import { 
  Menu as MenuIcon, 
  Person as UserIcon, 
  Login as LoginIcon,
  Logout as LogoutIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

interface MaterialNavbarProps {
  toggleSidebar?: () => void;
  isMobile?: boolean;
}

const MaterialNavbar = ({ toggleSidebar, isMobile }: MaterialNavbarProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const location = useLocation();

  const handleLogin = () => {
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

  const navLinks = [
    { label: "Search", path: "/search" },
    { label: "Portfolios", path: "/portfolios" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar sx={{ gap: 1 }}>
        {/* Sidebar toggle */}
        <IconButton
          color="inherit"
          aria-label="toggle drawer"
          edge="start"
          onClick={toggleSidebar}
          sx={{ 
            mr: 1,
            '&:hover': {
              bgcolor: alpha('#000', 0.04),
            }
          }}
        >
          <MenuIcon />
        </IconButton>
        
        {/* Logo */}
        <Typography 
          variant="h6" 
          component={RouterLink} 
          to="/" 
          sx={{ 
            color: "text.primary",
            fontWeight: 700,
            textDecoration: "none",
            letterSpacing: '-0.02em',
            mr: 4,
          }}
        >
          Otomeshon
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <>
            <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
              {navLinks.map((link) => (
                <Button 
                  key={link.path}
                  component={RouterLink} 
                  to={link.path}
                  sx={{
                    color: isActive(link.path) ? 'text.primary' : 'text.secondary',
                    fontWeight: isActive(link.path) ? 500 : 400,
                    px: 2,
                    '&:hover': {
                      bgcolor: alpha('#000', 0.04),
                      color: 'text.primary',
                    }
                  }}
                >
                  {link.label}
                </Button>
              ))}
            </Box>
            
            {/* Search shortcut */}
            <Chip
              icon={<SearchIcon sx={{ fontSize: 16 }} />}
              label="⌘K"
              size="small"
              variant="outlined"
              sx={{ 
                borderColor: 'divider',
                color: 'text.secondary',
                fontSize: '0.75rem',
                mr: 2,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: alpha('#000', 0.04),
                }
              }}
              onClick={() => {}}
            />
            
            {/* User section */}
            {isLoggedIn ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Avatar 
                  sx={{ 
                    width: 32, 
                    height: 32, 
                    bgcolor: 'primary.main',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                  }}
                >
                  {username.charAt(0)}
                </Avatar>
                <Button 
                  size="small"
                  onClick={handleLogout}
                  sx={{ 
                    color: 'text.secondary',
                    '&:hover': {
                      color: 'text.primary',
                    }
                  }}
                  startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}
                >
                  Logout
                </Button>
              </Box>
            ) : (
              <Button 
                variant="contained"
                size="small"
                startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
                onClick={handleLogin}
                sx={{ 
                  px: 2.5,
                  py: 0.75,
                }}
              >
                Login
              </Button>
            )}
          </>
        )}

        {/* Mobile Menu */}
        {isMobile && (
          <>
            <Box sx={{ flex: 1 }} />
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              PaperProps={{
                sx: { minWidth: 200, mt: 1 }
              }}
            >
              {navLinks.map((link) => (
                <MenuItem 
                  key={link.path}
                  component={RouterLink} 
                  to={link.path} 
                  onClick={handleMenuClose}
                  selected={isActive(link.path)}
                >
                  {link.label}
                </MenuItem>
              ))}
              
              {isLoggedIn ? (
                <>
                  <MenuItem disabled>
                    <ListItemIcon>
                      <UserIcon fontSize="small" />
                    </ListItemIcon>
                    {username}
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    Logout
                  </MenuItem>
                </>
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
        )}
      </Toolbar>
    </AppBar>
  );
};

export default MaterialNavbar;
