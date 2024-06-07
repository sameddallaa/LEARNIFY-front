import classes from "../CSS/Home.module.css";
import AjouterAssistant from "./Sub Components/AjouterAssistant";
import AjouterResponsable from "./Sub Components/AjouterResponsable";
import { FcDeleteRow } from "react-icons/fc";

function Module() {
  return (
    <>
      <main className={`${classes.main} space-y-20 bg-cyanT`}>
        <h2>System d'expoitation</h2>
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
                  <th>Prénom</th>
                  <th>Titre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <button className="text-2xl transition-all duration-200 hover:text-3xl">
                      <FcDeleteRow />
                    </button>
                  </th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                </tr>

                <tr>
                  <th>
                    <button className="text-2xl transition-all duration-200 hover:text-3xl">
                      <FcDeleteRow />
                    </button>
                  </th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                </tr>

                <tr>
                  <th>
                    <button className="text-2xl transition-all duration-200 hover:text-3xl">
                      <FcDeleteRow />
                    </button>
                  </th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                </tr>
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
                  <th>Prénom</th>
                  <th>Titre</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>
                    <button className="text-2xl transition-all duration-200 hover:text-3xl">
                      <FcDeleteRow />
                    </button>
                  </th>
                  <td>Cy Ganderton</td>
                  <td>Quality Control Specialist</td>
                </tr>

                <tr>
                  <th>
                    <button className="text-2xl transition-all duration-200 hover:text-3xl">
                      <FcDeleteRow />
                    </button>
                  </th>
                  <td>Hart Hagerty</td>
                  <td>Desktop Support Technician</td>
                </tr>

                <tr>
                  <th>
                    <button className="text-2xl transition-all duration-200 hover:text-3xl">
                      <FcDeleteRow />
                    </button>
                  </th>
                  <td>Brice Swyre</td>
                  <td>Tax Accountant</td>
                </tr>
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
      <AjouterResponsable />
      <AjouterAssistant />
    </>
  );
}

export default Module;
