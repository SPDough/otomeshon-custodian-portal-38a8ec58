import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Box, 
  Typography,
  Collapse,
  alpha,
  useTheme
} from "@mui/material";
import { 
  CheckCircle as CheckIcon,
  Description as FileTextIcon,
  BusinessCenter as BriefcaseIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  FolderOpen as PortfolioIcon,
  AccountTree as WorkflowIcon,
  PlayArrow as AutomationIcon,
  Schedule as ScheduleIcon,
  Assessment as ReportIcon,
  Storage as DatabaseIcon,
  CloudUpload as ImportIcon,
  Analytics as AnalyticsIcon,
  TableChart as TableIcon,
  Search as SearchIcon,
  Dashboard as DashboardIcon,
  ExpandMore,
  ExpandLess,
  Hub as HubIcon
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useState } from "react";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: "permanent" | "persistent" | "temporary";
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ReactElement;
  path?: string;
}

interface NavSection {
  title: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const navSections: NavSection[] = [
  {
    title: "Overview",
    defaultOpen: true,
    items: [
      { id: "dashboard", name: "Dashboard", icon: <DashboardIcon fontSize="small" />, path: "/dashboard" },
    ],
  },
  {
    title: "Front Office Support",
    defaultOpen: true,
    items: [
      { id: "portfolios", name: "Portfolios", icon: <PortfolioIcon fontSize="small" />, path: "/portfolios" },
      { id: "performance", name: "Performance", icon: <TrendingUpIcon fontSize="small" /> },
      { id: "corp-actions", name: "Corporate Actions", icon: <BriefcaseIcon fontSize="small" /> },
      { id: "graph", name: "Knowledge Graph", icon: <HubIcon fontSize="small" />, path: "/knowledge-graph" },
      { id: "base", name: "Knowledge Base", icon: <SearchIcon fontSize="small" />, path: "/knowledge-base" },
    ],
  },
  {
    title: "Middle Office Automation",
    defaultOpen: false,
    items: [
      { id: "risk", name: "Risk Management", icon: <ShieldIcon fontSize="small" /> },
      { id: "automation", name: "Automation Rules", icon: <AutomationIcon fontSize="small" /> },
      { id: "processes", name: "Process Flows", icon: <WorkflowIcon fontSize="small" /> },
      { id: "scheduled", name: "Scheduled Tasks", icon: <ScheduleIcon fontSize="small" /> },
      { id: "analytics", name: "Analytics", icon: <AnalyticsIcon fontSize="small" /> },
      { id: "config", name: "Workflow Config", icon: <ScheduleIcon fontSize="small" />, path: "/workflow-config" },
    ],
  },
  {
    title: "Back Office Validation",
    defaultOpen: false,
    items: [
      { id: "confirms", name: "Trade Confirms", icon: <CheckIcon fontSize="small" /> },
      { id: "settlements", name: "Settlements", icon: <FileTextIcon fontSize="small" /> },
      { id: "reports", name: "Report Generation", icon: <ReportIcon fontSize="small" /> },
      { id: "sources", name: "Data Sources", icon: <DatabaseIcon fontSize="small" /> },
      { id: "import", name: "Import/Export", icon: <ImportIcon fontSize="small" /> },
      { id: "tables", name: "Data Tables", icon: <TableIcon fontSize="small" /> },
    ],
  },
];

const NavSectionComponent = ({ section, location }: { section: NavSection; location: ReturnType<typeof useLocation> }) => {
  const [open, setOpen] = useState(section.defaultOpen ?? false);
  const theme = useTheme();
  
  const hasActiveItem = section.items.some(item => item.path && location.pathname === item.path);
  
  // Auto-expand if contains active item
  const isOpen = open || hasActiveItem;

  return (
    <Box sx={{ mb: 1 }}>
      <ListItemButton 
        onClick={() => setOpen(!isOpen)}
        sx={{ 
          py: 0.75,
          px: 2,
          borderRadius: 0,
          '&:hover': {
            bgcolor: 'transparent',
          }
        }}
      >
        <ListItemText 
          primary={section.title}
          primaryTypographyProps={{
            variant: 'subtitle2',
            sx: { 
              color: 'text.secondary',
              fontWeight: 600,
              fontSize: '0.7rem',
              letterSpacing: '0.08em',
            }
          }}
        />
        {isOpen ? <ExpandLess sx={{ fontSize: 16, color: 'text.secondary' }} /> : <ExpandMore sx={{ fontSize: 16, color: 'text.secondary' }} />}
      </ListItemButton>
      
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List disablePadding>
          {section.items.map((item) => {
            const isActive = item.path && location.pathname === item.path;
            
            return (
              <ListItem key={item.id} disablePadding sx={{ px: 1 }}>
                <ListItemButton 
                  component={item.path ? RouterLink : "div"}
                  to={item.path}
                  sx={{
                    py: 0.875,
                    borderRadius: 1.5,
                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    '&:hover': {
                      bgcolor: isActive 
                        ? alpha(theme.palette.primary.main, 0.12) 
                        : alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <ListItemIcon 
                    sx={{ 
                      minWidth: 32,
                      color: isActive ? 'primary.main' : 'text.secondary',
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    primaryTypographyProps={{
                      fontSize: '0.875rem',
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? 'text.primary' : 'text.secondary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </Box>
  );
};

const MaterialSidebar = ({ open, onClose, variant }: SidebarProps) => {
  const location = useLocation();
  const drawerWidth = 260;

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ 
        overflow: 'auto',
        pt: 9,
        pb: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <List sx={{ flex: 1 }}>
          {navSections.map((section) => (
            <NavSectionComponent 
              key={section.title} 
              section={section} 
              location={location}
            />
          ))}
        </List>
        
        {/* Footer with version */}
        <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            Otomeshon v1.0.0
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MaterialSidebar;
