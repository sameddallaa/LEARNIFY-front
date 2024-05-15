import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import classes from "../CSS/Question.module.css";
import profileImage from "../assets/img/1705940048112.jpg";
import { BsThreeDots } from "react-icons/bs";
import { BiUpvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
import AuthContext from "../Contexts/AuthContext";
import Avatar from "react-avatar";
const Question = ({ props }) => {
  const { user } = useContext(AuthContext);
  const [avatarClicked, setAvatarClicked] = useState(false);
  const date = new Date(props.date);
  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <React.Fragment>
      <Container className={`${classes.questionContainer}`}>
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
          <div className={`${classes.questionTitle}`}>
            <h3>{props.title}</h3>
          </div>
          <div className={`${classes.questionBody}`}>
            <p>{props.content}</p>
          </div>
        </div>
        <div className={`${classes.interactions}`}>
          <div className={`${classes.interaction}`}>
            <button>
              <IoEyeOutline className={`${classes.interactionIcon}`} />
            </button>
            <p className={`${classes.interactionCount}`}>12</p>
          </div>
          <div className={`${classes.interaction}`}>
            <button>
              <BiUpvote className={`${classes.interactionIcon}`} />
            </button>
            <p className={`${classes.interactionCount}`}>{props.upvotes}</p>
          </div>
          <div className={`${classes.interaction}`}>
            <button>
              <BiComment className={`${classes.interactionIcon}`} />
            </button>
            <p className={`${classes.interactionCount}`}>
              {props.comment_count}
            </p>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Question;
