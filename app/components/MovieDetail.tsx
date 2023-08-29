import type { MovieResponse } from "moviedb-promise";
import { Score } from "./Score";
import { Link } from "@remix-run/react";

export function MovieDetail({ movie }: { movie: MovieResponse }) {
  return (
    <div className="relative h-72 shadow-lg">
      <div className="absolute inset-0 -z-20">
        <img
          src={`http://image.tmdb.org/t/p/w1280/${movie.backdrop_path}`}
          alt={movie.title}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 opacity-80"></div>

      <div className="container relative mx-auto h-full max-w-6xl py-3">
        <div className="absolute right-0 top-6">
          <Link to=".." className="btn btn-circle btn-sm">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </Link>
        </div>
        <div className="flex h-full gap-3">
          <img
            src={`http://image.tmdb.org/t/p/w342/${movie.poster_path}`}
            alt={movie.title}
            className="h-full rounded-md"
          />
          <div className="space-y-3 py-3 text-base-100">
            <div>
              <h1 className="text-2xl font-semibold">{movie.title}</h1>
              <i className="text-base-300">{movie.tagline}</i>
            </div>
            <div className="flex gap-3">
              <Score value={movie.vote_average!} />
              <div className="flex flex-grow flex-col justify-center ">
                <div className="flex gap-2 font-semibold">
                  <span>
                    {new Date(movie.release_date!).toLocaleDateString(
                      undefined,
                      {
                        dateStyle: "long",
                      },
                    )}
                  </span>
                  <span>৹</span>
                  <span>{runtime(movie.runtime!)}</span>
                </div>
                <div className="flex gap-1">
                  {movie.genres!.map(({ id, name }) => (
                    <div key={id} className="badge badge-ghost badge-sm">
                      {name}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="line-clamp-5 text-sm">{movie.overview}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function runtime(time: number) {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;

  return `${hours}h ${minutes}m`;
}
