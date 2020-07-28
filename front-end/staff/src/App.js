import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";

function App() {
  const initials = {
    staff_id: "",
    FirstName: "",
    LastName: "",
    Designation: "",
    employment_type: "",
    email: "",
    dob: "",
  };
  const [values, setValues] = useState(initials);

  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5003/api/staffs/add", values)
    .then(res=>{

      console.log(res)
    })
    .catch(error => {
      console.log(error.response);
    });
    
  };
  return (
    <div className="App">
      <br />
      <input
        onChange={handleChange}
        name="staff_id"
        value={values.staff_id}
        placeholder="Employee ID"
      />
      <input
        onChange={handleChange}
        name="FirstName"
        value={values.FirstName}
        placeholder="First Name"
      />
      <input
        name="LastName"
        value={values.LastName}
        placeholder="Last Name"
        onChange={handleChange}
      />

      <select
        name="Designation"
        value={values.Designation}
        onChange={handleChange}
      >
        <option value="IT">IT</option>
        <option value="FULL STACK">FULL STACK</option>
        <option value="REACT">REACT</option>
        <option value="OPERATIONS">OPERATIONS</option>
      </select>
      <br />
      <br />
      <input
        onChange={handleChange}
        name="employment_type"
        value={values.employment_type}
        placeholder="Employment Type"
      />
      <input
        onChange={handleChange}
        name="email"
        type="email"
        value={values.email}
        placeholder="email"
      />
      <input
        onChange={handleChange}
        name="dob"
        type="date"
        value={values.dob}
        placeholder="Date of Birth"
      />
      <button onClick={handleSubmit}>Add staff</button>

      
    </div>
  );
}

export default App;
