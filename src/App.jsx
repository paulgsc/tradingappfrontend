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
import "./styles/mediascreens/styles.css";
import "./styles/images/styles.css";
import "./styles/events/styles.css";
import "./styles/Fonts/styles.css";
import "./styles/color/styles.css";
import CreateAccount from "./screens/legal/CreateAccount";
import AuthRoute from "./components/auth/AuthRoute";
import Index from "./screens/transfers/Index";
import TradingScreen from "./screens/tradingportal/TradingScreen";
import Test from "./Test";
import LinkBank from "./screens/linkBank/LinkBank";
import Sidebar2 from "./components/sidemenu/Sidebar2";
import "./app.css";
import Navbar from "./components/navbar/Navbar";

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
        <Route
          exact
          path="/trade"
          element={
            <div>
              <Navbar showMenu={false} />

              <div className="app__route-container">
                <div className="app__side-bar">
                  <Sidebar2 />
                </div>
                <div className="app_main-content">
                  {" "}
                  <TradingScreen />
                </div>
              </div>
            </div>
          }
        />
        <Route
          exact
          path="/test"
          element={
            <div className="test">
              <Test />
              <div className="app__route-container">
                <div className="app__side-bar">
                  <Sidebar2 />
                </div>
                <div className="app_main-content"> </div>
              </div>
            </div>
          }
        />
        <Route element={<AuthRoute />}>
          <Route exact path="/personal" element={<ProfileScreen />} />
          <Route exact path="/personal/balances" element={<ProfileScreen />} />
          <Route exact path="/personal/history" element={<ProfileScreen />} />
          <Route exact path="/personal/banking" element={<Index />} />
          <Route exact path="/personal/register" element={<CreateAccount />} />
          <Route
            exact
            path="/personal/transfer/plaid"
            element={<PlaidHome />}
          />
          <Route exact path="/personal/banking/link" element={<LinkBank />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
