import React, { useState, useContext, useEffect } from "react";
import classes from "../CSS/HomeNavbar.module.css";
import {
  Button,
  Offcanvas,
  Navbar,
  Container,
  ListGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logoImage from "../assets/img/header.svg";
import { AiOutlineMessage } from "react-icons/ai";
import { VscThreeBars } from "react-icons/vsc";
import { IoMdSettings } from "react-icons/io";
import { MdArrowForwardIos } from "react-icons/md";
import { FaRegUser } from "react-icons/fa";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import AuthContext from "../Contexts/AuthContext";
import Subject from "./Subject";
import axios from "axios";
const HomeNavbar = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useContext(AuthContext); // need to be connected in order to access Home
  const token = JSON.parse(localStorage.getItem("tokens"));
  const {
    first_name,
    last_name,
    username,
    user_id,
    is_student,
    is_teacher,
    year,
  } = user;

  const [subjects, setSubjects] = useState([]);
  useEffect(
    () =>
      async function fetchSubjects() {
        if (is_student) {
          const endpoint = `http://localhost:8000/api/ressources/subjects/year/${year}`;
          try {
            const response = await axios.get(endpoint, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access}`,
              },
            });
            const data = await response.data;
            if (response.status === 200) {
              setSubjects(data);
              console.log(data);
            } else {
              console.log("Something went wrong :(");
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
    [],
  );
  const userType = () => {
    if (is_student) {
      return "Student";
    } else if (is_teacher) {
      return "Teacher";
    } else {
      return "Admin";
    }
  };

  const { logout } = useContext(AuthContext);
  return (
    <>
      <Navbar expand="lg" className={`${classes.nav}`}>
        <Container>
          <Button className={`${classes.navToggle}`} onClick={handleShow}>
            <VscThreeBars />
          </Button>
          <Offcanvas
            show={show}
            onHide={handleClose}
            className={`${classes.offcanvas}`}
          >
            <Offcanvas.Body className={`${classes.offcanvasBody}`}>
              <div className={`${classes.user}`}>
                <div className={`${classes.profilePicContainer}`}>
                  <img
                    src={logoImage}
                    alt="Profile picture"
                    className={`${classes.profilePic}`}
                  />
                  <div className={`${classes.userNameContainer}`}>
                    <p className={`${classes.userName}`}>
                      {first_name} {last_name}
                    </p>
                  </div>
                </div>
                <div className={`${classes.additionalInfo}`}>
                  <div className={`${classes.info}`}>{userType()}</div>
                  <div className={`${classes.info}`}>{username}</div>
                </div>
              </div>
              <div className={`${classes.bottomContainer}`}>
                <div className={`${classes.options}`}>
                  <div className={`${classes.option}`}>
                    <div className={`${classes.optionHead}`}>
                      <IoMdSettings className={`${classes.optionIcon}`} />
                      <p className={`${classes.optionText}`}>Settings</p>
                    </div>
                    <MdArrowForwardIos />
                  </div>
                  <div className={`${classes.option}`}>
                    <div className={`${classes.optionHead}`}>
                      <FaRegUser className={`${classes.optionIcon}`} />
                      <p className={`${classes.optionText}`}>Profile</p>
                    </div>
                    <MdArrowForwardIos />
                  </div>
                  <div className={`${classes.option}`}>
                    <div className={`${classes.optionHead}`}>
                      <IoDocumentsOutline className={`${classes.optionIcon}`} />
                      <p className={`${classes.optionText} ${classes.wrap}`}>
                        Modules
                      </p>
                    </div>
                    <MdArrowForwardIos />
                  </div>
                </div>
                <div className={`${classes.courses}`}>
                  <ListGroup className={`${classes.listGroup}`}>
                    {subjects.map((key) => (
                      <ListGroup.Item
                        className={`${classes.listGroupItem}`}
                        key={key.id}
                      >
                        <div className={`${classes.courseIcon}`}>
                          <FaBookOpen className={`${classes.openBook}`} />
                        </div>
                        <Link
                          className={`${classes.courseLink}`}
                          to={`/subjects/${key.id}/`}
                        >
                          <p className={`${classes.courseText}`}>{key.name}</p>
                        </Link>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Navbar.Brand href="/">
            <div className={`${classes.logoContainer}`}>
              <img src={logoImage} alt="logo" className={`${classes.logo}`} />
              <p className={`${classes.logoP}`}>Learnify</p>
            </div>
          </Navbar.Brand>

          <div className="  flex space-x-2">
            <Button className={`${classes.navToggle}`}>
              <AiOutlineMessage />
            </Button>

            <button
              className="inline-block rounded-full px-1 py-1 text-sm font-semibold    transition-colors duration-300  hover:bg-red-400 hover:text-red-600  focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2"
              onClick={logout}
            >
              Disconnect
            </button>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavbar;
