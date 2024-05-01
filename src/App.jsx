import React, { useState } from "react";
import Header from "./Components/Header";
import HomeNavbar from "./Components/HomeNavbar";
import Home from "./Components/Home";
import Login from "./Components/Login";
import PrivateRoute from "./Routes/PrivateRoute";
import Main from "./Components/Main";
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeNavbarLoggedOff from "./Components/HomeNavbarLoggedoff";

export default function App() {
  const [lgnClicked, setLgnClicked] = useState(false);
  const connected = false;
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <Header setLgnClicked={setLgnClicked} /> */}
          {connected ? <HomeNavbar /> : <HomeNavbarLoggedOff />}
          <Routes>
            <Route path="/" element={<Main lgnClicked={lgnClicked} />} exact />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/home"
              element={<PrivateRoute Component={<Home />} />}
            ></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}
