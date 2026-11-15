import { Star } from "lucide-react";

export default function StarRating({ value, onChange, size = 18, readOnly = false }) {
  if (readOnly) {
    return (
      <span
        role="img"
        aria-label={`Rating ${value} dari 5`}
        className="inline-flex items-center gap-0.5"
      >
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={size}
            aria-hidden="true"
            className={star <= Math.round(value) ? "fill-brand text-brand" : "text-line"}
          />
        ))}
      </span>
    );
  }

  return (
    <span role="group" aria-label="Pilih rating" className="inline-flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          aria-label={`${star} bintang`}
          aria-pressed={star === value}
          className="grid size-10 place-items-center rounded-full transition hover:scale-110"
        >
          <Star
            size={size}
            aria-hidden="true"
            className={star <= value ? "fill-brand text-brand" : "text-line"}
          />
        </button>
      ))}
    </span>
  );
}
