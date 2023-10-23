import React, { useEffect, useState } from "react";
import SideBar from "../Component/SideBar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./css/StudentForm.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCoursesAsync,
  selectCourses,
} from "../features/course/courseSlice";
export default function AddStudent() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const courseList = useSelector(selectCourses);

  useEffect(() => {
    dispatch(fetchCoursesAsync());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function insertData(studentData) {
    try {
      let data2 = {
        studentName: studentData.StudentName,
        dateOfBirth: studentData.DateOfBirth,
        email: studentData.Email,
        mobileNumber: studentData.MobileNumber,
        address: studentData.Address,
        city: studentData.City,
        courseId: studentData.CourseId,
      };

      const response = await fetch(
        "http://localhost:8082/student/savestudent",
        {
          method: "POST",
          body: JSON.stringify(data2),
          headers: { "content-type": "application/json" },
        }
      );

      if (!response.ok) {
        let message = response.statusText;

        if (message === "Not Found") {
          toast.error("Ineternal server Error", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          throw new Error("Internal Server error");
        } else {
          toast.error(message, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          throw new Error(message);
        }
      }

      const data = await response.json();
  
      return data;
    } catch (error) {
   
      setError(error);
    }
  }

  async function handleButtonClick(studentData) {
    setError(null); // Clear any previous errors
    try {
      const data = await insertData(studentData);
      if (data) {
        toast.success("Student Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setValue("StudentName", "");
        setValue("MobileNumber", "");
        setValue("DateOfBirth", "");
        setValue("Email", "");
        setValue("City", "");
        setValue("CourseId", "");
      }
    } catch (error) {
    
      toast(error, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setError(error);
    }
  }

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <SideBar />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "55px" }}>
          <Typography variant="h6">
            <div className="center">
              <form
                className="form"
                onSubmit={handleSubmit((data) => {
                  handleButtonClick(data);
                })}
              >
                <p className="title">Student form </p>
                {/* <p className="message">Student Registration form </p> */}
                <div className="flex">
                  <label>
                    Full name :
                    <input
                      placeholder="full name"
                      type="text"
                      className="input"
                      id="StudentName"
                      maxLength={30}
                      {...register("StudentName", {
                        required:
                          "-Full Name is required \n - Cannot exceed 30 characters",

                        // pattern: {
                        //   value:
                        //     /^(?:([a-zA-Z]{2,4}\.){0,1} ?([a-zA-Z]{2,24})) ([a-zA-Z]{1,1}\. ){0,1}([a-zA-Z]{2,24} ){0,2}([A-Za-z']{2,24})((?:, ([a-zA-Z]{2,5}\.?)){0,4}?)$/gim,
                        //   message: `Start with capital letter must contain surname/middlename`,
                        // },
                      })}
                    />
                  </label>
                  {errors.StudentName && (
                    <p className="text-red-400">{errors.StudentName.message}</p>
                  )}
                  {/* <label>
                 <input required="" placeholder="" type="text" className="input" />
                   <span>Lastname</span>
                         </label> */}
                </div>
                <div>
                  <label>
                    Mobile no :
                    <input
                      placeholder="XXXXXXXXXX"
                      type="tel"
                      className="input"
                      id="MobileNumber"
                      minLength={10}
                      maxLength={13}
                      {...register("MobileNumber", {
                        required: "Mobile Number  is required",
                        pattern: {
                          pattern: /^[0-9]{10}$/,
                          message: "Number cannot exceed ten characters",
                        },
                      })}
                    />
                    {/* <span></span> */}
                  </label>
                  {errors.MobileNumber && (
                    <p className="text-red-400">
                      {errors.MobileNumber.message}
                    </p>
                  )}
                  {errors.MobileNumber &&
                    errors.MobileNumber.type === "minLength" && (
                      <span role="text-red-400">
                        Phone Number must contian 10 characters
                      </span>
                    )}
                </div>
                <div>
                  <label>
                    Email :
                    <input
                      id="Email"
                      placeholder="xyz@gmail.com"
                      type="email"
                      className="input"
                      {...register("Email", {
                        required: "Email is required",
                        pattern: {
                          value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                          message: "Email not valid",
                        },
                      })}
                    />
                    {/* <span></span> */}
                  </label>
                  {errors.Email && (
                    <p className="text-red-400">{errors.Email.message}</p>
                  )}
                </div>
                <div>
                  <label>
                    DOB(Date of Birth) :
                    <input
                      id="DateOfBirth"
                      placeholder="DOB"
                      type="date"
                      className="input"
                      {...register("DateOfBirth", {
                        required: "DOB is required",
                      })}
                    />
                    {/* <span></span> */}
                  </label>
                  {errors.DateOfBirth && (
                    <p className="text-red-400">{errors.DateOfBirth.message}</p>
                  )}
                </div>
                <div>
                  <label>
                    City :
                    <input
                      placeholder="City"
                      type="text"
                      className="input"
                      id="City"
                      {...register("City", {
                        required: "City is required",
                      })}
                    />
                    {/* <span></span> */}
                  </label>
                  {errors.City && (
                    <p className="text-red-400">{errors.City.message}</p>
                  )}
                </div>
                <div>
                  <label>
                    Address :
                    <input
                      id="Address"
                      placeholder="Address"
                      type="text"
                      className="input"
                      maxLength={40}
                      {...register("Address", {
                        required: "Address is required",
                      })}
                    />
                    {/* <span></span> */}
                  </label>
                  {errors.Address && (
                    <p className="text-red-400">{errors.Address.message}</p>
                  )}
                </div>

                {error && (
                  <div>
                    <p className="text-red-400">{error.message}</p>
                  </div>
                )}
                <br />
                <div>
                  <label>
                    Select Course :
                    <select
                      className="select-dropdown"
                      {...register("CourseId", {
                        required: "Course  is required",
                      })}
                    >
                      <option value="" defaultChecked>
                        -SELECT-
                      </option>
                      {courseList.map(
                        (course) =>
                          course.status === true && 
                          (
                            <option key={course.id} value={course.courseId}>
                              {course.courseName}
                            </option>
                          )
                      )}
                    </select>
                  </label>
                  {errors.CourseId && (
                    <p className="text-red-400">{errors.CourseId.message}</p>
                  )}
                </div>

                <div className="button-container">
                  <button type="reset" className="reset" value="Reset">
                    Reset
                  </button>

                  <button type="submit" className="submit-2 " value="Submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </Typography>
        </Box>
      </Box>
      <ToastContainer />
    </>
  );
}
