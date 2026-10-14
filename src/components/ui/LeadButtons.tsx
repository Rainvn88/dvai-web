import Link from "next/link";
import { ctaLabels, leadHref, type LeadIntent, type Product } from "@/content/site";

type Props = {
  /** CTA chính của trang: trang license dùng "bao-gia", trang giải pháp/dịch vụ dùng "tu-van". */
  primary?: LeadIntent;
  product?: Product;
  dark?: boolean;
  className?: string;
};

/** Cặp CTA duy nhất của toàn site: «Nhận báo giá» và «Đặt lịch tư vấn». */
export function LeadButtons({ primary = "bao-gia", product, dark = false, className = "" }: Props) {
  const secondary: LeadIntent = primary === "bao-gia" ? "tu-van" : "bao-gia";
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <Link href={leadHref(primary, product)} className="btn btn-primary">
        {ctaLabels[primary]}
      </Link>
      <Link href={leadHref(secondary, product)} className={`btn ${dark ? "btn-ghost" : "btn-secondary"}`}>
        {ctaLabels[secondary]}
      </Link>
    </div>
  );
}
