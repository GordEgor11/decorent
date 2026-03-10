import Link from "next/link";
import type { ComponentProps } from "react";

type Props = ComponentProps<typeof Link> & {
  variant?: "primary" | "secondary" | "ghost";
};

const variants: Record<NonNullable<Props["variant"]>, string> = {
  primary:
    "bg-brand text-white hover:bg-brand/90 shadow-soft border border-transparent",
  secondary:
    "bg-surface text-text hover:bg-surface/70 border border-border shadow-soft",
  ghost: "bg-transparent text-text hover:bg-surface/60 border border-border"
};

export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: Props) {
  return (
    <Link
      {...props}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-medium transition",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-brand/50",
        variants[variant],
        className
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}

