import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PlaidHome from "./screens/plaid/PlaidHome";
import CreateAccount from "./screens/legal/CreateAccount";
import AuthRoute from "./components/auth/AuthRoute";
import Test from "./Test";
import Trading from "./screens/tradingportal/Trading";
import Index from "./screens/banking/Index";
import LinkAccount from "./screens/plaid/LinkAccount";
import NotFound404 from "./components/notFound/NotFound404";
import {
  adminDashboardPaths,
  adminPaths,
  adminPropertyImagesPaths,
  historyPaths,
  homePaths,
  modelsPaths,
  myProfilePaths,
  settingsPaths,
  setupPaths,
  siteSettingsPaths,
  userDashboardPaths,
  userHistoryPaths,
} from "./constants/routes/routes";
import AdminPage from "./screens/admin/AdminPage";
import AdminRoute from "./components/auth/AdminRoute";
import ProfileSettings from "./screens/profile/ProfileSettings";
import Layout from "./Layout";
import { ErrorBoundary } from "react-error-boundary";
import FallBackUi from "./components/ui/FallBackUi";
import OTPRoute from "./components/auth/OTPRoute";
import LoginScreen from "./screens/login/LoginScreen";
import LoginOTPScreen from "./screens/login/LoginOTPScreen";
import MagicLinkScreen from "./screens/login/MagicLinkScreen";
import SignUpScreen from "./screens/login/SignUpScreen";
import HomePage from "./screens/home/routes/HomePage";
import IndexModels from "./screens/models/IndexModels";
import AdminDashboardIndex from "./screens/adminDashboard/AdminDashboardIndex";
import PropertyImagesPages from "./screens/propertyImages/routes/PropertyImagesPages";
import AdminRegisterPage from "./screens/adminInvite/routes/AdminRegisterPage";
import MyprofilePage from "./screens/myprofile/routes/MyprofilePage";
import IpSetup from "./screens/ipAddressSetup/routes/IpSetup";
import SiteSettings from "./screens/siteSettings/routes/SiteSettings";
import Account from "./screens/profile/Account";
import UserDashboard from "./screens/userDashboard/routes/UserDashboard";
import MyHistory from "./screens/userHistory/routes/MyHistory";

function App() {
  return (
    <Router>
      <ErrorBoundary
        FallbackComponent={() => <FallBackUi />}
        onError={() => {}}
      >
        <Layout>
          <Routes>
            <Route element={<OTPRoute />}>
              <Route
                exact
                path="/login/:redirect?"
                element={
                  <>
                    <LoginScreen />
                  </>
                }
              />
              <Route
                exact
                path="/login/otp/:sessionId?/:redirect?"
                element={
                  <>
                    <LoginOTPScreen />
                  </>
                }
              />

              <Route
                exact
                path="/register/otp/:sessionId?/:redirect?"
                element={
                  <>
                    <LoginOTPScreen />
                  </>
                }
              />

              <Route
                exact
                path="/login/magic-link/:sessionId?/:otp?/:redirect?"
                element={
                  <>
                    <MagicLinkScreen />
                  </>
                }
              />
              <Route
                exact
                path="/register"
                element={
                  <>
                    <SignUpScreen />
                  </>
                }
              />
            </Route>
            {homePaths.map((path, index) => (
              <Route
                key={index}
                exact
                path={`/${path}`}
                element={<HomePage />}
              />
            ))}
            <Route exact path="/trade" element={<Trading />} />
            <Route path="/test/:foo?" element={<Test />} />
            <Route element={<AuthRoute />}>
              <Route
                exact
                path="/register/admin/magic-link/:sessionId?"
                element={<AdminRegisterPage />}
              />
              {setupPaths.map((path, index) => (
                <Route key={index} exact path={path} element={<IpSetup />} />
              ))}

              {userDashboardPaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={path}
                  element={<UserDashboard />}
                />
              ))}
              {userHistoryPaths.map((path, index) => (
                <Route key={index} exact path={path} element={<MyHistory />} />
              ))}
              <Route exact path="/personal/balances" element={<Account />} />

              {settingsPaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={path}
                  element={<ProfileSettings />}
                />
              ))}
              {myProfilePaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={path}
                  element={<MyprofilePage />}
                />
              ))}

              <Route exact path="/personal/banking" element={<Index />} />
              <Route
                exact
                path="/personal/banking/transfer/:redirect?"
                element={<PlaidHome />}
              />
              <Route
                exact
                path="/personal/register"
                element={<CreateAccount />}
              />
              <Route
                exact
                path="/personal/banking/link/:redirect?"
                element={<LinkAccount />}
              />
            </Route>
            <Route element={<AdminRoute />}>
              {adminPaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={`/${path}`}
                  element={<AdminPage />}
                />
              ))}
              {adminDashboardPaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={`${path}`}
                  element={<AdminDashboardIndex />}
                />
              ))}
              {siteSettingsPaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={`${path}`}
                  element={<SiteSettings />}
                />
              ))}
              {modelsPaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={path}
                  element={<IndexModels />}
                />
              ))}
              {adminPropertyImagesPaths.map((path, index) => (
                <Route
                  key={index}
                  exact
                  path={path}
                  element={<PropertyImagesPages />}
                />
              ))}
            </Route>
            <Route exact path="/*" element={<NotFound404 />} />
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
