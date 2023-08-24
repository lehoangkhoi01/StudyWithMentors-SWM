import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./Store/store";
import { StyledEngineProvider, createTheme } from "@mui/material";

import { ThemeProvider } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const root = ReactDOM.createRoot(document.getElementById("root"));
const muiTheme = createTheme({
  typography: {
    allVariants: {
      fontFamily: `"Inter", sans-serif`,
    },
  },
  breakpoints: {
    values: {
      xl: 1537,
      lg: 1199,
      md: 899,
      sm: 599,
      xs: 0
    }
  }
});

root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={muiTheme}>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <App />
        </LocalizationProvider>
      </ThemeProvider>
    </StyledEngineProvider>
  </Provider>
);
