import { BrowserRouter } from "react-router-dom";
import "./App.css";
import Header from "@/components/Header/Header";
import Pages from "@/routes/Pages/Pages";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <BrowserRouter>
        <Header />
        <Pages />
      </BrowserRouter>
    </>
  );
}

export default App;
