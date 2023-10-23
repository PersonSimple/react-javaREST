import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Page/Dashboard";
import AddStudent from "./Page/AddStudent";
import User from "./Page/User";
import StudentList from "./Page/StudentList";
import AddCourses from "./Page/AddCourses";
import CoursesList from "./Page/CourseList";
import UserList from "./Page/UserList";

import LoginPage from "./Page/LoginPage";
import SignUpPage from "./Page/SignUpPage";
import Protected from "./Page/Protected";
import CourseListEdit from "./Page/CourseListEdit";
import StudentListEdit from "./Page/StudentListEdit";
export default function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={ <Protected> <Dashboard /></Protected>}></Route>
        <Route path='/User' element={ <Protected> <User /></Protected> }></Route>
        <Route path='/AddStudent' element={<Protected> <AddStudent /></Protected> }></Route>
        <Route path='/StudentList' element={<Protected> <StudentList /></Protected>}></Route>
        <Route path='/AddCourses' element={<Protected><AddCourses /></Protected>}></Route>
        <Route path='/CourseList' element={<Protected><CoursesList /></Protected>}></Route>
        <Route path='/UserList' element={<Protected><UserList /></Protected>}></Route>
        <Route path='/Login' element={<LoginPage />}></Route>
        <Route path='/Signup' element={<SignUpPage />}></Route>
        <Route path='/Protected' element={<Protected />}></Route>

        <Route path='/CourseEdit/:id' element={<Protected><CourseListEdit/></Protected>}></Route>
        <Route path="/StudentEdit/:id" element={<Protected><StudentListEdit/></Protected>}></Route>

          {/* <Route path="/" element={<Dashboard />}></Route>
          <Route path="/User" element={<User />}></Route>
          <Route path="/AddStudent" element={<AddStudent />}></Route>
          <Route path="/StudentList" element={<StudentList />}></Route>
          <Route path="/AddCourses" element={<AddCourses />}></Route>
          <Route path="/CourseList" element={<CoursesList />}></Route>
          <Route path="/UserList" element={<UserList />}></Route>
          <Route path="/Login" element={<LoginPage />}></Route>
          <Route path="/Signup" element={<SignUpPage />}></Route>
          <Route path="/CourseEdit/:id" element={<CourseListEdit />}></Route>
          <Route path="/StudentEdit/:id" element={<StudentListEdit/>}></Route> */}
       
        </Routes>
      </BrowserRouter>
    </>
  );
}
