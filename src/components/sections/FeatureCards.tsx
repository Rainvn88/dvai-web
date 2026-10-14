import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Check } from "lucide-react";

export type FeatureItem = {
  icon?: LucideIcon;
  title: string;
  text?: string;
  points?: string[];
  chips?: string[];
  href?: string;
  linkLabel?: string;
};

const columnClass = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-2 lg:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
} as const;

type Props = {
  items: FeatureItem[];
  columns?: keyof typeof columnClass;
  tone?: "teal" | "blue";
  topBorder?: boolean;
};

export function FeatureCards({ items, columns = 3, tone = "teal", topBorder = false }: Props) {
  const tile = tone === "teal" ? "bg-teal-soft text-teal" : "bg-blue-soft text-blue";
  return (
    <div className={`grid gap-4 ${columnClass[columns]}`}>
      {items.map((item) => {
        const Icon = item.icon;
        const body = (
          <>
            {Icon && (
              <span className={`icon-tile ${tile}`}>
                <Icon aria-hidden className="size-5" strokeWidth={1.8} />
              </span>
            )}
            <h3 className="text-[16.5px] leading-snug font-semibold text-navy">{item.title}</h3>
            {item.text && <p className="text-[14.5px] text-muted">{item.text}</p>}
            {item.points && (
              <ul className="grid gap-2 text-[14px] text-ink">
                {item.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check aria-hidden className="mt-0.5 size-4 flex-none text-teal" />
                    {point}
                  </li>
                ))}
              </ul>
            )}
            {item.chips && (
              <ul className="flex flex-wrap gap-1.5">
                {item.chips.map((chip) => (
                  <li key={chip} className={tone === "teal" ? "chip chip-teal" : "chip"}>
                    {chip}
                  </li>
                ))}
              </ul>
            )}
            {item.href && item.linkLabel && <span className="link-more mt-auto pt-1">{item.linkLabel} →</span>}
          </>
        );
        const cls = `card flex flex-col gap-3 p-6 ${topBorder ? (tone === "teal" ? "border-t-[3px] border-t-teal" : "border-t-[3px] border-t-blue") : ""}`;
        return item.href ? (
          <Link key={item.title} href={item.href} className={`${cls} transition-colors hover:border-teal`}>
            {body}
          </Link>
        ) : (
          <div key={item.title} className={cls}>
            {body}
          </div>
        );
      })}
    </div>
  );
}
