import React, { useContext, useEffect, useState } from "react";
import classes from "../CSS/Home.module.css";
import { Container } from "react-bootstrap";
import logoImg from "../assets/img/main.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
const Home = () => {
  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext); // need to be connected in order to access Home
  // console.log(user);
  // useEffect(() => {
  //   !user && navigate("/");
  // }, [user]);

  return (
    <div className="bg-cyanT">
      <Container className={`${classes.homeContainer}`}>
        <main className={`${classes.main}`}>
          <h1 className={`${classes.heading}`}>Welcome</h1>
          <img
            src={logoImg}
            alt="Learnify logo"
            className={`${classes.logoImg}`}
          />
        </main>
      </Container>
    </div>
  );
};

export default Home;
