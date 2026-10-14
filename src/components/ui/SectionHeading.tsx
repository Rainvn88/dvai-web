import type { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  lede?: ReactNode;
  as?: "h1" | "h2" | "h3";
  size?: 1 | 2 | 3;
  eyebrowStyle?: "rule" | "dash";
  className?: string;
};

/** Nhãn nhỏ + tiêu đề font có chân + đoạn dẫn. Dùng <em> trong title cho cụm nhấn. */
export function SectionHeading({
  eyebrow,
  title,
  lede,
  as: Tag = "h2",
  size = 2,
  eyebrowStyle = "rule",
  className = "",
}: Props) {
  return (
    <div className={`grid max-w-[720px] gap-4 ${className}`}>
      {eyebrow && <p className={`eyebrow eyebrow-${eyebrowStyle}`}>{eyebrow}</p>}
      <Tag className={`display-${size}`}>{title}</Tag>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
