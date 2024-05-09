import React from "react";
import { Container } from "react-bootstrap";
import classes from "../CSS/Question.module.css";
import profileImage from "../assets/img/1705940048112.jpg";
import { BsThreeDots } from "react-icons/bs";
import { BiUpvote } from "react-icons/bi";
import { BiComment } from "react-icons/bi";
import { IoEyeOutline } from "react-icons/io5";
const Question = () => {
  return (
    <React.Fragment>
      <Container className={`${classes.questionContainer}`}>
        <div className={`${classes.headerContainer}`}>
          <div className={`${classes.leftContainer}`}>
            <div className={`${classes.user}`}>
              <div className={`${classes.profilePicContainer}`}>
                <img
                  src={profileImage}
                  alt="Profile image"
                  className={`${classes.profilePic}`}
                />
              </div>
              <div className={`${classes.postData}`}>
                <div className={`${classes.userNameContainer}`}>
                  <h2 className={`${classes.userName}`}>Abdessamed DALLAA</h2>
                </div>
                <div className={`${classes.postDateContainer}`}>
                  <h5 className={`${classes.postDate}`}>16h34</h5>
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
            <h3>Lorem, ipsum.</h3>
          </div>
          <div className={`${classes.questionBody}`}>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. A beatae
              iste incidunt reprehenderit hic accusantium quas quibusdam
              explicabo aspernatur. Accusamus repellendus aut aperiam.
            </p>
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
            <p className={`${classes.interactionCount}`}>12</p>
          </div>
          <div className={`${classes.interaction}`}>
            <button>
              <BiComment className={`${classes.interactionIcon}`} />
            </button>
            <p className={`${classes.interactionCount}`}>12</p>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
};

export default Question;
