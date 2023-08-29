import { json, type LoaderArgs, type V2_MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MovieCard } from "~/components/MovieCard";
import { Navbar } from "~/components/Navbar";
import { getMovies } from "~/utils/model.server";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "Remix MovieDB App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader({ request }: LoaderArgs) {
  const url = new URL(request.url);
  const search = url.searchParams.get("search");
  const movies = await getMovies({ search });
  return json(movies);
}

export default function Index() {
  const movies = useLoaderData<typeof loader>();
  return (
    <div>
      <Navbar>
        <a href="/" className="btn btn-ghost btn-sm text-xl normal-case">
          Discover Movies!
        </a>
        <form>
          <input
            type="search"
            name="search"
            id="search"
            placeholder="Search for movies..."
            className="input input-ghost input-sm"
          />
        </form>
      </Navbar>
      <div className="container mx-auto max-w-6xl py-3">
        <div className="grid grid-cols-6 gap-3">
          {Array.isArray(movies.results) &&
            movies.results.length > 0 &&
            movies.results.map((movie) => (
              <a key={movie.id} href={`/movies/${movie.id}`}>
                <MovieCard movie={movie} />
              </a>
            ))}
        </div>
      </div>
    </div>
  );
}
