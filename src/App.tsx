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
import ContactPage from "./pages/contact.page";
import AccountPage from "./pages/account.page";
import HQSettingsPage from "./pages/admin/hqsettings.page";
import HQDashboardPage from "./pages/admin/hqdashboard.page";
import CommissionsPage from "./pages/commissions.page";
import MyClientsPage from "./pages/myclients.page";
import SchedulePage from "./pages/schedule.page";
import CenterClientsPage from "./pages/centerclient.page";
import TermsPage from "./pages/terms.page";
import HQClientsPage from "./pages/admin/hqclients.page";
import DashboardPage from "./pages/dashboard.page";

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
              <Route path="dashboard" element={<DashboardPage />} />
            </Route>
            <Route
              element={
                <RequireUser
                  allowedRoles={["manager", "sales", "instructor"]}
                />
              }
            >
              <Route path="account" element={<AccountPage />} />
              <Route path="commissions" element={<CommissionsPage />} />
              <Route path="schedule" element={<SchedulePage />} />
            </Route>
            <Route
              element={<RequireUser allowedRoles={["sales", "manager"]} />}
            >
              <Route path="my_clients" element={<MyClientsPage />} />
              <Route path="center_clients" element={<CenterClientsPage />} />
            </Route>
            <Route
              path="admin"
              element={<RequireUser allowedRoles={["admin"]} />}
            >
              <Route path="hq_centers" element={<HQCentersPage />} />
              <Route path="hq_dashboard" element={<HQDashboardPage />} />
              <Route path="hq_settings" element={<HQSettingsPage />} />
              <Route path="hq_clients" element={<HQClientsPage />} />
            </Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="unauthorized" element={<UnauthorizedPage />} />
            <Route path="contact" element={<ContactPage />} />
            <Route path="terms" element={<TermsPage />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
