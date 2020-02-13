import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class HomePage extends Component {
  render() {
    return (
      <div>
        {localStorage.user ? (
          <Redirect to="/dashboard" />
        ) : (
          <Redirect to="/login" />
        )}
      </div>
    );
  }
}

export default HomePage;
