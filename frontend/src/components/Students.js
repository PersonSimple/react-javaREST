import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';
import Navbar from './Navbar';

const Students = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

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

  function handleSearchChange(event) {
    setSearchQuery(event.target.value);
  }

  useEffect(() => {
    getData();
  }, [])

  const filteredStudents = data.filter((student) => {
    const query = searchQuery.toLowerCase();
    return (
      student.studentName.toLowerCase().includes(query) ||
      student.phoneNumber.includes(query) ||
      student.email.toLowerCase().includes(query) ||
      student.course.toLowerCase().includes(query)
    );
  });

  return (
    <div>
      <Navbar />
      <div className='search-bar' style={{ margin: "25px" }}>
        <input
          type="text"
          style={{
            padding: '10px',
            width: '50%',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            boxShadow: '0px 0px 5px #ccc',
            textAlign: "center"
          }}
          placeholder="Search Student Name,Mobile number,Email"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
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
                  <th>Email</th>
                  <th>D.O.B.</th>
                  <th>Course</th>
                  <th>State</th>
                  <th>Gender</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student.studentId}>
                    <td>{student.studentId}</td>
                    <td>
                      <Link to={"/profile"} state={student} style={{ textDecoration: 'none' }}>
                        <td style={{ border: 'none', fontWeight: 'bold' }}>{student.studentName}</td>
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
                        <button className="btn btn-info mb-1 w-100" title='Update student'>
                          <i className="fa-regular fa-pen-to-square"></i>
                        </button>
                      </Link>
                      <button className='btn btn-warning w-100' title='Delete student' onClick={() => handleDelete(student.studentId)}>
                        <i className="fa-solid fa-trash"></i>
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
  );
};

export default Students;