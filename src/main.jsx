import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { RecoilRoot } from "recoil";
import StyledEngineProvider from "@mui/material/StyledEngineProvider";
import CustomThemeProvider from "@/theme/Provider";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RecoilRoot>
      <HelmetProvider>
        <CustomThemeProvider>
          <StyledEngineProvider>
            <App />
          </StyledEngineProvider>
        </CustomThemeProvider>
      </HelmetProvider>
    </RecoilRoot>
  </React.StrictMode>
);
