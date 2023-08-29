export function Rating({
  name,
  value,
  small = false,
}: {
  name: string;
  value: number;
  small?: boolean;
}) {
  return (
    <div className={`rating gap-1 ${small ? "rating-sm" : ""}`}>
      {Array.from({ length: 5 }).map((_, index) => (
        <input
          key={index}
          type="radio"
          name={name}
          value={index + 1}
          defaultChecked={index + 1 === value}
          className="mask mask-star-2 bg-warning"
        />
      ))}
    </div>
  );
}
