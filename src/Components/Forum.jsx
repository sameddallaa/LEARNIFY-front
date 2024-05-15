import React, { useEffect, useState } from "react";
import Question from "./Question";
import classes from "../CSS/Forum.module.css";
import { Button, Container } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { HiOutlineFire } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FloatingLabel, Form } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [subject, setSubject] = useState("");
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { subjectId } = useParams();
  useEffect(
    () =>
      async function fetchPosts() {
        try {
          const postsEndpoint = `http://localhost:8000/api/ressources/forums/${subjectId}/`;
          // const subjectEndpoint = `http://localhost:8000/api/ressources/subjects/${subjectId}`;
          const response = await axios.get(postsEndpoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token.access}`,
            },
          });
          const subjectData = response.data;
          if (response.status === 200) {
            setSubject(subjectData.subject_name);
            setPosts(subjectData.posts);
          }
        } catch (err) {
          console.log(err);
        }
      },
    [],
  );
  // const testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  console.log(subject);
  return (
    <React.Fragment>
      <Container className={`${classes.forumContainer}`}>
        <div className={`${classes.header}`}>
          <div className={`${classes.subject}`}>
            {/* <Button variant="primary" className={`${classes.tabButton}`}>
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
            </Button> */}
            <h3 className={`${classes.subjectHeading}`}>
              <Link className={`${classes.subjectLink}`}>{subject}</Link>
            </h3>
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
        {posts?.map((post) => (
          <Question key={post.id} props={post} />
        ))}
      </Container>
    </React.Fragment>
  );
};

export default Forum;
