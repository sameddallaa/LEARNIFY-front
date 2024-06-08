import axios from "axios";
import classes from "../CSS/Home.module.css";
import EnseignantSignUp_Solo from "./Sub Components/EnseignantSignUp_Solo";
import EtudiantSignUp_Solo from "./Sub Components/EtudiantSignUp_Solo";
import { FcDeleteRow } from "react-icons/fc";
import React, { useContext, useState } from "react";
import CSVSignup from "./CSVSignup";
import AuthContext from "../Contexts/AuthContext";
function Dashboard() {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [modules, setModules] = useState([]);
  const [yearClicked, setYearClicked] = useState(false);
  const [year, setYear] = useState(1);
  const [teachers, setTeachers] = useState([]);

  const [students, setStudents] = useState([]);
  const { selectedModule } = useContext(AuthContext);

  async function handleAnnée(year) {
    const endPoint = `http://localhost:8000/api/ressources/subjects/year/${year}`;
    try {
      const res = await axios.get(endPoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      console.log(res);
      if (res.status != 200)
        throw new Error("Something went wrong , please try again later ! ");
      const data = await res.data;
      console.log("Modules :");
      console.log(data);
      setModules(data);
      setYearClicked(true);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleUsersTabs(year) {
    const endPoint = `http://localhost:8000/api/ressources/years/${year}/teachers/`;

    try {
      const res = await axios.get(endPoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      console.log(res);
      if (res.status != 200)
        throw new Error("Something went wrong , please try again later ! ");
      const data = await res.data;
      console.log("Users :");
      console.log(data);
      await setTeachers(data.teachers.flat());
      await setStudents(data.students);
    } catch (err) {
      console.error(err.message);
    }
  }

  async function handleDelete(id) {
    try {
      const endPoint = `http://localhost:8000/api/users/${id}/delete`;
      const res = await axios.delete(endPoint, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      console.log(res);
      if (res.status != 204)
        throw new Error(
          "Something wrong has happened , please try again later !",
        );
      window.location.reload();
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <main
      className={` ${classes.main} relative flex flex-col items-stretch  space-y-14 bg-cyanT`}
    >
      <div
        id="promos"
        className="flex w-auto min-w-fit  justify-evenly   tracking-widest"
      >
        <button
          className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800"
          onClick={() => {
            setYear(1);
            handleAnnée(1);
            handleUsersTabs(1);
          }}
        >
          1CPI
        </button>
        <button
          className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800"
          onClick={() => {
            setYear(2);
            handleAnnée(2);
            handleUsersTabs(2);
          }}
        >
          2CPI
        </button>
        <button
          className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800"
          onClick={() => {
            setYear(3);
            handleAnnée(3);
            handleUsersTabs(3);
          }}
        >
          1CS
        </button>
        <button
          className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800"
          onClick={() => {
            setYear(4);
            handleAnnée(4);
            handleUsersTabs(4);
          }}
        >
          2CS
        </button>
        <button
          className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800"
          onClick={() => {
            setYear(5);
            handleAnnée(5);
            handleUsersTabs(5);
          }}
        >
          3CS
        </button>
      </div>

      {yearClicked && modules.length > 0 && (
        <>
          <div
            id="Modules"
            className=" inline-flex items-center justify-center  space-x-10"
          >
            <label className=" justify-start font-medium tracking-widest">
              Modules :{" "}
            </label>
            <div className=" flex   space-x-2">
              {modules?.map((module) => (
                <React.Fragment key={module.id}>
                  <a
                    className=" daisy-btn w-40 rounded-box bg-slate-300 text-xs text-black hover:bg-slate-400"
                    onClick={async () => {
                      localStorage.setItem("module_nom", module.name);
                      localStorage.setItem("module_id", module.id);
                      localStorage.setItem("module_year", year);
                      console.log("module :");
                      console.log(module);
                      window.location.href = "/module";
                    }}
                  >
                    {module.name}
                  </a>
                </React.Fragment>
              ))}
            </div>
          </div>

          <div id="Tableaux" className=" flex justify-evenly">
            <div className=" space-y-4 overflow-x-auto" id="Tableau1">
              <table className="daisy-table">
                {/* head */}
                <thead className="text-black">
                  <tr className="text-center">
                    <th></th>
                    <th>Email etudiant</th>
                    <th>Nom</th>
                    <th>Groupe</th>
                  </tr>
                </thead>
                <tbody>
                  {students?.map((student, i) => (
                    <React.Fragment key={i}>
                      <tr className="text-center">
                        <th>
                          <button
                            className="text-2xl transition-all duration-200 hover:text-3xl"
                            onClick={() => handleDelete(student.user)}
                          >
                            <FcDeleteRow />
                          </button>
                        </th>
                        <td>{student.email}</td>
                        <td>{student.full_name}</td>
                        <td>{student.group_tag}</td>
                      </tr>
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
              <div className="flex justify-between">
                <button
                  className="daisy-btn daisy-btn-info daisy-btn-xs"
                  onClick={() =>
                    document.getElementById("etudiant_solo_modal").showModal()
                  }
                >
                  Ajouter un etudiant
                </button>
                <CSVSignup userType={"students"} />
              </div>
            </div>
            <div className="space-y-4 overflow-x-auto" id="Tableau2">
              <table className="daisy-table">
                {/* head */}
                <thead className="text-black">
                  <tr className="text-center">
                    <th></th>
                    <th>Email enseignant</th>
                    <th>Nom</th>
                    <th>Titre</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers?.map((teacher, i) => (
                    <React.Fragment key={i}>
                      <tr className="text-center">
                        <th>
                          <button
                            className="text-2xl transition-all duration-200 hover:text-3xl"
                            onClick={() => handleDelete(teacher.user)}
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
              <div className="flex justify-between">
                <button
                  className="daisy-btn daisy-btn-info daisy-btn-xs"
                  onClick={() =>
                    document.getElementById("enseignant_solo_modal").showModal()
                  }
                >
                  Ajouter un enseignant
                </button>
                <CSVSignup userType={"teachers"} />{" "}
              </div>
            </div>
          </div>

          <EtudiantSignUp_Solo />
          <EnseignantSignUp_Solo />
        </>
      )}
    </main>
  );
}

export default Dashboard;
