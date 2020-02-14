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
      compareError: "",
      selectedCountries: []
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
    const { checkboxes } = this.state;

    if (checkboxes.length > 1) {
      for (let i = 0, n = checkboxes.length; i < n; i++) {
        if (document.getElementById(checkboxes[i].name) !== null) {
          document.getElementById(checkboxes[i].name).checked = false;
        }
        checkboxes[i].checked = false;
      }

      const sortedCheckboxes = checkboxes.sort((a, b) =>
        a.population > b.population ? -1 : 1
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
        checkboxes: [],
        selectedCountries: checkboxes.sort((a, b) => (a.name > b.name ? 1 : -1))
      });
    } else {
      this.setState({
        compareError: "You must select at least 2 countries"
      });
    }
  };

  populationPercentage = country => {
    const { selectedCountries, mostPopulated } = this.state;
    let sum = 0;
    let allPopulation = 0;
    selectedCountries.map(c => {
      allPopulation = sum += c.population;
    });

    const populationPercentage = Math.round(
      (country.population / allPopulation) * 100
    );

    const populationPercentage2 = Math.round(
      (country.population / mostPopulated.population) * 100
    );

    const height = `${(country.population / 40000000) * 400}px`;

    const obj = { populationPercentage, height, populationPercentage2 };

    return obj;
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
      compareError,
      selectedCountries
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
                <div className="col-12 mt-5 pb-3 country-chart">
                  <ul className="d-flex justify-content-around p-5 ml-5">
                    {selected
                      ? selectedCountries.map(country => (
                          <li key={country.name} className="d-flex">
                            <div className="square"></div>
                            <p className="text-muted">{country.name}</p>
                          </li>
                        ))
                      : null}
                  </ul>
                  <div className="row">
                    <div className="col-2 d-flex flex-column justify-content-end">
                      <div className="scale">
                        <ul>
                          <li>
                            <span>40,000,000&#x2012;</span>{" "}
                          </li>
                          <li>
                            <span>35,000,000&#x2012;</span>
                          </li>
                          <li>
                            <span>30,000,000&#x2012;</span>
                          </li>
                          <li>
                            <span>25,000,000&#x2012;</span>
                          </li>
                          <li>
                            <span>20,000,000&#x2012;</span>
                          </li>
                          <li>
                            <span>15,000,000&#x2012;</span>
                          </li>
                          <li>
                            <span>10,000,000&#x2012;</span>
                          </li>
                          <li>
                            <span>5,000,000&#x2012;</span>
                          </li>
                          <li>
                            <span>0&#x2012;</span>{" "}
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-10 d-flex flex-column justify-content-end chart">
                      <div className="d-flex bd-highlight chart-wrapper">
                        {selected
                          ? selectedCountries.map(country => (
                              <div
                                className="d-flex flex-fill bd-highlight flex-column justify-content-end chart-item-wrapper"
                                key={country.name}
                              >
                                <div
                                  key={country.name}
                                  className="chart-item"
                                  style={{
                                    height: this.populationPercentage(country)
                                      .height
                                  }}
                                >
                                  <div
                                    className="percentage-wrapper"
                                    style={
                                      this.populationPercentage(country)
                                        .populationPercentage2 > 5
                                        ? { color: "white" }
                                        : {
                                            bottom: this.populationPercentage(
                                              country
                                            ).height,
                                            color: "#6c757d"
                                          }
                                    }
                                  >
                                    <span className="percentage">
                                      {
                                        this.populationPercentage(country)
                                          .populationPercentage
                                      }
                                      %
                                    </span>
                                  </div>
                                </div>
                              </div>
                            ))
                          : null}
                      </div>
                    </div>
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
