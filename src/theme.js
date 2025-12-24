import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { 
      main: "#0084ff",          // Bright blue for primary actions
      light: "#4db3ff",
      dark: "#0073e6",
      contrastText: "#ffffff",
    },
    secondary: { 
      main: "#3a3a4a",          // Dark gray for secondary
      light: "#4a4a5a",
      dark: "#2a2a3e",
      contrastText: "#ffffff",
    },
    background: {
      default: "#0f0f15",       // Very dark background
      paper: "#1a1a24",         // Slightly lighter surface
    },
    text: {
      primary: "#ffffff",       // White primary text
      secondary: "#a0a0b0",     // Light gray secondary text
      disabled: "#707080",      // Muted text
    },
    error: { 
      main: "#ff4444",
      light: "#ff7777",
      dark: "#cc0000",
    },
    warning: { 
      main: "#ffa500",
      light: "#ffb84d",
      dark: "#cc8400",
    },
    info: { 
      main: "#0084ff",
      light: "#4db3ff",
      dark: "#0073e6",
    },
    success: { 
      main: "#4caf50",
      light: "#7cb342",
      dark: "#388e3c",
    },
    divider: "#2a2a3e",
  },
  typography: {
    fontFamily: `-apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif`,
    h1: { fontSize: "32px", fontWeight: 700 },
    h2: { fontSize: "24px", fontWeight: 700 },
    h3: { fontSize: "20px", fontWeight: 600 },
    h4: { fontSize: "18px", fontWeight: 600 },
    h5: { fontSize: "16px", fontWeight: 600 },
    h6: { fontSize: "14px", fontWeight: 600 },
    body1: { fontSize: "15px", fontWeight: 400 },
    body2: { fontSize: "14px", fontWeight: 400 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a24",
          color: "#ffffff",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#1a1a24",
          color: "#ffffff",
          borderRight: "1px solid #2a2a3e",
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: "#a0a0b0",
          borderRadius: "8px",
          margin: "4px 8px",
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            backgroundColor: "#2a2a3e",
            color: "#ffffff",
          },
          "&.Mui-selected": {
            backgroundColor: "#0084ff",
            color: "#ffffff",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "#0073e6",
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: "inherit",
          minWidth: "40px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          transition: "all 0.2s ease-in-out",
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.4)",
          },
        },
        contained: {
          backgroundColor: "#0084ff",
          color: "#ffffff",
          "&:hover": {
            backgroundColor: "#0073e6",
          },
        },
        outlined: {
          borderColor: "#2a2a3e",
          color: "#0084ff",
          "&:hover": {
            borderColor: "#0084ff",
            backgroundColor: "rgba(0, 132, 255, 0.08)",
          },
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "#2a2a3e",
          borderRadius: "8px",
          padding: "12px 16px",
          "&::before": {
            borderBottomColor: "#2a2a3e",
          },
          "&:hover::before": {
            borderBottomColor: "#3a3a4a",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#ffffff",
          backgroundColor: "#2a2a3e",
          borderRadius: "8px",
        },
        input: {
          "&::placeholder": {
            color: "#707080",
            opacity: 1,
          },
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(255, 68, 68, 0.1)",
          borderLeft: "4px solid #ff4444",
          color: "#ff4444",
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          backgroundColor: "#1a1a24",
        },
      },
    },
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
