import React, { useEffect, useState, useRef } from "react";
import Question from "./Question";
import classes from "../CSS/Forum.module.css";
import { Button, Container } from "react-bootstrap";
import { FaRegClock } from "react-icons/fa";
import { MdArrowOutward } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { HiOutlineFire } from "react-icons/hi2";
import { IoIosCheckmarkCircleOutline } from "react-icons/io";
import { FloatingLabel, Form } from "react-bootstrap";
import { IoIosSearch } from "react-icons/io";
import { Link, useParams } from "react-router-dom";
import { Modal } from "react-bootstrap";
import axios from "axios";
const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [subject, setSubject] = useState("");
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { subjectId } = useParams();
  const [modalShow, setModalShow] = useState(false);
  const titleRef = useRef("");
  const contentRef = useRef("");
  const fileRef = useRef(null);
  const handleChange = (e) => {
    if (e.target.name === "content") {
      contentRef.current = e.target.value;
    } else if (e.target.name === "title") {
      titleRef.current = e.target.value;
    } else if (e.target.name === "attachment") {
      fileRef.current = e.target.files[0];
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const post = new FormData();
    post.append("title", titleRef.current);
    post.append("content", contentRef.current);
    post.append("attachment", fileRef.current);
    const commentEndpoint = `http://localhost:8000/api/posts/${subjectId}/add/`;
    const response = await axios.post(commentEndpoint, post, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token.access,
      },
    });
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      setModalShow(false);
    }
  };

  function PostModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Add post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Titre</Form.Label>
              <Form.Control
                name="title"
                // value={contentRef.current}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Contenu</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="content"
                // value={contentRef.current}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formFile" className="mb-3">
              <Form.Label>Attacher un fichier</Form.Label>
              <Form.Control
                type="file"
                name="attachment"
                // value={fileRef.current}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleSubmit}>Send</Button>
        </Modal.Footer>
      </Modal>
    );
  }
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
      <div
        className={`${classes.addPost}`}
        title="add post"
        onClick={() => setModalShow(true)}
      >
        <MdOutlinePostAdd className={`${classes.addPostIcon}`} />
        <PostModal show={modalShow} onHide={() => setModalShow(false)} />
      </div>
    </React.Fragment>
  );
};

export default Forum;