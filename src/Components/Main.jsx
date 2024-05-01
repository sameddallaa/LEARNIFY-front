import React from "react";
import mainLogo from "../assets/img/main.svg";
import classes from "../CSS/Main.module.css";
import bookImg from "../assets/img/bookImg.svg";
import girlImg from "../assets/img/girlImg.svg";

export default function Main({ lgnClicked }) {
  return (
    <main>
      <div
        className={`scroll  flex h-screen  items-center justify-evenly overflow-auto  bg-cyanT `}
      >
        <div className={`${classes.contentcontainer}`}>
          <h1 className="text-blueT">Welcome to Learnify</h1>
          <h2>Lorem ipsum dolor sit amet.</h2>
        </div>
        <div
          className={`${classes.imageContainer} ${
            lgnClicked ? classes.fadeOut : ""
          }`}
        >
          <img
            src={mainLogo}
            className={`${classes.logoImage}`}
            alt="Learnify Logo"
          />
        </div>
      </div>

      <div className="max-h-full bg-cyanT">
        <div className="flex">
          <div>
            <h2 className="text-blueT pl-3">Platforme d'apprentissage :</h2>
            <p className="py-2 pl-3 leading-relaxed tracking-widest">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat
            </p>
          </div>
          <img src={bookImg} className="h-52 px-20" />
        </div>

        <div className="flex pb-10">
          <img src={girlImg} className=" pr-30 h-52 px-20 " />
          <div>
            <h2 className="text-blueT">Espace de communication :</h2>
            <p className="py-2 pr-3 leading-relaxed tracking-widest">
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Excepteur sint occaecat
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
