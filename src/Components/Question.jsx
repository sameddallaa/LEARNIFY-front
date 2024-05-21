import React, { useContext, useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import classes from "../CSS/Question.module.css";
import profileImage from "../assets/img/1705940048112.jpg";
import { Link } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import { BiDownvote, BiUpvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import AuthContext from "../Contexts/AuthContext";
import Avatar from "react-avatar";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import PostAttachment from "./PostAttachment";
const Question = ({ props }) => {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [upvote, setUpvote] = useState();
  const [downvote, setDownVote] = useState();
  const [votes, setVotes] = useState();
  const contentRef = useRef("");
  const fileRef = useRef(null);
  useEffect(() => {
    if (props.upvotes.includes(user.user_id)) {
      setUpvote(true);
      setDownVote(false);
    } else if (props.downvotes.includes(user.user_id)) {
      setUpvote(false);
      setDownVote(true);
    }

    setVotes(props.votes);
  }, [props.upvotes, props.downvotes, props.votes]);

  const date = new Date(props.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleVote = async (vote) => {
    const voteEndpoint = `http://localhost:8000/api/posts/${props.id}/vote/`;
    try {
      const response = await axios.post(
        voteEndpoint,
        {
          type: vote,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        },
      );
      if (response.status === 200) {
        const data = response.data;
        console.log(data);
        // console.log(toggle);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "content") {
      contentRef.current = e.target.value;
    } else if (e.target.name === "attachment") {
      fileRef.current = e.target.files[0];
    }

    console.log(contentRef);
    console.log(fileRef);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const comment = new FormData();
    comment.append("content", contentRef.current);
    comment.append("attachment", fileRef.current);

    const commentEndpoint = `http://localhost:8000/api/comments/${props.id}/add/`;
    const response = await axios.post(commentEndpoint, comment, {
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
  const [modalShow, setModalShow] = useState(false);
  function CommentModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add comment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Content</Form.Label>
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

  return (
    <React.Fragment>
      <Container className={`${classes.questionContainer}`}>
        <div className={`${classes.headerContainer}`}>
          <div className={`${classes.leftContainer}`}>
            <div className={`${classes.user}`}>
              <div className={`${classes.profilePicContainer}`}>
                <Avatar
                  name={`${props.author_name}`}
                  color={`white`}
                  fgColor={`black`}
                  round={true}
                  size="45"
                  onClick={() => setAvatarClicked((clicked) => !clicked)}
                  className={`select-none hover:cursor-pointer`}
                />
              </div>
              <div className={`${classes.postData}`}>
                <div className={`${classes.userNameContainer}`}>
                  <h2 className={`${classes.userName}`}>{props.author_name}</h2>
                </div>
                <div className={`${classes.postDateContainer}`}>
                  <h5 className={`${classes.postDate}`}>{formattedDate}</h5>
                </div>
              </div>
            </div>
          </div>
          <div className={`${classes.rightContainer}`}>
            <BsThreeDots />
          </div>
        </div>
        <div className={`${classes.question}`}>
          <div className={`${classes.questionText}`}>
            <div className={`${classes.questionTitle}`}>
              <Link
                to={`../../discussion/${props.id}`}
                style={{ textDecoration: "none", color: "black" }}
              >
                <h3>{props.title}</h3>
              </Link>
            </div>
            <div className={`${classes.questionBody}`}>
              <p>{props.content}</p>
            </div>
          </div>
          <div className={`${classes.questionAttach}`}>
            {props.attachment && (
              <PostAttachment
                className={`${classes.postAttachment}`}
                attachment={props.attachment}
              />
              // <div className={`${classes.postAttachment}`}></div>
            )}
          </div>
        </div>
        <hr />
        <div className={`${classes.interactions}`}>
          <div className={`${classes.interaction}`}>
            {props.votes >= 0 && (
              <p
                className={`${classes.interactionCount}`}
                style={{ color: "green" }}
              >
                {votes}
              </p>
            )}
            <button
              onClick={() => {
                setUpvote((prev) => !prev);
                setDownVote(false);
                setVotes((prev) => prev + 2);
                handleVote("upvote");
              }}
            >
              <BiUpvote
                className={`${classes.interactionIcon}`}
                style={upvote ? { color: "green" } : {}}
              />
            </button>
            <button
              onClick={() => {
                setDownVote((prev) => !prev);
                setUpvote(false);
                setVotes((prev) => prev - 2);
                handleVote("downvote");
              }}
            >
              <BiDownvote
                className={`${classes.interactionIcon}`}
                style={downvote ? { color: "red" } : {}}
              />
            </button>
            {props.votes < 0 && (
              <p
                className={`${classes.interactionCount}`}
                style={{ color: "red" }}
              >
                {votes}
              </p>
            )}
          </div>
          <div className={`${classes.interaction}`}>
            <button onClick={() => setModalShow(true)}>
              <BiComment className={`${classes.interactionIcon}`} />
            </button>
            <p className={`${classes.interactionCount}`}>
              {props.comment_count}
            </p>
            <CommentModal show={modalShow} onHide={() => setModalShow(false)} />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Question;
