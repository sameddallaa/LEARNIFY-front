import axios from "axios";
import React, { useEffect, useState } from "react";

function QuizzModel({ idQuizz, questions, is_student, endPoint }) {
  const totalPages = questions.length;
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [actifPage, setActifPage] = useState(1);
  const [firstPage, setFirstPage] = useState(true);
  const [lastPage, setLastPage] = useState(false);
  const [quizzes, setQuizzes] = useState([]);

  // useEffect(() => {
  //   async function fetchQuizzes() {
  //     try {
  //       const res = await axios.get(endPoint, {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + token.access,
  //         },
  //       });
  //       if (res.status == 200) {
  //         const data = await res.data;
  //         console.log("data quizzes : ", data);
  //         setQuizzes(data);
  //       } else {
  //         throw new Error("Someting went wrong !");
  //       }
  //     } catch (err) {
  //       console.log(err.message);
  //     }
  //   }

  //   fetchQuizzes();
  // }, []);

  useEffect(() => {
    if (actifPage === 1) {
      setFirstPage(true);
    } else setFirstPage(false);

    if (actifPage === questions.length) {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
  }, [actifPage]);

  return (
    <dialog id={`quizzes_modal_${idQuizz}`} className="daisy-modal ">
      <div className="daisy-modal-box flex h-auto w-auto space-y-5 bg-[#A5BED7] shadow-md shadow-stone-400">
        <div id="question" className="flex flex-col text-start text-lg ">
          <p className="font-mono">
            {questions[actifPage - 1]?.id}- {questions[actifPage - 1]?.content}
          </p>
          <div id="options" className="flex flex-col items-start  space-y-6">
            <div id="option" className="flex items-center space-x-4 ">
              <input
                type="checkbox"
                className="daisy-checkbox-success daisy-checkbox rounded-full"
              />
              <span>Reponse 1</span>
            </div>{" "}
            <div id="option" className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="daisy-checkbox-success daisy-checkbox rounded-full"
              />
              <span>Reponse 2</span>
            </div>
            <div id="option" className="flex items-center space-x-4">
              <input
                type="checkbox"
                className="daisy-checkbox-success daisy-checkbox rounded-full "
              />
              <span>Reponse 3</span>
            </div>
          </div>

          <div id="buttons" className="mt-6 flex justify-between">
            <button
              className={`daisy-btn w-auto min-w-fit border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6] ${firstPage && "opacity-0"}`}
              onClick={() => {
                setActifPage((p) => p - 1);
              }}
            >
              Précédente
            </button>

            {lastPage ? (
              <>
                {is_student && (
                  <button
                    className={`daisy-btn w-auto min-w-fit border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6]`}
                    onClick={() => {
                      setActifPage((p) => p + 1);
                    }}
                  >
                    Valider
                  </button>
                )}
              </>
            ) : (
              <button
                className={`daisy-btn w-auto min-w-fit border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6]`}
                onClick={() => {
                  setActifPage((p) => p + 1);
                }}
              >
                Suivante
              </button>
            )}
          </div>
          <div className="daisy-join justify-center tracking-widest">
            {Array.from({ length: totalPages }).map((page, i) => (
              <React.Fragment key={i}>
                <button
                  className={`daisy-btn daisy-join-item  ${actifPage == i + 1 ? "daisy-btn-active bg-[#00b6ff] text-black hover:bg-[#00b6ff] " : "text-white"}`}
                  onClick={() => {
                    setActifPage(i + 1);
                  }}
                >
                  {i + 1}
                </button>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
      <form method="dialog" className="daisy-modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default QuizzModel;
