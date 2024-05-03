import { useContext } from "react";
import AuthContext from "../Contexts/AuthContext";
import { CgProfile } from "react-icons/cg";
import { AiOutlineLogout } from "react-icons/ai";

function ProfilNavBar() {
  const { logout } = useContext(AuthContext);
  return (
    <div className=" border-3 absolute  mt-1 min-h-44 w-auto   space-y-6 rounded-[20px] border-[#001D4F] bg-cyanT p-4 shadow-2xl shadow-black">
      <div className="mt-0 flex items-center justify-center">
        <button className="daisy-btn daisy-btn-outline font-mono tracking-widest text-blueF">
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
  );
}

export default ProfilNavBar;
