export function SectionHeading({
  kicker,
  title,
  subtitle
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="max-w-2xl">
      {kicker ? (
        <div className="text-xs font-semibold uppercase tracking-wide text-muted">
          {kicker}
        </div>
      ) : null}
      <h2 className="mt-2 text-balance text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="mt-3 text-pretty text-sm leading-6 text-muted sm:text-base">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

