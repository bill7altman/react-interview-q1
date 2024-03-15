import React, { useState, useEffect } from "react";
import { isNameValid, getLocations } from "../../mock-api/apis"; // Import the mock API functions
import "./FormComponent.scss"; // Import the SCSS file for styles

const FormComponent = () => {
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [locations, setLocations] = useState([]);
  const [validationMessage, setValidationMessage] = useState("");
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    getLocations().then((result) => {
      setLocations(result);
      setLocation(result[0]);
    });
  }, []);

  useEffect(() => {
    const validate = async () => {
      const isValid = await isNameValid(name);
      setValidationMessage(isValid ? "" : "This name has already been taken");
    };

    if (name) {
      validate();
    }
  }, [name]);

  const handleAdd = () => {
    if (!name) {
      setValidationMessage("This name cannot be empty");
      return;
    }
    if (validationMessage) return;
    setTableData([...tableData, { name, location }]);
  };

  const handleClear = () => {
    setTableData([]);
  };

  return (
    <div className="form-component">
      <div className="form-field">
        <label>Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={validationMessage ? "invalid" : ""}
        />
        <div className="validation-message">{validationMessage}</div>
      </div>
      <div className="form-field">
        <label>Location</label>
        <select
          defaultValue={location}
          onChange={(e) => setLocation(e.target.value)}
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="buttons">
        <button onClick={handleClear}>Clear</button>
        <button onClick={handleAdd}>Add</button>
      </div>
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, index) => (
            <tr key={index}>
              <td>{row.name}</td>
              <td>{row.location}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FormComponent;
