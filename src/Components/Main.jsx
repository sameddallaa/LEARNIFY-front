import React, { useEffect, useState } from "react";
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
import MemberCard from "./Sub Components/MemberCard";

export default function Main({ lgnClicked }) {
  const [goFirstPage, setGoFirstPage] = useState(false);
  const [goSecondPage, setGoSecondPage] = useState(false);
  const [goSecondPageUp, setGoSecondPageUp] = useState(false);
  const [goThirdPage, setGoThirdPage] = useState(false);

  return (
    <main className="  grid w-fit grid-rows-[auto_auto_2fr]  bg-cyanT">
      <section className="relative row-start-1 h-screen" id="section1">
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
              className=" w-auto max-w-[600px]"
              loop={false}
            />
          </div>
        </div>
        <a
          className="absolute bottom-24 right-10 text-4xl"
          href="#section2"
          onClick={() => {
            setGoSecondPage(true);
            setGoFirstPage(false);
          }}
        >
          <BsFillArrowDownCircleFill />
        </a>
      </section>

      <section
        id="section2"
        className="relative row-start-2 my-auto flex h-screen items-center"
      >
        <div
          className={`max-h-full space-y-32 bg-cyanT ${goSecondPage ? "animate__animated animate__fadeInDown" : ""} ${goSecondPageUp ? "animate__animated animate__fadeInUp" : ""} `}
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
            <img src={bookImg} className="h-auto max-h-52 w-auto px-20" />
          </div>

          <div className="flex pb-10">
            <img
              src={girlImg}
              className=" pr-30 h-auto max-h-52 w-auto px-20 "
            />
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
          className="absolute right-10 top-10 text-4xl"
          href="#"
          onClick={() => {
            setGoFirstPage(true);
            setGoSecondPage(false);
            setGoSecondPageUp(false);
          }}
        >
          <BsFillArrowUpCircleFill />
        </a>

        <a
          className="absolute bottom-10 right-10 text-4xl"
          href="#section3"
          onClick={() => {
            setGoThirdPage(true);
            setGoSecondPageUp(false);
          }}
        >
          <BsFillArrowDownCircleFill />
        </a>
      </section>

      <section id="section3" className="relative row-start-3 h-auto max-h-fit">
        <a
          className="absolute right-10 top-10 z-10 text-4xl"
          href="#section2"
          onClick={() => {
            setGoSecondPageUp(true);
            setGoThirdPage(false);
          }}
        >
          <BsFillArrowUpCircleFill />
        </a>
        <div
          id="cards"
          className={`mx-auto flex max-w-fit max-w-screen-lg grid-rows-2 flex-col ${goThirdPage ? "animate__animated animate__fadeInDown" : ""}`}
        >
          <div className="row-start-1 mx-12 flex items-center justify-evenly space-x-20">
            {[...Array(3)].map((_, i) => (
              <MemberCard card={i + 1} key={i + 1} />
            ))}
          </div>

          <div className="row-start-2 mx-12 mt-10 flex items-center justify-evenly space-x-20">
            {[...Array(3)].map((_, i) => (
              <MemberCard card={i + 4} key={i + 4} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
