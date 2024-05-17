import React, { useContext, useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import classes from "../CSS/Answer.module.css";
import profileImage from "../assets/img/1705940048112.jpg";
import { BsThreeDots } from "react-icons/bs";
import { BiUpvote, BiDownvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import code from "../assets/img/code.png";
import PostAttachment from "./PostAttachment";
import Avatar from "react-avatar";
import axios from "axios";

import AuthContext from "../Contexts/AuthContext";
const Answer = ({ comment }) => {
  // console.log(comment);
  const { user } = useContext(AuthContext);
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [avatarClicked, setAvatarClicked] = useState(false);
  const [upvote, setUpvote] = useState();
  const [downvote, setDownVote] = useState();
  const [votes, setVotes] = useState();
  useEffect(() => {
    if (comment.upvotes.includes(user.user_id)) {
      setUpvote(true);
      setDownVote(false);
    } else if (comment.downvotes.includes(user.user_id)) {
      setUpvote(false);
      setDownVote(true);
    }

    setVotes(comment.votes);
  }, [comment.upvotes, comment.downvotes, comment.votes]);
  console.log(comment.date);
  const date = new Date(comment.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const handleVote = async (vote) => {
    const voteEndpoint = `http://localhost:8000/api/comments/${comment.id}/vote/`;
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

  return (
    comment && (
      <React.Fragment>
        <Container
          className={`d-flex align-items-stretch ${classes.postContainer}`}
        >
          <div
            className={`${classes.roleBand}`}
            style={{
              backgroundColor:
                comment.commenter_role === "teacher" ? "green" : "#F48023",
            }}
          ></div>
          <Container className={`${classes.answerContainer}`}>
            <div className={`${classes.headerContainer}`}>
              <div className={`${classes.leftContainer}`}>
                <div className={`${classes.user}`}>
                  <div className={`${classes.profilePicContainer}`}>
                    {/* <img
                      src={profileImage}
                      alt="Profile image"
                      className={`${classes.profilePic}`}
                    /> */}
                    <Avatar
                      name={`${comment.commenter_name}`}
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
                      <h2 className={`${classes.userName}`}>
                        {comment.commenter_name}
                      </h2>
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
                <div className={`${classes.questionBody}`}>
                  <p>{comment.content}</p>
                </div>
              </div>
              <div className={`${classes.questionAttach}`}>
                {comment.attachment && (
                  <PostAttachment
                    className={`${classes.postAttachment}`}
                    attachment={comment.attachment}
                  />
                  // <div className={`${classes.postAttachment}`}></div>
                )}
              </div>
            </div>
            <hr />
            <div className={`${classes.interactions}`}>
              <div className={`${classes.interaction}`}>
                {comment.votes >= 0 && (
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
                {comment.votes < 0 && (
                  <p
                    className={`${classes.interactionCount}`}
                    style={{ color: "red" }}
                  >
                    {votes}
                  </p>
                )}
              </div>
            </div>
          </Container>
        </Container>
      </React.Fragment>
    )
  );
};

export default Answer;
