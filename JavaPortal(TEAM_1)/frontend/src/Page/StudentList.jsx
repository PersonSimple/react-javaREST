import React, { useEffect } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./css/List.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchStudentByEmailAsync,
  fetchStudentsAsync,
  selectError,
  selectStudents,
} from "../features/student/studentSlice";
import { FaTrash, FaEdit } from "react-icons/fa";
import style from "./css/custom.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

import SearchIcon from "@mui/icons-material/Search";
import RotateLeftRoundedIcon from "@mui/icons-material/RotateLeftRounded";
import { useForm } from "react-hook-form";
export default function StudentList() {
  const err=useSelector(selectError)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const column = [
    "ID",
    "Full Name",
    "Mobile No:",
    "Email",
    "Course Id",
    "Action",
  ];

  const dispatch = useDispatch();
  const records = useSelector(selectStudents);
  const navigate = useNavigate();
  const handleRemove = async (e, id) => {
    e.preventDefault();
    const response = await fetch(
      "http://localhost:8082/student/deletestudent/" + id,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    dispatch(fetchStudentsAsync());
    toast.success("Deleted successfully", {
      className: style.customtoastsuccess,
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
 
  const handleSearch = (data) => {
     const id=data.search;
     dispatch(fetchStudentByEmailAsync(id))
  };
  const handleSearchReset = () => {
    dispatch(fetchStudentsAsync());
  };
  useEffect(() => {
    dispatch(fetchStudentsAsync());
  }, [dispatch]);
  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="">
            <div className="topnav">
              <form
                onSubmit={handleSubmit((data) => {
                  handleSearch(data);
                })}
              >
                <div className="search-container">
                  <button
                    type="reset"
                    className="bt2"
                    onClick={() => handleSearchReset()}
                  >
                    <RotateLeftRoundedIcon />
                  </button>
                  <input
                    type="email"
                    placeholder="Search Student Via Using Email .........."
                    name="search"
                    className="srch"
                    id="search"
                    {...register("search", {
                      required: "Email is required for searching",
                      pattern: {
                        value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                        message: "Email not valid",
                      },
                    })}
                  />
                  <button type="sumbit" className="bt1">
                    <SearchIcon />
                  </button>
                  {errors.search && (
                    <div>
                    <p className="text-red-300">{errors.search.message}</p>
                    </div>
                  )}
                </div>
              </form>
              {err && (
              <p className="text-red-300">{"User with given email does not exists"}</p>

            )}
            </div>
                          
            <div className="heading">Student List</div>
            <div>
              <table className="table">
                <thead>
                  <tr>
                    {column.map((c, i) => (
                      <th key={i}>{c}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {records.map((record, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>{record.studentName}</td>
                      <td>{record.mobileNumber}</td>
                      <td>{record.email}</td>
                      <td>{record.courseId}</td>
                      <td>
                        <div
                          className="btn1"
                          onClick={() => {
                            navigate(`/StudentEdit/${record.id}`);
                          }}
                        >
                          <FaEdit></FaEdit>
                        </div>
                        <div
                          className="btn2"
                          onClick={(e) => handleRemove(e, record.id)}
                        >
                          <FaTrash></FaTrash>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Typography>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
