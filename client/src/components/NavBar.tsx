import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import logo from "../logo.svg";
import { PiSquaresFourFill, PiTelevision } from "react-icons/pi";
import { RiFilmFill } from "react-icons/ri";
import { MdBookmark } from "react-icons/md";
import { useState } from "react";

export default function NavBar({ logout }: { logout: () => void }) {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const links = [
    { path: "/", icon: <PiSquaresFourFill size={28} /> },
    { path: "/movies", icon: <RiFilmFill size={28} /> },
    { path: "/series", icon: <PiTelevision size={28} /> },
    { path: "/bookmarks", icon: <MdBookmark size={28} /> },
  ];

  return (
    <nav className="fixed bg-blue-500 xl:h-[96vh] w-full md:w-[96vw] xl:w-auto p-4 flex xl:flex-col justify-between xl:justify-between items-center z-50 xl:ml-4 md:rounded-xl md:mt-4 xl:mt-5">
      <Link to="/">
        <img className="w-8" src={logo} alt="Logo" />
      </Link>
      <ul className="xl:absolute xl:top-40 flex xl:flex-col xl:items-start gap-2 xl:gap-6 text-blue-300 -xl:ml-20">
        {links.map((link) => (
          <li
            key={link.path}
            className={
              location.pathname === link.path
                ? "text-white"
                : "hover:text-red-500 transition ease-in-out duration-200"
            }
          >
            <Link to={link.path}>{link.icon}</Link>
          </li>
        ))}
      </ul>
      <div className="relative flex">
        <button
          className="self-end"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <img
            className="w-10 h-10 border-2 border-white rounded-full"
            src="/profile.jpg"
            alt="Profile"
          />
        </button>
        {isMenuOpen && (
          <ul className="absolute mt-2 top-16 xl:left-16 xl:-bottom-4 xl:top-auto xl:right-auto -right-4 bg-blue-500 py-2 px-6 z-40 rounded-xl">
            <button className="self-end" onClick={logout}>
              Logout
            </button>
          </ul>
        )}
      </div>
    </nav>
  );
}
