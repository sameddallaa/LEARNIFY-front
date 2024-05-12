import { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import ProfilSettings from "./ProfilSettings";
import InputBox from "./Sub Components/InputBox";
import axios from "axios";

function ProfilNavBar() {
  const { logout, user } = useContext(AuthContext);
  const [secondTabChosen, setSecondTabChosen] = useState(false);
  const userFirstName = user.first_name;
  const userLastName = user.last_name;
  const [userNewFirstName, setNewUserFirstName] = useState(user.first_name);
  const [userNewLastName, setNewUserLastName] = useState(user.last_name);
  const [userCurrMdp, setUserCurrMdp] = useState(null);
  const [userNewMdp, setUserNewMdp] = useState(null);
  const token = JSON.parse(localStorage.getItem("tokens"));
  let userId = user.user_id;

  const [errMsgM, setErrMsgM] = useState("");
  const [errMsgN, setErrMsgN] = useState("");
  let dataM, dataN;

  async function handlePassword() {
    if (!userNewMdp || !userCurrMdp) {
      setErrMsgM(`Please check your inputs fields !`);
      return;
    }
    const mdpObject = { old_password: userCurrMdp, new_password: userNewMdp };
    const endpoint = `http://localhost:8000/api/users/${userId}/change-password/`;
    // const endpoint = `https://elearn-n48v.onrender.com/api/users/${userId}/change-password/`;
    try {
      const response = await axios.patch(endpoint, mdpObject, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      dataM = response.data;
    } catch (err) {
      setErrMsgM(err.message);
    }
  }

  async function handleName() {
    if (!userNewFirstName && !userNewLastName) {
      setErrMsgN(`Please check your inputs fields !`);
      return;
    }
    const nameObj = {
      first_name: userNewFirstName,
      last_name: userNewLastName,
    };
    const endpoint = `http://localhost:8000/api/change-name/${userId}/`;
    // const endpoint = `https://elearn-n48v.onrender.com/api/change-name/${userId}/`;
    try {
      const response = await axios.patch(endpoint, nameObj, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token.access}`,
        },
      });
      dataN = response.data;
    } catch (err) {
      setErrMsgN(err.message);
    }
  }

  return (
    <>
      <div className=" border-3 absolute  mt-1 min-h-44 w-auto   space-y-6 rounded-[20px] border-[#001D4F] bg-cyanT p-4 shadow-2xl shadow-black">
        <div className="mt-0 flex items-center justify-center">
          <button
            className="daisy-btn daisy-btn-outline font-mono tracking-widest text-blueF"
            onClick={() => document.getElementById("my_modal_2").showModal()}
          >
            Profile <CgProfile />
          </button>
        </div>
        <div className="flex items-center justify-center">
          <button
            className="daisy-btn daisy-btn-outline px-1 font-mono tracking-widest text-red-700 "
            onClick={logout}
          >
            Disconnect <AiOutlineLogout />
          </button>
        </div>
      </div>

      <dialog id="my_modal_2" className="daisy-modal">
        <div className="daisy-modal-box bg-cyanT">
          <div
            role="tablist"
            className="daisy-tabs-boxed daisy-tabs bg-inherit"
          >
            <a
              role="tab"
              className={`daisy-tab ${!secondTabChosen && " bg-blueC text-white"} no-underline `}
              onClick={() => setSecondTabChosen(false)}
            >
              Account
            </a>
            <a
              role="tab"
              className={`daisy-tab ${secondTabChosen && "bg-blueC text-white"} no-underline`}
              onClick={() => setSecondTabChosen(true)}
            >
              Password
            </a>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className={`${secondTabChosen && "hidden"}`}>
              <h3 className="mt-2">Account</h3>
              <p className="tracking-widest">
                Make changes to your account here. Click save when you're done.
              </p>
              <div className="mt-4 space-y-4">
                {/* <InputBox>Email</InputBox> */}
                <div className="flex space-x-4">
                  <InputBox type="text" setValue={setNewUserFirstName}>
                    {userFirstName || "First Name"}
                  </InputBox>

                  <InputBox type="text" setValue={setNewUserLastName}>
                    {userLastName || "Last Name"}
                  </InputBox>
                </div>

                <button
                  className="daisy-btn daisy-btn-primary mt-4 border-inherit bg-blueC text-white hover:border-inherit hover:bg-blueT"
                  onClick={async () => {
                    await handleName();
                    dataN && logout();
                  }}
                >
                  Save changes
                </button>
                {errMsgN && <p className="mt-2 text-red-700">{errMsgN}</p>}
              </div>
            </div>

            <div className={`${!secondTabChosen && "hidden"}`}>
              <h3>Password</h3>
              <p className="tracking-widest">
                Change your password here. After saving, you'll be logged out.
              </p>

              <div>
                <div className="flex space-x-4">
                  <InputBox type="password" setValue={setUserCurrMdp}>
                    Current password
                  </InputBox>
                  <InputBox type="password" setValue={setUserNewMdp}>
                    New password
                  </InputBox>
                </div>
                <button
                  className="daisy-btn daisy-btn-primary mt-4 border-inherit bg-blueC text-white hover:border-inherit hover:bg-blueT"
                  onClick={async (e) => {
                    await handlePassword();
                    dataM && logout();
                  }}
                >
                  Save password
                </button>
                {errMsgM && <p className="mt-2 text-red-700">{errMsgM}</p>}
              </div>
            </div>
          </form>
        </div>
        <form method="dialog" className="daisy-modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}

export default ProfilNavBar;
