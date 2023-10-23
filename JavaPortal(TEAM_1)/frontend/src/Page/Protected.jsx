import React from 'react'
import { useSelector } from 'react-redux';
import { selectLoggedInUser } from '../features/auth/authSlice';
import { Navigate } from 'react-router-dom';

const Protected = ({children}) => {
     const isLoggedIn=window.localStorage.getItem("isLoggedIn");
     const user=useSelector(selectLoggedInUser);
    if (!(isLoggedIn)) {
      return <Navigate to="/Login" replace={true}></Navigate>;
    }
    return children;
}

export default Protected