import classes from "../CSS/HomeNavbar.module.css";
import { Navbar, Container } from "react-bootstrap";
import logoImage from "../assets/img/header.svg";
import Login2 from "./Login2";
import React, { useState } from "react";

const HomeNavbarLoggedOff = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Navbar expand="lg" className="bg-blueT">
        <Container className=" flex items-center justify-between">
          <Navbar.Brand href="/">
            <div className="flex h-6">
              <img src={logoImage} alt="logo" className="h-[32px] w-auto" />
              <p className="tracking-widest">Learnify</p>
            </div>
          </Navbar.Brand>
          <div className="items-center space-x-20">
            <a href="/home" className="text-black no-underline hover:underline">
              Home
            </a>
            <a
              href="/about"
              className="text-black no-underline hover:underline"
            >
              About
            </a>
            <a href="/blog" className="text-black no-underline hover:underline">
              Blog
            </a>
            <a
              href="/contact"
              className="text-black no-underline hover:underline"
            >
              Contact
            </a>
          </div>

          <div className="relative">
            <button
              className="inline-block rounded-full bg-cyan-500 px-4 py-2 font-semibold uppercase text-stone-800 transition-colors duration-300 hover:bg-cyan-400 focus:outline-none focus:ring focus:ring-cyan-400 focus:ring-offset-2"
              onClick={() => setClicked((clicked) => !clicked)}
            >
              <span>🔒 </span>Login
            </button>
            {clicked && <Login2 />}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavbarLoggedOff;
