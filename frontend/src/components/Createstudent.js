import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Swal from 'sweetalert2';
import 'bootstrap/dist/css/bootstrap.min.css';

const Createstudent = () => {
  const [studentData, setStudentData] = useState({
    studentName: "",
    phoneNumber: "",
    dateOfBirth: "",
    email: "",
    city: "",
    pinCode: "",
    state: "",
    address: "",
    course: "",
    gender: "",
  });
  const [showErrors, setShowErrors] = useState(false);
  const [showNumErr, setshowNumErr] = useState(false);
  const [showEmail, setShowErrEmail] = useState(false);
  const [nameError, setNameError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');

  const navigate = useNavigate();

  const handleEmailChange = (name, value) => {
    const valid = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/.test(value)

    if (valid) {

      setShowErrEmail(false)
      setStudentData({ ...studentData, [name]: value });
    } else {
      setShowErrEmail(true)
      setStudentData({ ...studentData, [name]: value });

    }
    if (value.length === 0) {
      setShowErrEmail(false)
    }
    // console.log(valid)
  }


  const handleNameChange = (name, value) => {
    const valid = /^[a-zA-Z ]{0,30}$/.test(value);
    if (valid) {
      setShowErrors(false);
      setStudentData({ ...studentData, [name]: value });
      setNameError('');
    } else {
      setShowErrors(true);
      setNameError('Only alphabetic characters are allowed');
    }
  };

  const handleNumChange = (name, value) => {

    const numisValid = /^[1-9][0-9]{9}$/.test(value)
    const onlyNumber = /^[0-9]*$/.test(value)
    // console.log(numisValid)
    if (!numisValid && !onlyNumber) {
      setshowNumErr(true)
    } else if (onlyNumber && value.length <= 10 && value[0] !== '0') {
      setshowNumErr(false)
      setStudentData({ ...studentData, [name]: value });
    }

  }

  const handleCityChange = (name, value) => {
    const valid = /^[a-zA-Z ]{0,30}$/.test(value);
    if (valid) {
      setCityError('');
      setStudentData({ ...studentData, [name]: value });
    } else {
      setCityError('Only alphabetic characters are allowed');
    }
  };

  const handleStateChange = (name, value) => {
    const valid = /^[a-zA-Z ]{0,30}$/.test(value);
    if (valid) {
      setStateError('');
      setStudentData({ ...studentData, [name]: value });
    } else {
      setStateError('Only alphabetic characters are allowed');
    }
  };

  const handlePinCodeChange = (name, value) => {
    // Check if the entered value has a length of 6 or less
    if (value.length <= 6) {
      setStudentData({ ...studentData, [name]: value });
    } else {
      alert("PinCode should not be more than 6 characters.");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "studentName":
        handleNameChange(name, value);
        break; // Add this break statement
      case "phoneNumber":
        handleNumChange(name, value);
        break; // Add this break statement
      case "email":
        handleEmailChange(name, value);
        break; // Add this break statement
      default:
        setStudentData({ ...studentData, [name]: value });
    }
  };







  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8080/student", studentData)
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: "Student " + response.data.studentName + " Created Successfully",
        });
        navigate('/students');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: "Error in creating student - " + error.response.data,
        });
      });
  };

  return (
    <div>
      <Navbar />
      <section className='' style={{ backgroundColor: '#eee' }}>
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black p-0 m-5" style={{ borderRadius: 25 }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Create Student
                      </p>
                      <div className="d-flex justify-content-center mx-4 mb-3">
                        <Link to="/students">
                          <button type="button" className="btn btn-primary mx-auto">
                            View Student List
                          </button>
                        </Link>
                      </div>
                      <form className="mx-1 mx-md-4" onSubmit={handleSubmit}>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="studentName">
                              Student Name
                            </label>
                            <input
                              type="text"
                              name="studentName"
                              value={studentData.studentName}
                              onChange={(e) => handleNameChange(e.target.name, e.target.value)}
                              className="form-control"
                              required
                            />
                            {showErrors && (
                              <small className="form-text text-danger">
                                {nameError}
                              </small>
                            )}

                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-phone fa-lg me-3 mt-3 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="phoneNumber">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              name="phoneNumber"
                              value={studentData.phoneNumber}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                            {showNumErr && <small className="form-text text-danger">Number should be not more than 10 digits</small>}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-venus-mars fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="gender">
                              Gender
                            </label>
                            <select
                              name="gender"
                              value={studentData.gender}
                              onChange={handleChange}
                              className="form-select"
                              required
                            >
                              <option value="" disabled>Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-calendar fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="dateOfBirth">
                              Date of Birth
                            </label>
                            <input
                              type="date"
                              name="dateOfBirth"
                              value={studentData.dateOfBirth}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="email" />
                            Email
                            <input
                              type="email"
                              name="email"
                              value={studentData.email}
                              onChange={handleChange}
                              className="form-control"
                              required
                            />
                            
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-map-marker-alt fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="city">
                              City
                            </label>
                            <input
                              type="text"
                              name="city"
                              value={studentData.city}
                              onChange={(e) => handleCityChange(e.target.name, e.target.value)}
                              className="form-control"
                              required
                            />
                            {cityError && (
                              <small className="form-text text-danger">
                                {cityError}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-map-pin fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="pinCode">
                              PinCode
                            </label>
                            <input
                              type="number"
                              name="pinCode"
                              value={studentData.pinCode}
                              onChange={(e) => handlePinCodeChange(e.target.name, e.target.value)}

                              className="form-control"
                              required
                              maxLength="6"
                            />
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-flag fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="state">
                              State
                            </label>
                            <input
                              type="text"
                              name="state"
                              value={studentData.state}
                              onChange={(e) => handleStateChange(e.target.name, e.target.value)}
                              className="form-control"
                              required
                            />
                            {stateError && (
                              <small className="form-text text-danger">
                                {stateError}
                              </small>
                            )}
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-home fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="address">
                              Address
                            </label>
                            <textarea
                              name="address"
                              value={studentData.address}
                              onChange={handleChange}
                              className="form-control"
                              required
                            ></textarea>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-book fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="course">
                              Course
                            </label>
                            <select
                              name="course"
                              value={studentData.course}
                              onChange={handleChange}
                              className="form-select"
                              required
                            >
                              <option value="" disabled>Select Course</option>
                              <option value="B.tech(AI&DS)">B.tech(AI&DS)</option>
                              <option value="B.tech(AI&ML)">B.tech(AI&ML)</option>
                              <option value="B.tech(CSE)">B.tech(CSE)</option>
                              <option value="B.com">B.com</option>
                            </select>
                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-auto mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary">
                            Submit
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
      </section>
    </div>
  );
};

export default Createstudent;
