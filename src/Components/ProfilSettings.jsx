function ProfilSettings() {
  return (
    <>
      <button
        className="daisy-btn"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        open modal
      </button>
      <dialog id="my_modal_2" className="daisy-modal">
        <div className="daisy-modal-box">
          <h3 className="text-lg font-bold">Hello!</h3>
          <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="daisy-modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ProfilSettings;
