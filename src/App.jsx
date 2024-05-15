import React, { createContext, useEffect, useState } from "react";
import HomeNavbar from "./Components/HomeNavbar";
import Home from "./Components/Home";
import PrivateRoute from "./Routes/PrivateRoute";
import Main from "./Components/Main";
import { AuthProvider } from "./Contexts/AuthContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeNavbarLoggedOff from "./Components/HomeNavbarLoggedoff";
import Subject from "./Components/Subject";
import { useContext } from "react";
import AuthContext from "./Contexts/AuthContext";
import NonAuthenticatedRoute from "./Routes/NonAuthenticatedRoute";
import Question from "./Components/Question";
import Forum from "./Components/Forum";
import Answer from "./Components/Answer";
import Discussion from "./Components/Discussion";

export default function App() {
  const [lgnClicked, setLgnClicked] = useState(false);
  const { user } = useContext(AuthContext);
  const [navBar, setNavBar] = useState(<HomeNavbarLoggedOff />);
  // const SubjectContext = createContext();

  useEffect(() => {
    setNavBar(user ? <HomeNavbar /> : <HomeNavbarLoggedOff />);
  }, [user]);
  return (
    <>
      {navBar}
      <Routes>
        <Route
          path="/"
          element={
            <NonAuthenticatedRoute Component={Main} props={lgnClicked} />
          }
        />
        <Route exact path="/subjects/:subjectId" Component={Subject} />
        <Route path="/home" element={<PrivateRoute Component={Home} />}></Route>
        {/* <Route path="/home" element={<Home />}></Route> */}
        <Route path="/forum" element={<Forum />} />
        <Route path="/answer" element={<Answer />} />
        <Route path="/discussion" element={<Discussion />} />
      </Routes>
    </>
  );
}
