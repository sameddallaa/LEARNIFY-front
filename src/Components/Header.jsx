import React from "react";
import headerLogo from "../assets/img/header.svg";
import { FaLock } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "../CSS/Header.module.css";
export default function Header({ setLgnClicked }) {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    // <Container>
    <header className={`${classes.header}`}>
      <nav className={`${classes.nav}`}>
        <div className={`${classes.logo}`}>
          <img src={headerLogo} alt="logo" className={`${classes.logoImage}`} />
          <p className={`${classes.logoP}`}>Learnify</p>
        </div>
        <div className={`${classes.navLinks}`}>
          <ul className={`${classes.navLinkList}`}>
            <li className={`${classes.navLinkListItem}`}>
              <a href="/" className={`${classes.navAnchor}`}>
                Home
              </a>
            </li>
            <li className={`${classes.navLinkListItem}`}>
              <a href="/about" className={`${classes.navAnchor}`}>
                About
              </a>
            </li>
            <li className={`${classes.navLinkListItem}`}>
              <a href="/course" className={`${classes.navAnchor}`}>
                Course
              </a>
            </li>
            <li className={`${classes.navLinkListItem}`}>
              <a href="/blog" className={`${classes.navAnchor}`}>
                Blog
              </a>
            </li>
            <li className={`${classes.navLinkListItem}`}>
              <a href="/contact" className={`${classes.navAnchor}`}>
                Contact
              </a>
            </li>
          </ul>
        </div>
        {location.pathname !== "/login" && (
          <div className={`${classes.authLinks}`}>
            <ul className={`${classes.authLinkList}`}>
              <li className={`${classes.authLinkListItem}`}>
                <button
                  className={`${classes.roundedBtn} ${classes.navBtn}`}
                  // style={{ color: "#FFB45C" }}
                  onClick={() => {
                    setLgnClicked((clicked) => !clicked);
                    navigate("/login");
                  }}
                >
                  <FaLock />
                  <span> Login</span>
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>
    </header>
    // </Container>
  );
}
