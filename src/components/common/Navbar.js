import React, { Component } from "react";
import { Link } from "react-router-dom";

class Navbar extends Component {
  constructor() {
    super();
    this.state = {
      user: ""
    };
  }

  componentDidMount() {
    if (localStorage.user) {
      this.setState({
        user: JSON.parse(localStorage.getItem("user")).username
      });
    }
  }

  onLogoutClick = e => {
    e.preventDefault();

    localStorage.removeItem("user");
    window.location.href = "/login";
  };

  render() {
    const { user } = this.state;

    const authLinks = (
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <a href="#" className="text-white text-center nav-link">
            Hi, {user}
          </a>
        </li>
        <li className="nav-item">
          <a href="#" onClick={this.onLogoutClick} className="nav-link">
            Logout
          </a>
        </li>
      </ul>
    );

    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Country Comparasion
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#mobile-nav"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            {localStorage.user ? authLinks : null}
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
