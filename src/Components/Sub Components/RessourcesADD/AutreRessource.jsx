import axios from "axios";
import { useState } from "react";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdTitle } from "react-icons/md";

function AutreRessource({ endPoint }) {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [added, setAdded] = useState(false);

  async function handleAdd() {
    try {
      const res = await axios.post(
        endPoint,
        { title: title, link: link },
        {
          headers: {
            Authorization: "Bearer " + token.access,
          },
        },
      );

      if (res.status == 201) {
        setAdded(true);
        console.log("Link Added.");
        document.getElementById("modal_add_ressource").close();
      }
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div className=" mt-4 flex w-fit flex-col  items-center justify-center  space-y-5 bg-[#A5BED7] ">
      <div className="flex space-x-4">
        <label className="daisy-input daisy-input-bordered flex items-center gap-2  bg-white">
          <MdTitle className="text-2xl" /> Titre
          <input
            type="text"
            className="grow"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label className="daisy-input daisy-input-bordered flex items-center gap-2  bg-white">
          <FaExternalLinkAlt /> Lien
          <input
            type="url"
            className="grow"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </label>
      </div>

      <button
        className="daisy-btn border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6] "
        onClick={async () => {
          if (link && title) {
            await handleAdd();
            added && document.getElementById("modal_add_ressource").close();
          }
        }}
      >
        Ajouter
      </button>
    </div>
  );
}

export default AutreRessource;
