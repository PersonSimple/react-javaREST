import React, { useState } from 'react';
import './style1.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
    const location = useLocation()
    const { studentName, studentId, state, pinCode, phoneNumber, email, dateOfBirth, address, age, city, course } = location.state
    return (
        <div>
            <Navbar />

            <div className="page-content page-container" id="page-content">
                <div className="padding">
                    <div className="row container d-flex justify-content-center">
                        <div className="col-xl-6 col-md-12">
                            <div className="card user-card-full">
                                <div className="row m-l-0 m-r-0">
                                    <div className="col-sm-4 bg-c-lite-green user-profile">
                                        <div className="card-block text-center text-white">
                                            <div className="m-b-25">
                                                <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile-Image" />
                                            </div>
                                            <h6 className="f-w-600">{studentName}</h6>
                                            <p>{city}</p>
                                            <i className=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div className="col-sm-8">
                                        <div className="card-block">
                                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Student Panel</h6>
                                            <div className="row">
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Id</p>
                                                    <h6 className="text-muted f-w-400">{studentId}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Email</p>
                                                    <h6 className="text-muted f-w-400">{email}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Phone Number</p>
                                                    <h6 className="text-muted f-w-400">{phoneNumber}</h6>
                                                </div>
                                            </div>
                                            <h6 className="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">{course}</h6>
                                            <div className="row">

                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Address</p>
                                                    <h6 className="text-muted f-w-400">{address}</h6>
                                                </div>
                                            </div>
                                            <div className="row ">
                                                <div className="col-sm-6 ">
                                                    <p className="m-b-10 f-w-600">PinCode</p>
                                                    <h6 className="text-muted f-w-400">{pinCode}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">State</p>
                                                    <h6 className="text-muted f-w-400">{state}</h6>
                                                </div>
                                                <div className="col-sm-6">
                                                    <p className="m-b-10 f-w-600">Date Of Birth</p>
                                                    <h6 className="text-muted f-w-400">{dateOfBirth}</h6>
                                                </div>
                                            </div>

                                            <ul className="social-link list-unstyled m-t-40 m-b-10">
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i className="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i className="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i className="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default Profile;
