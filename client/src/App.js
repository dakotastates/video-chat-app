import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";

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

      </Switch>
    </Router>

    </div>
  );
}

export default App;
