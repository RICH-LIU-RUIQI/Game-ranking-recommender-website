import React from "react";
import numeral from "numeral";

import "./styles/Table.css";

function Table({ countries }) {
  return (
    <div className="table">
      {countries.map(({ region, name }, id) => (
        <tr key={id}>
          <td>{region}</td>
          <td>
            <strong>{name}</strong>
          </td>
        </tr>
      ))}
    </div>
  );
}

export default Table;
