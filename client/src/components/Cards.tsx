import Card from "./Card";
import { Movie, Series } from "../types";

interface CardsProps {
  contents: Movie[] | Series[];
}

export default function Cards({ contents }: CardsProps) {
  return (
    <>
      {contents && (
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {contents.map((content) => (
            <Card key={content._id} content={content} />
          ))}
        </ul>
      )}
    </>
  );
}
