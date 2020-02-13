import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import "./App.css";

import Navbar from "./components/common/Navbar";
import Login from "./components/common/Login";
import Dashboard from "./components/dashboard/Dashboard";
import HomePage from "./components/common/HomePage";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={HomePage} />
          <div className="container">
            {localStorage.user ? (
              <Redirect to="/dashboard" />
            ) : (
              <Redirect to="/login" />
            )}
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
