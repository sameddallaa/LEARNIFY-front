import React, { useState } from "react";
import Header from "./Components/Header";
import Home from "./Components/Home";
import Login from "./Components/Login";
import PrivateRoute from "./Routes/PrivateRoute";
import Main from "./Components/Main";
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  const [lgnClicked, setLgnClicked] = useState(false);
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          {/* <Header setLgnClicked={setLgnClicked} /> */}
          {/* <HomeNavbar /> */}
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
