import { createTheme, alpha, ThemeOptions } from '@mui/material/styles';

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
  accent: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
  },
};

const sharedTypography = {
  fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  h1: { fontSize: '2.5rem', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.2 },
  h2: { fontSize: '2rem', fontWeight: 600, letterSpacing: '-0.025em', lineHeight: 1.3 },
  h3: { fontSize: '1.5rem', fontWeight: 600, letterSpacing: '-0.02em', lineHeight: 1.4 },
  h4: { fontSize: '1.25rem', fontWeight: 500, letterSpacing: '-0.01em' },
  h5: { fontSize: '1.125rem', fontWeight: 500 },
  h6: { fontSize: '1rem', fontWeight: 500 },
  body1: { fontSize: '1rem', lineHeight: 1.6 },
  body2: { fontSize: '0.875rem', lineHeight: 1.6 },
  subtitle1: { fontSize: '0.875rem', fontWeight: 500, letterSpacing: '0.01em' },
  subtitle2: { fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' as const },
  button: { fontWeight: 500, textTransform: 'none' as const, letterSpacing: '0.01em' },
};

const sharedShape = { borderRadius: 12 };

const sharedShadows: ThemeOptions['shadows'] = [
  'none',                                                                         // 0
  '0 1px 2px 0 rgb(0 0 0 / 0.05)',                                               // 1
  '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',              // 2
  '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',           // 3
  '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',         // 4
  '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',        // 5
  '0 25px 50px -12px rgb(0 0 0 / 0.25)',                                         // 6
  '0 1px 2px 0 rgb(0 0 0 / 0.06), 0 1px 3px 0 rgb(0 0 0 / 0.1)',               // 7
  '0 2px 4px -1px rgb(0 0 0 / 0.06), 0 4px 6px -1px rgb(0 0 0 / 0.1)',          // 8
  '0 4px 6px -2px rgb(0 0 0 / 0.05), 0 10px 15px -3px rgb(0 0 0 / 0.1)',        // 9
  '0 8px 10px -4px rgb(0 0 0 / 0.04), 0 20px 25px -5px rgb(0 0 0 / 0.1)',       // 10
  '0 10px 15px -4px rgb(0 0 0 / 0.05), 0 24px 32px -8px rgb(0 0 0 / 0.1)',      // 11
  '0 12px 18px -6px rgb(0 0 0 / 0.05), 0 28px 36px -8px rgb(0 0 0 / 0.12)',     // 12
  '0 14px 20px -6px rgb(0 0 0 / 0.06), 0 32px 40px -10px rgb(0 0 0 / 0.12)',    // 13
  '0 16px 24px -8px rgb(0 0 0 / 0.06), 0 36px 44px -10px rgb(0 0 0 / 0.14)',    // 14
  '0 18px 28px -8px rgb(0 0 0 / 0.07), 0 40px 48px -12px rgb(0 0 0 / 0.14)',    // 15
  '0 20px 32px -10px rgb(0 0 0 / 0.07), 0 44px 52px -12px rgb(0 0 0 / 0.16)',   // 16
  '0 22px 34px -10px rgb(0 0 0 / 0.08), 0 46px 54px -14px rgb(0 0 0 / 0.16)',   // 17
  '0 24px 38px -12px rgb(0 0 0 / 0.08), 0 48px 56px -14px rgb(0 0 0 / 0.18)',   // 18
  '0 26px 40px -12px rgb(0 0 0 / 0.09), 0 50px 58px -16px rgb(0 0 0 / 0.18)',   // 19
  '0 28px 44px -14px rgb(0 0 0 / 0.09), 0 52px 60px -16px rgb(0 0 0 / 0.20)',   // 20
  '0 30px 46px -14px rgb(0 0 0 / 0.1), 0 54px 62px -18px rgb(0 0 0 / 0.20)',    // 21
  '0 32px 48px -16px rgb(0 0 0 / 0.1), 0 56px 64px -18px rgb(0 0 0 / 0.22)',    // 22
  '0 34px 52px -16px rgb(0 0 0 / 0.12), 0 58px 68px -20px rgb(0 0 0 / 0.22)',   // 23
  '0 36px 56px -18px rgb(0 0 0 / 0.14), 0 60px 72px -20px rgb(0 0 0 / 0.25)',   // 24
] as ThemeOptions['shadows'];

const sharedComponents = (isDark: boolean) => ({
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        scrollbarWidth: 'thin' as const,
        '&::-webkit-scrollbar': { width: '6px', height: '6px' },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: isDark ? colors.slate[600] : colors.slate[300],
          borderRadius: '3px',
        },
      },
    },
  },
  MuiAppBar: {
    defaultProps: { elevation: 0 as const },
    styleOverrides: {
      root: {
        backgroundColor: isDark ? colors.slate[900] : '#ffffff',
        color: isDark ? colors.slate[100] : colors.slate[900],
        borderBottom: `1px solid ${isDark ? colors.slate[700] : colors.slate[200]}`,
      },
    },
  },
  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: isDark ? colors.slate[900] : '#ffffff',
        borderRight: `1px solid ${isDark ? colors.slate[700] : colors.slate[200]}`,
      },
    },
  },
  MuiButton: {
    defaultProps: { disableElevation: true as const },
    styleOverrides: {
      root: { borderRadius: 8, padding: '10px 20px', transition: 'all 0.2s ease' },
      contained: { '&:hover': { transform: 'translateY(-1px)' } },
      outlined: {
        borderColor: isDark ? colors.slate[600] : colors.slate[300],
        '&:hover': {
          borderColor: isDark ? colors.slate[500] : colors.slate[400],
          backgroundColor: isDark ? colors.slate[800] : colors.slate[50],
        },
      },
    },
  },
  MuiCard: {
    defaultProps: { elevation: 0 as const },
    styleOverrides: {
      root: {
        border: `1px solid ${isDark ? colors.slate[700] : colors.slate[200]}`,
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
          backgroundColor: isDark ? colors.slate[800] : colors.slate[50],
          transition: 'all 0.2s ease',
          '& fieldset': { borderColor: isDark ? colors.slate[600] : colors.slate[200] },
          '&:hover fieldset': { borderColor: isDark ? colors.slate[500] : colors.slate[300] },
          '&.Mui-focused': { backgroundColor: isDark ? colors.slate[700] : '#ffffff' },
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
        '&:hover': { backgroundColor: isDark ? colors.slate[800] : colors.slate[100] },
        '&.Mui-selected': {
          backgroundColor: isDark ? colors.slate[800] : colors.slate[100],
          '&:hover': { backgroundColor: isDark ? colors.slate[700] : colors.slate[200] },
        },
      },
    },
  },
  MuiChip: {
    styleOverrides: { root: { borderRadius: 6, fontWeight: 500 } },
  },
  MuiDivider: {
    styleOverrides: { root: { borderColor: isDark ? colors.slate[700] : colors.slate[200] } },
  },
  MuiIconButton: {
    styleOverrides: { root: { borderRadius: 8, transition: 'all 0.15s ease' } },
  },
});

