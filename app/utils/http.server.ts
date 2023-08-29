const MOVIEDB_API_KEY: string = process.env.MOVIEDB_API_KEY ?? "";
const MOVIEDB_DOMAIN = "https://api.themoviedb.org/3/";

type Params = { [key: string]: any };

export async function http(path: string, params?: Params) {
  const query = new URLSearchParams({
    api_key: MOVIEDB_API_KEY,
    ...(params ?? {}),
  });

  return fetch(`${MOVIEDB_DOMAIN}${path}?${query.toString()}`)
    .then((response) => {
      if (!response.ok) throw new Error(response.statusText);

      return response;
    })
    .then((response) => response.json());
}
