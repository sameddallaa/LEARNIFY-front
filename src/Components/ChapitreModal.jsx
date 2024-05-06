function ChapitreModal({ chapitre }) {
  return (
    <>
      <dialog id="my_modal_2" className="daisy-modal">
        <div className="daisy-modal-box  relative mt-8 h-screen  w-11/12 max-w-5xl border-[8px] border-black bg-[#A5BED7] shadow-xl shadow-stone-400">
          <h2 className=" font-bold">{chapitre}</h2>
          <div className="space-y-1 pt-10">
            <div id="Cours">
              <p className="border-b-2 border-black text-start">Cours</p>
              <div className="grid grid-cols-4 items-baseline ">
                <a className=" flex justify-start pl-4  text-center text-[#009898] underline">
                  Cours.pdf
                </a>
                <div className="col-start-4 flex items-baseline justify-evenly space-x-10 ">
                  <p className="">1.4 MB</p>
                  <button className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] ">
                    Download
                  </button>
                </div>
              </div>
            </div>

            <div id="Tds">
              <p className="border-b-2 border-black text-start">TD</p>
              <div className="space-y-1">
                <div className="grid grid-cols-4 items-baseline " id="td1">
                  <a className=" flex justify-start pl-4  text-center text-[#009898] underline">
                    TD.pdf
                  </a>
                  <div className="col-start-4 flex items-baseline justify-evenly space-x-10 ">
                    <p className="">1.4 MB</p>
                    <button className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] ">
                      Download
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-4 items-baseline" id="tp1">
                  <a className=" flex justify-start pl-4  text-center text-[#009898] underline">
                    TP.pdf
                  </a>
                  <div className="col-start-4 flex items-baseline justify-evenly space-x-10 ">
                    <p className="">1.4 MB</p>
                    <button className="daisy-btn border-[#009898] bg-[#009898] py-1 tracking-widest text-white hover:bg-[#017676] ">
                      Download
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <form
            method="dialog"
            className="daisy-modal-backdrop flex justify-center"
          >
            <button className="daisy-btn daisy-btn-outline daisy-btn-error absolute bottom-5 w-48">
              Close
            </button>
          </form>
          {/* <p className="py-4">Press ESC key or click outside to close</p> */}
        </div>
        <form method="dialog" className="daisy-modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </>
  );
}

export default ChapitreModal;
