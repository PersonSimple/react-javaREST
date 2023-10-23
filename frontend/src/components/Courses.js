
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import './style1.css';
import Swal from 'sweetalert2';
import Navbar from './Navbar';
import CreateCourse from './CreateCourse';
import { Link } from 'react-router-dom';

const Courses = () => {
  const [data, setData] = useState([]);

  function getData() {
    axios.get("http://localhost:8080/course")
      .then((res) => {
        console.log(res.data);
        const tdata = res.data.filter(course => course.status === 1);
        setData(tdata);
      })
      .catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data,
        });
      });
  }

  function handleDelete(courseId) {
    console.log(courseId);
    axios.delete("http://localhost:8080/course/" + courseId)
      .then(() => {
        getData();
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Course deleted !!',
        });
      })
      .catch(e => {
        console.log(e);
        Swal.fire({
          icon: 'error',
          title: 'error',
          text: e.message,
        });
      });
  }

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="row">
        <div className="col col-9 mx-auto mt-5">
          <div className="read-student-heading">
          <div className="row">
          <div className='col d-flex flex-row text-center align-items-center justify-content-center'>
                <h2>Courses</h2>
                <CreateCourse getData={getData} /> {/* Use your CreateCourse component */}
              </div>
            </div>
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Course ID</th>
                <th>Course Name</th>
                <th>Department</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map(course => (
                <tr key={course.courseId}>
                  <td style={{ fontWeight: 'bold' }}>{course.courseId}</td>
                  <td style={{ fontWeight: 'bold' }}>{course.courseName}</td>
                  <td style={{ fontWeight: 'bold' }}>{course.courseDescription}</td>
                  <td>
                    <button className="btn btn-warning" title='Delete Course' onClick={() => handleDelete(course.courseId)}>
                      <i className="fa-solid fa-trash"></i>
                    </button>
                    <Link to={"/UpdateCourse"} state={course}>
                      <button className="btn btn-info "title='Update Course' >
                        <i class="fa-regular fa-pen-to-square"></i>
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Courses;