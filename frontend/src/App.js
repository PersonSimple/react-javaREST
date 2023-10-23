import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Createstudent from './components/Createstudent';
import Updatestudent from './components/Updatestudent';
import Dashboard from './components/Dashboard';
import Courses from './components/Courses';
import UpdateCourse from './components/UpdateCourse';
import Students from './components/Students';
import UserDetail from './components/UserDetail';
import Profile from './components/Profile';



function App() {
  return (
    <div className="App">
      <BrowserRouter>

        {/* <Navbar1 /> */}
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/createstudent" element={<Createstudent />} />
          <Route path="/students" element={<Students />} />
          <Route path="/updatestudent" element={<Updatestudent />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/UpdateCourse" element={<UpdateCourse />} />
          <Route path="/UserDetail" element={<UserDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Navigate to="/login" />} />

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
