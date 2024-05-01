import { Navbar, Container } from "react-bootstrap";
import logoImage from "../assets/img/header.svg";
import Login from "./Login";
import React, { useState } from "react";

const HomeNavbarLoggedOff = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Navbar expand="lg" className="w-screen bg-cyanT">
        <Container className=" items-cente r flex  justify-between">
          <Navbar.Brand href="/">
            <div className="flex h-6">
              <img src={logoImage} alt="logo" className="h-[32px] w-auto" />
              <p className="tracking-widest">Learnify</p>
            </div>
          </Navbar.Brand>
          <div className="items-center space-x-20">
            <a
              href="/home"
              className="font-medium text-blue-950 no-underline hover:underline"
            >
              Home
            </a>
            <a
              href="/about"
              className="font-medium text-blue-950 no-underline hover:underline"
            >
              About
            </a>
            <a
              href="/blog"
              className="font-medium text-blue-950 no-underline hover:underline"
            >
              Blog
            </a>
            <a
              href="/contact"
              className="font-medium text-blue-950 no-underline hover:underline"
            >
              Contact
            </a>
          </div>

          <div className="relative mr-10 flex flex-col items-center">
            <button
              className="inline-block w-40 rounded-full bg-cyan-950 px-4 py-2 text-lg font-semibold text-blueT transition-colors duration-300 hover:bg-cyan-800 focus:outline-none focus:ring focus:ring-cyan-800 focus:ring-offset-2"
              onClick={() => setClicked((clicked) => !clicked)}
            >
              Sign in <span></span>
            </button>
            <div className="flex justify-center">{clicked && <Login />}</div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavbarLoggedOff;
