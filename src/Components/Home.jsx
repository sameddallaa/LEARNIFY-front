
import React, { useContext, useEffect, useState } from "react";
import HomeNavbar from "./HomeNavbar";
import { Button, Offcanvas, Navbar, Container } from "react-bootstrap";
import { FiClipboard } from "react-icons/fi";
import classes from "../CSS/Home.module.css";

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext); // need to be connected in order to access Home
  useEffect(() => {
    !user && navigate("/");
  }, [user]);

  return (
    <>
      {/* <HomeNavbar /> */}
      <Container>
        <main className={`${classes.main}`}>
          <div className={`${classes.classHeader}`}>
            <div className={`${classes.classTitle}`}>
              <h1>Systèmes d'exploitation</h1>
            </div>
            <div className={`${classes.classDesc}`}>
              Crédit : 04
              <br />
              Coefficient : 04 <br />
              Durée : 16 semaines
              <br /> Horaire : Mercredi 08h00 09h30 Amphi : D <br />
              Enseignant: Dr Manel BABA-AHMED <br />
              email: email@esi-sba.dz <br />
              Disponibilité Au bureau : mardi – jeudi de 14h00 -16h00
            </div>
          </div>
          <div className={`${classes.courses}`}>
            <Link className={`${classes.courseLink}`}>
              <div className={`${classes.course}`}>
                <div className={`${classes.courseTitle}`}>Chapitre 01</div>
                <div className={`${classes.courseDesc}`}>
                  Gestion de la mémoire
                </div>
              </div>
            </Link>
            <Link className={`${classes.courseLink}`}>
              <div className={`${classes.course}`}>
                <div className={`${classes.courseTitle}`}>Chapitre 01</div>
                <div className={`${classes.courseDesc}`}>
                  Gestion de la mémoire
                </div>
              </div>
            </Link>
            <Link className={`${classes.courseLink}`}>
              <div className={`${classes.course}`}>
                <div className={`${classes.courseTitle}`}>Chapitre 01</div>
                <div className={`${classes.courseDesc}`}>
                  Gestion de la mémoire
                </div>
              </div>
            </Link>
            <Link className={`${classes.courseLink}`}>
              <div className={`${classes.course}`}>
                <div className={`${classes.courseTitle}`}>Chapitre 01</div>
                <div className={`${classes.courseDesc}`}>
                  Gestion de la mémoire
                </div>
              </div>
            </Link>
            <Link className={`${classes.courseLink}`}>
              <div className={`${classes.course}`}>
                <div className={`${classes.courseTitle}`}>Chapitre 01</div>
                <div className={`${classes.courseDesc}`}>
                  Gestion de la mémoire
                </div>
              </div>
            </Link>
            <Link className={`${classes.courseLink}`}>
              <div className={`${classes.course}`}>
                <div className={`${classes.courseTitle}`}>Chapitre 01</div>
                <div className={`${classes.courseDesc}`}>
                  Gestion de la mémoire
                </div>
              </div>
            </Link>
          </div>
        </main>
        <Button className={`${classes.addNote}`}>
          <FiClipboard className={`${classes.clipboard}`} />
        </Button>
      </Container>
    </>
  );
};

export default Home;
