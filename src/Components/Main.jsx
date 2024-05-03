import React, { useState } from "react";
import classes from "../CSS/Main.module.css";
import bookImg from "../assets/img/bookImg.svg";
import girlImg from "../assets/img/girlImg.svg";
import Lottie from "lottie-react";
import animationData from "../assets/Animation - 1714609296276.json";
import "animate.css";
import {
  BsFillArrowDownCircleFill,
  BsFillArrowUpCircleFill,
} from "react-icons/bs";

export default function Main({ lgnClicked }) {
  const [goSecondPage, setGoSecondPage] = useState(false);
  const [goFirstPage, setGoFirstPage] = useState(false);
  return (
    <main className=" w-full bg-cyanT">
      <section className="relative h-screen">
        <div
          className={`flex w-auto items-center justify-evenly ${goFirstPage ? "animate__animated animate__fadeInUp" : ""}`}
        >
          <div
            className={`${classes.contentcontainer} animate__animated animate__fadeInDown mb-40 `}
          >
            <h1 className="text-blueT">Welcome to Learnify</h1>
            <h2>Lorem ipsum dolor sit amet.</h2>
          </div>
          <div
            className={`${classes.imageContainer}  ${
              lgnClicked ? classes.fadeOut : ""
            } mb-32 overflow-auto`}
          >
            <Lottie
              animationData={animationData}
              className=" w-[600px]"
              loop={false}
            />
          </div>
        </div>
        <a
          className="absolute bottom-24 right-10 text-4xl"
          href="#section2"
          onClick={() => {
            setGoSecondPage((clicked) => !clicked);
            setGoFirstPage(false);
          }}
        >
          <BsFillArrowDownCircleFill />
        </a>
      </section>

      <section id="section2" className="relative mt-16">
        <div
          className={` relative max-h-full space-y-32 bg-cyanT ${goSecondPage ? "animate__animated animate__fadeInDown" : ""}`}
        >
          <div className="flex">
            <div>
              <h2 className="pb-2 pl-3 text-blueT">
                Platforme d'apprentissage :
              </h2>
              <p className="py-2 pl-3 leading-loose tracking-widest">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat
              </p>
            </div>
            <img src={bookImg} className="h-52 px-20" />
          </div>

          <div className="flex pb-10">
            <img src={girlImg} className=" pr-30 h-52 px-20 " />
            <div>
              <h2 className="pb-2 text-blueT">Espace de communication :</h2>
              <p className="py-2 pr-3 leading-loose tracking-widest">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor
                in reprehenderit in voluptate velit esse cillum dolore eu fugiat
                nulla pariatur. Excepteur sint occaecat
              </p>
            </div>
          </div>
        </div>

        <a
          className="absolute -top-28 right-10 text-4xl"
          href="#"
          onClick={() => {
            setGoFirstPage((clicked) => !clicked);
            setGoSecondPage(false);
          }}
        >
          <BsFillArrowUpCircleFill />
        </a>
      </section>
    </main>
  );
}
