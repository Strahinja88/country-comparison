import React, { Component } from "react";
import axios from "axios";

import "./dashboard.css";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      searched: "",
      checkboxes: []
    };
  }

  componentDidMount() {
    // Set countries
    axios.get("https://restcountries.eu/rest/v2/all").then(res => {
      let countries = [];
      res.data.map(item => {
        countries.push(item);
      });
      this.setState({
        countries
      });
      console.log(this.state.countries);
    });
  }

  onSearch = e => {
    const { checkboxes } = this.state;

    const promise = new Promise((resolve, reject) => {
      this.setState({
        searched: e.target.value
      });

      resolve(true);
    });

    promise.then(() => {
      for (let i = 0, n = checkboxes.length; i < n; i++)
        if (document.getElementById(checkboxes[i].name) !== null)
          document.getElementById(checkboxes[i].name).checked = true;
    });
  };

  toggleCheckbox = country => {
    const { checkboxes, countries } = this.state;

    country.checked = !country.checked;

    for (let i = 0, n = countries.length; i < n; i++) {
      if (country.checked) {
        this.setState({
          checkboxes: [...checkboxes, country]
        });
      } else {
        const filteredCheckboxes = checkboxes.filter(
          c => c.name !== country.name
        );
        this.setState({
          checkboxes: filteredCheckboxes
        });
      }
    }
  };

  filtered = value => x =>
    x.name.toLowerCase().includes(value.toLowerCase()) || !value;

  render() {
    const { countries, searched, checkboxes } = this.state;

    let isDisabled;

    if (checkboxes.length > 3) {
      isDisabled = true;
    } else {
      isDisabled = false;
    }

    const selectedCounries = countries.filter(country =>
      checkboxes.includes(country)
    );

    console.log(checkboxes, selectedCounries);

    return (
      <div>
        <div className="dashboard">
          <div className="container">
            <h1 className="text-center p-5">Country Comparasion</h1>
            <div className="dashboard-items p-5">
              <div className="row">
                <div className="col-md-7">
                  <div className="d-flex flex-column justify-content-around flex-wrap info">
                    <p>
                      Most populated country is: <strong>Argentina</strong> with{" "}
                      <strong>43,500.400</strong> inhabitants.
                    </p>

                    <p>
                      Most least populated country is:{" "}
                      <strong>Argentina</strong> with{" "}
                      <strong>43,500.400</strong> inhabitants.
                    </p>

                    <p>
                      Difference of population is: <strong>43,500.400</strong>{" "}
                      inhabitants.
                    </p>
                  </div>
                </div>
                <div className="col-md-5 p-3 list">
                  <h4 className="text-center">
                    <strong>Country List</strong>
                  </h4>

                  <div>
                    <form className="my-2">
                      <input
                        className="form-control search-input"
                        type="search"
                        placeholder="&#x1F50D; Search"
                        onChange={this.onSearch}
                      />

                      <ul className="country-list">
                        {countries
                          .filter(this.filtered(searched))
                          .map(country => (
                            <li key={country.name}>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input checkmark"
                                  type="checkbox"
                                  name="checkbox"
                                  id={country.name.toString()}
                                  value={country.name}
                                  onChange={() => this.toggleCheckbox(country)}
                                  disabled={
                                    checkboxes.includes(country)
                                      ? false
                                      : isDisabled
                                  }
                                />
                                <label htmlFor={country.name}>
                                  {country.name}
                                </label>
                              </div>
                            </li>
                          ))}
                      </ul>

                      <div className="d-flex align-items-center">
                        <button className="btn btn-info btn-lg compare-btn">
                          Compare
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
