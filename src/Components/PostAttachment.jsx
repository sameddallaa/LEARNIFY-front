import React from "react";
import { Container } from "react-bootstrap";
import classes from "../CSS/PostAttachment.module.css";
import { MdAttachment } from "react-icons/md";

const PostAttachment = ({ attachment }) => {
  const imageMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/webp",
    "image/bmp",
    "image/svg+xml",
  ];

  const isFileImage = (file) => {
    const pattern = /\.(jpg|jpeg|png|gif|svg)$/i;
    return pattern.test(file);
  };
  return (
    <>
      <Container className={`${classes.attachContainer}`}>
        {isFileImage(attachment) ? (
          <img
            src={`http://localhost:8000${attachment}`}
            alt="Attachment"
            title="test"
            className={`${classes.attachImage}`}
          />
        ) : (
          <>
            <div className={`${classes.linkContainer}`}>
              <a
                href={`http://localhost:8000${attachment}`}
                target="_blank"
                rel="noreferrer"
                className={`${classes.attachLink}`}
              >
                <div className={`${classes.image}`}>
                  <MdAttachment className={`${classes.attachIcon}`} />
                </div>
                <div className={`${classes.linkPath}`}>
                  {attachment.split("/").pop()}
                </div>
              </a>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default PostAttachment;
