import { useMemo } from "react";
import Cards from "../../components/Cards";
import Loading from "../../components/Loading";
import TrendingCards from "../../components/TrendingCards";
import { useSearchBarState } from "../../components/SearchBarProvider";
import { deepSearch } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../api/moviesApi";
import { fetchSeries } from "../../api/seriesApi";

export default function Dashboard() {
  const { filterValue } = useSearchBarState();

  const {
    isLoading: seriesLoading,
    data: seriesData,
    error: seriesError,
  } = useQuery({
    queryKey: ["series"],
    queryFn: fetchSeries,
  });

  const {
    isLoading: moviesLoading,
    data: moviesData,
    error: moviesError,
  } = useQuery({
    queryKey: ["movies"],
    queryFn: fetchMovies,
  });

  const filteredData = useMemo(
    () =>
      deepSearch(
        seriesData && moviesData
          ? [...seriesData.slice(4), ...moviesData.slice(4)]
          : [],
        filterValue
      ),
    [filterValue, seriesData, moviesData]
  );

  if (seriesLoading || moviesLoading) {
    return <Loading />;
  }

  if (seriesError || moviesError) {
    return (
      <div>
        <p>Error...{seriesError?.message}</p>
        <p>Error...{moviesError?.message}</p>
      </div>
    );
  }

  return (
    <>
      <h2 className="text-xl md:text-3xl font-extralight pb-4 md:pb-8 self-start">
        Trending
      </h2>
      <div className="flex">
        <TrendingCards
          contents={
            seriesData && moviesData
              ? [...seriesData.slice(0, 4), ...moviesData.slice(0, 4)]
              : []
          }
        />
      </div>
      {filteredData && (
        <div className="flex flex-col items-center">
          <h2 className="text-xl md:text-3xl font-extralight py-4 md:py-8 self-start">
            Recommended for you
          </h2>
          <Cards contents={filteredData} />
        </div>
      )}
    </>
  );
}
