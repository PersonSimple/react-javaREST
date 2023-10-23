import axios from 'axios';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Swal from 'sweetalert2';

const Updatestudent = () => {
  const location = useLocation();

  const [id, setStudentId] = useState(location.state.studentId);
  const [studentname, setStudentName] = useState(location.state.studentName);
  const [dateOfBirth, setDateOfBirth] = useState(location.state.dateOfBirth);
  const [address, setAddress] = useState(location.state.address);
  const [showErrNum, setShowErrNum] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(location.state.phoneNumber);
  const [course, setCourseName] = useState(location.state.course);
  const [email, setEmail] = useState(location.state.email);
  const [city, setCity] = useState(location.state.city);
  const [pinCode, setPincode] = useState(location.state.pinCode);
  const [state, setState] = useState(location.state.state);
  const [gender, setGender] = useState(location.state.gender);
  const [nameError, setNameError] = useState('');
  const [pinCodeError, setPinCodeError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');

  const navigate = useNavigate();

  const handleNumChange = (e) => {
    const num = e.target.value;
    const numIsValid = /^[1-9][0-9]{9}$/.test(num);
    const onlyNumber = /^[0-9]*$/.test(num);
    if (!numIsValid && !onlyNumber) {
      setShowErrNum(true);
    } else if (onlyNumber && num.length <= 10 && num[0] !== '0') {
      setShowErrNum(false);
      setPhoneNumber(num);
    }
  };

  const handleCityChange = (e) => {
    const cityInput = e.target.value;
    if (/[^a-zA-Z ]/.test(cityInput)) {
      setCityError('Only alphabetic characters are allowed');
    } else {
      setCityError('');
      setCity(cityInput);
    }
  };

  const handleStateChange = (e) => {
    const stateInput = e.target.value;
    if (/[^a-zA-Z ]/.test(stateInput)) {
      setStateError('Only alphabetic characters are allowed');
    } else {
      setStateError('');
      setState(stateInput);
    }
  };
  const handleNameChange = (e) => {
    const name = e.target.value;
    if (/[^a-zA-Z ]/.test(name)) {
      setNameError('Only alphabetic characters are allowed');
    } else {
      setNameError('');
      setStudentName(name);
    }
  };
  const handlePinCodeChange = (e) => {
    const pinCodeInput = e.target.value;
    if (pinCodeInput.length <= 6) {
      setPinCodeError('');
      setPincode(pinCodeInput);
    } else {
      setPinCodeError('Pin code should be exactly 6 digits');
    }
  };





  const handleUpdate = (e) => {
    console.log(id);
    e.preventDefault();
    axios
      .put("http://localhost:8080/student/" + id, {
        studentName: studentname,
        phoneNumber: phoneNumber,
        dateOfBirth: dateOfBirth,
        address: address,
        course: course,
        email: email,
        city: city,
        pinCode: pinCode,
        state: state,
        gender: gender,
      })
      .then((response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: response.data,
        });
        navigate('/students');
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data,
        });
      });
  };

  return (
    <div>
      <Navbar />
      <section className="" style={{ backgroundColor: '#eee', minHeight: '100vh' }}>
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black p-0 m-5 " style={{ borderRadius: 25 }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        UPDATE STUDENT
                      </p>
                      <form className="mx-1 mx-md-4" onSubmit={handleUpdate}>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-user fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example3c">
                              Student Name
                            </label>
                            <input
                              required
                              type="text"
                              name="studentname"
                              value={studentname}
                              onInput={handleNameChange}
                              className="form-control"
                            />
                            {nameError && (
                              <small className="form-text text-danger">
                                {nameError}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 mt-5 fa-fw" />
                          <div className="flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4c">
                              Phone Number
                            </label>
                            <input
                              type="number"
                              required
                              value={phoneNumber}
                              className="form-control"
                              onChange={handleNumChange}
                            />
                            {showErrNum && (
                              <small className="form-text text-danger">
                                It should contain numbers only
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-3">
                          <i className="fa-solid fa-calendar-days fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="row">
                            <div className="col-6">
                              <label className="form-label" htmlFor="form3Example4c">
                                D.O.B
                              </label>
                              <input
                                type="date"
                                required
                                value={dateOfBirth}
                                className="form-control"
                                onChange={(e) => setDateOfBirth(e.target.value)}
                              />
                            </div>
                            <div className="col-6">
                              <div className="form-group">
                                <label className="form-label">Course</label>
                                <select
                                  class="form-select"
                                  onChange={(e) => setCourseName(e.target.value)}
                                  value={course}
                                  aria-label="Default select example"
                                >
                                  <option value="" disabled>
                                    Select Course
                                  </option>
                                  <option value="B.tech(AI&DS)">B.tech(AI&DS)</option>
                                  <option value="B.tech(AI&ML)">B.tech(AI&ML)</option>
                                  <option value="B.tech(CSE)">B.tech(CSE)</option>
                                  <option value="B.com">B.com</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="row">
                          <div className="d-flex flex-row align-items-center mb-3">
                            <i className="fa-solid fa-home   fa-lg me-3 mt-3 fa-fw"></i>
                            <div className="form-group flex-fill mb-0">
                              <label className="m-1 mt-3">Address</label>
                              <textarea
                                value={address}
                                className="form-control"
                                placeholder="Address"
                                onChange={(e) => setAddress(e.target.value)}
                              ></textarea>
                              <small className="form-text text-muted">
                                (Not more than 10 words)
                              </small>
                            </div>
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fa-solid fa-venus-mars fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="gender">
                              Gender
                            </label>
                            <select
                              name="gender"
                              value={gender}
                              onChange={(e) => setGender(e.target.value)}
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
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-envelope fa-lg me-3 mt-5 fa-fw" />
                          <div className="flex-fill mb-0">
                            <label className="form-label" htmlFor="email">
                              Email
                            </label>
                            <input
                              type="email"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-city fa-lg me-3 mt-5 fa-fw" />
                          <div className="flex-fill mb-0">
                            <label className="form-label" htmlFor="city">
                              City
                            </label>
                            <input
                              type="text"
                              value={city}
                              onChange={handleCityChange}
                              className="form-control"
                            />
                            {cityError && (
                              <small className="form-text text-danger">
                                {cityError}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-map fa-lg me-3 mt-5 fa-fw" />
                          <div className="flex-fill mb-0">
                            <label className="form-label" htmlFor="state">
                              State
                            </label>
                            <input
                              type="text"
                              value={state}
                              onChange={handleStateChange}
                              className="form-control"
                            />
                            {stateError && (
                              <small className="form-text text-danger">
                                {stateError}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-2">
                          <i className="fas fa-map-pin fa-lg me-3 mt-5 fa-fw"></i>
                          <div className="flex-fill mb-0">
                            <label className="form-label mb-0" htmlFor="pinCode">
                              Pincode
                            </label>
                            <input
                              type="number"
                              name="pinCode"
                              value={pinCode}
                              onChange={handlePinCodeChange}
                              className="form-control"
                              required
                            />
                            {pinCodeError && (
                              <small className="form-text text-danger">
                                {pinCodeError}
                              </small>
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary">
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
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

export default Updatestudent;

