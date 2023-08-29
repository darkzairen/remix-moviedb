import type { MovieResult } from "moviedb-promise";
import { Score } from "./Score";

export function MovieCard({ movie }: { movie: MovieResult }) {
  return (
    <div className="card card-compact w-36 bg-base-100 shadow-xl">
      <figure>
        <img
          src={`http://image.tmdb.org/t/p/w154/${movie.poster_path}`}
          alt={movie.title}
          width={144}
          height={216}
        />
      </figure>
      <div className="card-body relative h-24 gap-0 !p-2">
        <div className="absolute -top-5 text-xs">
          <Score value={movie.vote_average ?? 0} small />
        </div>
        <h1 className="card-title mt-3 line-clamp-2 text-sm font-bold">
          {movie.title}
        </h1>
        <p className="font-semibold text-secondary">
          {new Date(movie.release_date!).toLocaleDateString(undefined, {
            dateStyle: "long",
          })}
        </p>
      </div>
    </div>
  );
}
