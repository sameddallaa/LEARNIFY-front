import axios from "axios";
import { useContext, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import AuthContext from "../../../Contexts/AuthContext";

function RessourceClassique({ endPoint }) {
  const [titre, setTitre] = useState("");
  const [formData, setFormData] = useState(new FormData());
  const [file, setFile] = useState(null);
  const token = JSON.parse(localStorage.getItem("tokens"));

  function handleFileUpload(e) {
    setFile(e.target.files[0]);
  }

  async function handleSend() {
    formData.append("file", file);
    formData.append("title", titre);
    try {
      const res = await axios.post(endPoint, formData, {
        headers: {
          Authorization: "Bearer " + token.access,
        },
      });

      console.log(res);
      console.log("File Added.");
    } catch (err) {
      console.log(err.message);
    }
  }

  return (
    <div className=" mt-4 flex w-fit flex-col  items-center justify-center  space-y-5 bg-[#A5BED7] ">
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
          onChange={handleFileUpload}
        />
      </div>
      <button
        className="daisy-btn border-[#00b6ff] bg-[#00b6ff] py-1 tracking-widest text-white hover:bg-[#0684b6] "
        onClick={async () => {
          if (titre) {
            await handleSend();
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
