import React, { useState, useEffect } from "react";
import './styles/App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Join from "./pages/Join";

function App() {

  return (
    <div className="App">
    <Router>
      <Switch>
        <Route
          exact
          path="/login"
          component={Login}
        />
        <Route
          exact
          path="/register"
          component={Register}
        />

        <Route
          exact
          path="/join"
          component={Join}
        />

        <Route
          exact
          path="/"
          component={Home}
        />

      </Switch>
    </Router>

    </div>
  );
}

export default App;