export const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: colors.slate[900], light: colors.slate[700], dark: '#020617', contrastText: '#ffffff' },
    secondary: { main: colors.slate[100], light: colors.slate[50], dark: colors.slate[200], contrastText: colors.slate[700] },
    background: { default: '#ffffff', paper: colors.slate[50] },
    text: { primary: colors.slate[900], secondary: colors.slate[500] },
    divider: colors.slate[200],
    action: { hover: alpha(colors.slate[900], 0.04), selected: alpha(colors.slate[900], 0.08) },
  },
  typography: sharedTypography,
  shape: sharedShape,
  shadows: sharedShadows,
  components: sharedComponents(false),
});

export const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: colors.accent.main, light: colors.accent.light, dark: colors.accent.dark, contrastText: '#ffffff' },
    secondary: { main: colors.slate[800], light: colors.slate[700], dark: colors.slate[900], contrastText: colors.slate[200] },
    background: { default: colors.slate[900], paper: colors.slate[800] },
    text: { primary: colors.slate[100], secondary: colors.slate[400] },
    divider: colors.slate[700],
    action: { hover: alpha(colors.slate[100], 0.06), selected: alpha(colors.slate[100], 0.1) },
    info: { main: '#60a5fa' },
    success: { main: '#34d399' },
    warning: { main: '#fbbf24' },
    error: { main: '#f87171' },
  },
  typography: sharedTypography,
  shape: sharedShape,
  shadows: sharedShadows,
  components: sharedComponents(true),
});

// Default export for backward compatibility
export default lightTheme;
