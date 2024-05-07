import { Movie, Series } from "../types";
import Cards from "./Cards";
import TrendingCards from "./TrendingCards";

interface ContentContainerProps {
  title: string;
  contents: Movie[] | Series[];
  trends?: boolean;
}

export default function ContentContainer({
  title,
  contents,
  trends,
}: ContentContainerProps) {
  return (
    <>
      <h2 className="text-xl md:text-3xl font-extralight py-4 md:py-8 self-start">
        {title}
      </h2>
      {trends ? (
        <TrendingCards contents={contents} />
      ) : (
        <Cards contents={contents} />
      )}
    </>
  );
}
