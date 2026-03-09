import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  actionPath?: string;
  onAction?: () => void;
}

const EmptyState = ({ icon, title, description, actionLabel, actionPath, onAction }: EmptyStateProps) => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        textAlign: "center",
        py: 8,
        px: 4,
      }}
    >
      <Box sx={{ color: "text.secondary", mb: 2, "& .MuiSvgIcon-root": { fontSize: 48 } }}>
        {icon}
      </Box>
      <Typography variant="h6" sx={{ mb: 1, fontWeight: 500 }}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: "auto" }}>
        {description}
      </Typography>
      {actionLabel && (
        <Button
          variant="contained"
          size="small"
          onClick={onAction || (() => actionPath && navigate(actionPath))}
        >
          {actionLabel}
        </Button>
      )}
    </Box>
  );
};

export default EmptyState;
