import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./screens/Home";
import ProfileScreen from "./screens/profile/ProfileScreen";
import PlaidHome from "./screens/plaid/PlaidHome";
import CreateAccount from "./screens/legal/CreateAccount";
import AuthRoute from "./components/auth/AuthRoute";
import Test from "./Test";
import Trading from "./screens/tradingportal/Trading";
import Index from "./screens/banking/Index";
import LinkAccount from "./screens/plaid/LinkAccount";
import NotFound404 from "./components/notFound/NotFound404";
import {
  adminPaths,
  historyPaths,
  homePaths,
  settingsPaths,
  setupPaths,
} from "./constants/routes/routes";
import AdminPage from "./screens/admin/AdminPage";
import AdminRoute from "./components/auth/AdminRoute";
import ProfileSettings from "./screens/profile/ProfileSettings";
import Layout from "./Layout";
import EnvVariablesLoader from "./components/auth/EnvVariablesLoader";
import SetupStep from "./components/auth/SetupStep";
import Listings from "./screens/admin/listings/Listings";
import UserScreen from "./screens/user/component/UserScreen";
import { ErrorBoundary } from "react-error-boundary";
import FallBackUi from "./components/ui/FallBackUi";
import OTPRoute from "./components/auth/OTPRoute";
import LoginScreen from "./screens/login/LoginScreen";
import LoginOTPScreen from "./screens/login/LoginOTPScreen";
import MagicLinkScreen from "./screens/login/MagicLinkScreen";
import SignUpScreen from "./screens/login/SignUpScreen";

function App() {
  return (
    <Router>
      <ErrorBoundary
        FallbackComponent={() => <FallBackUi />}
        onError={() => {}}
      >
        <EnvVariablesLoader />
        <Layout>
          <Routes>
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
            <Route element={<OTPRoute />}>
              {homePaths.map((path, index) => (
                <Route key={index} exact path={`/${path}`} element={<Home />} />
              ))}
              <Route exact path="/trade" element={<Trading />} />
              <Route path="/test" element={<Test />} />
              <Route element={<AuthRoute />}>
                {setupPaths.map((path, index) => (
                  <Route
                    key={index}
                    exact
                    path={path}
                    element={<SetupStep />}
                  />
                ))}
                <Route exact path="/personal" element={<ProfileScreen />} />
                <Route
                  exact
                  path="/personal/balances"
                  element={<ProfileScreen />}
                />

                {settingsPaths.map((path, index) => (
                  <Route
                    key={index}
                    exact
                    path={path}
                    element={<ProfileSettings />}
                  />
                ))}
                {historyPaths.map((path, index) => (
                  <Route
                    key={index}
                    exact
                    path={`/personal${path}`}
                    element={<UserScreen />}
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
                {adminPaths.map((path, index) =>
                  path.includes("admin/listings") ? (
                    <Route
                      key={index}
                      exact
                      path={`/${path}`}
                      element={<Listings />}
                    />
                  ) : (
                    <Route
                      key={index}
                      exact
                      path={`/${path}`}
                      element={<AdminPage />}
                    />
                  )
                )}
              </Route>
              <Route exact path="/*" element={<NotFound404 />} />
            </Route>
          </Routes>
        </Layout>
      </ErrorBoundary>
    </Router>
  );
}

export default App;
