import { Component, type ErrorInfo, type ReactNode } from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class RouteErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error("Route error:", error, info.componentStack);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: 400, p: 4 }}>
          <Paper elevation={2} sx={{ p: 4, maxWidth: 480, textAlign: "center" }}>
            <ErrorOutlineIcon color="error" sx={{ fontSize: 48, mb: 2 }} />
            <Typography variant="h6" gutterBottom>
              Something went wrong
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              {this.state.error?.message || "An unexpected error occurred while rendering this page."}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
              <Button variant="contained" onClick={this.handleReset}>
                Try Again
              </Button>
              <Button variant="outlined" onClick={() => window.location.assign("/dashboard")}>
                Go to Dashboard
              </Button>
            </Box>
          </Paper>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default RouteErrorBoundary;
