import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import "./css/signup.css";
import { selectLoggedInUser, createUserAsync, selectError } from "../authSlice";
import { Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import img from "../../../Page/image/ESD_LOGO_Rectangular.png"
export default function Signup() {
  const dispatch = useDispatch();
  const user = useSelector(selectLoggedInUser);
  const err = useSelector(selectError)
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
              createUserAsync({
                email: data.email,
                password: data.password,
                username: data.fullname
                //TODO: this role can be directly given on backend
              })
            );
           
          })}
        >
          <img src={img} alt="user" className="img1" />

          <p className="form-title">Create your account</p>
          <div className="input-container">
            <input
              type="text"
              id="fullname"
              placeholder="Enter Full Name"
              {...register("fullname", {
                required: "Name is required",
                maxLength: 30,
              })}
            />
            {errors.fullname && (
              <p className="text-red-500">{errors.fullname.message}</p>
            )}
            <span></span>
          </div>
          <div className="input-container">
            <input
              id="email"
              {...register("email", {
                required: "email is required",
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
            {err && (
              <p className="text-red-500">{"User with given email exists"}</p>

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
          <div className="input-container">
            <input
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "confirm password is required",
                validate: (value, formValues) =>
                  value === formValues.password || "password not matching",
              })}
              type="password"
              placeholder="Confirm Password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword.message}</p>
            )}
          </div>
          <button type="submit" className="submit">
            Sign up
          </button>
          <p className="signup-link">
            Already a memmber...!{"  "}
            <br></br>
            <Link to="/login" className='sinup'>Log in</Link>
          </p>
          {err && (
            <p className="text-red-500">{"User Already exists"}</p>

          )}
        </form>

      </div>
    </>
  );
}
