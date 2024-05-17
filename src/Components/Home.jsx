import React, { useContext, useEffect, useState } from "react";
import classes from "../CSS/Home.module.css";
import { Container } from "react-bootstrap";
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
  const { year } = user;
  const newsEndpoint = `https://elearn-n48v.onrender.com/api/news/${Number(year)}/ `;

  const [news, setNews] = useState([]);

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

  useEffect(() => {
    handleFetchNews();
  }, []);

  return (
    <div className="overflow-auto bg-cyanT">
      <h1 className="mt-8 text-center text-3xl font-bold md:text-4xl">
        Actualités
      </h1>
      <main className={`${classes.main} flex items-center justify-center`}>
        <ul id="news" className="w-auto min-w-full space-y-10 ">
          {news.map((nvl) => (
            <React.Fragment key={nvl.id}>
              <li className="hover:trasition-all relative flex   space-x-10  rounded-badge  px-3 py-2 shadow-xl shadow-stone-600 hover:mx-10 hover:duration-700">
                <img
                  className=" w-auto max-w-64 rounded-box  border-2 border-stone-600 object-cover p-3"
                  alt="Picture"
                  src={nvl.image}
                />

                <div id="content" className="space-y-1 ">
                  <h3 className="text-xl font-semibold md:text-2xl">
                    {nvl.title}
                  </h3>
                  <p className=" mb-3 break-words text-start text-sm text-gray-700 md:text-base ">
                    {nvl.body}
                  </p>
                  <button className="daisy-btn daisy-btn-info  absolute bottom-4 right-10 tracking-wider text-white ">
                    Download
                  </button>
                </div>
              </li>
            </React.Fragment>
          ))}
        </ul>
      </main>
    </div>
  );
};

export default Home;
