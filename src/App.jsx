import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import Home from "./screens/Home";
import Listings from "./screens/Listings";
import Register from "./components/auth/Register";
import ProfileScreen from "./screens/profile/ProfileScreen";
import PlaidHome from "./screens/plaid/PlaidHome";
import "./styles/position/styles.css";
import "./styles/border/styles.css";
import "./styles/events/styles.css";
import CreateAccount from "./screens/legal/CreateAccount";
import AuthRoute from "./components/auth/AuthRoute";
import Trading from "./screens/tradingportal/Trading";
import Index from "./screens/banking/Index";
import LinkAccount from "./screens/plaid/LinkAccount";
import NotFound404 from "./components/notFound/NotFound404";
<<<<<<< HEAD
=======
import { adminPaths, historyPaths } from "./constants/routes/routes";
import AdminPage from "./screens/admin/AdminPage";
>>>>>>> dev

function App() {
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
        <Route
          exact
          path="/listings"
          element={
            <>
              <Listings />
            </>
          }
        />
        <Route
          exact
          path="/login/:redirect?"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          exact
          path="/register"
          element={
            <>
              <Register />
            </>
          }
        />

        <Route exact path="/trade" element={<Trading />} />
        <Route element={<AuthRoute />}>
          <Route exact path="/personal" element={<ProfileScreen />} />
          <Route exact path="/personal/balances" element={<ProfileScreen />} />
<<<<<<< HEAD
=======
          {historyPaths.map((path, index) => (
            <Route
              key={index}
              exact
              path={`/personal${path}`}
              element={<Transactions />}
            />
          ))}
          {adminPaths.map((path, index) => (
            <Route
              key={index}
              exact
              path={`/${path}`}
              element={<AdminPage />}
            />
          ))}
>>>>>>> dev
          <Route exact path="/personal/banking" element={<Index />} />
          <Route
            exact
            path="/personal/banking/transfer/:redirect?"
            element={<PlaidHome />}
          />
          <Route exact path="/personal/register" element={<CreateAccount />} />
          <Route
            exact
            path="/personal/banking/link/:redirect?"
            element={<LinkAccount />}
          />
        </Route>
        <Route exact path="/*" element={<NotFound404 />} />
      </Routes>
    </Router>
  );
}

export default App;
