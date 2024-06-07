import React from "react";
import { Modal, Button } from "react-bootstrap";
const CSVSignupOutcome = ({
  showOutcome,
  setShowOutcome,
  userType,
  status,
  message,
  unsuccessful_attempts,
}) => {
  const handleClose = () => setShowOutcome(false);
  //   const handleShow = () => setShow(true);
  return (
    <div>
      <Modal show={showOutcome} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {status === 200
              ? "Succès"
              : status === 207
                ? "Succès partiel"
                : "Erreur"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === 200
            ? `Les ${userType === "students" ? "étudiants" : "enseignants"} ont été ajoutés`
            : status === 207
              ? `Certains ${userType === "students" ? "étudiants" : "enseignants"} ont été ajoutés`
              : "Une erreur est survenue"}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CSVSignupOutcome;
