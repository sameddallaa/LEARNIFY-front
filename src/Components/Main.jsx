import React from "react";
import mainLogo from "../assets/img/main.svg";
import classes from "../CSS/Main.module.css";
export default function Main({ lgnClicked }) {
  return (
    <main className={`${classes.main}`}>
      <>
        <div
          className={`${classes.contentContainer} ${
            lgnClicked ? classes.fadeOut : ""
          }`}
        >
          <h1 className={`${classes.heading1}`}>Welcome to Learnify</h1>
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
      </>
    </main>
  );
}
