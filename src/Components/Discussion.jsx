import React, { useState, useEffect } from "react";
import Question from "./Question";
import Answer from "./Answer";
import { Container } from "react-bootstrap";
import classes from "../CSS/Discussion.module.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Discussion = () => {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { postId } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    async function fetchPost() {
      const postEndpoint = `http://localhost:8000/api/ressources/forums/comments/${postId}/`;
      try {
        const response = await axios.get(postEndpoint, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        });
        if (response.status === 200) {
          const data = response.data;
          setPost(data);
          console.log(data);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchPost();
  }, []);

  return (
    <Container className={`d-flex flex-column  ${classes.discussionContainer}`}>
      {Object.keys(post).length > 0 ? (
        <>
          <Question props={post} className={`${classes.question}`} />
          <div className={`${classes.answersContainer}`}>
            {post.comments?.map((comment) => (
              <Answer
                className={`${classes.answer}`}
                key={comment.id}
                comment={comment}
              />
            ))}
          </div>
        </>
      ) : (
        ""
      )}
    </Container>
  );
};

export default Discussion;
