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
  const [data, setData] = useState([]);
  const [status, setStatus] = useState(false);
  const [btnText, setBtnText] = useState("Add Staff");
  const [idUpdate, setIdUpdate]=useState("")
  useEffect(() => {
    axios
      .get("http://localhost:5003/api/staffs/")
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((error) => {
        console.log(error.response);
      });
  }, []);
  const handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    
    if(btnText=="Add Staff"){
      axios
      .post("http://localhost:5003/api/staffs/add", values)
      
      .then((res) => {
        console.log(res.data.data);
        setData(res.data.data);
        setValues(initials);
      })
      .catch((error) => {
        console.log(error.response);
      });
    }
    else{
      axios
      .put(`http://localhost:5003/api/staffs/${idUpdate}`, values)
      
      .then((res) => {
        console.log(res.data);
        setData(res.data.data);
        setValues(initials);
        setBtnText("Add Staff")
      })
      .catch((error) => {
        console.log(error.response);
      });
    }
    };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5003/api/staffs/${id}`)
      .then((res) => {
        console.log(res.data);
        setData(res.data.listing);
      })
      .catch((error) => {
        console.log(error.response);
      });
  };
  const handleUpdate = (id) => {
    axios
      .get(`http://localhost:5003/api/staffs/${id}`)
      .then((res) => {
        console.log(res.data);

        setValues(res.data);
        setIdUpdate(res.data.id)
        setBtnText("Update Record")
      })
      .catch((error) => {
        // console.log(error.response);
      });
  };

  return (
    <div className="App">
      <h2>Enov8Solutions Staff Records</h2>
      <br />
      <div>
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
<label for="Designation" >Designation: </label>
        <select
          name="Designation"
          value={values.Designation}
          onChange={handleChange}
          placeholder="select designation"
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

<label for="dob" >Date of Birth: </label>

        <input
          onChange={handleChange}
          name="dob"
          type="date"
          value={values.dob}
          placeholder="Date of Birth"
        />
        <br />
        <button onClick={handleSubmit}>{btnText}</button>
      </div>
      <br />
      <div>
        <table>
          <tr>
            <th>Staff ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Designation</th>
            <th>Employment Type</th>
            <th>Email</th>
            <th>DOB</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>

          {data.map(function (item, i) {
            return (
              <tr key={item.id}>
                <td>{item.staff_id}</td>
                <td>{item.FirstName}</td>
                <td>{item.LastName}</td>
                <td>{item.Designation}</td>
                <td>{item.employment_type}</td>
                <td>{item.email}</td>
                <td>{item.dob}</td>
                <td>
                  <button onClick={() => handleUpdate(item.id)}>Update</button>
                </td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default App;
