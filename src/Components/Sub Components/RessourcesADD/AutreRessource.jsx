import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";

function AutreRessource() {
  const [titre, setTitre] = useState("");

  async function handleAdd() {}
  return (
    <div className=" mt-4 flex w-fit flex-col  items-center justify-center  space-y-5 bg-[#A5BED7] ">
      <label className="daisy-input daisy-input-bordered flex items-center gap-2  bg-white">
        <FaExternalLinkAlt /> Link
        <input
          type="text"
          className="grow"
          value={titre}
          onChange={(e) => setTitre(e.target.value)}
        />
      </label>

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

export default AutreRessource;
