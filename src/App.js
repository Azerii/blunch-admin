import Dashboard from "pages/Dashboard";
import Login from "pages/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route
            exact
            path="/"
            component={() => <Redirect to="/dashboard" />}
          />
          <Route path="/dashboard" component={Dashboard} />
          <Route exact path="/login" component={Login} />
          <Route component={PageNotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
