import { PiMagnifyingGlass } from "react-icons/pi";
import { useSearchBarState } from "./SearchBarProvider";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

export default function SearchBar() {
  const location = useLocation();
  const { filterValue, setFilterValue } = useSearchBarState();

  useEffect(() => {
    setFilterValue("");
  }, [location, setFilterValue]);

  return (
    <div className="flex w-full self-center h-8 gap-4 bg-blue-800 px-4 mt-2 mb-6">
      <div className="pointer-events-none flex items-center">
        <PiMagnifyingGlass size={20} />
      </div>
      <input
        autoComplete="off"
        className="w-full bg-blue-800 border-b border-blue-500 focus:border-blue-300 sm:text-sm pl-2 focus:outline-none"
        id="search"
        name="search"
        placeholder={`Search for ${
          location.pathname === "/"
            ? "movies or TV series"
            : location.pathname === "/movies"
            ? "movies"
            : location.pathname === "/series"
            ? "TV series"
            : "bookmarks"
        }`}
        type="search"
        value={filterValue}
        onChange={(e) => setFilterValue(e.target.value)}
      />
    </div>
  );
}
