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
import ChapitreModal from "./ChapitreModal";
import ChapitreAdd_Modal from "./Sub Components/ChapitreAdd_Modal";

const Subject = () => {
  const [subject, setSubject] = useState({});

  // const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [role, setRole] = useState("");
  const [clipBoardOpened, setClipBoardOpened] = useState(false);
  const navigate = useNavigate();
  const { user, loading, pathToggle } = useContext(AuthContext); // need to be connected in order to access Home
  const { is_teacher, is_student } = user;
  const token = JSON.parse(localStorage.getItem("tokens"));
  const { subjectId } = useParams();
  const location = useLocation();
  let currentPath;
  const [dataLoading, setDataLoading] = useState(true);
  const [chaptersOpened, setChaptersOpened] = useState(false);
  const [note, setNote] = useState("");
  const [noteInput, setNoteInput] = useState("");
  let noteSaved = false;
  const { student_id, teacher_id } = user;
  const [start, setStart] = useState(false);

  async function handleNoteSave() {
    // const noteEndPoint = `http://localhost:8000/api/students/${student_id}/subjects/${subjectId}/notes/`;
    const noteEndPoint = `https://elearn-n48v.onrender.com/api/students/${student_id}/subjects/${subjectId}/notes/`;
    noteSaved = false;
    try {
      const response = await axios.put(
        noteEndPoint,
        { ...note, content: noteInput },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token.access}`,
          },
        },
      );

      const data = response.data;
      console.log(response);

      noteSaved = true;
      console.log("note saved : ", data);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleNoteFetch() {
    // const noteEndPoint = `http://localhost:8000/api/students/${student_id}/subjects/${subjectId}/notes/`;
    const noteEndPoint = `https://elearn-n48v.onrender.com/api/students/${student_id}/subjects/${subjectId}/notes/`;
    try {
      const response = await axios.get(noteEndPoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      const data = response.data;
      if (response.status === 200) {
        console.log("note fetch : ", data);
        setNote(data);
        setNoteInput(data.content);
      } else {
        console.log("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handleChapterDelete(chapterId) {
    const chapterDltEndpoint = `https://elearn-n48v.onrender.com/api/ressources/${subjectId}/chapters/delete/`;
    try {
      const res = await axios.delete(chapterDltEndpoint, {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });

      console.log(res);
    } catch (err) {
      console.log(err.message);
    }
  }

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
          setStart(true);
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
    [loading, pathToggle],
  );

  useEffect(() => {
    is_student && handleNoteFetch();
  }, []);

  return (
    <div className="bg-cyanT pt-1">
      {/* <HomeNavbar /> */}
      <Container className={`relative ${classes.subjectContainer}`}>
        {dataLoading ? (
          <LoadingAnimation
            classProp={`  absolute  left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/3 transform`}
          />
        ) : (
          <>
            <main className={`${classes.main} mt-2 `}>
              <div className={`${classes.classHeader}`}>
                <div className={`${classes.classTitle}`}>
                  <h1>{subject.name}</h1>
                </div>
                <div className={`${classes.classDesc}`}>
                  Crédit : {subject.credit}
                  <br />
                  Coefficient : {subject.coefficient} <br />
                  Durée : 16 semaines
                  <br />
                  Place: {subject.place} <br />
                  Enseignant:{" "}
                  {subject.teacher_degree &&
                    (subject.teacher_degree === "Professeur"
                      ? "Pr. "
                      : "Dr. ")}{" "}
                  {subject.teacher_name} <br />
                  email: {subject.teacher_email} <br />
                </div>
              </div>
              <div className={`${classes.courses}`} id="chapters">
                {chapters.map((chapter) => (
                  <React.Fragment key={chapter.id}>
                    <button
                      className={`${classes.courseLink} relative focus:outline-none focus:ring focus:ring-transparent`}
                      onClick={() => {
                        // setStart(true);
                        document
                          .getElementById(`my_modal_${chapter.id}`)
                          .showModal();
                      }}
                    >
                      <div className={`${classes.course} relative`}>
                        {is_teacher && (
                          <button
                            className="absolute right-1 top-0 px-1 text-xl hover:text-2xl hover:text-red-600 hover:transition-all hover:duration-200"
                            onClick={async () => {
                              await handleChapterDelete(chapter.id);
                            }}
                          >
                            &times;
                          </button>
                        )}
                        <div className={`${classes.courseTitle}`}>
                          Chapitre {chapter.number}
                        </div>
                        <div className={`${classes.courseDesc}`}>
                          {chapter.name}
                        </div>
                      </div>
                    </button>
                    <ChapitreModal chapitre={chapter} start={start} />
                  </React.Fragment>
                ))}

                {is_teacher ? (
                  <>
                    <div className={`${classes.course}`}>
                      <button
                        className={`${classes.courseTitle}`}
                        onClick={() =>
                          document
                            .getElementById("chapitre_add_modal")
                            .showModal()
                        }
                      >
                        Ajouter
                      </button>
                      <div className={`${classes.courseDesc}`}></div>
                    </div>
                    <ChapitreAdd_Modal subjectId={subjectId} />
                  </>
                ) : (
                  ""
                )}
              </div>
            </main>

            {is_student && (
              <div className={`${classes.addNote}  z-10 grid bg-transparent`}>
                {clipBoardOpened ? (
                  <>
                    <div className="flex flex-col items-center space-y-2">
                      <textarea
                        className="daisy-textarea daisy-textarea-bordered daisy-textarea-info daisy-textarea-lg mx-4 h-full  w-80 max-w-xs bg-inherit focus:bg-white"
                        placeholder="Write your notes "
                        // defaultValue={note}
                        value={noteInput}
                        onChange={(e) => setNoteInput(e.target.value)}
                      ></textarea>
                      <button
                        className="daisy-btn daisy-btn-info bg-inherit "
                        onClick={async () => {
                          if (noteInput.length != 0) {
                            await handleNoteSave();
                            noteSaved &&
                              setClipBoardOpened((clicked) => !clicked);
                          }
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
            )}
          </>
        )}
      </Container>
    </div>
  );
};

export default Subject;
