import { createTheme } from "@mui/material/styles";

export const muiTheme = createTheme({
  palette: {
    mode: "light",
    primary: { main: "#0EA5E9" }, // Teal/Cyan
    background: {
      default: "#f8fafc",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#000000", // slate-900
      secondary: "#64748B", // slate-500
    },
    divider: "rgba(15, 23, 42, 0.10)",
  },
  shape: { borderRadius: 4 },
  typography: {
    fontFamily: `"Inter", system-ui, -apple-system, Segoe UI, Roboto, Arial`,
    h6: { fontWeight: 700 },
    button: { textTransform: "none", fontWeight: 600 },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 4,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: "1px solid rgba(15, 23, 42, 0.10)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: "none",
          borderBottom: "1px solid rgba(15, 23, 42, 0.10)",
          backdropFilter: "blur(10px)",
        },
      },
    },
  },
});
