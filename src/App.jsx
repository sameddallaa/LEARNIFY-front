
import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import HomeNavbar from "./Components/HomeNavbar";
import Home from "./Components/Home";
import Login from "./Components/Login22";
import PrivateRoute from "./Routes/PrivateRoute";
import Main from "./Components/Main";
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeNavbarLoggedOff from "./Components/HomeNavbarLoggedoff";
import { useContext } from "react";
import AuthContext from "./Contexts/AuthContext";

export default function App() {
  const [lgnClicked, setLgnClicked] = useState(false);
  const { user } = useContext(AuthContext);
  const [navBar, setNavBar] = useState(<HomeNavbarLoggedOff />);

  useEffect(() => {
    setNavBar(user ? <HomeNavbar /> : <HomeNavbarLoggedOff />);
  }, [user]);
  return (
    <>
      {/* <AuthProvider> */}
      {/* <Header setLgnClicked={setLgnClicked} /> */}
      {navBar}
      <Routes>
        <Route path="/" element={<Main lgnClicked={lgnClicked} />} exact />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/home"
          element={<PrivateRoute Component={<Home />} />}
        ></Route>
      </Routes>
      {/* </AuthProvider> */}
    </>
  );
}
