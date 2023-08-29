import { type SerializeFrom } from "@remix-run/node";
import { Rating } from "~/components/Rating";
import { type getMovieReview } from "~/utils/model.server";

export function ReviewItem({
  review,
  deleteElement,
}: {
  review: SerializeFrom<typeof getMovieReview>[number];
  deleteElement?: (
    review: SerializeFrom<typeof getMovieReview>[number],
  ) => JSX.Element;
}) {
  return (
    <div className="rounded-md border border-secondary p-3 shadow-md">
      <div className="flex items-center justify-between ">
        <Rating name="rating" value={review.rating} small />
        {deleteElement ? deleteElement(review) : null}
      </div>
      <div>{review.text}</div>
    </div>
  );
}
