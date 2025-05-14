
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9b87f5', // Primary Purple
      light: '#d6bcfa', // Light Purple
      dark: '#7E69AB', // Secondary Purple
    },
    secondary: {
      main: '#6E59A5', // Tertiary Purple
      light: '#E5DEFF', // Soft Purple
      dark: '#1A1F2C', // Dark Purple
    },
    background: {
      default: '#FFFFFF',
      paper: '#F6F7F9',
    },
    text: {
      primary: '#1A1F2C',
      secondary: '#8E9196',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
    },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FFFFFF',
          color: '#1A1F2C',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
        },
      },
    },
  },
});

export default theme;
