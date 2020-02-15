import React from "react";

import "./dashboard.css";

export default function CountryList({
  countries,
  filtered,
  searched,
  toggleCheckbox,
  compareCountries,
  compareError,
  checkboxes,
  isDisabled,
  onSearch
}) {
  return (
    <div className="col-md-5 pt-3 list">
      <h4 className="text-center pb-2">
        <strong>Country List</strong>
      </h4>

      <div>
        <div className="my-2">
          <input
            className="form-control search-input"
            type="search"
            placeholder="&#x1F50D; Search"
            onChange={onSearch}
            value={searched}
          />

          <ul className="country-list">
            {countries.filter(filtered(searched)).map(country => (
              <li key={country.name}>
                <div className="form-check form-check-inline">
                  <input
                    className="form-check-input checkmark"
                    type="checkbox"
                    name="checkbox"
                    id={country.name.toString()}
                    value={country.name}
                    onChange={() => toggleCheckbox(country)}
                    disabled={checkboxes.includes(country) ? false : isDisabled}
                  />
                  <label htmlFor={country.name}>{country.name}</label>
                </div>
              </li>
            ))}
          </ul>

          <div className="d-flex flex-column align-items-center">
            <a
              onClick={compareCountries}
              className="btn btn-info btn-lg compare-btn"
            >
              Compare
            </a>
            <br></br>
            <strong>{compareError}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
