import React, { useContext } from "react";
import { useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { Await, useNavigate } from "react-router-dom";

function Login2() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { login, user } = useContext(AuthContext);
  const [errMsg, setErrMsg] = useState("");
  const ErrorP = (
    <p className="w-fit text-center  text-sm font-medium text-red-600">
      {errMsg}
    </p>
  );
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      await login(email, password);
      if (!email || !password) throw new Error("Please check your inputs !");
      if (!email.includes("@esi-sba.dz"))
        throw new Error("Email does not exist ❌");
      // const response = await localStorage.getItem("error");
      // console.log("hey : ", response);
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  return (
    <div className="absolute z-auto w-fit rounded-md border-2 border-[#001D4F] bg-cyanT p-4 pb-0 shadow-2xl shadow-black">
      <form onSubmit={handleSubmit}>
        <p className="text-center text-xl font-semibold">
          Login to your account
        </p>
        <div>
          {/* <label
            htmlFor="email"
            className="mb-2 block font-semibold text-gray-700"
          >
            Email
          </label> */}
          <input
            type="email"
            placeholder="Email adresse"
            name="email"
            className="placeholder:text-blueF my-2 w-40 bg-inherit  p-1 transition-all duration-300 focus:w-48"
            onChange={handleChange}
          />
        </div>
        <div className="mb-1">
          {/* <label
            htmlFor="password"
            className="mb-2 block font-semibold text-gray-700"
          >
            Password
          </label> */}
          <input
            type="password"
            placeholder="Password"
            name="password"
            className="placeholder:text-blueF mb-2 w-40 bg-inherit p-1  transition-all duration-300  focus:w-48"
            onChange={handleChange}
          />
        </div>
        <div className=" grid grid-rows-2 space-y-0  ">
          {errMsg && ErrorP}
          <button
            type="submit"
            className={` ${errMsg && "mb-2"} mb-auto inline-block rounded-full bg-indigo-500 px-4 py-2 font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-cyan-400 focus:outline-none focus:ring focus:ring-cyan-500 focus:ring-offset-2`}
          >
            Submit!
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login2;
