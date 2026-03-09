import { createTheme, alpha } from '@mui/material/styles';

// Modern Minimal Color Palette
const colors = {
  slate: {
    50: '#f8fafc',
    100: '#f1f5f9',
    200: '#e2e8f0',
    300: '#cbd5e1',
    400: '#94a3b8',
    500: '#64748b',
    600: '#475569',
    700: '#334155',
    800: '#1e293b',
    900: '#0f172a',
  },
  primary: {
    main: '#0f172a',
    light: '#334155',
    dark: '#020617',
  },
  accent: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
  },
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
      light: colors.primary.light,
      dark: colors.primary.dark,
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.slate[100],
      light: colors.slate[50],
      dark: colors.slate[200],
      contrastText: colors.slate[700],
    },
    background: {
      default: '#ffffff',
      paper: colors.slate[50],
    },
    text: {
      primary: colors.slate[900],
      secondary: colors.slate[500],
    },
    divider: colors.slate[200],
    action: {
      hover: alpha(colors.slate[900], 0.04),
      selected: alpha(colors.slate[900], 0.08),
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.2,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 600,
      letterSpacing: '-0.025em',
      lineHeight: 1.3,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      lineHeight: 1.4,
    },
    h4: {
      fontSize: '1.25rem',
      fontWeight: 500,
      letterSpacing: '-0.01em',
    },
    h5: {
      fontSize: '1.125rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 500,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.6,
    },
    subtitle1: {
      fontSize: '0.875rem',
      fontWeight: 500,
      letterSpacing: '0.01em',
    },
    subtitle2: {
      fontSize: '0.75rem',
      fontWeight: 600,
      letterSpacing: '0.05em',
      textTransform: 'uppercase',
    },
    button: {
      fontWeight: 500,
      textTransform: 'none',
      letterSpacing: '0.01em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    'none',
    '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
    '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  ],
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            width: '6px',
            height: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: colors.slate[300],
            borderRadius: '3px',
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: '#ffffff',
          color: colors.slate[900],
          borderBottom: `1px solid ${colors.slate[200]}`,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: '#ffffff',
          borderRight: `1px solid ${colors.slate[200]}`,
        },
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 20px',
          transition: 'all 0.2s ease',
        },
        contained: {
          '&:hover': {
            transform: 'translateY(-1px)',
          },
        },
        outlined: {
          borderColor: colors.slate[300],
          '&:hover': {
            borderColor: colors.slate[400],
            backgroundColor: colors.slate[50],
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          border: `1px solid ${colors.slate[200]}`,
          borderRadius: 16,
          transition: 'all 0.2s ease',
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 10,
            backgroundColor: colors.slate[50],
            transition: 'all 0.2s ease',
            '& fieldset': {
              borderColor: colors.slate[200],
            },
            '&:hover fieldset': {
              borderColor: colors.slate[300],
            },
            '&.Mui-focused': {
              backgroundColor: '#ffffff',
            },
          },
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 8px',
          padding: '10px 12px',
          transition: 'all 0.15s ease',
          '&:hover': {
            backgroundColor: colors.slate[100],
          },
          '&.Mui-selected': {
            backgroundColor: colors.slate[100],
            '&:hover': {
              backgroundColor: colors.slate[200],
            },
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          fontWeight: 500,
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.slate[200],
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          transition: 'all 0.15s ease',
        },
      },
    },
  },
});

export default theme;
