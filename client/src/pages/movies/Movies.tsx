import { useMemo } from "react";
import Cards from "../../components/Cards";
import Loading from "../../components/Loading";
import { useSearchBarState } from "../../components/SearchBarProvider";
import { deepSearch } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../api/moviesApi";
import { Movie } from "../../types";

export default function Movies() {
  const { filterValue } = useSearchBarState();

  const { isLoading, data, error } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const filteredMovies = useMemo(
    () => deepSearch(data ?? [], filterValue),
    [filterValue, data]
  );

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error...{error.message}</div>;
  }

  return (
    <div className="flex flex-col items-center w-full max-h-60">
      <h2 className="text-xl md:text-3xl font-extralight pb-4 md:pb-8 self-start">
        Movies
      </h2>
      {filteredMovies && (
        <Cards contents={filteredMovies as unknown as Movie[]} />
      )}
    </div>
  );
}
