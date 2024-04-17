import { useMemo } from "react";
import Cards from "../../components/Cards";
import Loading from "../../components/Loading";
import { useSearchBarState } from "../../components/SearchBarProvider";
import { deepSearch } from "../../helpers";
import { fetchBookmarkedMovies } from "../../api/moviesApi";
import { useQuery } from "@tanstack/react-query";
import { fetchBookmarkedSeries } from "../../api/seriesApi";
import { Movie, Series as SeriesType } from "../../types";

export default function Bookmarks() {
  const { filterValue } = useSearchBarState();

  const {
    isLoading: bookmarkedMoviesIsLoading,
    data: bookmarkedMoviesData,
    error: bookmarkedMoviesError,
  } = useQuery({
    queryKey: ["bookmarkedMovies"],
    queryFn: fetchBookmarkedMovies,
  });

  const {
    isLoading: bookmarkedSeriesIsLoading,
    data: bookmarkedSeriesData,
    error: bookmarkedSeriesError,
  } = useQuery({
    queryKey: ["bookmarkedSeries"],
    queryFn: fetchBookmarkedSeries,
  });

  const filteredBookmarkedMovies = useMemo(
    () => deepSearch(bookmarkedMoviesData ?? [], filterValue),
    [filterValue, bookmarkedMoviesData]
  );

  const filteredBookmarkedSeries = useMemo(
    () => deepSearch(bookmarkedSeriesData ?? [], filterValue),
    [filterValue, bookmarkedSeriesData]
  );

  if (bookmarkedMoviesIsLoading || bookmarkedSeriesIsLoading) {
    return <Loading />;
  }

  if (bookmarkedMoviesError || bookmarkedSeriesError) {
    return (
      <div>
        <p>Error...{bookmarkedMoviesError?.message}</p>
        <p>Error...{bookmarkedSeriesError?.message}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center w-full">
      {filteredBookmarkedMovies.length === 0 &&
        filteredBookmarkedSeries.length === 0 && (
          <h2 className="text-xl md:text-3xl font-extralight mt-20 pb-4 md:pb-8 self-start">
            There are no movies or TV series bookmarked yet.
          </h2>
        )}
      {filteredBookmarkedMovies.length > 0 && (
        <>
          <h2 className="text-xl md:text-3xl font-extralight pb-4 md:pb-8 self-start">
            Bookmarked Movies
          </h2>
          <Cards contents={filteredBookmarkedMovies as unknown as Movie[]} />
        </>
      )}
      {filteredBookmarkedSeries.length > 0 && (
        <>
          <h2 className="text-xl md:text-3xl font-extralight py-4 md:py-8 self-start">
            Bookmarked TV Series
          </h2>
          <Cards
            contents={filteredBookmarkedSeries as unknown as SeriesType[]}
          />
        </>
      )}
    </div>
  );
}
