import React from "react";
import ReactDOM from "react-dom/client";
import { CssBaseline, ThemeProvider } from "@mui/material";
import App from "./App.jsx";
import { theme } from "./theme.js";
import AppGlobalStyles from "./appGlobalStyles.jsx";
import { I18nProvider } from "./i18n/I18nContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <I18nProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppGlobalStyles />
        <App />
      </ThemeProvider>
    </I18nProvider>
  </React.StrictMode>
);
