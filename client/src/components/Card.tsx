import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { RiFilmFill } from "react-icons/ri";
import { Link, useLocation } from "react-router-dom";
import { getYear } from "../helpers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bookmarkContent, deleteBookmark } from "../api/api";
import { useMemo } from "react";
import { Movie, Series } from "../types";

interface CardProps {
  content: Movie | Series;
}

export default function Card({ content }: CardProps) {
  const location = useLocation();
  const queryClient = useQueryClient();
  const isMovie = "title" in content;
  const type = useMemo(() => (isMovie ? "movies" : "series"), [isMovie]);

  const updateContent = async (
    contentId: string,
    contentType: string,
    isBookmarked: boolean = false
  ) => {
    await queryClient.cancelQueries({ queryKey: [contentType] });
    const contents = await queryClient.getQueryData<Array<Movie | Series>>([
      contentType,
    ]);
    const updatedList = await contents?.map((content) => {
      if (content._id === contentId) {
        return { ...content, isBookmarked };
      }
      return content;
    });
    queryClient.setQueryData([contentType], updatedList);
    return { updatedList };
  };

  const deleteBookmarkedContent = async (
    contentId: string,
    contentType: string
  ) => {
    const bookmarkedKey =
      contentType === "movies" ? "bookmarkedMovies" : "bookmarkedSeries";
    await queryClient.cancelQueries({ queryKey: [bookmarkedKey] });
    const contents = await queryClient.getQueryData<Array<Movie | Series>>([
      bookmarkedKey,
    ]);
    const updatedList = contents?.filter(
      (content) => content._id !== contentId
    );
    queryClient.setQueryData([bookmarkedKey], updatedList);
    return updatedList;
  };

  const bookmarkMutation = useMutation({
    mutationFn: (data: { contentId: string; contentType: string }) => {
      return bookmarkContent(data);
    },
    onMutate: async ({ contentId, contentType }) => {
      const updatedList = updateContent(contentId, contentType, true);

      return { updatedList };
    },
    onSuccess: (type) => {
      if (location.pathname === "/bookmarks") {
        type === "movies"
          ? queryClient.invalidateQueries({
              queryKey: ["bookmarkedMovies"],
            })
          : queryClient.invalidateQueries({
              queryKey: ["bookmarkedSeries"],
            });
      } else {
        queryClient.invalidateQueries({ queryKey: [type] });
      }
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: (data: { contentId: string; contentType: string }) => {
      return deleteBookmark(data);
    },
    onMutate: async ({ contentId, contentType }) => {
      const updatedList =
        location.pathname === "/bookmarks"
          ? deleteBookmarkedContent(contentId, contentType)
          : updateContent(contentId, contentType);

      return { updatedList };
    },
    onSuccess: (type) => {
      if (location.pathname === "/bookmarks") {
        type === "movies"
          ? queryClient.invalidateQueries({
              queryKey: ["bookmarkedMovies"],
            })
          : queryClient.invalidateQueries({
              queryKey: ["bookmarkedSeries"],
            });
      } else {
        queryClient.invalidateQueries({ queryKey: [type] });
      }
    },
  });

  return (
    <>
      {content && (
        <div
          key={content._id}
          className="relative max-w-sm rounded-lg shadow mb-4"
        >
          <div>
            <img
              className="rounded-lg"
              src={content.backdrop_url}
              alt={isMovie ? content.title : content.name}
            />
            <button
              className="absolute top-1 right-1 p-2 bg-blue-500 bg-opacity-75 rounded-full hover:text-red-500 transition esa-in-out duration-200"
              onClick={() =>
                content.isBookmarked
                  ? deleteBookmarkMutation.mutate({
                      contentId: content._id,
                      contentType: type,
                    })
                  : bookmarkMutation.mutate({
                      contentId: content._id,
                      contentType: type,
                    })
              }
            >
              {content.isBookmarked ? (
                <MdBookmark size={20} />
              ) : (
                <MdBookmarkBorder size={20} />
              )}
            </button>
          </div>
          <div className="pt-2">
            <div className="flex gap-2 text-xs text-blue-300">
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
              •<div className="uppercase">{content.original_language}</div>
            </div>
            <Link to={`/${isMovie ? "movies" : "series"}/${content._id}`}>
              <h5 className="tracking-tight hover:text-red-500 inline-block transition ease-in-out duration-200">
                {isMovie ? content.title : content.name}
              </h5>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
