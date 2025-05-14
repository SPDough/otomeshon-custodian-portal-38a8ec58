
import { useState } from "react";
import { Box, CssBaseline, IconButton, useMediaQuery, useTheme } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import MaterialNavbar from "./MaterialNavbar";
import MaterialSidebar from "./MaterialSidebar";

interface MaterialLayoutProps {
  children: React.ReactNode;
}

const MaterialLayout = ({ children }: MaterialLayoutProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh' }}>
      <CssBaseline />
      
      <MaterialNavbar />
      
      <MaterialSidebar 
        open={sidebarOpen} 
        onClose={toggleSidebar}
        variant={isMobile ? "temporary" : "persistent"}
      />
      
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          p: 3,
          marginLeft: !isMobile && sidebarOpen ? '240px' : 0,
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          mb: 2,
          mt: 8 // Add margin top to account for AppBar height
        }}>
          {!isMobile && (
            <IconButton onClick={toggleSidebar} sx={{ mr: 2 }}>
              <MenuIcon />
            </IconButton>
          )}
        </Box>
        {children}
      </Box>
    </Box>
  );
};

export default MaterialLayout;
