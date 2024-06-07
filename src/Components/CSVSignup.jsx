import { useEffect, useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Form } from "react-bootstrap";
import CSVSignupOutcome from "./CSVSignupOutcome";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";
function CSVSignup({ userType }) {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [show, setShow] = useState(false);
  const [showOutcome, setShowOutcome] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(0);
  const [file, setFile] = useState(null);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    const csvEndpoint = `http://localhost:8000/api/csv-signup/${userType}`;
    const response = await axios.post(csvEndpoint, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token.access,
      },
    });
    // if (response.status === 200) {
    const data = response.data;
    console.log(data);
    handleClose();
    setStatus(response.status);
    setLoading(false);
    setShowOutcome(true);
  };

  return (
    <>
      <button
        className="daisy-btn daisy-btn-info daisy-btn-xs"
        onClick={handleShow}
      >
        Ajouter{" "}
        {userType === "students"
          ? "étudiants"
          : userType === "teachers"
            ? "enseignants"
            : ""}
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            Ajouter{" "}
            {userType === "students"
              ? "étudiants"
              : userType === "teachers"
                ? "enseignants"
                : ""}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="formFile" className="mb-3">
            <Form.Label>
              Veuillez faire de sorte que les élements de votre fichier CSV
              soient structurés de la manière suivante: <br />
              <br />
              E-mail, prénom, nom,{" "}
              {userType === "students" ? "groupe, année:" : "grade:"}
            </Form.Label>
            <Form.Control type="file" onChange={handleChange} />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
          {loading ? (
            <Spinner animation="border" variant="primary" />
          ) : (
            <Button variant="primary" onClick={handleSubmit}>
              Ajouter
            </Button>
          )}
        </Modal.Footer>
      </Modal>
      <CSVSignupOutcome
        userType={userType}
        status={status}
        showOutcome={showOutcome}
        setShowOutcome={setShowOutcome}
      />
    </>
  );
}

export default CSVSignup;
