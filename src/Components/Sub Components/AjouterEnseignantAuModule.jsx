function AjouterEnseignantAuModule({ id_model }) {
  return (
    <>
      <dialog id={`${id_model}`} className="daisy-modal">
        <div className="daisy-modal-box relative w-auto min-w-fit space-y-6 bg-blueT">
          <div className="ml-4 inline-flex w-auto min-w-fit items-center justify-between space-x-2">
            <label>Email</label>
            <input
              type="email"
              placeholder="Type here"
              className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
            />
            <button className=" daisy-btn daisy-btn-info daisy-btn-sm text-white ">
              Submit
            </button>
          </div>
          <div className="flex items-center justify-center"></div>
        </div>

        <form method="dialog" className="daisy-modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default AjouterEnseignantAuModule;
