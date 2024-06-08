import axios from "axios";
import { useContext, useState } from "react";

function AjouterEnseignantAuModule({ id_model, endpoint }) {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const [email, setEmail] = useState("");
  // const [teachers] = useContext();
  // const [idTacher, setIdTeacher] = useState(-1);
  // const teacher = teachers.filter((teacher) => teacher.email == email);
  // const handleSubmit = async (e) => {
  //   try {
  //     const put = {
  //       teacher: idTacher,
  //     };
  //     console.log(put);
  //     const response = await axios.put(endpoint, put, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + token.access,
  //       },
  //     });

  //     const data = response.data;
  //     console.log(data);
  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // };
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
              onChange={(e) => setEmail(e.target.value)}
              value={email}
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
