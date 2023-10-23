import React, { useEffect, useState } from 'react';
import SideBar from '../Component/SideBar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import "./css/List.css"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
export default function UserList() {
 const column=["ID","User Name","Email"];
 const[records,setRecords]=useState([]);
  const fetchUser = async () => {
    const response = await fetch('http://localhost:8082/user/allusers');
    const data = await response.json();
    setRecords(data);
  }
 
  useEffect(() => {
    fetchUser()
  }, []);
  return (
    <>
    <Box sx={{ display: 'flex' }}>
      <SideBar />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '55px' }}>
        <Typography variant="">
        <div className='heading'>User List</div>
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
                    <td>{i+1}</td>
                    <td>{record.username}</td>
                    <td>{record.email}</td>                                 
                  </tr>)
                )}
              </tbody>
            </table>
          </div>
        </Typography>
      </Box>
    </Box>
    <ToastContainer/>
    </>
  );
}

