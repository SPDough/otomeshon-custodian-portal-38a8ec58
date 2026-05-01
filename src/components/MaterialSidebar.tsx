import { 
  Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, 
  Box, Typography, Collapse, alpha, useTheme, Divider
} from "@mui/material";
import { 
  CheckCircle as CheckIcon, Description as FileTextIcon, BusinessCenter as BriefcaseIcon,
  Shield as ShieldIcon, TrendingUp as TrendingUpIcon, FolderOpen as PortfolioIcon,
  AccountTree as WorkflowIcon, PlayArrow as AutomationIcon, Schedule as ScheduleIcon,
  Assessment as ReportIcon, Storage as DatabaseIcon, CloudUpload as ImportIcon,
  Analytics as AnalyticsIcon, TableChart as TableIcon, Search as SearchIcon,
  Dashboard as DashboardIcon, ExpandMore, ExpandLess, Hub as HubIcon,
  SmartToy as AgentIcon, Add as AddIcon, Circle as CircleIcon,
} from "@mui/icons-material";
import { Link as RouterLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { useIntl } from "react-intl";
import { useAgents } from "@/hooks/useAgents";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  variant: "permanent" | "persistent" | "temporary";
}

interface NavItem {
  id: string;
  nameId: string;
  icon: React.ReactElement;
  path?: string;
}

interface NavSection {
  titleId: string;
  items: NavItem[];
  defaultOpen?: boolean;
}

const navSections: NavSection[] = [
  {
    titleId: "sidebar.dashboard",
    defaultOpen: true,
    items: [
      { id: "dashboard", nameId: "sidebar.dashboardOverview", icon: <DashboardIcon fontSize="small" />, path: "/dashboard" },
    ],
  },
  // Agents section is rendered separately with dynamic items
  {
    titleId: "sidebar.frontOffice",
    defaultOpen: true,
    items: [
      { id: "front-office", nameId: "sidebar.frontOfficeOverview", icon: <DashboardIcon fontSize="small" />, path: "/front-office" },
      { id: "portfolios", nameId: "sidebar.portfolios", icon: <PortfolioIcon fontSize="small" />, path: "/portfolios" },
      { id: "performance", nameId: "sidebar.performance", icon: <TrendingUpIcon fontSize="small" /> },
      { id: "corp-actions", nameId: "sidebar.corporateActions", icon: <BriefcaseIcon fontSize="small" /> },
      { id: "graph", nameId: "sidebar.knowledgeGraph", icon: <HubIcon fontSize="small" />, path: "/knowledge-graph" },
      { id: "base", nameId: "sidebar.knowledgeBase", icon: <SearchIcon fontSize="small" />, path: "/knowledge-base" },
    ],
  },
  {
    titleId: "sidebar.middleOffice",
    defaultOpen: false,
    items: [
      { id: "middle-office", nameId: "sidebar.middleOfficeOverview", icon: <DashboardIcon fontSize="small" />, path: "/middle-office" },
      { id: "risk", nameId: "sidebar.riskManagement", icon: <ShieldIcon fontSize="small" /> },
      { id: "automation", nameId: "sidebar.automationRules", icon: <AutomationIcon fontSize="small" /> },
      { id: "nav-calc", nameId: "sidebar.navCalculation", icon: <AnalyticsIcon fontSize="small" />, path: "/nav-calculation" },
      { id: "processes", nameId: "sidebar.processFlows", icon: <WorkflowIcon fontSize="small" /> },
      { id: "scheduled", nameId: "sidebar.scheduledTasks", icon: <ScheduleIcon fontSize="small" /> },
      { id: "analytics", nameId: "sidebar.analytics", icon: <AnalyticsIcon fontSize="small" /> },
      { id: "config", nameId: "sidebar.workflowConfig", icon: <ScheduleIcon fontSize="small" />, path: "/workflow-config" },
    ],
  },
  {
    titleId: "sidebar.backOffice",
    defaultOpen: false,
    items: [
      { id: "back-office", nameId: "sidebar.backOfficeOverview", icon: <DashboardIcon fontSize="small" />, path: "/back-office" },
      { id: "confirms", nameId: "sidebar.tradeConfirms", icon: <CheckIcon fontSize="small" /> },
      { id: "settlements", nameId: "sidebar.settlements", icon: <FileTextIcon fontSize="small" /> },
      { id: "reports", nameId: "sidebar.reportGeneration", icon: <ReportIcon fontSize="small" /> },
      { id: "sources", nameId: "sidebar.dataSources", icon: <DatabaseIcon fontSize="small" /> },
      { id: "import", nameId: "sidebar.importExport", icon: <ImportIcon fontSize="small" /> },
      { id: "tables", nameId: "sidebar.dataTables", icon: <TableIcon fontSize="small" /> },
    ],
  },
  {
    titleId: "sidebar.platformConfig",
    defaultOpen: false,
    items: [
      { id: "platform-overview", nameId: "sidebar.capabilityStack", icon: <DashboardIcon fontSize="small" />, path: "/platform-config" },
      { id: "layer-0", nameId: "sidebar.l0DataCollection", icon: <DatabaseIcon fontSize="small" />, path: "/platform-config/layer-0" },
      { id: "layer-1", nameId: "sidebar.l1Ontology", icon: <SearchIcon fontSize="small" />, path: "/platform-config/layer-1" },
      { id: "layer-2", nameId: "sidebar.l2Calculations", icon: <AnalyticsIcon fontSize="small" />, path: "/platform-config/layer-2" },
      { id: "layer-3", nameId: "sidebar.l3Rules", icon: <ShieldIcon fontSize="small" />, path: "/platform-config/layer-3" },
      { id: "layer-4", nameId: "sidebar.l4Intelligence", icon: <HubIcon fontSize="small" />, path: "/platform-config/layer-4" },
      { id: "layer-5", nameId: "sidebar.l5RAG", icon: <SearchIcon fontSize="small" />, path: "/platform-config/layer-5" },
      { id: "layer-6", nameId: "sidebar.l6Workflows", icon: <WorkflowIcon fontSize="small" />, path: "/platform-config/layer-6" },
      { id: "layer-7", nameId: "sidebar.l7Reporting", icon: <ReportIcon fontSize="small" />, path: "/platform-config/layer-7" },
      { id: "layer-8", nameId: "sidebar.l8Outbound", icon: <ImportIcon fontSize="small" />, path: "/platform-config/layer-8" },
    ],
  },
];

