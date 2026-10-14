import Image from "next/image";
import Link from "next/link";
import { footerNav, site, trademarkNote } from "@/content/site";

export function SiteFooter() {
  return (
    <footer className="on-dark bg-navy-deep pt-16 pb-7 text-[14px] text-white/72">
      <div className="wrap">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-[1.25fr_0.85fr_0.95fr_1.45fr]">
          <div>
            <Link href="/">
              <Image src="/brand/logo-dvai-white.png" alt="DVAI" width={114} height={36} className="h-9 w-auto" />
            </Link>
            <p className="mt-3.5 max-w-[34ch] leading-relaxed">
              {site.englishName}. Microsoft 365, Power Platform, Azure và Copilot cho doanh nghiệp Việt Nam. Từ
              license đến giải pháp hoàn chỉnh.
            </p>
          </div>

          {footerNav.map((group) => (
            <div key={group.label}>
              <h2 className="mb-3.5 text-[14px] font-semibold text-white">{group.label}</h2>
              <ul className="grid gap-2.5">
                {group.items.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className="hover:text-white">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h2 className="mb-3.5 text-[14px] font-semibold text-white">Liên hệ</h2>
            <ul className="grid gap-3 leading-relaxed">
              {site.offices.map((office) => (
                <li key={office.name}>
                  <span className="block text-[13.5px] font-semibold text-white">{office.name}</span>
                  {office.address}
                </li>
              ))}
              <li>
                Hotline{" "}
                <a href={`tel:${site.hotline}`} className="hover:text-white">
                  {site.hotline}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="hover:text-white">
                  {site.email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-11 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-white/10 pt-5 text-[12.5px] text-white/55">
          <span>
            {site.legalName} ({site.englishName}), MST {site.taxId}
          </span>
          <span>{trademarkNote}</span>
          <Link href="/chinh-sach-bao-mat/" className="hover:text-white">
            Chính sách bảo mật
          </Link>
        </div>
      </div>
    </footer>
  );
}
