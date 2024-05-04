import React, { useState, useContext, useEffect } from "react";
import classes from "../CSS/HomeNavbar.module.css";
import {
  Button,
  Offcanvas,
  Navbar,
  Container,
  ListGroup,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "../assets/img/header.svg";
import { MdOutlineForum } from "react-icons/md";
import { VscThreeBars } from "react-icons/vsc";
import { MdArrowForwardIos } from "react-icons/md";
import { IoDocumentsOutline } from "react-icons/io5";
import { FaBookOpen } from "react-icons/fa";
import AuthContext from "../Contexts/AuthContext";
import Subject from "./Subject";
import axios from "axios";
import ProfilNavBar from "./ProfilNavBar";
import { MdOutlineNotificationsActive } from "react-icons/md";

const HomeNavbar = () => {
  const [show, setShow] = useState(false);
  const [avatarClicked, setAvatarClicked] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { user } = useContext(AuthContext); // need to be connected in order to access Home
  const token = JSON.parse(localStorage.getItem("tokens"));
  const navigate = useNavigate();
  const {
    first_name,
    last_name,
    username,
    user_id,
    is_student,
    is_teacher,
    year,
  } = user;
  console.log(user);

  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchSubjects = async () => {
      if (is_student) {
        const endpoint = `https://elearn-n48v.onrender.com/api/ressources/subjects/year/${year}`;
        try {
          const response = await axios.get(endpoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access}`,
            },
          });
          // console.log("loading...");
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
    };
    fetchSubjects();
  }, []);
  const [subject, setSubject] = useState("");
  console.log(subjects);
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
            <Offcanvas.Body className={`${classes.offcanvasBody} bg-blueT`}>
              <div>
                <div className={`${classes.options}`}>
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

          <div className="  flex space-x-10">
            <Button className={`${classes.navToggle}`}>
              <MdOutlineForum />
            </Button>

            <Button className={`${classes.navToggle} `}>
              <MdOutlineNotificationsActive className="" />
            </Button>
            <div className="relative mr-10 flex flex-col items-center">
              <button
                className="daisy-avatar"
                onClick={() => setAvatarClicked((clicked) => !clicked)}
              >
                <div className="w-11 rounded-full">
                  <img src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg" />
                </div>
              </button>
              <div className="z-0 flex justify-center">
                {avatarClicked && <ProfilNavBar />}
              </div>
            </div>
            {/* <button
              className="inline-block rounded-full px-1 py-1 text-sm font-semibold    transition-colors duration-300  hover:bg-red-400 hover:text-red-600  focus:outline-none focus:ring focus:ring-red-400 focus:ring-offset-2"
              onClick={logout}
            >
              Disconnect
            </button> */}
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavbar;
