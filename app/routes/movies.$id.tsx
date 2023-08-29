import {
  json,
  redirect,
  type ActionArgs,
  type LoaderArgs,
  type SerializeFrom,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { MovieDetail } from "~/components/MovieDetail";
import { Rating } from "~/components/Rating";
import { ReviewItem } from "~/components/ReviewItem";
import {
  createMovieReview,
  getMovieInfo,
  getMovieReview,
} from "~/utils/model.server";

export async function loader({ params }: LoaderArgs) {
  const id = Number(params.id);
  const movie = await getMovieInfo({ id });
  const reviews = await getMovieReview({ id });
  return json({ movie, reviews });
}

export async function action({ params, request }: ActionArgs) {
  const formData = await request.formData();
  const id = Number(params.id);
  const text = String(formData.get("text"));
  const rating = Number(formData.get("rating"));
  await createMovieReview({ id, text, rating });
  return redirect(".");
}

export default function MovieRoute() {
  const { movie, reviews } = useLoaderData<typeof loader>();
  return (
    <div>
      <MovieDetail movie={movie} />
      <ReviewSection reviews={reviews} />
    </div>
  );
}

function ReviewSection({
  reviews,
}: {
  reviews: SerializeFrom<typeof loader>["reviews"];
}) {
  return (
    <div className="container mx-auto max-w-xl space-y-5 py-3">
      <h2 className="text-xl">Reviews</h2>
      <form method="post">
        <textarea
          name="text"
          id="text"
          className="textarea textarea-bordered textarea-sm w-full text-secondary"
        />
        <div className="flex items-center justify-between">
          <Rating name="rating" value={1} />
          <button type="submit" className="btn btn-primary btn-sm">
            Post
          </button>
        </div>
      </form>
      <div className="space-y-1">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))
        ) : (
          <p className="text-center italic text-secondary">No reviews yet.</p>
        )}
      </div>
    </div>
  );
}
