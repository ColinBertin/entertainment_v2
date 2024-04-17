import type { Dispatch, ReactNode, SetStateAction } from "react";
import { createContext, useContext, useState } from "react";

type SearchBarState = {
  filterValue: string;
  setFilterValue: Dispatch<SetStateAction<string>>;
};

const SearchBarContext = createContext<SearchBarState | undefined>(undefined);

export function useSearchBarState() {
  const context = useContext(SearchBarContext);
  if (context === undefined) {
    throw new Error("useSearchBarState must be used within a SearchProvider");
  }
  return context;
}

export default function SearchBarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [filterValue, setFilterValue] = useState("");

  return (
    <SearchBarContext.Provider
      value={{ filterValue, setFilterValue: setFilterValue }}
    >
      {children}
    </SearchBarContext.Provider>
  );
}
