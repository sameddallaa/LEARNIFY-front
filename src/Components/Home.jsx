import React, { useContext, useEffect, useRef, useState } from "react";
import classes from "../CSS/Home.module.css";
import { Button, Container } from "react-bootstrap";
import logoImg from "../assets/img/main.svg";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../Contexts/AuthContext";
import img from "../assets/img/girlImg.svg";
import axios from "axios";
const Home = () => {
  // const navigate = useNavigate();
  // const { user } = useContext(AuthContext); // need to be connected in order to access Home
  // console.log(user);
  // useEffect(() => {
  //   !user && navigate("/");
  // }, [user]);

  const token = JSON.parse(localStorage.getItem("tokens"));
  const { user } = useContext(AuthContext);
  const { is_student, is_teacher } = user;
  const is_admin = user && !is_student && !is_teacher;
  const { year } = user;
  // const newsEndpoint = `https://elearn-n48v.onrender.com/api/news/${Number(year)}/ `;
  const newsEndpoint = `${!is_admin ? `http://localhost:8000/api/news/${Number(year)}/` : `http://localhost:8000/api/ressources/news/`}`;

  const [news, setNews] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [yearNews, setYearNews] = useState(1);

  const [addOpened, setaddOpened] = useState(false);

  async function handleFetchNews() {
    try {
      const res = await axios.get(newsEndpoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      if (res.status == 200) {
        const data = await res.data;
        console.log("data news : ", data);
        setNews(data);
      } else {
        throw new Error("Someting went wrong !");
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  const titleRef = useRef("");
  const contentRef = useRef("");
  const fileRef = useRef(null);

  const handleSubmit = async (e, year) => {
    e.preventDefault();
    const post = {
      title: title,
      body: description,
      image: image,
      attachment: file,
      year: year,
    };
    const endpoint = `http://localhost:8000/api/news/${yearNews}/`;
    const response = await axios.post(endpoint, post, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: "Bearer " + token.access,
      },
    });
    if (response.status === 200) {
      const data = response.data;
      console.log(data);
      setaddOpened(false);
    }
  };

  useEffect(() => {
    handleFetchNews();
  }, []);

  return (
    <div className="overflow-auto bg-cyanT">
      {/* <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl">
        Actualités
      </h1> */}
      <h3 className="ml-8 mt-8 border-b-2 border-black pb-2 tracking-widest">
        Les actuatliés
      </h3>
      <main className={`${classes.main} flex items-center justify-center`}>
        <ul
          id="news"
          className={`w-auto min-w-full space-y-10 ${addOpened && "blur-sm"} transition-all duration-150 `}
        >
          {news.map((nvl) => (
            <React.Fragment key={nvl.id}>
              <li className="hover:trasition-all relative mx-32   flex  space-x-10  rounded-badge px-3 py-2 shadow-xl shadow-stone-600 hover:mx-10 hover:duration-700">
                {/* {nvl.img && ( */}
                <img
                  className=" h-20  w-auto  max-w-64 rounded-box border-2 border-stone-600 object-cover p-3"
                  alt="Picture"
                  src={nvl.image || img}
                />
                {/* )} */}

                <div id="content" className="space-y-1 ">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {nvl.title}
                  </h3>
                  <p className=" mb-3 break-words text-start text-sm text-gray-700 md:text-base ">
                    {nvl.body}
                  </p>
                  {nvl.attachment && (
                    <a href={`${nvl.attachment}`} download={"filename"}>
                      <button
                        className={`daisy-btn daisy-btn-info  absolute bottom-4 right-10 tracking-wider text-white ${addOpened && "border-none bg-inherit"} `}
                      >
                        Télecharger
                      </button>
                    </a>
                  )}
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>

        {is_admin && (
          <div
            className={`${classes.addNews}  z-10 grid bg-transparent`}
            id="ajouter_une_actualité"
          >
            {addOpened ? (
              <>
                <div
                  className="flex flex-col items-center space-y-4"
                  id="ajouterNews"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <textarea
                      className="daisy-textarea daisy-textarea-bordered daisy-textarea-info daisy-textarea-lg mx-4 h-auto min-h-fit w-80 max-w-xs overflow-hidden bg-inherit bg-white "
                      placeholder="Title "
                      onChange={(e) => setTitle(e.target.value)}
                      value={title}
                    ></textarea>
                    <textarea
                      className="daisy-textarea daisy-textarea-bordered daisy-textarea-info daisy-textarea-lg mx-4 h-full w-80  max-w-xs bg-inherit bg-white text-base"
                      placeholder="Description "
                      onChange={(e) => setDescription(e.target.value)}
                      value={description}
                    ></textarea>

                    <select
                      className="daisy-select daisy-select-ghost daisy-select-info w-full max-w-xs bg-inherit bg-white text-center text-black"
                      onChange={(e) => setYearNews(e.target.value)}
                      defaultValue={1}
                    >
                      <option value={1}>1CPI</option>
                      <option value={2}>2CPI</option>
                      <option value={3}>1CS</option>
                      <option value={4}>2CS</option>
                      <option value={5}>3CS</option>
                    </select>
                  </div>

                  <div className="space-y- mt-1 flex flex-col space-y-2">
                    <label className="daisy-form-control w-full max-w-xs">
                      <div className="daisy-label">
                        <span className="daisy-label-text">
                          Uploader une photo
                        </span>
                      </div>
                      <input
                        type="file"
                        className="daisy-file-input daisy-file-input-bordered daisy-file-input-info daisy-file-input-sm w-full max-w-xs bg-white"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                    <label className="daisy-form-control w-full max-w-xs">
                      <div className="daisy-label">
                        <span className="daisy-label-text text-black">
                          Uploader un fichier pdf
                        </span>
                      </div>
                      <input
                        type="file"
                        className="daisy-file-input daisy-file-input-bordered daisy-file-input-info daisy-file-input-sm w-full max-w-xs bg-white"
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                    </label>
                  </div>
                  <div className="flex space-x-6">
                    <button
                      className="daisy-btn daisy-btn-info bg-white "
                      onClick={() => setaddOpened((clicked) => !clicked)}
                    >
                      Close
                    </button>

                    <button
                      className="daisy-btn daisy-btn-info bg-white "
                      onClick={(e) => {
                        if (title && description) {
                          handleSubmit(e);
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <button
                className={`${classes.addNote} daisy-btn daisy-btn-info z-10 border-none  text-white`}
                onClick={() => setaddOpened((opened) => !opened)}
              >
                + Ajouter
              </button>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Home;

// import React, { useContext, useEffect, useState } from "react";
// import classes from "../CSS/Home.module.css";
// import { Container } from "react-bootstrap";
// import logoImg from "../assets/img/main.svg";
// import { Link, useNavigate } from "react-router-dom";
// import AuthContext from "../Contexts/AuthContext";
// import img from "../assets/img/girlImg.svg";
// import axios from "axios";
// const Home = () => {
//   // const navigate = useNavigate();
//   // const { user } = useContext(AuthContext); // need to be connected in order to access Home
//   // console.log(user);
//   // useEffect(() => {
//   //   !user && navigate("/");
//   // }, [user]);

//   const token = JSON.parse(localStorage.getItem("tokens"));
//   const { user } = useContext(AuthContext);
//   const { year } = user;
//   const newsEndpoint = `https://elearn-n48v.onrender.com/api/news/${Number(year)}/ `;

//   const [news, setNews] = useState([]);

//   async function handleFetchNews() {
//     try {
//       const res = await axios.get(newsEndpoint, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: "Bearer " + token.access,
//         },
//       });
//       if (res.status == 200) {
//         const data = await res.data;
//         console.log("data news : ", data);
//         setNews(data);
//       } else {
//         throw new Error("Someting went wrong !");
//       }
//     } catch (err) {
//       console.log(err.message);
//     }
//   }

//   useEffect(() => {
//     handleFetchNews();
//   }, []);

//   return (
//     <div className="overflow-auto bg-cyanT">
//       <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl">
//         Actualités
//       </h1>
//       <main className={`${classes.main} flex items-center justify-center`}>
//         <ul id="news" className="w-auto min-w-full space-y-10 ">
//           <li className="hover:trasition-all relative flex   space-x-10  rounded-badge  px-3 py-2 shadow-xl shadow-stone-600 hover:mx-10 hover:duration-700">
//             <img
//               className=" w-auto max-w-64 rounded-box  border-2 border-stone-600 object-cover p-3"
//               alt="Picture"
//               src={img}
//             />

//             <div id="content" className="space-y-1 ">
//               <h3 className="text-xl font-semibold md:text-2xl">
//                 Un Programme de Sensibilisation à l'Environnement Lancé dans une
//                 École de Lyon
//               </h3>
//               <p className=" mb-3 break-words text-start text-sm text-gray-700 md:text-base ">
//                 L'école primaire Saint-Exupéry à Lyon a inauguré un programme de
//                 sensibilisation à l'environnement. Les élèves participeront à
//                 des ateliers sur le recyclage, la conservation de l'eau et la
//                 protection de la biodiversité tout au long de l'année scolaire.
//               </p>
//               <button className="daisy-btn daisy-btn-info  absolute bottom-4 right-10 tracking-wider text-white ">
//                 Download
//               </button>
//             </div>
//           </li>{" "}
//           <li className="hover:trasition-all relative flex   space-x-10  rounded-badge  px-3 py-2 shadow-xl shadow-stone-600 hover:mx-10 hover:duration-700">
//             <img
//               className=" w-auto max-w-64 rounded-box  border-2 border-stone-600 object-cover p-3"
//               alt="Picture"
//               src={img}
//             />

//             <div id="content" className="space-y-1 ">
//               <h3 className="text-xl font-semibold md:text-2xl">
//                 Ouverture d'une Nouvelle École Innovante à Marseille
//               </h3>
//               <p className=" mb-3 break-words text-start text-sm text-gray-700 md:text-base ">
//                 Une nouvelle école innovante, "École des Futurs", a ouvert ses
//                 portes à Marseille ce lundi. Axée sur les technologies
//                 émergentes et l'apprentissage personnalisé, elle promet de
//                 révolutionner l'éducation dans la région.
//               </p>
//               <button className="daisy-btn daisy-btn-info  absolute bottom-4 right-10 tracking-wider text-white ">
//                 Download
//               </button>
//             </div>
//           </li>
//         </ul>
//       </main>
//     </div>
//   );
// };

// export default Home;
