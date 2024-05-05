import React, { useContext, useEffect, useState, useRef } from "react";
import HomeNavbar from "./HomeNavbar";
import { Button, Offcanvas, Navbar, Container } from "react-bootstrap";
import { FiClipboard } from "react-icons/fi";
import classes from "../CSS/Subject.module.css";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";

import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import LoadingAnimation from "./Sub Components/LoadingAnimation";

const Subject = () => {
  const [subject, setSubject] = useState({});
  // const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [role, setRole] = useState("");
  const [clipBoardOpened, setClipBoardOpened] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext); // need to be connected in order to access Home
  const { is_teacher, is_student } = user;
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { subjectId } = useParams();
  const location = useLocation();
  let currentPath;
  const [dataLoading, setDataLoading] = useState(true);

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
        // const chaptersEndpoint = `http://localhost:8000/api/ressources/${subjectId}/chapters/`;
        // const subjectEndpoint = `http://localhost:8000/api/ressources/subjects/${subjectId}`;
        const chaptersEndpoint = `https://elearn-n48v.onrender.com/api/ressources/${subjectId}/chapters/`;
        const subjectEndpoint = `https://elearn-n48v.onrender.com/api/ressources/subjects/${subjectId}`;
        try {
          setDataLoading(true);
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
            setDataLoading(false);
          } else {
            console.log("Something went wrong");
          }
        } catch (error) {
          console.log(error);
        }
        try {
          setDataLoading(true);
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
            setDataLoading(false);
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
    <div className="bg-cyanT pt-1">
      {/* <HomeNavbar /> */}
      <Container className={`relative ${classes.subjectContainer}`}>
        {dataLoading ? (
          <LoadingAnimation
            classProp={`  absolute  left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 transform`}
          />
        ) : (
          <main className={`${classes.main} mt-2 `}>
            <div className={`${classes.classHeader}`}>
              <div className={`${classes.classTitle}`}>
                {dataLoading ? <LoadingAnimation /> : <h1>{subject.name}</h1>}
              </div>
              {dataLoading ? (
                <LoadingAnimation />
              ) : (
                <div className={`${classes.classDesc}`}>
                  Crédit : {subject.credit}
                  <br />
                  Coefficient : {subject.coefficient} <br />
                  Durée : 16 semaines
                  <br /> Horaire : Mercredi 08h00 09h30
                  <br />
                  Place: {subject.place} <br />
                  Enseignant:{" "}
                  {subject.teacher_degree &&
                    (subject.teacher_degree === "Professeur"
                      ? "Pr. "
                      : "Dr. ")}{" "}
                  {subject.teacher_name} <br />
                  email: {subject.teacher_email} <br />
                  Disponibilité Au bureau : mardi – jeudi de 14h00 -16h00
                </div>
              )}
            </div>
            {dataLoading ? (
              <LoadingAnimation classProp="justify-center" />
            ) : (
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
            )}
          </main>
        )}
        <div className={`${classes.addNote}  z-10 grid bg-transparent`}>
          {clipBoardOpened ? (
            <>
              <div className="flex flex-col items-center space-y-2">
                <textarea
                  className="daisy-textarea daisy-textarea-bordered daisy-textarea-info daisy-textarea-lg mx-4 h-full  w-80 max-w-xs bg-inherit focus:bg-white"
                  placeholder="Bio"
                ></textarea>
                <button
                  className="daisy-btn daisy-btn-info bg-inherit "
                  onClick={() => {
                    setClipBoardOpened((clicked) => !clicked);
                  }}
                >
                  Save
                </button>
              </div>
            </>
          ) : (
            <Button
              className={`${classes.addNote}`}
              onClick={() => setClipBoardOpened((opened) => !opened)}
            >
              <FiClipboard className={`${classes.clipboard}`} />
            </Button>
          )}
        </div>
      </Container>
    </div>
  );
};

export default Subject;
