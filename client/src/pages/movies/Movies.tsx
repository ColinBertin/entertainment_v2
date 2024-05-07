import { useMemo } from "react";
import Loading from "../../components/Loading";
import { useSearchBarState } from "../../components/SearchBarProvider";
import { deepSearch } from "../../helpers";
import { useQuery } from "@tanstack/react-query";
import { fetchMovies } from "../../api/moviesApi";
import { Movie } from "../../types";
import Error from "../../components/Error";
import ContentContainer from "../../components/ContentContainer";
import Container from "../../components/Container";

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
    return <Error errors={[error]} />;
  }

  return (
    <>
      {filteredMovies && (
        <>
          <Container>
            <ContentContainer
              title="Movies"
              contents={filteredMovies as unknown as Movie[]}
            />
          </Container>
        </>
      )}
    </>
  );
}
