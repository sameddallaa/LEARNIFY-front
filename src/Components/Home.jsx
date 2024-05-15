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
      <Container className={`${classes.homeContainer} overflow-auto`}>
        <main className={`${classes.main} flex items-center justify-center`}>
          <h1 className="mb-10">Actualités</h1>
          <ul id="news" className=" flex flex-col space-y-10 ">
            <li className="relative flex w-auto flex-row space-x-10 rounded-badge  p-3  py-2 shadow-xl shadow-stone-600">
              <img
                className=" w-auto max-w-64  rounded-box border-2 border-stone-600 p-3"
                alt="Picture"
                src={img}
              />

              <div id="content" className="w-auto space-y-1">
                <h1>Title</h1>
                <p className=" mb-3 break-words text-start font-mono tracking-wide">
                  Text okqdpk qspk dpqs dkqp kdqkq dpskq dqp dkq ^k pdqkd p^qksd
                  dkpq^skdq^dk dqpkdpqs
                  kdq^kdpq^dkd^pdpqk^dskqpsdpdqksdsqkdp^kqdp^dkpdqksdpqkdpdkqds^skqdpkdqs^dpkkpdsqkd^ppqdkqdk^dkq^pdk^q
                  dpqsk^d^q pqskd^qd dqpkd^sq podkqopdk kdqodkqze poqjsdp
                </p>
              </div>
              <a className="absolute bottom-4 right-10 tracking-wider no-underline ">
                Download
              </a>
            </li>{" "}
            <li className="relative flex w-auto flex-row space-x-10 rounded-badge  p-3 py-2 shadow-xl shadow-stone-600">
              <img
                className=" w-auto max-w-64 rounded-box border-2 border-stone-600 p-3"
                alt="Picture"
                src={img}
              />
              <div id="content" className="w-auto  space-y-1 ">
                <h1>Title</h1>
                <p className=" mb-3 break-words font-mono tracking-widest">
                  Text...........................................
                </p>
              </div>
              <a className="absolute bottom-4 right-10 tracking-wider no-underline ">
                Download
              </a>
            </li>{" "}
            <li className=" relative flex w-auto flex-row space-x-10 rounded-badge  p-3   py-2 shadow-xl shadow-stone-600">
              <img
                className=" w-auto max-w-64 rounded-box border-2 border-stone-600 p-3"
                alt="Picture"
                src={img}
              />
              <div id="content" className="w-auto space-y-1 ">
                <h1>Title</h1>
                <p className="mb-3 break-words font-mono tracking-widest">
                  Text...........................................
                </p>
              </div>
              <a className="absolute bottom-4 right-10 tracking-wider no-underline ">
                Download
              </a>
            </li>
          </ul>
        </main>
      </Container>
    </div>
  );
};

export default Home;
