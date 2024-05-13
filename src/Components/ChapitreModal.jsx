import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import TextInputLoading from "./Sub Components/TextInputLoading";
import { Link } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import BtnDelete from "./Sub Components/BtnDelete";
import DevoirC from "./Sub Components/RessourcesADD/DevoirC";
import Quizz from "./Sub Components/RessourcesADD/Quizz";
import RessourceClassique from "./Sub Components/RessourcesADD/RessourceClassique";
import AutreRessource from "./Sub Components/RessourcesADD/AutreRessource";

function ChapitreModal({ chapitre }) {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [cours, setCours] = useState([]);
  const [td, setTd] = useState([]);
  const [tp, setTp] = useState([]);
  const [devoir, setDevoir] = useState([]);
  const [selected, setSelected] = useState(-1);
  const { user } = useContext(AuthContext);
  const { is_teacher, is_student } = user;

  async function handleDelete(endPoint) {
    try {
      const res = await axios.delete(endPoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(
    () =>
      async function fetchCours() {
        const coursEndPoint = `https://elearn-n48v.onrender.com/api/ressources/cours/${chapitre.subject}/${chapitre.number}/`;
        const tdEndPoint = `https://elearn-n48v.onrender.com/api/ressources/td/${chapitre.subject}/${chapitre.number}/`;
        const tpEndPoint = `https://elearn-n48v.onrender.com/api/ressources/tp/${chapitre.subject}/${chapitre.number}/`;
        const devoirEndPoint = `https://elearn-n48v.onrender.com/api/ressources/homework/${chapitre.subject}/${chapitre.number}/`;
        // const coursEndPoint = `http://localhost:8000/api/ressources/cours/${chapitre.subject}/${chapitre.number}/`;
        // const tdEndPoint = `http://localhost:8000/api/ressources/td/${chapitre.subject}/${chapitre.number}/`;
        // const tpEndPoint = `http://localhost:8000/api/ressources/tp/${chapitre.subject}/${chapitre.number}/`;
        // const devoirEndPoint = `http://localhost:8000/api/ressources/homework/${chapitre.subject}/${chapitre.number}/`;

        try {
          const res = await axios.get(coursEndPoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.access,
            },
          });
          const data = res.data;
          console.log("Cours :");
          console.log(data);
          setCours(data);
        } catch (err) {
          console.log(err.message);
        }

        try {
          const res = await axios.get(tdEndPoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.access,
            },
          });
          const data = res.data;
          console.log("Td :", chapitre.number);
          console.log(data);
          setTd(data);
        } catch (err) {
          console.log(err.message);
        }

        try {
          const res = await axios.get(tpEndPoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.access,
            },
          });
          const data = res.data;
          console.log("TP :");
          console.log(data);
          setTp(data);
        } catch (err) {
          console.log(err.message);
        }

        try {
          const res = await axios.get(devoirEndPoint, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token.access,
            },
          });
          const data = res.data;
          console.log("Devoir :");
          console.log(data);
          setDevoir(data);
        } catch (err) {
          console.log(err.message);
        }
      },
    [],
  );
  return (
    <>
      <dialog
        id={`my_modal_${chapitre.number}`}
        className="daisy-modal  backdrop-blur-sm"
      >
        <div className="daisy-modal-box  relative mt-8 h-screen w-11/12  max-w-5xl overflow-y-auto  overflow-x-hidden border-[8px] border-black bg-[#A5BED7] shadow-xl shadow-stone-400">
          <h2 className=" font-bold">{chapitre.name}</h2>
          <div className="space-y-1 pt-10 ">
            {cours.length != 0 && (
              <div id="Cours">
                <p className="border-b-2 border-black text-start">Cours</p>
                <div>
                  {cours?.map((cours) => (
                    <React.Fragment key={cours.id}>
                      <div className="grid grid-cols-4 items-baseline ">
                        <a className=" flex justify-start pl-4  text-center text-[#26a69a] underline">
                          {cours.title}
                        </a>
                        <div className="col-start-4 flex items-baseline justify-evenly space-x-2 py-2 ">
                          {/* <p className="">1.4 MB</p> */}
                          <Link
                            to={cours.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#26a69a] bg-[#26a69a] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link>
                          {is_teacher && (
                            <button
                              className="daisy-btn daisy-btn-error py-1 tracking-widest text-white"
                              onClick={async () =>
                                handleDelete(
                                  `https://elearn-n48v.onrender.com/api/ressources/courses/${cours.id}/delete/`,
                                )
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}
            {td.length != 0 && (
              <div id="TDs">
                <p className="border-b-2 border-black text-start">TD</p>
                <div className="space-y-1">
                  {td?.map((td) => (
                    <React.Fragment key={td.id}>
                      <div
                        className="grid grid-cols-4 items-baseline "
                        id="td1"
                      >
                        <a className=" flex justify-start pl-4  text-center text-[#26a69a] underline">
                          {td.title}
                        </a>
                        <div className="col-start-4 flex items-baseline justify-evenly space-x-2 py-2 ">
                          {/* <p className="">1.4 MB</p> */}
                          <Link
                            to={td.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#26a69a] bg-[#26a69a] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link>
                          {is_teacher && (
                            <button
                              className="daisy-btn daisy-btn-error py-1 tracking-widest text-white"
                              onClick={async () =>
                                handleDelete(
                                  `https://elearn-n48v.onrender.com/api/ressources/td/${td.id}/delete/`,
                                )
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {tp.length != 0 && (
              <div id="TPs">
                <p className="border-b-2 border-black text-start">TP</p>
                <div className="space-y-1">
                  {tp?.map((tp) => (
                    <React.Fragment key={tp.id}>
                      <div className="grid grid-cols-4 items-baseline" id="tp1">
                        <a className=" flex justify-start pl-4  text-center text-[#26a69a] underline">
                          {tp.title}
                        </a>
                        <div className="col-start-4 flex items-baseline justify-evenly space-x-2 py-2 ">
                          {/* <p className="">1.4 MB</p> */}
                          <Link
                            to={tp.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#26a69a] bg-[#26a69a] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link>
                          {is_teacher && (
                            <button
                              className="daisy-btn daisy-btn-error py-1 tracking-widest text-white"
                              onClick={async () =>
                                handleDelete(
                                  `https://elearn-n48v.onrender.com/api/ressources/tp/${tp.id}/delete/`,
                                )
                              }
                            >
                              Delete
                            </button>
                          )}
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            {devoir.length != 0 && (
              <div id="Devoirs">
                <p className="border-b-2 border-black text-start">Devoirs</p>
                <div>
                  {devoir.map((devoir) => (
                    <React.Fragment key={devoir.id}>
                      <div className="grid grid-cols-4 items-baseline ">
                        <a className=" flex justify-start pl-4  text-center text-[#26a69a] underline">
                          {devoir.title}
                        </a>
                        <div className="col-start-4 flex items-baseline justify-evenly space-x-2  py-2 ">
                          {/* <p className="">1.4 MB</p> */}
                          <Link
                            to={devoir.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#26a69a] bg-[#26a69a] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link>
                          <div className="flex flex-col items-center justify-center space-y-4">
                            {is_student ? (
                              <button
                                className="daisy-btn border-[#4d8c57] bg-[#4d8c57] py-1 tracking-widest text-white hover:bg-[#3d6d44] "
                                onClick={() => {
                                  document
                                    .getElementById("devoir_modal")
                                    .showModal();
                                  // document
                                  //   .getElementById(`my_modal_${chapitre.number}`)
                                  //   .close();
                                }}
                              >
                                Upload
                              </button>
                            ) : (
                              <button
                                className="daisy-btn daisy-btn-error py-1 tracking-widest text-white "
                                onClick={async () =>
                                  handleDelete(
                                    `https://elearn-n48v.onrender.com/api/ressources/devoir/${devoir.id}/delete/`,
                                  )
                                }
                              >
                                Delete
                              </button>
                            )}
                            <span className="daisy-countdown font-mono ">
                              <span style={{ "--value": 10 }}></span>j
                              <span style={{ "--value": 24 }}></span>h
                              <span style={{ "--value": 46 }}></span>s
                            </span>
                          </div>
                          <dialog id="devoir_modal" className="daisy-modal ">
                            <div className="daisy-modal-box flex w-fit flex-col items-center justify-center  space-y-5 bg-[#A5BED7] shadow-md shadow-stone-400">
                              {/* <h3 className="text-center text-lg font-bold">
                                Upload your file
                              </h3> */}
                              <input
                                type="file"
                                className="daisy-file-input daisy-file-input-bordered daisy-file-input-info  w-full max-w-xs bg-white"
                              />
                              <button className="daisy-btn border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6] ">
                                Save
                              </button>
                            </div>
                            <form
                              method="dialog"
                              className="daisy-modal-backdrop"
                            >
                              <button>close</button>
                            </form>
                          </dialog>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <div id="Quizzes">
              <p className="border-b-2 border-black text-start">Quizzes</p>
              <div>
                <div className="grid grid-cols-4 items-baseline ">
                  <a className=" flex justify-start pl-4  text-center text-[#26a69a] underline">
                    Quizz1.pdf
                  </a>
                  <div className="col-start-4 flex items-baseline justify-evenly space-x-10 py-2 ">
                    <button
                      className="daisy-btn border-[#26a69a] bg-[#26a69a] py-1 tracking-widest text-white hover:bg-[#017676] "
                      onClick={() => {
                        document.getElementById("quizzes_modal").showModal();
                      }}
                    >
                      Start
                    </button>

                    {is_teacher && (
                      <button
                        className="daisy-btn daisy-btn-error py-1 tracking-widest text-white"
                        onClick={async () =>
                          handleDelete(
                            `https://elearn-n48v.onrender.com/api/ressources/quizzes/QUIZZ_ID/delete/`,
                          )
                        }
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  <dialog id="quizzes_modal" className="daisy-modal ">
                    <div className="daisy-modal-box flex h-auto w-auto space-y-5 bg-[#A5BED7] shadow-md shadow-stone-400">
                      <div
                        id="question"
                        className="flex flex-col text-start text-lg "
                      >
                        <p className="font-mono">
                          2-Question 2 .....................................
                        </p>
                        <div
                          id="options"
                          className="flex flex-col items-start  space-y-6"
                        >
                          <div
                            id="option"
                            className="flex items-center space-x-4 "
                          >
                            <input
                              type="checkbox"
                              className="daisy-checkbox-success daisy-checkbox rounded-full"
                            />
                            <span>Reponse 1</span>
                          </div>{" "}
                          <div
                            id="option"
                            className="flex items-center space-x-4"
                          >
                            <input
                              type="checkbox"
                              className="daisy-checkbox-success daisy-checkbox rounded-full"
                            />
                            <span>Reponse 2</span>
                          </div>
                          <div
                            id="option"
                            className="flex items-center space-x-4"
                          >
                            <input
                              type="checkbox"
                              className="daisy-checkbox-success daisy-checkbox rounded-full "
                            />
                            <span>Reponse 3</span>
                          </div>
                        </div>
                        <div id="buttons" className="mt-6 flex justify-between">
                          <button className="daisy-btn w-1/4 border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6]">
                            Précédente
                          </button>
                          <button className="daisy-btn w-1/4 border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6]">
                            Suivante
                          </button>
                        </div>
                        <div className="daisy-join justify-center tracking-widest">
                          <button className="daisy-btn daisy-join-item text-white">
                            1
                          </button>
                          <button className="daisy-btn daisy-join-item daisy-btn-active bg-inherit text-black hover:bg-inherit">
                            2
                          </button>
                          <button className="daisy-btn daisy-join-item text-white">
                            3
                          </button>
                          <button className="daisy-btn daisy-join-item text-white">
                            4
                          </button>
                        </div>
                      </div>
                    </div>
                    <form method="dialog" className="daisy-modal-backdrop">
                      <button>close</button>
                    </form>
                  </dialog>
                </div>
              </div>
            </div>

            <div id="Autre">
              <p className="border-b-2 border-black text-start">
                Autre ressources
              </p>
              <div className="space-y-1">
                <div className="flex justify-between">
                  <a
                    className=" flex justify-start pl-4  text-center text-[#26a69a] underline"
                    href="https://elearn-n48v.onrender.com/swagger-ui/"
                  >
                    https://elearn-n48v.onrender.com/swagger-ui/
                  </a>

                  {is_teacher && (
                    <button
                      className="daisy-btn daisy-btn-error mr-4 py-1 tracking-widest text-white"
                      onClick={async () =>
                        handleDelete(
                          `https://elearn-n48v.onrender.com/api/ressources/quizzes/QUIZZ_ID/delete/`,
                        )
                      }
                    >
                      Delete
                    </button>
                  )}
                </div>

                <a className=" flex justify-start pl-4  text-center text-[#26a69a] underline"></a>
              </div>
            </div>
          </div>

          {is_teacher && (
            <dialog id="modal_add_ressource" className="daisy-modal">
              <div className="daisy-modal-box flex h-auto w-auto min-w-fit space-y-10 bg-[#A5BED7] shadow-md shadow-stone-400">
                <div>
                  <select
                    className="daisy-select daisy-select-info w-full max-w-xs   bg-inherit"
                    onChange={(e) => setSelected(parseInt(e.target.value))}
                    defaultValue={0}
                  >
                    <option value={0} disabled>
                      Select a ressource
                    </option>
                    <option value={1}>Cours</option>
                    <option value={2}>TD</option>
                    <option value={3}>TP</option>
                    <option value={4}>Devoir</option>
                    <option value={5}>Quizz</option>
                    <option value={6}>Autre</option>
                  </select>

                  <div>
                    {selected === 1 && <RessourceClassique endPoint="" />}
                    {selected === 2 && <RessourceClassique endPoint="" />}
                    {selected === 3 && <RessourceClassique endPoint="" />}
                    {selected === 4 && <DevoirC />}
                    {selected === 5 && <Quizz />}
                    {selected === 6 && <AutreRessource />}
                  </div>
                </div>
              </div>
              <form method="dialog" className="daisy-modal-backdrop">
                <button>close</button>
              </form>
            </dialog>
          )}

          <form
            method="dialog"
            className="daisy-modal-backdrop  justify-center"
          >
            <div className="space-x-4">
              {is_teacher && (
                <button
                  className="daisy-btn daisy-btn-outline daisy-btn-info  mt-10 w-48 min-w-40"
                  onClick={() =>
                    document.getElementById("modal_add_ressource").showModal()
                  }
                >
                  Ajouter
                </button>
              )}
              <button className="daisy-btn daisy-btn-outline daisy-btn-error  mt-10 w-48 min-w-40">
                Close
              </button>
            </div>
          </form>
          {/* <p className="py-4">Press ESC key or click outside to close</p> */}
        </div>
        <form method="dialog" className="daisy-modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

export default ChapitreModal;
