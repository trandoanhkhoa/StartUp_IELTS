import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "@/api/AuthContext.jsx";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { muiTheme } from "@/themes/index.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
const clientId =
  "407056451916-apnlb122ceks1rkfr9t9m28g8e6tjnfg.apps.googleusercontent.com";
ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={clientId}>
    <React.StrictMode>
      <AuthProvider>
        <ThemeProvider theme={muiTheme}>
          <CssBaseline />
          <App />
        </ThemeProvider>
      </AuthProvider>
    </React.StrictMode>
  </GoogleOAuthProvider>,
);
