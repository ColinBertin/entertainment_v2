import { useParams } from "react-router-dom";
import Loading from "../../../components/Loading";
import { getYear } from "../../../helpers";
import { PiTelevision } from "react-icons/pi";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchOneSeries } from "../../../api/seriesApi";
import { Series } from "../../../types";
import { MdBookmark, MdBookmarkBorder } from "react-icons/md";
import { bookmarkContent, deleteBookmark } from "../../../api/api";
import Error from "../../../components/Error";

export default function OneSeries() {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const { isLoading, data, error } = useQuery<Series>({
    queryKey: [id],
    queryFn: () => fetchOneSeries(id as string),
  });

  const bookmarkMutation = useMutation({
    mutationFn: (data: { contentId: string; contentType: string }) => {
      return bookmarkContent(data);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [data?._id] });
      const content = await queryClient.getQueryData<Series>([data?._id]);
      const updateContent = await { ...content, isBookmarked: true };
      queryClient.setQueryData([data?._id], updateContent);
      return updateContent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [data?._id] });
    },
  });

  const deleteBookmarkMutation = useMutation({
    mutationFn: (data: { contentId: string; contentType: string }) => {
      return deleteBookmark(data);
    },
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: [data?._id] });
      const content = await queryClient.getQueryData<Series>([data?._id]);
      const updateContent = await { ...content, isBookmarked: false };
      queryClient.setQueryData([data?._id], updateContent);
      return updateContent;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [data?._id] });
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error errors={[error]} />;
  }

  return (
    <>
      {data && (
        <div className="flex flex-col lg:flex-row p-4 lg:p-10 gap-4 lg:gap-12 h-full w-full justify-center">
          <img className="rounded" src={data.poster_url} alt={data.name} />
          <div className="max-w-[400px]">
            <div className="flex gap-2 text-lg text-blue-300 py-2">
              <div>{getYear(data.first_air_date)}</div>•
              <div className="flex items-center gap-1">
                <PiTelevision size={20} />
                TV Series
              </div>
              •<div className="uppercase">{data.original_language}</div>
            </div>
            <div className="flex items-center gap-4 mt-2 mb-4 lg:mt-4 lg:mb-8">
              <h1 className="flex text-3xl break-words">{data.name}</h1>
              <button
                className="p-4 bg-blue-500 bg-opacity-75 rounded-full hover:text-red-500 transition esa-in-out duration-200"
                onClick={() =>
                  data.isBookmarked
                    ? deleteBookmarkMutation.mutate({
                        contentId: data._id,
                        contentType: "series",
                      })
                    : bookmarkMutation.mutate({
                        contentId: data._id,
                        contentType: "series",
                      })
                }
              >
                {data.isBookmarked ? (
                  <MdBookmark size={28} />
                ) : (
                  <MdBookmarkBorder size={28} />
                )}
              </button>
            </div>
            {data.original_name !== data.name && <p>{data.original_name}</p>}
            <span className="text-base tracking-wide">{data.overview}</span>
          </div>
        </div>
      )}
    </>
  );
}
