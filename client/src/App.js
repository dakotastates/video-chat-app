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
import Room from "./pages/Room";


function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:4000/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route
          path="/room/:roomID"
          component={Room}
        />
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
