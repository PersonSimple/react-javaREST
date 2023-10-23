import React, { useEffect } from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCourseByIdAsync, selectCourseById, updateCourseByIdAsync } from '../features/course/courseSlice';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CourseListEdit = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const navigate=useNavigate();
  const params=useParams();
  const dispatch=useDispatch();
  const selectedCourse=useSelector(selectCourseById);
  useEffect(() => {
    dispatch(fetchCourseByIdAsync(params.id))
  }, [dispatch,params])

  useEffect(() => {
    if (selectedCourse && params.id) {
      setValue("courseName",selectedCourse.courseName );
      setValue("courseId", selectedCourse.courseId);
      setValue("courseDetail", selectedCourse.courseDetail);
    }
  }, [selectedCourse, params.id, setValue]);
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
                let id=params.id
                 dispatch(updateCourseByIdAsync({data,id}));
                 toast.success("Course Updated Successfully", {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "light",
                });
              })}
            >
              <p className="title">Edit Course </p>
       
              <div className="flex">
                <label>
                  Course name :
                  <input
                    placeholder="Course name"
                    type="text"
                    className="input"
                    id="courseName"
                    {...register("courseName", {
                      required:
                        "Course Name is required",
                    })}
                  />
                </label>
                {errors.courseName && (
                  <p className="text-red-400">{errors.courseName.message}</p>
                )}
              
              </div>
              <div>
                <label>
                   CourseId:
                  <input
                    placeholder="CourseId"
                    type="number"
                    className="input"
                    id="courseId"
                    minLength={3}
                    maxLength={10}
                    {...register("courseId", {
                      required: "CourseId  is required",
                      pattern: {
                        pattern: /^[0-9]{10}$/,
                        message: "CourseId cannot exceed ten characters",
                      },
                    })}
                  />
               
                </label>
                {errors.courseId && (
                  <p className="text-red-400">{errors.courseId.message}</p>
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
                  Course Description:
                  <textarea
                    id="courseDetail"
                    placeholder="Short description about course"
                    type="textarea"
                    className="input"
                    rows={4}
                    cols={50}
                    maxLength={50}
                    {...register("courseDetail", {
                      required: "Course Description is required",
                    })}
                  />
               
                </label>
                {errors.courseDetail && (
                  <p className="text-red-400">{errors.courseDetail.message}</p>
                )}
              </div>
            
              <div className="button-container">
                <button type="reset" className="reset" value="Reset" onClick={()=>{navigate(`/CourseList`)}}>
                  Cancel
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

export default CourseListEdit