import { Breadcrumbs, Link, Typography } from "@mui/material";
import { NavigateNext, Home as HomeIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";
import { useIntl } from "react-intl";

export interface Crumb {
  labelId: string;
  path?: string;
}

interface AppBreadcrumbProps {
  crumbs: Crumb[];
}

const AppBreadcrumb = ({ crumbs }: AppBreadcrumbProps) => {
  const intl = useIntl();
  const fm = (id: string) => intl.formatMessage({ id });

  const allCrumbs: Crumb[] = [
    { labelId: "breadcrumb.dashboard", path: "/dashboard" },
    ...crumbs,
  ];

  return (
    <Breadcrumbs
      separator={<NavigateNext sx={{ fontSize: 16 }} />}
      sx={{ mb: 3 }}
    >
      {allCrumbs.map((crumb, i) => {
        const isLast = i === allCrumbs.length - 1;
        if (isLast) {
          return (
            <Typography
              key={crumb.labelId}
              color="text.primary"
              sx={{ fontSize: "0.875rem", fontWeight: 500 }}
            >
              {fm(crumb.labelId)}
            </Typography>
          );
        }
        return (
          <Link
            key={crumb.labelId}
            component={RouterLink}
            to={crumb.path!}
            underline="hover"
            color="text.secondary"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.875rem",
            }}
          >
            {i === 0 && <HomeIcon sx={{ fontSize: 16 }} />}
            {fm(crumb.labelId)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumb;
