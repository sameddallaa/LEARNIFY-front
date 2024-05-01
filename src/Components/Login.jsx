import React, { useContext } from "react";
import classes from "../CSS/Login.module.css";
import logo from "../assets/img/main.svg";
import { useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, user } = useContext(AuthContext);
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    login(email, password);
    // if (user) {
    //   navigate("/home");
    // } else {
    //   console.log("Something went wrong");
    // }
    // console.log("success");
  };

  return (
    <div className={`${classes.formContainer}`}>
      <div className={`${classes.loginContainer}`}>
        <div className={`${classes.formLogo}`}>
          <img
            src={logo}
            alt="Learnify logo"
            className={`${classes.logoImage}`}
          />
          <p className={`${classes.logoP}`}>Learnify</p>
        </div>
        <h2 className={`${classes.heading2}`}>Login to your account</h2>
        <form onSubmit={handleSubmit}>
          <div className={`${classes.formGroup}`}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
              className={`${classes.input}`}
            />
          </div>
          <div className={`${classes.formGroup}`}>
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
              className={`${classes.input}`}
            />
            <div className={`${classes.passwordInfo}`}>
              <span className={`${classes.error}`}>Incorrect Password</span>
              <a className={`${classes.anchorLink}`} href="#">
                Forget Password?
              </a>
            </div>
          </div>
          <button type="submit" className={`${classes.loginBtn}`}>
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
