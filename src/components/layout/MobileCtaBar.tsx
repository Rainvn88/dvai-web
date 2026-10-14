import Link from "next/link";
import { ctaLabels, leadHref } from "@/content/site";

/** Thanh hai nút cố định ở đáy màn hình điện thoại. */
export function MobileCtaBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-line bg-white/97 px-4 pt-2.5 pb-[calc(10px+env(safe-area-inset-bottom,0px))] sm:hidden">
      <Link href={leadHref("tu-van")} className="btn btn-secondary flex-1 px-2.5 text-[14px]">
        {ctaLabels["tu-van"]}
      </Link>
      <Link href={leadHref("bao-gia")} className="btn btn-primary flex-1 px-2.5 text-[14px]">
        {ctaLabels["bao-gia"]}
      </Link>
    </div>
  );
}
