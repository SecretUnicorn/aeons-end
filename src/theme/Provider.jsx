import { ThemeProvider, createTheme } from "@mui/material/styles";

import themes from "./themes";

function CustomThemeProvider({ children }) {
  // @ts-ignore
  return (
    <ThemeProvider theme={createTheme(themes.light)}>{children}</ThemeProvider>
  );
}

export default CustomThemeProvider;
