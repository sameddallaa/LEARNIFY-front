import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

function MemberCard({
  card,
  pic = "https://wallpapers-clan.com/wp-content/uploads/2023/01/aesthetic-anime-girl-pfp-1.jpg",
  color = "purple-400",
  name = "Alisha Something",
  description = "If a dog chews shoes whose shoes does he choose?",
}) {
  return (
    <div id={`card${card}`}>
      <div className="daisy-card daisy-card-compact  flex w-auto min-w-28 max-w-80 items-center justify-center bg-white">
        <figure className="max-h-96 px-10 pt-1">
          <img src={`${pic}`} alt="Shoes" className="rounded-full" />
        </figure>
        <div className="daisy-card-body items-center border-b-2 pt-1 text-center">
          <h2
            className={`border-${color} daisy-card-title border-b-4 capitalize`}
          >
            {name}
          </h2>
          {/* <h2 className="daisy-card-title  border-b-4 border-green-300 uppercase text-gray-400">
                  Professeur
                </h2> */}
          <p className="text-sm">{description}</p>
          <div className="daisy-card-actions space-x-4" id="links">
            <a className="text-4xl " href="https://www.facebook.com/">
              <FaFacebook className={`text-${color} `} />
            </a>
            <a className="text-4xl " href="https://www.facebook.com/">
              <FaGithub className={`text-${color}`} />
            </a>
            <a className="text-4xl " href="https://www.facebook.com/">
              <FaInstagram className={`text-${color}`} />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberCard;
