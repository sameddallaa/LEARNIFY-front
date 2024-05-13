import { useState } from "react";
import { GrAttachment } from "react-icons/gr";

function RessourceClassique({ endPoint }) {
  const [titre, setTitre] = useState("");

  async function handleAdd() {}
  return (
    <div className=" mt-4 flex w-fit flex-col  items-center justify-center  space-y-5 bg-[#A5BED7] ">
      {/* <h3 className="text-center text-lg font-bold">
    Upload your file
  </h3> */}
      <div className="flex space-x-4">
        <label className="daisy-input daisy-input-bordered flex items-center gap-2  bg-white">
          <GrAttachment /> Titre
          <input
            type="text"
            className="grow"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </label>
        <input
          type="file"
          className="daisy-file-input daisy-file-input-bordered daisy-file-input-info  w-full  bg-white"
        />
      </div>
      <button
        className="daisy-btn border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6] "
        onClick={async () => {
          if (titre) {
            await handleAdd();
            document.getElementById("modal_add_ressource").close();
          }
        }}
      >
        Ajouter
      </button>
    </div>
  );
}

export default RessourceClassique;
