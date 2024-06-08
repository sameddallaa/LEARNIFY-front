import React, { useContext, useEffect, useState } from "react";
import classes from "../CSS/Home.module.css";
import AjouterAssistant from "./Sub Components/AjouterAssistant";
import AjouterResponsable from "./Sub Components/AjouterResponsable";
import { FcDeleteRow } from "react-icons/fc";
import AuthContext from "../Contexts/AuthContext";
import axios from "axios";

function Module() {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const nomModule = localStorage.getItem("module_nom");
  const year = parseInt(localStorage.getItem("module_year"));
  const idModule = parseInt(localStorage.getItem("module_id"));
  const [mainTeacher, setMainTeacher] = useState({});
  const [assistantTeachers, setAssistantTeachers] = useState([]);
  const [allTeachers, setAllTeachers] = useState([]);

  console.log(mainTeacher);
  console.log(assistantTeachers);

  async function fetchTeachers() {
    try {
      const endPoint = `http://localhost:8000/api/ressources/subjects/year/${year}`;
      const res = await axios.get(endPoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });

      if (res.status != 200)
        throw new Error("Something went wrong , please try again later ! ");
      const data = await res.data.filter((module) => module.id == idModule)[0];

      setAllTeachers(data.teachers);
      console.log(data);
      await setMainTeacher({
        id: data.main_teacher,
        name: data.teacher_name,
        email: data.teacher_email,
        grade: data.teacher_degree,
      });

      setAssistantTeachers(
        data.teachers.filter((teacher) => teacher.id != data.main_teacher),
      );
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleDeleteTeacher(id) {
    try {
      // await setAllTeachers((teachers) =>
      //   teachers.filter((teacher) => teacher.id != id),
      // );
      const endPoint = `http://localhost:8000/api/ressources/subjects/${year}/detail`;
      const put = {
        teachers: [5, 9, 3],
      };

      const res = await axios.put(endPoint, put, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      console.log("res : ");
      console.log(res);
      // if (res.status != 204)
      //   throw new Error(
      //     "Something wrong has happened , please try again later !",
      //   );
      // window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    fetchTeachers();
  }, []);
  return (
    <>
      <main className={`${classes.main} space-y-20 bg-cyanT`}>
        <h2>{nomModule}</h2>
        <div id="Tableaux" className="flex justify-around space-x-32">
          <div
            className=" flex flex-col items-center justify-center space-y-10 overflow-x-auto"
            id="Tableau1"
          >
            <table className="daisy-table daisy-table-lg">
              <thead className="text-black">
                <tr className="text-center">
                  <th></th>
                  <th>Email enseignant</th>
                  <th>Nom</th>
                  <th>Titre</th>
                </tr>
              </thead>
              <tbody>
                {mainTeacher && (
                  <tr>
                    <th>
                      <button
                        className="text-2xl transition-all duration-200 hover:text-3xl"
                        onClick={() => handleDeleteTeacher(mainTeacher?.id)}
                      >
                        <FcDeleteRow />
                      </button>
                    </th>
                    <td>{mainTeacher?.email}</td>
                    <td>{mainTeacher.name}</td>
                    <td>{mainTeacher.grade}</td>
                  </tr>
                )}
              </tbody>
            </table>

            <button
              className="daisy-btn daisy-btn-info daisy-btn-lg w-auto max-w-fit"
              onClick={() => document.getElementById("Responsable").showModal()}
            >
              Ajouter un responsable de cours
            </button>
          </div>
          <div
            className="flex flex-col items-center space-y-10 overflow-x-auto"
            id="Tableau2"
          >
            <table className="daisy-table daisy-table-lg">
              <thead className="text-black">
                <tr className="text-center">
                  <th></th>
                  <th>Email enseignant</th>
                  <th>Nom</th>
                  <th>Titre</th>
                </tr>
              </thead>
              <tbody>
                {assistantTeachers?.map((teacher, i) => (
                  <React.Fragment key={i}>
                    <tr>
                      <th>
                        <button
                          className="text-2xl transition-all duration-200 hover:text-3xl"
                          onClick={() => handleDeleteTeacher(teacher.id)}
                        >
                          <FcDeleteRow />
                        </button>
                      </th>
                      <td>{teacher.email}</td>
                      <td>{teacher.name}</td>
                      <td>{teacher.degree}</td>
                    </tr>
                  </React.Fragment>
                ))}
              </tbody>
            </table>

            <button
              className="daisy-btn daisy-btn-info daisy-btn-lg"
              onClick={() => document.getElementById("Assistant").showModal()}
            >
              Ajouter un enseignant assistant
            </button>
          </div>
        </div>
      </main>
      <AjouterResponsable idModule={idModule} />
      <AjouterAssistant idModule={idModule} />
    </>
  );
}

export default Module;
