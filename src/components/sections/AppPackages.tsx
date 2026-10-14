import Link from "next/link";
import { Check, Clock } from "lucide-react";
import { appPackages } from "@/content/apps";
import { leadHref } from "@/content/site";

/** Lưới thẻ tối dùng trong dải navy ở trang chủ. */
export function AppPackagesDark() {
  return (
    <ul className="grid gap-3.5 sm:grid-cols-2">
      {appPackages.map((app, index) => (
        <li
          key={app.slug}
          className={`flex flex-col gap-1.5 rounded-[13px] border p-5 ${index < 2 ? "border-sky/45 bg-sky/8" : "border-white/10 bg-white/5"}`}
        >
          <h3 className="text-[15.5px] font-semibold text-white">{app.name}</h3>
          <p className="text-[13.5px] leading-relaxed text-white/66">{app.summary}</p>
          <p className="mt-auto pt-2 text-[12.5px] text-sky">Triển khai từ {app.weeks} tuần</p>
        </li>
      ))}
    </ul>
  );
}

/** Thẻ chi tiết dùng trên trang Power Apps. */
export function AppPackagesDetailed() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {appPackages.map((app) => (
        <article key={app.slug} id={app.slug} className="card flex scroll-mt-24 flex-col gap-3 p-6">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-[17px] font-semibold text-navy">{app.name}</h3>
            <span className="chip chip-teal flex-none gap-1">
              <Clock aria-hidden className="size-3.5" />
              Từ {app.weeks} tuần
            </span>
          </div>
          <p className="text-[14.5px] text-muted">{app.summary}</p>
          <p className="text-[13px] text-muted">
            <span className="font-semibold text-ink">Phù hợp: </span>
            {app.forWho}
          </p>
          <ul className="grid gap-2 text-[14px]">
            {app.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check aria-hidden className="mt-0.5 size-4 flex-none text-teal" />
                {feature}
              </li>
            ))}
          </ul>
          <Link href={leadHref("bao-gia", "Power Apps", `Ứng dụng ${app.name}`)} className="link-more mt-auto pt-2">
            Nhận báo giá ứng dụng này →
          </Link>
        </article>
      ))}
    </div>
  );
}
