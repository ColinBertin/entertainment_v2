import { useMemo } from "react";
import Loading from "../../components/Loading";
import { useSearchBarState } from "../../components/SearchBarProvider";
import { deepSearch } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../api/moviesApi";
import { fetchSeries } from "../../api/seriesApi";
import Error from "../../components/Error";
import ContentContainer from "../../components/ContentContainer";

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
    return <Error errors={[seriesError, moviesError]} />;
  }

  return (
    <>
      {seriesData && moviesData && (
        <ContentContainer
          title="Trending"
          trends
          contents={[...seriesData.slice(0, 4), ...moviesData.slice(0, 4)]}
        />
      )}
      {filteredData && (
        <div className="flex flex-col items-center">
          <ContentContainer
            title="Recommended for you"
            contents={filteredData}
          />
        </div>
      )}
    </>
  );
}
