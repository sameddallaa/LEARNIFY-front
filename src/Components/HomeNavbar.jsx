import React, { useState, useContext } from "react";
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
const HomeNavbar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // const { user } = useContext(AuthContext);
  // console.log(user);
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
            {/* <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header> */}
            <Offcanvas.Body className={`${classes.offcanvasBody}`}>
              <div className={`${classes.user}`}>
                <div className={`${classes.profilePicContainer}`}>
                  <img
                    src={logoImage}
                    alt="Profile picture"
                    className={`${classes.profilePic}`}
                  />
                  <div className={`${classes.userNameContainer}`}>
                    <p className={`${classes.userName}`}>Hichem GUEZZEN</p>
                  </div>
                </div>
                <div className={`${classes.additionalInfo}`}>
                  <div className={`${classes.info}`}>User</div>
                  <div className={`${classes.info}`}>458353582</div>
                </div>
              </div>
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
                {/* <div className={`${classes.year}`}>
                  <p className={`${classes.yearLabel}`}>1CS</p>
                </div> */}
              </div>
              <div className={`${classes.courses}`}>
                <ListGroup className={`${classes.listGroup}`}>
                  <ListGroup.Item className={`${classes.listGroupItem}`}>
                    {/* <Link className={`${classes.courseLink}`}> */}
                    <div className={`${classes.courseIcon}`}>
                      <FaBookOpen className={`${classes.openBook}`} />
                    </div>
                    <Link className={`${classes.courseLink}`}>
                      <p className={`${classes.courseText}`}>
                        Systèmes d'exploitation 2
                      </p>
                    </Link>
                    {/* </Link> */}
                  </ListGroup.Item>
                  <ListGroup.Item className={`${classes.listGroupItem}`}>
                    {/* <Link className={`${classes.courseLink}`}> */}
                    <div className={`${classes.courseIcon}`}>
                      <FaBookOpen className={`${classes.openBook}`} />
                    </div>
                    <Link className={`${classes.courseLink}`}>
                      <p className={`${classes.courseText}`}>
                        Analyse et Conception des Systèmes d'information
                      </p>
                    </Link>
                    {/* </Link> */}
                  </ListGroup.Item>
                  <ListGroup.Item className={`${classes.listGroupItem}`}>
                    <div className={`${classes.courseIcon}`}>
                      <FaBookOpen className={`${classes.openBook}`} />
                    </div>
                    <Link className={`${classes.courseLink}`}>
                      <p className={`${classes.courseText}`}>Réseaux 2</p>
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item className={`${classes.listGroupItem}`}>
                    <div className={`${classes.courseIcon}`}>
                      <FaBookOpen className={`${classes.openBook}`} />
                    </div>
                    <Link className={`${classes.courseLink}`}>
                      <p className={`${classes.courseText}`}>
                        Langue Anglaise 2
                      </p>
                    </Link>
                  </ListGroup.Item>
                  <ListGroup.Item className={`${classes.listGroupItem}`}>
                    <div className={`${classes.courseIcon}`}>
                      <FaBookOpen className={`${classes.openBook}`} />
                    </div>
                    <Link className={`${classes.courseLink}`}>
                      <p className={`${classes.courseText}`}>
                        Langages et Outils du Web
                      </p>
                    </Link>
                  </ListGroup.Item>
                </ListGroup>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
          <Navbar.Brand href="#home">
            <div className={`${classes.logoContainer}`}>
              <img src={logoImage} alt="logo" className={`${classes.logo}`} />
              <p className={`${classes.logoP}`}>Learnify</p>
            </div>
          </Navbar.Brand>
          <Button className={`${classes.navToggle}`}>
            <AiOutlineMessage />
          </Button>
        </Container>
      </Navbar>
    </>
  );
};

export default HomeNavbar;
