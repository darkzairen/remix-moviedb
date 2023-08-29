import Database from "better-sqlite3";
import { singleton } from "~/utils/singleton.server";
import { sleep } from "./sleep";
import { MovieDb } from "moviedb-promise";
import { existsSync, mkdirSync } from "fs";

const db = singleton("db", () => {
  if (!existsSync("./database")) mkdirSync("./database");

  const init = new Database("database/storage.db");

  init
    .prepare(
      `CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY,
        movie_id INTEGER NOT NULL,
        text VARCHAR(500) NULL DEFAULT NULL,
        rating INTEGER NOT NULL
      )`,
    )
    .run();

  return init;
});

const moviedb = singleton(
  "moviedb",
  () => new MovieDb(process.env.MOVIEDB_API_KEY ?? ""),
);

export async function createMovieReview(
  params: {
    id: number;
    text: string;
    rating: number;
  },
  wait?: number,
) {
  if (wait) await sleep(wait);

  return db
    .prepare(`INSERT INTO comments (movie_id, text, rating) VALUES(?, ?, ?)`)
    .run(params.id, params.text, params.rating);
}

export async function getMovieReview(params: { id: number }, wait?: number) {
  if (wait) await sleep(wait);

  const result = db
    .prepare(`SELECT * FROM comments WHERE movie_id = ? ORDER BY id DESC`)
    .all(params.id);

  return result as Array<{
    id: number;
    movie_id: number;
    text: string;
    rating: number;
  }>;
}

export async function deleteMovieReview(params: { id: number }, wait?: number) {
  if (wait) await sleep(wait);

  return db.prepare(`DELETE FROM comments WHERE id = ?`).run(params.id);
}

export async function getMovies(
  params?: { search?: string | null },
  wait?: number,
) {
  if (wait) await sleep(wait);

  if (typeof params?.search === "string" && params.search.trim().length > 0) {
    return moviedb.searchMovie({ query: params.search });
  }

  return moviedb.discoverMovie();
}

export async function getMovieInfo(params: { id: number }, wait?: number) {
  if (wait) await sleep(wait);

  return moviedb.movieInfo({ id: params.id });
}
