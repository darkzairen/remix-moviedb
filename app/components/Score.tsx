export function Score({
  value,
  small = false,
}: {
  value: number;
  small?: boolean;
}) {
  const rate = Math.round(((value * 10) / 100 + Number.EPSILON) * 100);
  const size = small ? "2rem" : "3rem";

  const state =
    rate >= 75
      ? "bg-success text-success-content border-success"
      : rate >= 50
      ? "bg-warning text-warning-content border-warning"
      : "bg-error text-error-content border-error";

  return (
    <div
      className={`radial-progress border-4 ${state}`}
      style={{ "--value": rate, "--size": size }}
    >
      {rate}%
    </div>
  );
}
