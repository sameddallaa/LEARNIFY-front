import React, { useContext, useEffect, useState } from "react";
import classes from "../CSS/Home.module.css";
import { Container } from "react-bootstrap";
import logoImg from "../assets/img/main.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import img from "../assets/img/girlImg.svg";
const Home = () => {
  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext); // need to be connected in order to access Home
  // console.log(user);
  // useEffect(() => {
  //   !user && navigate("/");
  // }, [user]);

  return (
    <div className="bg-cyanT">
      <Container
        className={`${classes.homeContainer} w-auto max-w-fit overflow-auto`}
      >
        <main className={`${classes.main} flex items-center justify-center`}>
          <ul id="news" className="space-y-10">
            <li className="grid w-auto grid-cols-[fr_auto] flex-col space-x-10 rounded-badge  p-3 shadow-xl shadow-stone-600">
              <img
                className="col-start-1 w-auto max-w-64  rounded-box border-2 border-stone-600 p-3"
                alt="Picture"
                src={img}
              />
              <div
                id="content"
                className="lg relative col-start-2  w-auto max-w-sm space-y-10  sm:max-w-sm"
              >
                <h1>Title</h1>
                <p className=" break-words font-mono tracking-widest">
                  Text...........................................
                </p>
                <a className="absolute bottom-auto right-2 tracking-wider no-underline ">
                  Download
                </a>
              </div>
            </li>{" "}
            <li className="grid w-auto grid-cols-[fr_auto] flex-col space-x-10  rounded-badge p-3 shadow-xl shadow-stone-600">
              <img
                className="col-start-1 w-auto max-w-64 rounded-box border-2 border-stone-600 p-3"
                alt="Picture"
                src={img}
              />
              <div
                id="content"
                className="relative col-start-2 w-auto max-w-sm  space-y-10 "
              >
                <h1>Title</h1>
                <p className=" break-words font-mono tracking-widest">
                  Text...........................................
                </p>
                <a className="absolute bottom-auto right-2 tracking-wider no-underline ">
                  Download
                </a>
              </div>
            </li>{" "}
            <li className="grid w-auto grid-cols-[fr_auto] flex-col space-x-10 rounded-badge  p-3 shadow-xl shadow-stone-600">
              <img
                className="col-start-1 w-auto max-w-64 rounded-box border-2 border-stone-600 p-3"
                alt="Picture"
                src={img}
              />
              <div
                id="content"
                className="relative col-start-2 w-auto max-w-sm  space-y-10 "
              >
                <h1>Title</h1>
                <p className=" break-words font-mono tracking-widest">
                  Text...........................................
                </p>
                <a className="absolute bottom-auto right-2 tracking-wider no-underline ">
                  Download
                </a>
              </div>
            </li>
          </ul>
        </main>
      </Container>
    </div>
  );
};

export default Home;
