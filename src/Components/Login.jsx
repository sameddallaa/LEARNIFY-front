import React, { useContext } from "react";
import { useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { Await, useNavigate } from "react-router-dom";

function Login() {
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
      // if (!email || !password) throw new Error("Please check your inputs !");
      // if (!email.includes("@esi-sba.dz"))
      //   throw new Error("Email does not exist ❌");
    } catch (err) {
      console.log(err);
      setErrMsg(err.message);
    }
  };

  return (
    <div className=" border-3 absolute mr-1 mt-1 min-h-80   min-w-72 rounded-[20px] border-[#001D4F] bg-cyanT p-4 pb-0 shadow-2xl shadow-black">
      <form onSubmit={handleSubmit}>
        <p className="m-1 text-center text-xl font-bold text-[#001D4F]">
          Login to your account
        </p>
        <div className="relative mt-10">
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            className="peer w-full border-b border-blueF bg-transparent py-2 text-black  placeholder:text-transparent focus:outline-none"
          />
          <label
            htmlFor="email"
            className="absolute -top-4 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blueF"
          >
            Email
          </label>
        </div>
        <div className="relative mt-10">
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            className="peer w-full border-b border-blueF bg-transparent py-2 placeholder:text-transparent  focus:outline-none "
          />
          <label
            htmlFor="password"
            className="absolute -top-4 left-0 text-sm text-gray-500 transition-all peer-placeholder-shown:top-2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-400 peer-focus:-top-4 peer-focus:text-sm peer-focus:text-blueF"
          >
            Password
          </label>
        </div>

        {errMsg && ErrorP}
        {/* <div className=" grid grid-rows-2 space-y-0  ">
          {errMsg && ErrorP} */}
        <div className=" flex justify-center">
          <button
            type="submit"
            className={` ${errMsg && "mt-12"} my-10  inline-block border-2  border-[#001D4F] px-2 py-2 font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-green-500 focus:outline-none focus:ring focus:ring-cyan-500 focus:ring-offset-2`}
          >
            Submit!
          </button>
        </div>
        {/* </div> */}
      </form>
    </div>
  );
}

export default Login;
