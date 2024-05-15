import axios from "axios";
import { useContext, useState } from "react";
import { MdOutlinePostAdd } from "react-icons/md";

function ChapitreAdd_Modal({ subjectId }) {
  const [titre, setTitre] = useState("");
  const chaptersEndpoint = `https://elearn-n48v.onrender.com/api/ressources/${subjectId}/chapters/`;
  const token = JSON.parse(localStorage.getItem("tokens"));

  async function handleAddChapitre() {
    try {
      const dataSent = { chapter_name: titre };
      const res = await axios.post(chaptersEndpoint, dataSent, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });

      const data = res.data;
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <dialog id="chapitre_add_modal" className="daisy-modal">
      <div className="daisy-modal-box  flex w-auto min-w-fit flex-col items-center justify-center space-x-1 space-y-5 bg-[#A5BED7] pt-10 shadow-md shadow-stone-400">
        <label className="daisy-input daisy-input-bordered flex items-center gap-2 space-x-5  bg-white">
          <MdOutlinePostAdd className="text-lg" /> Titre
          <input
            type="text"
            className="grow"
            value={titre}
            onChange={(e) => setTitre(e.target.value)}
          />
        </label>

        <button
          className="daisy-btn border-[#00b6ff] bg-[#00b6ff]  tracking-widest text-white hover:bg-[#0684b6]"
          onClick={async () => {
            await handleAddChapitre();
          }}
        >
          Ajouter
        </button>
      </div>

      <form method="dialog" className="daisy-modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
}

export default ChapitreAdd_Modal;
