import Header from "./components/Header";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { UserForm } from "./components/UserForm";
import ResultList from "./components/ResultList";

import "./styles/App.scss";

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route exact path="/">
            <UserForm />
          </Route>
          <Route exact path="/result/:primary/:secondary">
            <ResultList />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
