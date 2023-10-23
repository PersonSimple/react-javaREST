import React, { useEffect, useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./css/List.css";
import {
  fetchCoursesAsync,
  selectCourses,
} from "../features/course/courseSlice";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import style from "./css/custom.module.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
export default function CoursesList() {
  const column = ["ID", "Course Name", "Course Id", "Description", "Action"];
  const dispatch = useDispatch();
  const records = useSelector(selectCourses);
  const navigate = useNavigate();
  const handleRemove = async (e, id) => {
    e.preventDefault();

    const response = await fetch(
      "http://localhost:8082/course/deletecourse/" + id,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );
    dispatch(fetchCoursesAsync());
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

  useEffect(() => {
    dispatch(fetchCoursesAsync());
  }, [dispatch]);
  return (
    <>
      {" "}
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="">
            <div className="heading">Course List</div>
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
                  {records.map(
                    (record, i) =>
                      record.status === true && (
                        <tr key={i}>
                          <td>{i + 1}</td>
                          <td>{record.courseName}</td>
                          <td>{record.courseId}</td>
                          <td>{record.courseDetail}</td>
                          <td>
                            <div
                              className="btn1"
                              onClick={() => {
                                navigate(`/CourseEdit/${record.id}`);
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
                      )
                  )}
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
