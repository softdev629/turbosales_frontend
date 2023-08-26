import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/home.page";
import HQCentersPage from "./pages/admin/hqcenters.page";
import Layout from "./components/Layout";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ea2049",
    },
  },
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="admin">
              <Route path="hq_centers" element={<HQCentersPage />} />
            </Route>
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
