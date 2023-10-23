import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style1.css';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

const Students = () => {
  const [data, setData] = useState([]);

  function getData() {
    axios.get("http://localhost:8080/student")
      .then((res) => {
        console.log(res.data);
        const tdata = res.data.filter(stu => stu.status === 1)
        setData(tdata);
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.response.data,
        });
      });

  }

  function handleDelete(studentId) {
    console.log(studentId);
    axios.delete("http://localhost:8080/student/" + studentId)
      .then(() => {
        getData()
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Student deleted !!',
        });
      })
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div>
      <Navbar />
      <div className='row'>
        <div className='col col-9 mx-auto mt-5'>
          <h2 className="read-student-heading">Registered Students</h2>
          <div className='table-responsive'>
            <table className="table datatable" id='excel-table' >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Phone No.</th>
                  <th> Email </th>
                  <th>D.O.B.</th>
                  <th>Course</th>
                  <th>State</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data.map(student => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>
                      <Link to={"/profile"} state={student} style={{ textDecoration: 'none' }}>
                        <td style={{ border: 'none', fontWeight: 'bold' }} >{student.studentName}</td>
                      </Link>
                    </td>
                    <td style={{ fontWeight: 'bold' }}>{student.phoneNumber}</td>
                    <td style={{ fontWeight: 'bold' }}>{student.email}</td>
                    <td style={{ fontWeight: 'bold' }}>{student.dateOfBirth}</td>
                    <td style={{ fontWeight: 'bold' }}>{student.course}</td>
                    <td style={{ fontWeight: 'bold' }}>{student.state}</td>
                    <td style={{ fontWeight: 'bold' }}>{student.gender}</td>

                    <td>
                      <Link to={"/updatestudent"} state={student}>
                        <button className="btn btn-info mb-1 w-100"title='Update student'>
                          <i class="fa-regular fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button className='btn btn-warning w-100'title='Delete student' onClick={() => handleDelete(student.studentId)}>
                        <i class="fa-solid fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Students;