import { useMemo } from "react";
import Loading from "../../components/Loading";
import { useSearchBarState } from "../../components/SearchBarProvider";
import { deepSearch } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchSeries } from "../../api/seriesApi";
import { Series as SeriesType } from "../../types";
import Error from "../../components/Error";
import ContentContainer from "../../components/ContentContainer";
import Container from "../../components/Container";

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
    return <Error errors={[error]} />;
  }

  return (
    <>
      {filteredSeries && (
        <>
          <Container>
            <ContentContainer
              title="TV Series"
              contents={filteredSeries as unknown as SeriesType[]}
            />
          </Container>
        </>
      )}
    </>
  );
}
