import React, { useState, useEffect } from "react";
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Join from "./pages/Join";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          render={props =>
            !isAuthenticated ? (
              <Login {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/" />
            )
          }
        />

        <Route
          exact
          path="/register"
          render={props =>
            !isAuthenticated ? (
              <Register {...props} setAuth={setAuth} />
            ) : (
              <Redirect to="/" />
            )
          }
        />

        <Route
          exact
          path="/join"
          component={Join}
        />

        <Route
          exact
          path="/"
          render={props =>
            !isAuthenticated ? (
              <Home {...props} setAuth={setAuth} />
            ) : (
              <Dashboard {...props} setAuth={setAuth} />
            )
          }
        />

      </Switch>
    </Router>

    </div>
  );
}

export default App;
