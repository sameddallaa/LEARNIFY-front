import React from "react";
import Question from "./Question";
import classes from "../CSS/Forum.module.css";
import { Button, Container } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { HiOutlineFire } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FloatingLabel, Form } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";

const Forum = () => {
  const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  return (
    <React.Fragment>
      <Container className={`${classes.forumContainer}`}>
        <div className={`${classes.header}`}>
          <div className={`${classes.tabs}`}>
            <Button variant="primary" className={`${classes.tabButton}`}>
              <FaRegClock /> New
            </Button>
            <Button variant="secondary" className={`${classes.tabButton}`}>
              <MdArrowOutward /> Top
            </Button>
            <Button variant="secondary" className={`${classes.tabButton}`}>
              <HiOutlineFire />
              Hot
            </Button>
            <Button variant="secondary" className={`${classes.tabButton}`}>
              <IoIosCheckmarkCircleOutline /> Closed
            </Button>
          </div>
          <div className={`${classes.searchBar}`}>
            <FloatingLabel
              controlId="floatingInput"
              label="Search"
              className={`${classes.searchField}`}
            >
              <Form.Control
                type="email"
                placeholder="name@example.com"
                className={`${classes.searchInput}`}
              />
            </FloatingLabel>
          </div>
        </div>
        {testArray.map((test) => (
          <Question key={test} />
        ))}
      </Container>
    </React.Fragment>
  );
};

export default Forum;
