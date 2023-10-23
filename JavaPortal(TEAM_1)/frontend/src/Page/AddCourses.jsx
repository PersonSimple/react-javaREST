import React, { useState } from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// http://localhost:8082/course/savecourse
export default function AddCourses() {
  const [error, setError] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  async function insertData(courseData) {
   
      let data3 = {
        courseName: courseData.CourseName,
        courseId: courseData.CourseId,
        courseDetail: courseData.CourseDescription,
      };      

      const response = await fetch("http://localhost:8082/course/savecourse", {
        method: "POST",
        body: JSON.stringify(data3),
        headers: { "content-type": "application/json" },
      });

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
          toast.error("Course with given Course ID already Exist", {
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
    
  }

  async function handleButtonClick(courseData) {
    setError(null); // Clear any previous errors
    try {
      const data = await insertData(courseData);
   
      if (data) {
        toast.success("Course Created Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setValue("CourseDescription", "");
        setValue("CourseName", "");
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
    <Box sx={{display:'flex'}}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <Typography variant="h5">
            <div className="center">
            <form
              className="form"
              onSubmit={handleSubmit((data) => {
                handleButtonClick(data);
              })}
            >
              <p className="title">Course form </p>
              {/* <p className="message">Student Registration form </p> */}
              <div className="flex">
                <label>
                  Course Name :
                  <input
                    placeholder="Course name"
                    type="text"
                    className="input"
                    id="CourseName"
                    minLength={1}
                    maxLength={50}
                    {...register("CourseName", {
                      required:
                        "Course Name is required",
                    })}
                  />
                </label>
                {errors.CourseName && (
                  <p className="text-red-400">{errors.CourseName.message}</p>
                )}
           
              </div>
              <div>
                <label>
                   Course Id :
                  <input
                    placeholder="CourseId"
                    type="number"
                    className="input"
                    id="CourseId"
                    minLength={3}
                    maxLength={10}
                    min={0}
                    max={1000000}
                    {...register("CourseId", {
                      required: "CourseId  is required",
                      pattern: {
                        pattern: /^[0-9]{10}$/,
                        message: "CourseId cannot exceed ten characters",
                      },
                    })}
                  />
               
                </label>
                {errors.CourseId && (
                  <p className="text-red-400">{errors.CourseId.message}</p>
                )}
                {errors.CourseId &&
                  errors.CourseId.type === "max" && (
                    <span role="text-red-400">
                    Course ID must contian 10 characters
                    </span>
                  )}
              </div>
            
           
              
              <div>
                <label>
                  Course Description :
                  <textarea
                    id="CourseDescription"
                    placeholder="Short description about course"
                    type="textarea"
                    className="input"
                    rows={5}
                    cols={50}
                    maxLength={70}
                    {...register("CourseDescription", {
                      required: "Course Description is required",
                    })}
                  />
         
                </label>
                {errors.CourseDescription && (
                  <p className="text-red-400">{errors.CourseDescription.message}</p>
                )}
              </div>
              {error && (
                  <div>
                    <p className="text-red-400">{error.message}</p>
                  </div>
                )}
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
      <ToastContainer/>
    </>
  )
}
