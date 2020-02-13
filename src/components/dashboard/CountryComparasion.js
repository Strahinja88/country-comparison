import React from "react";

import "./dashboard.css";

export default function CountryComparasion({
  selected,
  mostPopulated,
  leastPopulated,
  difference
}) {
  return (
    <div className="col-md-7 info">
      {selected ? (
        <div className="d-flex flex-column justify-content-around info-wrapper">
          <p>
            Most populated country is: <strong>{mostPopulated.name}</strong>{" "}
            with{" "}
            <strong>
              {mostPopulated.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </strong>{" "}
            inhabitants.
          </p>

          <p>
            Most least populated country is:{" "}
            <strong>{leastPopulated.name}</strong> with{" "}
            <strong>
              {leastPopulated.population
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </strong>{" "}
            inhabitants.
          </p>

          <p>
            Difference of population is:{" "}
            <strong>
              {difference.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            </strong>{" "}
            inhabitants.
          </p>
        </div>
      ) : (
        <strong>You have not selected countries yet.</strong>
      )}
    </div>
  );
}
