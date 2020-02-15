import React from "react";

import "./dashboard.css";

export default function CountryChart({
  selected,
  selectedCountries,
  scaleCalc,
  populationPercentage
}) {
  let percentage = 5;
  if (selected) {
    if (scaleCalc().length <= 7) percentage = 7;
  }

  return (
    <div className="col-12 mt-5 pb-3 country-chart">
      <ul className="d-flex justify-content-around p-lg-5 ml-sm-5">
        {selected ? (
          selectedCountries.map(country => (
            <li key={country.name} className="d-flex">
              <div className="square"></div>
              <p className="text-muted">{country.name}</p>
            </li>
          ))
        ) : (
          <strong>You have not selected countries yet.</strong>
        )}
      </ul>
      <div className="row">
        <div className="col-md-2 col-3 d-flex flex-column justify-content-end scale-wrapper">
          <div className="scale">
            <ul>
              {selected
                ? scaleCalc().map((n, index) => (
                    <li key={index}>
                      <span>
                        {n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        &#x2012;
                      </span>
                    </li>
                  ))
                : null}
            </ul>
          </div>
        </div>
        <div className="col-md-10 col-9 d-flex flex-column justify-content-end chart">
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
                        height: populationPercentage(country).height
                      }}
                    >
                      <div
                        className="percentage-wrapper"
                        style={
                          populationPercentage(country).populationPercentage2 >
                          percentage
                            ? { color: "white" }
                            : {
                                bottom: populationPercentage(country).height,
                                color: "#6c757d"
                              }
                        }
                      >
                        <span className="percentage">
                          {populationPercentage(country).populationPercentage}%
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
  );
}
