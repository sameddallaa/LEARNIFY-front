import classes from "../CSS/Home.module.css";

function Dashboard() {
  return (
    <main
      className={` ${classes.main} relative grid grid-rows-5 items-center justify-center bg-cyanT`}
    >
      <div
        id="promos"
        className="row-start-1 -mt-28 flex w-auto min-w-fit  justify-evenly space-x-20   tracking-widest"
      >
        <button className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800">
          1CPI
        </button>
        <button className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800">
          2CPI
        </button>
        <button className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800">
          1CS
        </button>
        <button className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800">
          2CS
        </button>
        <button className=" daisy-btn rounded-badge border-2 bg-orange-700 px-10 text-lg text-white hover:bg-orange-800">
          3CS
        </button>
      </div>

      <div id="Semestres" className="row-start-2 -mt-32 flex space-x-60">
        <label className=" font-medium tracking-widest ">Semestre : </label>
        <div className="flex space-x-28 ">
          <div className=" inline-flex items-center space-x-4">
            <input
              type="radio"
              name="radio-7"
              className="daisy-radio-info daisy-radio daisy-radio-md "
              checked
            />
            <label className="">Semestre 1 </label>
          </div>
          <div className=" inline-flex items-center space-x-4">
            <input
              type="radio"
              name="radio-7"
              className="daisy-radio-info daisy-radio daisy-radio-md"
            />
            <label className="">Semestre 2 </label>
          </div>
        </div>
      </div>

      <div
        id="Modules"
        className="row-start-3 -mt-40 inline-flex items-center  space-x-10"
      >
        <label className=" font-medium tracking-widest">Modules : </label>
        <div className=" flex  space-x-2">
          <button className=" daisy-btn w-40 rounded-box bg-slate-300 text-black hover:bg-slate-400">
            Systeme d'expoitation
          </button>{" "}
          <button className=" daisy-btn w-40 rounded-box bg-slate-300 text-black hover:bg-slate-400">
            Systeme d'expoitation
          </button>
          <button className=" daisy-btn w-40 rounded-box bg-slate-300 text-black hover:bg-slate-400">
            Systeme d'expoitation
          </button>
          <button className=" daisy-btn w-40 rounded-box bg-slate-300 text-black hover:bg-slate-400">
            Systeme d'expoitation
          </button>
          <button className=" daisy-btn w-40 rounded-box bg-slate-300 text-black hover:bg-slate-400">
            Systeme d'expoitation
          </button>
          <button className=" daisy-btn w-40 rounded-box bg-slate-300 text-black hover:bg-slate-400">
            Systeme d'expoitation
          </button>
        </div>
      </div>

      <div id="Tableaux" className="row-start-4 -mt-20 flex justify-around">
        <div className=" overflow-x-auto" id="Tableau1">
          <table className="daisy-table">
            {/* head */}
            <thead className="text-black">
              <tr>
                <th></th>
                <th>Email etudiant</th>
                <th>Année</th>
                <th>Groupe</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
                <td>Blue</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
                <td>Purple</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
                <td>Red</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <button
              className="daisy-btn daisy-btn-info daisy-btn-xs"
              onClick={() => {}}
            >
              Ajouter un etudiant
            </button>
            <button className="daisy-btn daisy-btn-info daisy-btn-xs">
              Ajouter des etudiants
            </button>
          </div>
        </div>
        <div className="overflow-x-auto" id="Tableau2">
          <table className="daisy-table">
            {/* head */}
            <thead className="text-black">
              <tr>
                <th></th>
                <th>Email enseignant</th>
                <th>Titre</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              <tr>
                <th>1</th>
                <td>Cy Ganderton</td>
                <td>Quality Control Specialist</td>
              </tr>
              {/* row 2 */}
              <tr>
                <th>2</th>
                <td>Hart Hagerty</td>
                <td>Desktop Support Technician</td>
              </tr>
              {/* row 3 */}
              <tr>
                <th>3</th>
                <td>Brice Swyre</td>
                <td>Tax Accountant</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-between">
            <button className="daisy-btn daisy-btn-info daisy-btn-xs">
              Ajouter un enseignant
            </button>
            <button className="daisy-btn daisy-btn-info daisy-btn-xs">
              Ajouter des enseignants
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
