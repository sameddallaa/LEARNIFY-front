import { useContext, useState } from "react";
import AuthContext from "../Contexts/AuthContext";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";
import ProfilSettings from "./ProfilSettings";
import InputBox from "./Sub Components/InputBox";

function ProfilNavBar() {
  const { logout } = useContext(AuthContext);
  const [profilClicked, setProfilClicked] = useState(false);
  const [secondTabChosen, setSecondTabChosen] = useState(false);
  const userFirstName = "";
  const userLastName = "";
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
              className={`daisy-tab ${!secondTabChosen && "daisy-tab-active"} no-underline `}
              onClick={() => setSecondTabChosen(false)}
            >
              Account
            </a>
            <a
              role="tab"
              className={`daisy-tab ${secondTabChosen && "daisy-tab-active"} no-underline`}
              onClick={() => setSecondTabChosen(true)}
            >
              Password
            </a>
          </div>

          <form>
            {!secondTabChosen ? (
              <>
                <h3 className="mt-2">Account</h3>
                <p className="tracking-widest">
                  Make changes to your account here. Click save when you're
                  done.
                </p>
                <div className="mt-4 space-y-4">
                  {/* <InputBox>Email</InputBox> */}
                  <div className="flex space-x-4">
                    <InputBox type="text">
                      {userFirstName || "First Name"}
                    </InputBox>

                    <InputBox type="text">
                      {userLastName || "Last Name"}
                    </InputBox>
                  </div>
                  <button className="daisy-btn daisy-btn-primary mt-4 text-white">
                    Save changes
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3>Password</h3>
                <p className="tracking-widest">
                  Change your password here. After saving, you'll be logged out.
                </p>

                <div>
                  <div className="flex space-x-4">
                    <InputBox type="password">Current password</InputBox>
                    <InputBox type="password">New password</InputBox>
                  </div>
                  <button
                    className="daisy-btn daisy-btn-primary mt-4 text-white"
                    onClick={() => {
                      logout();
                    }}
                  >
                    Save password
                  </button>
                </div>
              </>
            )}
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
