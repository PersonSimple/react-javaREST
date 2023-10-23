import React from 'react'
import SideBar from '../Component/SideBar'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import img from "./image/pngtree-avatar-icon-profile-icon-member-login-vector-isolated-png-image_1978396.jpg"
import "./css/user.css"
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../features/auth/authSlice';



export default function User() {
  const user=   JSON.parse(window.localStorage.getItem("userDetails"));
  return (
        <Box sx={{display:'flex'}}>
          <SideBar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 ,marginTop:"55px"}}>
            <Typography variant="h5">
             <p className="title">Current User</p>
             <div>
             
  <h2>User Profile</h2>
  <div className="card">
    <img src={img} alt="user" className='card2' />
    <span className='ur'>User Name:  </span><span className='ur3'>{user.username}</span>
    <br></br>
    <span className='ur2'>Email: </span><span className='ur3'>{user.email}</span>
    
    <p style={{fontWeight:'bolder'}}>Admin User</p>
    <div style={{ margin: "24px 0" }}>
      
    </div>
  </div>

             </div>
            </Typography>
          </Box>
        </Box>
  )
}
