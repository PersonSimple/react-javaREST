import { useSelector, useDispatch } from 'react-redux';
import { selectError, selectLoggedInUser } from '../authSlice';
import { Link, Navigate } from 'react-router-dom';
import { checkUserAsync } from '../authSlice';
import { useForm } from 'react-hook-form';
import "react-toastify/dist/ReactToastify.css";
import "./css/signup.css"
import img from "../../../Page/image/ESD_LOGO_Rectangular.png"
export default function Login() {
  const dispatch = useDispatch();

  const user = useSelector(selectLoggedInUser);
  const err=useSelector(selectError)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
 


  return (
    <>
      {user && <Navigate to="/" replace={true}></Navigate>}
      <div className="fluid-container">
          
        <form
        noValidate
          className="form-box"
          onSubmit={handleSubmit((data) => {
            dispatch(
              checkUserAsync({ email: data.email, password: data.password })
            );
        
          })}
        >
          
          <img src={img} alt="user" />
        
          <p className="form-title">Login to your account</p>
          <div className="input-container">
            <input
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi,
                  message: "Email not valid",
                },
              })}
              type="email"
              placeholder="Enter email"
            />
            {errors.email && (
              <p className="text-red-500">{errors.email.message}</p>
            )}
            <span></span>
          </div>
          <div className="input-container">
            <input
              id="password"
              {...register("password", {
                required: "password is required",
                pattern: {
                  value:
                    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm,
                  message: `- at least 8 characters\n
                      - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number\n
                      - Can contain special characters`,
                },
              })}
              type="password"
              placeholder="Enter password"
          
            />
            {errors.password && (
              <p className="text-red-500">{errors.password.message}</p>
            )}
          </div>
          {err && (
              <p className="text-red-500">{"Invalid Credentials"}</p>
            )}
          <button type="submit" className="submit">
            Login
          </button>
          <p className="signup-link">
            Don't have an account {"  "}
            <br></br>
            <Link to="/signup" className='sinup'>Sign up</Link>
          </p>
        
          
          
         
        </form>
      </div>
    </>
  );
}
