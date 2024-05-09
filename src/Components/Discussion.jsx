import React from "react";
import Question from "./Question";
import Answer from "./Answer";
import { Container } from "react-bootstrap";
import classes from "../CSS/Discussion.module.css";
const Discussion = () => {
  const testArray = [1, 2, 3, 4];
  return (
    <Container className={`d-flex flex-column  ${classes.discussionContainer}`}>
      <Question className={`${classes.question}`} />
      <div className={`${classes.answersContainer}`}>
        <Answer
          className={`${classes.answer}`}
          role="teacher"
          hasImage={false}
        />
        {testArray.map((answer) => (
          <Answer
            className={`${classes.answer}`}
            role="student"
            hasImage={answer % 2 === 0}
            key={answer}
          />
        ))}
      </div>
    </Container>
  );
};

export default Discussion;
