
import { useState } from "react";
import { Box, CssBaseline, useMediaQuery, useTheme, Toolbar } from "@mui/material";
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
      
      <MaterialNavbar toggleSidebar={toggleSidebar} isMobile={isMobile} />
      
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
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Toolbar /> {/* Adds space under the AppBar */}
        {children}
      </Box>
    </Box>
  );
};

export default MaterialLayout;
