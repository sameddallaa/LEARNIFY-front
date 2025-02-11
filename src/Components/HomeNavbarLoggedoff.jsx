import { Navbar, Container } from "react-bootstrap";
import logoImage from "../assets/img/header.svg";
import Login from "./Login";
import React, { useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";

const HomeNavbarLoggedOff = () => {
  const [clicked, setClicked] = useState(false);
  return (
    <>
      <Navbar expand="lg" className=" bg-cyanT ">
        <Container className=" items-cente r flex  justify-between">
          <Navbar.Brand href="/">
            <div className="flex h-6">
              <img src={logoImage} alt="logo" className="h-[32px] w-auto" />
              <p className="tracking-widest">Learnify</p>
            </div>
          </Navbar.Brand>

          <div className="relative mr-10 flex flex-col items-center shadow-inner shadow-white">
            <button
              className="inline-block w-40 rounded-full bg-[#0857a0] px-4 py-2 text-lg font-semibold text-white transition-colors duration-300 hover:bg-cyan-800 focus:outline-none focus:ring focus:ring-cyan-800 focus:ring-offset-2"
              onClick={() => setClicked((clicked) => !clicked)}
            >
              <div className="flex items-center justify-center">
                Sign in <AiOutlineLogin className="ml-1 pt-1" />
              </div>
            </button>
            <div className="z-1  z-0 flex justify-center">
              {clicked && <Login />}
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavbarLoggedOff;
