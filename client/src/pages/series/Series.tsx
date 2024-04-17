import { useMemo } from "react";
import Cards from "../../components/Cards";
import Loading from "../../components/Loading";
import { useSearchBarState } from "../../components/SearchBarProvider";
import { deepSearch } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchSeries } from "../../api/seriesApi";
import { Series as SeriesType } from "../../types";

export default function Series() {
  const { filterValue } = useSearchBarState();

  const { isLoading, data, error } = useQuery({
    queryKey: ["series"],
    queryFn: fetchSeries,
  });

  const filteredSeries = useMemo(
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
    <div className="flex flex-col items-center w-full">
      <h2 className="text-xl md:text-3xl font-extralight pb-4 md:pb-8 self-start">
        TV Series
      </h2>
      {filteredSeries && (
        <Cards contents={filteredSeries as unknown as SeriesType[]} />
      )}
    </div>
  );
}
