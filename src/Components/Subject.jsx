import React, { useContext, useEffect, useState, useRef } from "react";
import HomeNavbar from "./HomeNavbar";
import { Button, Offcanvas, Navbar, Container } from "react-bootstrap";
import { FiClipboard } from "react-icons/fi";
import classes from "../CSS/Subject.module.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";

const Subject = () => {
  const [subject, setSubject] = useState({});
  // const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext); // need to be connected in order to access Home
  const { is_teacher, is_student } = user;
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { subjectId } = useParams();
  const location = useLocation();
  let currentPath;

  useEffect(() => {
    !user && navigate("/");
  }, [user]);
  useEffect(() => {
    if (user) {
      if (is_teacher) {
        setRole("Teacher");
      } else if (is_student) {
        setRole("Student");
      } else {
        setRole("Admin");
      }
    }
  }, []);
  useEffect(
    () =>
      async function fetchChapters() {
        const chaptersEndpoint = `http://localhost:8000/api/ressources/${subjectId}/chapters/`;
        const subjectEndpoint = `http://localhost:8000/api/ressources/subjects/${subjectId}`;
        try {
          const response = await axios.get(chaptersEndpoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.access,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            setChapters(data);
            console.log(data);
          } else {
            console.log("Something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
        try {
          const response = await axios.get(subjectEndpoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.access,
            },
          });
          const data = response.data;
          if (response.status === 200) {
            setSubject(() => data);
            currentPath = location.pathname;
            console.log(currentPath);
            console.log(subject);
            console.log("im running");
          } else {
            console.log("Something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
      },
    [loading],
  );

  return (
    <>
      {/* <HomeNavbar /> */}
      <Container className={`${classes.subjectContainer}`}>
        <main className={`${classes.main}`}>
          <div className={`${classes.classHeader}`}>
            <div className={`${classes.classTitle}`}>
              <h1>{subject.name}</h1>
            </div>
            <div className={`${classes.classDesc}`}>
              Crédit : {subject.credit}
              <br />
              Coefficient : {subject.coefficient} <br />
              Durée : 16 semaines
              <br /> Horaire : Mercredi 08h00 09h30
              <br />
              Place: {subject.place} <br />
              Enseignant:{" "}
              {subject.teacher_degree === "Professeur" ? "Pr. " : "Dr. "}{" "}
              {subject.teacher_name} <br />
              email: {subject.teacher_email} <br />
              Disponibilité Au bureau : mardi – jeudi de 14h00 -16h00
            </div>
          </div>
          <div className={`${classes.courses}`}>
            {chapters.map((chapter) => (
              <React.Fragment key={chapter.id}>
                <Link className={`${classes.courseLink}`}>
                  <div className={`${classes.course}`}>
                    <div className={`${classes.courseTitle}`}>
                      Chapitre {chapter.number}
                    </div>
                    <div className={`${classes.courseDesc}`}>
                      {chapter.name}
                    </div>
                  </div>
                </Link>
              </React.Fragment>
            ))}
            {role === "Teacher" ? (
              <Link className={`${classes.courseLink}`}>
                <div className={`${classes.course}`}>
                  <div className={`${classes.courseTitle}`}>Ajouter</div>
                  <div className={`${classes.courseDesc}`}></div>
                </div>
              </Link>
            ) : (
              ""
            )}
          </div>
        </main>
        <Button className={`${classes.addNote}`}>
          <FiClipboard className={`${classes.clipboard}`} />
        </Button>
      </Container>
    </>
  );
};

export default Subject;
