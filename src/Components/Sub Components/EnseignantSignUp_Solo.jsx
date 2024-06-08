import axios from "axios";
import { useRef, useState } from "react";

function EnseignantSignUp_Solo() {
  const token = JSON.parse(localStorage.getItem("tokens"));
  const nom = useRef("");
  const prenom = useRef("");
  const username = useRef("");
  const email = useRef("");
  const password = useRef("");
  const grade = useRef("Maitre assistant B");
  const [errMessage, setErrMessage] = useState("");

  const handleSubmit = async (e, year) => {
    try {
      const post = {
        email: email.current,
        username: username.current,
        first_name: nom.current,
        last_name: prenom.current,
        password: password.current,
        is_teacher: true,
        is_student: false,
        is_staff: false,
        grade: grade.current,
      };
      console.log(post);
      const endpoint = `http://localhost:8000/api/auth/signup/`;
      const response = await axios.post(endpoint, post, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token.access,
        },
      });
      if (response.status === 201) {
        const data = response.data;
        console.log(data);
        document.getElementById("enseignant_solo_modal").close();
      }
    } catch (err) {
      // console.error(err);
      let errMsg = err.message;

      if (err?.response?.data?.non_field_errors?.[0])
        errMsg = err.response.data.non_field_errors[0];
      else if (err?.response.data?.email?.[0])
        errMsg = err.response.data.email[0];

      console.error(errMsg);
      await setErrMessage(errMsg);
    }
  };

  return (
    <>
      <dialog id="enseignant_solo_modal" className="daisy-modal">
        <div className="daisy-modal-box relative w-auto min-w-fit space-y-6 bg-blueT">
          <div className="flex">
            <div className="ml-4 flex justify-between space-x-2">
              <label>Nom</label>
              <input
                type="text"
                placeholder="Type here"
                className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
                onChange={(e) => (nom.current = e.target.value)}
              />
            </div>
            <div className="ml-4 flex justify-between space-x-2">
              <label>Prénom</label>
              <input
                type="text"
                placeholder="Type here"
                className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
                onChange={(e) => (prenom.current = e.target.value)}
              />
            </div>
          </div>

          <div className="ml-4 flex justify-between">
            <label>Username</label>
            <input
              type="text"
              placeholder="Type here"
              className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
              onChange={(e) => (username.current = e.target.value)}
            />
          </div>

          <div className="ml-4 flex justify-between">
            <label>Email</label>
            <input
              type="email"
              placeholder="Type here"
              className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
              onChange={(e) => (email.current = e.target.value)}
            />
          </div>
          <div className="ml-4 flex justify-between">
            <label>Password</label>
            <input
              type="password"
              placeholder="Type here"
              className="daisy-input daisy-input-sm daisy-input-bordered w-full max-w-xs bg-white"
              onChange={(e) => (password.current = e.target.value)}
            />
          </div>

          <div className="ml-4 flex justify-between">
            <label>Grade</label>
            <select
              className="daisy-select daisy-select-ghost daisy-select-xs w-full max-w-xs bg-white text-center tracking-widest"
              onChange={(e) => (grade.current = e.target.value)}
              defaultValue={"Maitre assistant B"}
            >
              <option value={"Maitre assistant B"}>Maitre assistant B</option>
              <option value={"Maitre assistant A<"}>Maitre assistant A</option>
              <option value={"Maitre de conference B"}>
                Maitre de conference B
              </option>
              <option value={"Maitre de conference A"}>
                Maitre de conference A
              </option>
              <option value={"Professeur"}>Professeur</option>
            </select>
          </div>

          {errMessage.length > 0 && (
            <p className="px-20 text-center font-medium tracking-widest text-red-600">
              {errMessage}
            </p>
          )}
          <div className="flex justify-between">
            <button
              className=" daisy-btn daisy-btn-info daisy-btn-sm ml-4 text-white"
              onClick={() =>
                document.getElementById("etudiant_solo_modal").close()
              }
            >
              Close
            </button>
            <button
              className=" daisy-btn daisy-btn-info daisy-btn-sm text-white "
              onClick={handleSubmit}
            >
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

export default EnseignantSignUp_Solo;
