import React, { useState, useContext, useEffect } from "react";
import classes from "../CSS/HomeNavbar.module.css";
import {
  Button,
  Offcanvas,
  Navbar,
  Container,
  ListGroup,
  Accordion,
} from "react-bootstrap";
import { Link, useNavigate, useLocation } from "react-router-dom";
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
import Avatar from "react-avatar";

const HomeNavbar = () => {
  const [show, setShow] = useState(false);
  const { user, loading, setLoading, pathToggle, setPathToggle } =
    useContext(AuthContext); // need to be connected in order to access Home
  const handleClose = () => {
    // setLoading((prevLoading) => !prevLoading);
    setShow(false);
  };
  const handleShow = () => {
    // setLoading((prevLoading) => !prevLoading);
    setShow(true);
  };
  const [avatarClicked, setAvatarClicked] = useState(false);
  const token = JSON.parse(localStorage.getItem("tokens"));
  const navigate = useNavigate();
  const {
    first_name,
    last_name,
    username,
    user_id,
    is_student,
    is_teacher,
    teacher_id,
    year,
    year_tag,
  } = user;
  console.log(user);
  const location = useLocation();
  // const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [years, setYears] = useState([]);
  const [yearsSubjects, setYearsSubjects] = useState([]);
  const { subjectId, setSubjectId } = useContext(AuthContext);
  const yearsSet = new Set();
  useEffect(() => {
    const fetchSubjects = async () => {
      if (is_student) {
        // const endpoint = `https://elearn-n48v.onrender.com/api/ressources/subjects/year/${year}`;
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
          } else {
            console.log("Something went wrong :(");
          }
        } catch (error) {
          console.log(error);
        }
      } else if (is_teacher) {
        const yearsEndpoint = `http://localhost:8000/api/teachers/${teacher_id}/years/`;
        // const yearsEndpoint = `https://elearn-n48v.onrender.com/api/teachers/${teacher_id}/years/`;
        try {
          const response = await axios.get(yearsEndpoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access}`,
            },
          });
          const data = await response.data;
          if (response.status === 200) {
            setYears(data);
          } else {
            console.log("Something went wrong :(");
          }
        } catch (error) {
          console.log(error);
        }
        years.map(async (year) => {
          console.log("i'm running :)");
          // const subjectsEndpoint = `http://localhost:8000/api/teachers/${teacher_id}/${year.year}/subjects/`;
          const subjectsEndpoint = `https://elearn-n48v.onrender.com/api/teachers/${teacher_id}/${year.year}/subjects/`;
          try {
            const response = await axios.get(subjectsEndpoint, {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token.access}`,
              },
            });
            const data = await response.data;
            if (response.status === 200) {
              yearsSet.add({
                year: year.year,
                year_tag: year.year_tag,
                subject: data,
              });
              setYearsSubjects([...yearsSet]);
              setSubjects(data);
              console.log(Array.from(yearsSet));
            } else {
              console.log("Something went wrong :(");
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
      console.log(...yearsSet);
    };
    fetchSubjects();
  }, [...yearsSet]);
  // const [subject, setSubject] = useState("");
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
      <Navbar expand="lg" className={`${classes.nav} `}>
        <Container className="relative flex items-center justify-center  ">
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
                  <Accordion className={`${classes.accordion}`}>
                    <Accordion.Item
                      className={`${classes.accordionItem}`}
                      eventKey="0"
                    >
                      <Accordion.Header
                        className={`${classes.accordionHeader}`}
                      >
                        Modules
                      </Accordion.Header>
                      <Accordion.Body className={`${classes.accordionBody}`}>
                        {is_teacher ? (
                          yearsSubjects.map((year) => (
                            <div
                              className={`${classes.yearContainer}`}
                              key={year.year_tag}
                            >
                              <p className={`${classes.year}`}>
                                {year.year_tag}
                              </p>
                              <div className={`${classes.courses}`}>
                                {year.subject.map((subject) => (
                                  <ListGroup
                                    className={`${classes.listGroup}`}
                                    key={subject}
                                  >
                                    <ListGroup.Item
                                      className={`${classes.listGroupItem}`}
                                    >
                                      <div className={`${classes.courseIcon}`}>
                                        <FaBookOpen
                                          className={`${classes.openBook}`}
                                        />
                                      </div>
                                      <Link
                                        className={`${classes.courseLink}`}
                                        to={`/subjects/${subject.id}/`}
                                        onClick={() => {
                                          setSubjectId(subject.id);
                                          setPathToggle(
                                            (prevToggle) => !prevToggle,
                                          );
                                          navigate(`/subjects/${subject.id}/`);
                                          window.location.reload();
                                        }}
                                      >
                                        <p className={`${classes.courseText}`}>
                                          {subject.name}
                                        </p>
                                      </Link>
                                    </ListGroup.Item>
                                  </ListGroup>
                                ))}
                              </div>
                            </div>
                          ))
                        ) : is_student ? (
                          <div className={`${classes.yearContainer}`}>
                            <p className={`${classes.year}`}>{year_tag}</p>
                            <div className={`${classes.courses}`}>
                              <ListGroup className={`${classes.listGroup}`}>
                                {subjects.map((key) => (
                                  <ListGroup.Item
                                    className={`${classes.listGroupItem}`}
                                    key={key.id}
                                  >
                                    <div className={`${classes.courseIcon}`}>
                                      <FaBookOpen
                                        className={`${classes.openBook}`}
                                      />
                                    </div>
                                    <Link
                                      className={`${classes.courseLink}`}
                                      to={`/subjects/${key.id}/`}
                                      onClick={() => {
                                        setLoading((prv) => !prv);
                                        navigate(`/subjects/${key.id}/`);
                                        window.location.reload();
                                      }}
                                    >
                                      <p className={`${classes.courseText}`}>
                                        {key.name}
                                      </p>
                                    </Link>
                                  </ListGroup.Item>
                                ))}
                              </ListGroup>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                  {/* <div className={`${classes.option}`}>
                    <div className={`${classes.optionHead}`}>
                      <IoDocumentsOutline className={`${classes.optionIcon}`} />
                      <p className={`${classes.optionText} ${classes.wrap}`}>
                        Modules
                      </p>
                    </div>
                    <MdArrowForwardIos />
                  </div> */}
                </div>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Navbar.Brand href="/" className="mx-auto lg:absolute lg:left-[45%]">
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
              {/* <button
                className="daisy-avatar"
                onClick={() => setAvatarClicked((clicked) => !clicked)}
              > */}
              {/* <div className="w-11 rounded-full"> */}
              {/* <img src="https://fileinfo.com/img/ss/xl/jpg_44-2.jpg" /> */}
              <Avatar
                name={`${first_name} ${last_name}`}
                color={`#ECF0FF`}
                fgColor={`black`}
                round={true}
                size="45"
                onClick={() => setAvatarClicked((clicked) => !clicked)}
                className={`select-none hover:cursor-pointer`}
              />
              {/* </div> */}
              {/* </button> */}
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
