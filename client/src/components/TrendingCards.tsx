import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { RiFilmFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getYear } from "../helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkContent, deleteBookmark } from "../api/api";
import { Movie, Series } from "../types";

interface TrendingCardsProps {
  contents: Movie[] | Series[];
}

export default function TrendingsCard({ contents }: TrendingCardsProps) {
  const queryClient = useQueryClient();

  const bookmarkMutation = useMutation({
    mutationFn: (data: { contentId: string; contentType: string }) => {
      return bookmarkContent(data);
    },
    onMutate: async ({ contentId, contentType }) => {
      await queryClient.cancelQueries({ queryKey: [contentType] });

      const contents = await queryClient.getQueryData<Array<Movie | Series>>([
        contentType,
      ]);
      const updatedList = await contents?.map((content) => {
        if (content._id === contentId) {
          return { ...content, isBookmarked: true };
        }
        return content;
      });

      queryClient.setQueryData([contentType], updatedList);

      return { updatedList };
    },
    onSuccess: (type) => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: (data: { contentId: string; contentType: string }) => {
      return deleteBookmark(data);
    },
    onMutate: async (variables) => {
      const { contentId, contentType } = variables;
      await queryClient.cancelQueries({ queryKey: [contentType] });

      const contents = await queryClient.getQueryData<Array<Movie | Series>>([
        contentType,
      ]);
      const updatedList = await contents?.map((content) => {
        if (content._id === contentId) {
          return { ...content, isBookmarked: false };
        }
        return content;
      });

      queryClient.setQueryData([contentType], updatedList);

      return { updatedList };
    },
    onSuccess: (type) => {
      queryClient.invalidateQueries({ queryKey: [type] });
    },
  });

  const handleBookmark = (contentId: string, type: string) => {
    bookmarkMutation.mutate({
      contentId,
      contentType: type,
    });
  };

  const handleDeleteBookmark = (contentId: string, type: string) => {
    deleteBookmarkMutation.mutate({
      contentId,
      contentType: type,
    });
  };

  return (
    <>
      {contents && (
        <ul className="flex overflow-x-scroll snap-x snap-mandatory no-scrollbar gap-4">
          {contents.map((content) => {
            const isMovie = "title" in content;
            const type = isMovie ? "movies" : "series";
            return (
              <div
                key={content._id}
                className="flex-shrink-0 w-80 md:w-[500px] relative rounded-lg shadow mb-4 snap-center"
              >
                <div>
                  <img
                    className="rounded-lg opacity-75"
                    src={content.backdrop_url}
                    alt={isMovie ? content.title : content.name}
                  />
                  <button
                    className="absolute top-1 right-1 p-2 bg-blue-500 bg-opacity-75 rounded-full hover:text-red-500 transition esa-in-out duration-200"
                    onClick={() =>
                      content.isBookmarked
                        ? handleDeleteBookmark(content._id, type)
                        : handleBookmark(content._id, type)
                    }
                  >
                    {content.isBookmarked ? (
                      <MdBookmark size={24} />
                    ) : (
                      <MdBookmarkBorder size={24} />
                    )}
                  </button>
                  <div className="absolute bottom-2 left-2 pt-2">
                    <div className="flex gap-2 text-xs">
                      <div>
                        {isMovie
                          ? getYear(content.release_date)
                          : getYear(content.first_air_date)}
                      </div>
                      •
                      <div>
                        {isMovie ? (
                          <div className="flex items-center gap-1">
                            <RiFilmFill size={12} />
                            Movie
                          </div>
                        ) : (
                          <div className="flex items-center gap-1">
                            <PiTelevision size={12} />
                            TV Series
                          </div>
                        )}
                      </div>
                      •
                      <div className="uppercase">
                        {content.original_language}
                      </div>
                    </div>
                    <Link
                      to={`/${isMovie ? "movies" : "series"}/${content._id}`}
                    >
                      <h5 className="tracking-tight hover:text-red-500 inline-block transition ease-in-out duration-200">
                        {isMovie ? content.title.split("-")[0] : content.name}
                      </h5>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </ul>
      )}
    </>
  );
}
