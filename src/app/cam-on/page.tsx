import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Check } from "lucide-react";
import { ArticleCards } from "@/components/sections/ArticleCards";
import { site } from "@/content/site";
import { ThankYouMessage } from "./ThankYouMessage";

export const metadata: Metadata = {
  title: "Đã nhận yêu cầu",
  robots: { index: false, follow: true },
};

export default function ThankYouPage() {
  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-14 pb-16 md:pt-20 md:pb-20">
        <div className="wrap max-w-[860px]">
          <span className="icon-tile mb-6 bg-teal text-white">
            <Check aria-hidden className="size-6" />
          </span>
          <Suspense
            fallback={
              <>
                <h1 className="display-1">Đã nhận yêu cầu của bạn</h1>
                <p className="lede mt-5">Chúng tôi sẽ liên hệ trong {site.responseTime}.</p>
              </>
            }
          >
            <ThankYouMessage />
          </Suspense>
          <div className="card mt-8 p-6">
            <h2 className="text-[16px] font-semibold text-navy">Để buổi trao đổi nhanh hơn, bạn có thể chuẩn bị</h2>
            <ul className="mt-3 grid gap-2 text-[15px]">
              {["Số người dùng cần license", "Hệ thống email và phần mềm đang dùng", "Quy trình muốn cải thiện hoặc số hoá"].map((item) => (
                <li key={item} className="flex gap-2">
                  <Check aria-hidden className="mt-1 size-4 flex-none text-teal" />
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-muted">
              Cần gấp, gọi hotline{" "}
              <a href={`tel:${site.hotline}`} className="font-semibold text-teal">
                {site.hotline}
              </a>
              .
            </p>
          </div>
          <Link href="/" className="link-more mt-6">
            Về trang chủ →
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="wrap">
          <h2 className="display-3 mb-8">Trong lúc chờ, bạn có thể đọc</h2>
          <ArticleCards />
        </div>
      </section>
    </>
  );
}
