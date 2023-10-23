import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const Signup = () => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCpassword] = useState('');

  const handleName = (e) => {
    setName(e.target.value);
  }
  const handlePassword = (e) => {
    const newPassword = e.target.value;
    // Validate the password: should be <= 8 characters
    if (newPassword.length <= 8) {
      setPassword(newPassword);
    }
  }

  const handleCpassword = (e) => {
    setCpassword(e.target.value);
  }

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");

    if (password !== cpassword) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Passwords do not match. Please re-enter the passwords.'
      });
    } else {
      axios.post("http://localhost:8080/user/registration", {
        username: name,
        password: password
      })
        .then((response) => {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: response.data,
          });
          navigate('/login');
        })
        .catch((error) => {
          // Handle errors here
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.response.data,
          });
        });
    }
  };

  return (
    <div>
      <section className="" style={{ backgroundColor: "#eee" }}>
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black p-0 m-5" style={{ borderRadius: 25 }} >
                <div className="card-body">
                  <div className="row justify-content-center flex-row-reverse">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>
                      <form className="mx-1 mx-md-4" >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 mt-5 fa-fw" />
                          <div className="flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example1c">
                              User Name
                            </label>
                            <input

                              type="email"
                              id="name"
                              value={name}
                              onChange={handleName}
                              className="form-control"
                              required
                            />

                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 mt-5 fa-fw" />
                          <div className=" flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4c">
                              Create Password
                            </label>
                            <input
                              type="password"
                              id="password"
                              onChange={handlePassword}
                              value={password}
                              className="form-control"
                              required
                            />

                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 mt-5 fa-fw" />
                          <div className=" flex-fill mb-0">
                            <label className="form-label" htmlFor="form3Example4cd">
                              Confirm your password
                            </label>
                            <input
                              type="password"
                              id="form3Example4cd"
                              onChange={handleCpassword}
                              className="form-control"
                              value={cpassword}
                              required
                            />

                          </div>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>

                            Register
                          </button>
                        </div>
                      </form>
                      <p className="text-center text-muted mt-5 mb-0">
                        Have already an account?{" "}
                        <Link to="/login" className="fw-bold text-body">
                          <u>Login here</u>
                        </Link>
                      </p>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img src="data:image/png;base64,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"
                        className="img-fluid"
                        alt="Lets sign up"
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
  )
}

export default Signup;
