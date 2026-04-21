import { createTheme } from "@mui/material/styles";

const font = '"Plus Jakarta Sans", system-ui, -apple-system, "Segoe UI", sans-serif';

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#134e7a",
      dark: "#0c3557",
      light: "#38bdf8",
    },
    secondary: {
      main: "#f59e0b",
      dark: "#d97706",
      light: "#fde68a",
    },
    background: {
      default: "#f1f5f9",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#475569",
    },
    divider: "rgba(15, 23, 42, 0.08)",
  },
  typography: {
    fontFamily: font,
    h1: {
      fontFamily: font,
      fontWeight: 800,
      letterSpacing: "-0.035em",
      lineHeight: 1.06,
    },
    h2: {
      fontFamily: font,
      fontWeight: 700,
      letterSpacing: "-0.03em",
      lineHeight: 1.15,
    },
    h3: {
      fontFamily: font,
      fontWeight: 700,
      letterSpacing: "-0.025em",
    },
    h4: {
      fontFamily: font,
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
    h5: {
      fontFamily: font,
      fontWeight: 700,
      letterSpacing: "-0.015em",
    },
    h6: {
      fontFamily: font,
      fontWeight: 700,
    },
    subtitle1: {
      fontWeight: 600,
    },
    subtitle2: {
      fontWeight: 600,
    },
    body1: {
      lineHeight: 1.65,
    },
    body2: {
      lineHeight: 1.6,
    },
    overline: {
      fontFamily: font,
      fontWeight: 700,
      letterSpacing: "0.14em",
      lineHeight: 1.4,
    },
    button: {
      fontFamily: font,
      textTransform: "none",
      fontWeight: 700,
      letterSpacing: "0.02em",
    },
  },
  shape: {
    borderRadius: 12,
  },
  shadows: [
    "none",
    "0 1px 2px rgba(15, 23, 42, 0.04)",
    "0 4px 16px rgba(15, 78, 122, 0.07)",
    "0 12px 40px rgba(15, 78, 122, 0.1)",
    "0 24px 48px rgba(15, 23, 42, 0.1)",
    ...Array(20).fill("0 8px 24px rgba(15, 23, 42, 0.06)"),
  ],
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          paddingInline: 22,
          paddingBlock: 10,
          boxShadow: "none",
        },
        containedSecondary: {
          color: "#0c3557",
          boxShadow: "0 8px 22px rgba(245, 158, 11, 0.32)",
          "&:hover": {
            boxShadow: "0 12px 28px rgba(245, 158, 11, 0.4)",
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: "none",
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          "@media (min-width: 0px)": {
            paddingLeft: "max(16px, env(safe-area-inset-left))",
            paddingRight: "max(16px, env(safe-area-inset-right))",
          },
        },
      },
    },
  },
});
