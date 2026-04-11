import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNext, Layers as LayersIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

interface PlatformBreadcrumbProps {
  layerNumber: number;
  layerName: string;
}

const PlatformBreadcrumb = ({ layerNumber, layerName }: PlatformBreadcrumbProps) => (
  <Breadcrumbs
    separator={<NavigateNext sx={{ fontSize: 16 }} />}
    sx={{ mb: 3 }}
  >
    <Link
      component={RouterLink}
      to="/platform-config"
      underline="hover"
      color="text.secondary"
      sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.875rem' }}
    >
      <LayersIcon sx={{ fontSize: 16 }} />
      Capability Stack
    </Link>
    <Typography color="text.primary" sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
      L{layerNumber}: {layerName}
    </Typography>
  </Breadcrumbs>
);

export default PlatformBreadcrumb;
