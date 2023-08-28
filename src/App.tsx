import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import HomePage from "./pages/home.page";
import HQCentersPage from "./pages/admin/hqcenters.page";
import Layout from "./components/Layout";
import CenterSettingsPage from "./pages/centersettings.page";
import LoginPage from "./pages/login.page";
import RequireUser from "./components/RequireUser";
import UnauthorizedPage from "./pages/unauthorized.page";

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
            <Route
              element={<RequireUser allowedRoles={["admin", "manager"]} />}
            >
              <Route path="/" element={<HomePage />} />
            </Route>
            <Route element={<RequireUser allowedRoles={["manager"]} />}>
              <Route path="center_settings" element={<CenterSettingsPage />} />
            </Route>
            <Route
              path="admin"
              element={<RequireUser allowedRoles={["admin"]} />}
            >
              <Route path="hq_centers" element={<HQCentersPage />} />
              <Route path="hq_dashboard" />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
