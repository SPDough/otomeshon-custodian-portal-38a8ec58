import { 
  Drawer, 
  List, 
  ListItem, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  Divider, 
  Box, 
  Typography,
  useTheme
} from "@mui/material";
import { 
  CheckCircle as CheckIcon,
  Description as FileTextIcon,
  BusinessCenter as BriefcaseIcon,
  Shield as ShieldIcon,
  TrendingUp as TrendingUpIcon,
  History as HistoryIcon,
  FolderOpen as PortfolioIcon,
  AccountTree as WorkflowIcon,
  PlayArrow as AutomationIcon,
  Schedule as ScheduleIcon,
  Assessment as ReportIcon,
  Storage as DatabaseIcon,
  CloudUpload as ImportIcon,
  Analytics as AnalyticsIcon,
  TableChart as TableIcon
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: "permanent" | "persistent" | "temporary";
}

interface AgentItem {
  id: string;
  name: string;
  icon: React.ReactElement;
  path?: string;
}

interface HistoryItem {
  id: string;
  query: string;
  date: string;
}

const agentItems: AgentItem[] = [
  { id: "1", name: "Confirms", icon: <CheckIcon /> },
  { id: "2", name: "Settlements", icon: <FileTextIcon /> },
  { id: "3", name: "Corporate Actions", icon: <BriefcaseIcon /> },
  { id: "4", name: "Risk", icon: <ShieldIcon /> },
  { id: "5", name: "Performance", icon: <TrendingUpIcon /> },
  { id: "6", name: "Portfolios", icon: <PortfolioIcon />, path: "/portfolios" },
];

const workflowItems: AgentItem[] = [
  { id: "1", name: "Automation Rules", icon: <AutomationIcon /> },
  { id: "2", name: "Process Flows", icon: <WorkflowIcon /> },
  { id: "3", name: "Scheduled Tasks", icon: <ScheduleIcon /> },
  { id: "4", name: "Report Generation", icon: <ReportIcon /> },
];

const dataItems: AgentItem[] = [
  { id: "1", name: "Data Sources", icon: <DatabaseIcon /> },
  { id: "2", name: "Import/Export", icon: <ImportIcon /> },
  { id: "3", name: "Analytics", icon: <AnalyticsIcon /> },
  { id: "4", name: "Data Tables", icon: <TableIcon /> },
];

const knowledgeGraphItems: AgentItem[] = [
  { id: "1", name: "Knowledge Graph", icon: <WorkflowIcon />, path: "/knowledge-graph" },
];

const mockHistoryItems: HistoryItem[] = [
  { id: "1", query: "Portfolio allocation analysis", date: "2025-05-13" },
  { id: "2", query: "Q1 performance metrics", date: "2025-05-12" },
  { id: "3", query: "ESG compliance reports", date: "2025-05-10" },
  { id: "4", query: "Asset under management summary", date: "2025-05-09" },
  { id: "5", query: "Risk exposure metrics", date: "2025-05-08" },
];

const MaterialSidebar = ({ open, onClose, variant }: SidebarProps) => {
  const theme = useTheme();
  
  const drawerWidth = 240;

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
          bgcolor: 'secondary.light',
        },
      }}
    >
      <Box sx={{ overflow: 'auto' }}>
        <Box sx={{ p: 2, pt: 8 }}> {/* Added padding-top to account for AppBar */}
          <Typography 
            variant="subtitle2" 
            component="div" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'secondary.dark',
              fontWeight: 'bold' 
            }}
          >
            Financial Agents
          </Typography>
          <List dense>
            {agentItems.map((agent) => (
              <ListItem key={agent.id} disablePadding>
                <ListItemButton 
                  component={agent.path ? RouterLink : "button"}
                  to={agent.path}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>
                    {agent.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={agent.name} 
                    sx={{ color: 'secondary.dark' }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          <Typography 
            variant="subtitle2" 
            component="div" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'secondary.dark',
              fontWeight: 'bold' 
            }}
          >
            Workflows
          </Typography>
          <List dense>
            {workflowItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton 
                  component={item.path ? RouterLink : "button"}
                  to={item.path}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    sx={{ color: 'secondary.dark' }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          <Typography 
            variant="subtitle2" 
            component="div" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'secondary.dark',
              fontWeight: 'bold' 
            }}
          >
            Data
          </Typography>
          <List dense>
            {dataItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton 
                  component={item.path ? RouterLink : "button"}
                  to={item.path}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    sx={{ color: 'secondary.dark' }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          <Typography 
            variant="subtitle2" 
            component="div" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'secondary.dark',
              fontWeight: 'bold' 
            }}
          >
            Knowledge Graph
          </Typography>
          <List dense>
            {knowledgeGraphItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton 
                  component={item.path ? RouterLink : "button"}
                  to={item.path}
                >
                  <ListItemIcon sx={{ minWidth: 36, color: 'primary.main' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={item.name} 
                    sx={{ color: 'secondary.dark' }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
        
        <Divider />
        
        <Box sx={{ p: 2 }}>
          <Typography 
            variant="subtitle2" 
            component="div" 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              color: 'secondary.dark',
              fontWeight: 'bold',
              mb: 1
            }}
          >
            <HistoryIcon fontSize="small" /> Recent Searches
          </Typography>
          <List dense>
            {mockHistoryItems.map((item) => (
              <ListItem key={item.id} disablePadding>
                <ListItemButton>
                  <ListItemText 
                    primary={item.query} 
                    sx={{ 
                      color: 'secondary.dark',
                      '& .MuiTypography-root': {
                        textOverflow: 'ellipsis',
                        overflow: 'hidden',
                        whiteSpace: 'nowrap'
                      }
                    }} 
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MaterialSidebar;
