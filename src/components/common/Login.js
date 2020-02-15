import React, { Component } from "react";
import classnames from "classnames";
import { getUser } from "../../config/Config";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      usernameError: "",
      passwordError: "",
      user: getUser()
    };
  }

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      username: this.state.username,
      password: this.state.password
    };

    const { username, password, user } = this.state;

    if (username !== user.username && username !== "") {
      this.setState({
        usernameError: "Invalid username"
      });
    } else if (username === "") {
      this.setState({
        usernameError: "Username field should not be empty"
      });
    } else {
      this.setState({
        usernameError: ""
      });
    }

    if (password !== user.password && password !== "") {
      this.setState({
        passwordError: "Invalid password"
      });
    } else if (password === "") {
      this.setState({
        passwordError: "Password field should not be empty"
      });
    } else {
      this.setState({
        passwordError: ""
      });
    }

    if (username === user.username && password === user.password) {
      localStorage.setItem("user", JSON.stringify(userData));
      window.location.href = "/dashboard";
    }
  };

  render() {
    const { usernameError, passwordError } = this.state;

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">Sign in to Country Comparasion</p>
              <form onSubmit={this.onSubmit}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": usernameError
                    })}
                    placeholder="Username"
                    name="username"
                    value={this.state.username}
                    onChange={this.onChange}
                  />
                  {usernameError && (
                    <div className="invalid-feedback">{usernameError}</div>
                  )}
                </div>

                <div className="form-group">
                  <input
                    type="password"
                    className={classnames("form-control form-control-lg", {
                      "is-invalid": passwordError
                    })}
                    placeholder="Password"
                    name="password"
                    value={this.state.password}
                    onChange={this.onChange}
                  />
                  {passwordError && (
                    <div className="invalid-feedback">{passwordError}</div>
                  )}
                </div>

                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
