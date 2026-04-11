import { useState, useEffect } from "react";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import {
  AppBar, Toolbar, Typography, Button, IconButton, Box, Menu, MenuItem,
  ListItemIcon, Avatar, Chip, alpha,
} from "@mui/material";
import {
  Menu as MenuIcon, Login as LoginIcon, Logout as LogoutIcon,
  Search as SearchIcon, DarkMode as DarkModeIcon, LightMode as LightModeIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import CommandPalette from "./CommandPalette";
import { useThemeMode } from "@/contexts/ThemeModeContext";
import { useAuth } from "@/contexts/AuthContext";

interface MaterialNavbarProps {
  toggleSidebar?: () => void;
  isMobile?: boolean;
  toggleChat?: () => void;
  chatOpen?: boolean;
}

const MaterialNavbar = ({ toggleSidebar, isMobile, toggleChat, chatOpen }: MaterialNavbarProps) => {
  const { user, signOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [commandOpen, setCommandOpen] = useState(false);
  const { mode, toggleMode } = useThemeMode();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setCommandOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut();
    setAnchorEl(null);
    navigate("/auth");
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleMenuClose = () => setAnchorEl(null);

  const navLinks = [
    { label: "Search", path: "/search" },
    { label: "Portfolios", path: "/portfolios" },
    { label: "About", path: "/about" },
  ];

  const isActive = (path: string) => location.pathname === path;
  const displayName = user?.user_metadata?.full_name || user?.email?.split("@")[0] || "";

  return (
    <>
      <AppBar position="fixed" elevation={0}>
        <Toolbar sx={{ gap: 1 }}>
          <IconButton color="inherit" aria-label="toggle drawer" edge="start" onClick={toggleSidebar}
            sx={{ mr: 1, '&:hover': { bgcolor: alpha('#000', 0.04) } }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component={RouterLink} to="/"
            sx={{ color: "text.primary", fontWeight: 700, textDecoration: "none", letterSpacing: '-0.02em', mr: 4 }}>
            Otomeshon
          </Typography>

          {!isMobile && (
            <>
              <Box sx={{ display: 'flex', gap: 0.5, flex: 1 }}>
                {navLinks.map((link) => (
                  <Button key={link.path} component={RouterLink} to={link.path}
                    sx={{ color: isActive(link.path) ? 'text.primary' : 'text.secondary', fontWeight: isActive(link.path) ? 500 : 400, px: 2,
                      '&:hover': { bgcolor: alpha('#000', 0.04), color: 'text.primary' } }}>
                    {link.label}
                  </Button>
                ))}
              </Box>

              <IconButton onClick={toggleChat}
                sx={{ color: chatOpen ? 'primary.main' : 'text.secondary', '&:hover': { color: 'primary.main' } }}
                aria-label="toggle chat">
                <ChatIcon sx={{ fontSize: 20 }} />
              </IconButton>

              <IconButton onClick={toggleMode}
                sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }} aria-label="toggle dark mode">
                {mode === 'dark' ? <LightModeIcon sx={{ fontSize: 20 }} /> : <DarkModeIcon sx={{ fontSize: 20 }} />}
              </IconButton>

              <Chip icon={<SearchIcon sx={{ fontSize: 16 }} />} label="⌘K" size="small" variant="outlined"
                sx={{ borderColor: 'divider', color: 'text.secondary', fontSize: '0.75rem', mr: 2, cursor: 'pointer',
                  '&:hover': { bgcolor: alpha('#000', 0.04) } }}
                onClick={() => setCommandOpen(true)} />

              {user ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main', fontSize: '0.875rem', fontWeight: 500 }}>
                    {displayName.charAt(0).toUpperCase()}
                  </Avatar>
                  <Button size="small" onClick={handleLogout}
                    sx={{ color: 'text.secondary', '&:hover': { color: 'text.primary' } }}
                    startIcon={<LogoutIcon sx={{ fontSize: 18 }} />}>
                    Logout
                  </Button>
                </Box>
              ) : (
                <Button variant="contained" size="small" startIcon={<LoginIcon sx={{ fontSize: 18 }} />}
                  component={RouterLink} to="/auth" sx={{ px: 2.5, py: 0.75 }}>
                  Login
                </Button>
              )}
            </>
          )}

          {isMobile && (
            <>
              <Box sx={{ flex: 1 }} />
              <IconButton color="inherit" aria-label="toggle chat" onClick={toggleChat}><ChatIcon /></IconButton>
              <IconButton color="inherit" aria-label="toggle dark mode" onClick={toggleMode}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton color="inherit" aria-label="search" onClick={() => setCommandOpen(true)}><SearchIcon /></IconButton>
              <IconButton color="inherit" aria-label="menu" onClick={handleMenuOpen}><MenuIcon /></IconButton>
              <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}
                PaperProps={{ sx: { minWidth: 200, mt: 1 } }}>
                {navLinks.map((link) => (
                  <MenuItem key={link.path} component={RouterLink} to={link.path} onClick={handleMenuClose}
                    selected={isActive(link.path)}>{link.label}</MenuItem>
                ))}
                {user ? (
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon fontSize="small" /></ListItemIcon>Logout
                  </MenuItem>
                ) : (
                  <MenuItem component={RouterLink} to="/auth" onClick={handleMenuClose}>
                    <ListItemIcon><LoginIcon fontSize="small" /></ListItemIcon>Login
                  </MenuItem>
                )}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>
      <CommandPalette open={commandOpen} onClose={() => setCommandOpen(false)} />
    </>
  );
};

export default MaterialNavbar;
