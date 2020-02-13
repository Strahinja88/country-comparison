import React, { Component } from "react";
import axios from "axios";

import "./dashboard.css";

import CountryComparasion from "./CountryComparasion";
import CountryList from "./CountryList";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      countries: [],
      searched: "",
      checkboxes: [],
      mostPopulated: "",
      leastPopulated: "",
      difference: "",
      selected: false,
      compareError: ""
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

  compareCountries = () => {
    const { checkboxes, countries } = this.state;

    if (checkboxes.length > 1) {
      const promise = new Promise((resolve, reject) => {
        for (let i = 0, n = checkboxes.length; i < n; i++) {
          if (document.getElementById(checkboxes[i].name) !== null) {
            document.getElementById(checkboxes[i].name).checked = false;
          }
          checkboxes[i].checked = false;
        }

        resolve(true);
      });

      promise.then(() => {
        const sortedCheckboxes = checkboxes.sort(
          (a, b) => b.population - a.population
        );
        this.setState({
          mostPopulated: sortedCheckboxes[0],
          leastPopulated: sortedCheckboxes[sortedCheckboxes.length - 1],
          difference:
            sortedCheckboxes[0].population -
            sortedCheckboxes[sortedCheckboxes.length - 1].population,
          selected: true,
          compareError: "",
          searched: "",
          checkboxes: []
        });
      });
    } else {
      this.setState({
        compareError: "You must select at least 2 countries"
      });
    }
  };

  filtered = value => x =>
    x.name.toLowerCase().includes(value.toLowerCase()) || !value;

  render() {
    const {
      countries,
      searched,
      checkboxes,
      mostPopulated,
      leastPopulated,
      difference,
      selected,
      compareError
    } = this.state;

    let isDisabled;

    if (checkboxes.length > 3) {
      isDisabled = true;
    } else {
      isDisabled = false;
    }

    console.log(this.state);

    return (
      <div>
        <div className="dashboard">
          <div className="container">
            <h1 className="text-center p-5">Country Comparasion</h1>
            <div className="dashboard-items p-5">
              <div className="row">
                <CountryComparasion
                  selected={selected}
                  mostPopulated={mostPopulated}
                  leastPopulated={leastPopulated}
                  difference={difference}
                />

                <CountryList
                  countries={countries}
                  filtered={this.filtered}
                  searched={searched}
                  toggleCheckbox={this.toggleCheckbox}
                  compareCountries={this.compareCountries}
                  compareError={compareError}
                  checkboxes={checkboxes}
                  isDisabled={isDisabled}
                  onSearch={this.onSearch}
                />
              </div>
              <div className="row">
                <div className="col-12 mt-5 country-chart">Country Chart</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