const NavSectionComponent = ({ section, location }: { section: NavSection; location: ReturnType<typeof useLocation> }) => {
  const [open, setOpen] = useState(section.defaultOpen ?? false);
  const theme = useTheme();
  const intl = useIntl();
  
  const hasActiveItem = section.items.some(item => item.path && location.pathname === item.path);
  const isOpen = open || hasActiveItem;

  return (
    <Box sx={{ mb: 1 }}>
      <ListItemButton 
        onClick={() => setOpen(!isOpen)}
        sx={{ py: 0.75, px: 2, borderRadius: 0, '&:hover': { bgcolor: 'transparent' } }}
      >
        <ListItemText 
          primary={intl.formatMessage({ id: section.titleId })}
          primaryTypographyProps={{
            variant: 'subtitle2',
            sx: { color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.08em' }
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
                    py: 0.875, borderRadius: 1.5,
                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    '&:hover': {
                      bgcolor: isActive ? alpha(theme.palette.primary.main, 0.12) : alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: isActive ? 'primary.main' : 'text.secondary' }}>
                    {item.icon}
                  </ListItemIcon>
                  <ListItemText 
                    primary={intl.formatMessage({ id: item.nameId })} 
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

const AgentsSidebarSection = ({ location }: { location: ReturnType<typeof useLocation> }) => {
  const [open, setOpen] = useState(true);
  const theme = useTheme();
  const intl = useIntl();
  const { agents } = useAgents();

  const isAgentsPath = location.pathname.startsWith("/agents");
  const isOpen = open || isAgentsPath;

  return (
    <Box sx={{ mb: 1 }}>
      <ListItemButton
        onClick={() => setOpen(!isOpen)}
        sx={{ py: 0.75, px: 2, borderRadius: 0, '&:hover': { bgcolor: 'transparent' } }}
      >
        <ListItemText
          primary={intl.formatMessage({ id: "sidebar.agents" })}
          primaryTypographyProps={{
            variant: 'subtitle2',
            sx: { color: 'text.secondary', fontWeight: 600, fontSize: '0.7rem', letterSpacing: '0.08em' }
          }}
        />
        {isOpen ? <ExpandLess sx={{ fontSize: 16, color: 'text.secondary' }} /> : <ExpandMore sx={{ fontSize: 16, color: 'text.secondary' }} />}
      </ListItemButton>

      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <List disablePadding>
          {/* Overview link */}
          <ListItem disablePadding sx={{ px: 1 }}>
            <ListItemButton
              component={RouterLink}
              to="/agents"
              sx={{
                py: 0.875, borderRadius: 1.5,
                bgcolor: location.pathname === "/agents" ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                '&:hover': {
                  bgcolor: location.pathname === "/agents"
                    ? alpha(theme.palette.primary.main, 0.12)
                    : alpha(theme.palette.primary.main, 0.04),
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: location.pathname === "/agents" ? 'primary.main' : 'text.secondary' }}>
                <AutomationIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({ id: "sidebar.agentsOverview" })}
                primaryTypographyProps={{
                  fontSize: '0.875rem',
                  fontWeight: location.pathname === "/agents" ? 500 : 400,
                  color: location.pathname === "/agents" ? 'text.primary' : 'text.secondary',
                }}
              />
            </ListItemButton>
          </ListItem>

          {/* Dynamic agent list */}
          {agents.map((agent) => {
            const agentPath = `/agents/${agent.id}`;
            const isActive = location.pathname === agentPath;
            return (
              <ListItem key={agent.id} disablePadding sx={{ px: 1 }}>
                <ListItemButton
                  component={RouterLink}
                  to={agentPath}
                  sx={{
                    py: 0.625, borderRadius: 1.5,
                    bgcolor: isActive ? alpha(theme.palette.primary.main, 0.08) : 'transparent',
                    '&:hover': {
                      bgcolor: isActive
                        ? alpha(theme.palette.primary.main, 0.12)
                        : alpha(theme.palette.primary.main, 0.04),
                    },
                  }}
                >
                  <ListItemIcon sx={{ minWidth: 32, color: isActive ? 'primary.main' : 'text.secondary' }}>
                    <CircleIcon sx={{ fontSize: 8, ml: 0.5 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={agent.name}
                    primaryTypographyProps={{
                      fontSize: '0.8rem',
                      fontWeight: isActive ? 500 : 400,
                      color: isActive ? 'text.primary' : 'text.secondary',
                      noWrap: true,
                    }}
                  />
                  <Box
                    sx={{
                      width: 6, height: 6, borderRadius: '50%', flexShrink: 0,
                      bgcolor: agent.status === 'enabled'
                        ? theme.palette.success.main
                        : theme.palette.text.disabled,
                    }}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}

          {/* New Agent button */}
          <ListItem disablePadding sx={{ px: 1 }}>
            <ListItemButton
              component={RouterLink}
              to="/agents?new=true"
              sx={{
                py: 0.625, borderRadius: 1.5,
                '&:hover': { bgcolor: alpha(theme.palette.primary.main, 0.04) },
              }}
            >
              <ListItemIcon sx={{ minWidth: 32, color: 'primary.main' }}>
                <AddIcon fontSize="small" />
              </ListItemIcon>
              <ListItemText
                primary={intl.formatMessage({ id: "sidebar.newAgent" })}
                primaryTypographyProps={{
                  fontSize: '0.8rem',
                  fontWeight: 500,
                  color: 'primary.main',
                }}
              />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </Box>
  );
};

const MaterialSidebar = ({ open, onClose, variant }: SidebarProps) => {
  const location = useLocation();
  const intl = useIntl();
  const drawerWidth = 260;

  // Split sections: dashboard first, then agents (dynamic), then the rest
  const dashboardSection = navSections[0];
  const remainingSections = navSections.slice(1);

  return (
    <Drawer
      variant={variant} open={open} onClose={onClose}
      sx={{
        width: drawerWidth, flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth, boxSizing: 'border-box',
          borderRight: '1px solid', borderColor: 'divider', bgcolor: 'background.default',
        },
      }}
    >
      <Box sx={{ overflow: 'auto', pt: 9, pb: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <List sx={{ flex: 1 }}>
          <NavSectionComponent section={dashboardSection} location={location} />
          <AgentsSidebarSection location={location} />
          {remainingSections.map((section) => (
            <NavSectionComponent key={section.titleId} section={section} location={location} />
          ))}
        </List>
        <Box sx={{ px: 2, py: 1.5, borderTop: '1px solid', borderColor: 'divider' }}>
          <Typography variant="caption" color="text.secondary">
            {intl.formatMessage({ id: "app.version" })}
          </Typography>
        </Box>
      </Box>
    </Drawer>
  );
};

export default MaterialSidebar;
