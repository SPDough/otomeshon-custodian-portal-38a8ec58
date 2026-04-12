import { Breadcrumbs, Link, Typography, alpha, useTheme } from "@mui/material";
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
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const resolve = (id: string) =>
    id.startsWith("__literal:") ? id.slice(10) : intl.formatMessage({ id });

  const allCrumbs: Crumb[] = [
    { labelId: "breadcrumb.dashboard", path: "/dashboard" },
    ...crumbs,
  ];

  return (
    <Breadcrumbs
      separator={
        <NavigateNext
          sx={{
            fontSize: 14,
            color: isDark ? "slate.600" : "text.disabled",
          }}
        />
      }
      sx={{
        mb: 3,
        px: 2,
        py: 1,
        borderRadius: 2,
        bgcolor: isDark
          ? alpha(theme.palette.background.paper, 0.5)
          : alpha(theme.palette.divider, 0.15),
        border: `1px solid ${isDark ? alpha(theme.palette.divider, 0.4) : "transparent"}`,
        width: "fit-content",
      }}
    >
      {allCrumbs.map((crumb, i) => {
        const isLast = i === allCrumbs.length - 1;
        if (isLast) {
          return (
            <Typography
              key={crumb.labelId}
              color="text.primary"
              sx={{ fontSize: "0.8125rem", fontWeight: 500 }}
            >
              {resolve(crumb.labelId)}
            </Typography>
          );
        }
        return (
          <Link
            key={crumb.labelId}
            component={RouterLink}
            to={crumb.path!}
            underline="none"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              fontSize: "0.8125rem",
              color: "text.secondary",
              transition: "color 0.15s ease",
              "&:hover": {
                color: isDark ? "primary.light" : "text.primary",
              },
            }}
          >
            {i === 0 && <HomeIcon sx={{ fontSize: 15 }} />}
            {resolve(crumb.labelId)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default AppBreadcrumb;
