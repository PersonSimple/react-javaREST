import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Login () {
  const [data,setData] = useState("");
  const [loading,setLoading] = useState(true);
  const [showErrName,setshowErrName]= useState(false)

  const [formData,setFormData] = useState(
      {
        username: '',
        password: ''
      }
  );

  const handleChange = (e) => {
     const {name, value} = e.target;
     console.log(name,value)
     if(name==='username'){
      const valid = /^[a-zA-Z ]{0,30}$/.test(value)
      console.log(name==='username',valid)
        if (valid) {
            setshowErrName(false)
            setFormData( 
              {
                 ...formData,
                  [name]: value
      
              });
        } else {
             setshowErrName(true)

        }
     } 
     else if (value.length < 20)
     {
      setFormData( 
        {
           ...formData,
            [name]: value

        });
     }
     
    };
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (!username || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Please enter your name and password.',
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'User Logged In Successfully!!',
        });
        navigate('/home');
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Login Failed. Please check your credentials.',
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message,
      });
    }
  };



  return (
    <div>
      <section className="vh-100" style={{ backgroundColor: "#eee", height: '100vh' }}>
        <div className="container h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" style={{ borderRadius: 25 }}>
                <div className="card-body">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Log in
                      </p>
                      <form
                        className="mx-1 mx-md-4"
                        onSubmit={handleSubmit}
                      >
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fa-solid fa-user fa-lg me-3 fa-fw mt-5"></i>
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example3c"
                            >
                              User Name
                            </label>
                            <input
                              placeholder="Enter your name"
                              type="text"
                              name="username"
                              value={formData.username}
                              onChange={handleChange}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw mt-5" />
                          <div className=" flex-fill mb-0">
                            <label
                              className="form-label"
                              htmlFor="form3Example4c"
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              name="password"
                              placeholder="Enter your password"
                              onChange={handleChange}
                              value={formData.password}
                              className="form-control"
                            />
                          </div>
                        </div>
                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="submit"
                            className="btn btn-primary"
                          >
                            Login
                          </button>
                        </div>
                      </form>
                      <p className="text-center text-muted mt-5 mb-0">
                        Not Registered Yet?{" "}
                        <Link to="/signup" className="fw-bold text-body">
                          <u>Register here</u>
                        </Link>
                      </p>
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
}

export default Login;
