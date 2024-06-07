function EtudiantSignUp_Solo() {
  return (
    <>
      <dialog id="etudiant_solo_modal" className="daisy-modal">
        <div className="daisy-modal-box relative w-auto min-w-fit space-y-6 bg-blueT">
          <div className="flex">
            <div className="ml-4 flex justify-between space-x-2">
              <label>Nom</label>
              <input
                type="text"
                placeholder="Type here"
                className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
              />
            </div>
            <div className="ml-4 flex justify-between space-x-2">
              <label>Prénom</label>
              <input
                type="text"
                placeholder="Type here"
                className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
              />
            </div>
          </div>

          <div className="ml-4 flex justify-between">
            <label>Username</label>
            <input
              type="text"
              placeholder="Type here"
              className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
            />
          </div>

          <div className="ml-4 flex justify-between">
            <label>Email</label>
            <input
              type="email"
              placeholder="Type here"
              className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
            />
          </div>
          <div className="ml-4 flex justify-between">
            <label>Password</label>
            <input
              type="password"
              placeholder="Type here"
              className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
            />
          </div>

          <div className="ml-4 flex justify-between">
            <label>Année</label>
            <select className="daisy-select daisy-select-ghost daisy-select-xs w-full max-w-xs bg-white text-center tracking-widest">
              <option disabled selected>
                1CPI
              </option>
              <option>2CPI</option>
              <option>1CS</option>
              <option>2CS</option>
              <option>3CS</option>
            </select>
          </div>
          <div className="ml-4 flex justify-between">
            <label>Groupe</label>
            <select className="daisy-select daisy-select-ghost daisy-select-xs w-full max-w-xs bg-white text-center tracking-widest">
              <option disabled selected>
                G1
              </option>
              <option>G2</option>
              <option>G3</option>
              <option>G4</option>
              <option>G5</option>
            </select>
          </div>

          <div className="flex justify-between">
            <button
              className=" daisy-btn daisy-btn-info daisy-btn-sm ml-4 text-white"
              onClick={() =>
                document.getElementById("etudiant_solo_modal").close()
              }
            >
              Close
            </button>
            <button className=" daisy-btn daisy-btn-info daisy-btn-sm text-white ">
              Submit
            </button>
          </div>
        </div>
        <form method="dialog" className="daisy-modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default EtudiantSignUp_Solo;
