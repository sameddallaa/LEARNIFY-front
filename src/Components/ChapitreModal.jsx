import axios from "axios";
import React, { useEffect, useState } from "react";
import TextInputLoading from "./Sub Components/TextInputLoading";
import { Link } from "react-router-dom";

function ChapitreModal({ chapitre }) {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [cours, setCours] = useState([]);
  const [td, setTd] = useState([]);
  const [tp, setTp] = useState([]);
  useEffect(
    () =>
      async function fetchCours() {
        const coursEndPoint = `https://elearn-n48v.onrender.com/api/ressources/cours/${chapitre.subject}/${chapitre.number}/`;
        const tdEndPoint = `https://elearn-n48v.onrender.com/api/ressources/td/${chapitre.subject}/${chapitre.number}/`;
        const tpEndPoint = `https://elearn-n48v.onrender.com/api/ressources/tp/${chapitre.subject}/${chapitre.number}/`;

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
      },
    [],
  );
  return (
    <>
      <dialog
        id={`my_modal_${chapitre.number}`}
        className="daisy-modal backdrop-blur-sm"
      >
        <div className="daisy-modal-box  relative mt-8 h-screen  w-11/12 max-w-5xl border-[8px] border-black bg-[#A5BED7] shadow-xl shadow-stone-400">
          <h2 className=" font-bold">{chapitre.name}</h2>
          <div className="space-y-1 pt-10">
            {cours.length != 0 && (
              <div id="Cours">
                <p className="border-b-2 border-black text-start">Cours</p>
                <div>
                  {cours?.map((cours) => (
                    <React.Fragment key={cours.id}>
                      <div className="grid grid-cols-4 items-baseline ">
                        <a className=" flex justify-start pl-4  text-center text-[#009898] underline">
                          {cours.title}
                        </a>
                        <div className="col-start-4 flex items-baseline justify-evenly space-x-10 py-2 ">
                          {/* <p className="">1.4 MB</p> */}
                          <Link
                            to={cours.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link>
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
                        <a className=" flex justify-start pl-4  text-center text-[#009898] underline">
                          {td.title}
                        </a>
                        <div className="col-start-4 flex items-baseline justify-evenly space-x-10 py-2 ">
                          {/* <p className="">1.4 MB</p> */}
                          <Link
                            to={td.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link>
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
                        <a className=" flex justify-start pl-4  text-center text-[#009898] underline">
                          {tp.title}
                        </a>
                        <div className="col-start-4 flex items-baseline justify-evenly space-x-10 py-2 ">
                          {/* <p className="">1.4 MB</p> */}
                          <Link
                            to={tp.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link>
                        </div>
                      </div>
                    </React.Fragment>
                  ))}
                </div>
              </div>
            )}

            <div id="Devoirs">
              <p className="border-b-2 border-black text-start">Devoirs</p>
              <div>
                <div className="grid grid-cols-4 items-baseline ">
                  <a className=" flex justify-start pl-4  text-center text-[#009898] underline"></a>
                  <div className="col-start-4 flex items-baseline justify-evenly space-x-10 py-2 ">
                    {/* <p className="">1.4 MB</p> */}
                    {/* <Link
                      to={cours.content}
                      target="_blank"
                      download
                      className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] "
                    >
                      Download
                    </Link> */}
                  </div>
                </div>
              </div>

              <div id="Quizzes">
                <p className="border-b-2 border-black text-start">Quizzes</p>
                <div>
                  <div className="grid grid-cols-4 items-baseline ">
                    <a className=" flex justify-start pl-4  text-center text-[#009898] underline"></a>
                    <div className="col-start-4 flex items-baseline justify-evenly space-x-10 py-2 ">
                      {/* <p className="">1.4 MB</p> */}
                      {/* <Link
                            to={cours.content}
                            target="_blank"
                            download
                            className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] "
                          >
                            Download
                          </Link> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <form
            method="dialog"
            className="daisy-modal-backdrop flex justify-center"
          >
            <button className="daisy-btn daisy-btn-outline daisy-btn-error absolute bottom-5 w-48">
              Close
            </button>
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
