import type { ReactNode } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { site, type LeadIntent, type Product } from "@/content/site";

type Props = {
  title: ReactNode;
  lede?: ReactNode;
  intent?: LeadIntent;
  product?: Product;
};

/** Khung navy cuối trang: lời mời + form rút gọn. */
export function CtaPanel({ title, lede, intent = "bao-gia", product }: Props) {
  return (
    <section id="lien-he-nhanh" className="scroll-mt-20 pt-6 pb-24">
      <div className="wrap">
        <div className="on-dark grid items-center gap-10 rounded-[20px] bg-navy px-5 py-8 text-white sm:p-10 lg:grid-cols-2 lg:gap-12 lg:p-13">
          <div>
            <p className="eyebrow eyebrow-dash mb-5">Bắt đầu</p>
            <h2 className="display-2">{title}</h2>
            <p className="lede mt-4 mb-6.5">
              {lede ?? <>Gửi thông tin, chúng tôi phản hồi trong {site.responseTime}.</>}
            </p>
            <ul className="grid gap-2.5 text-[14.5px] text-white/80">
              <li className="flex items-center gap-2.5">
                <Phone aria-hidden className="size-4.5 text-mint" />
                Hotline{" "}
                <a href={`tel:${site.hotline}`} className="font-semibold text-white hover:underline">
                  {site.hotline}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail aria-hidden className="size-4.5 text-mint" />
                <a href={`mailto:${site.email}`} className="font-semibold text-white hover:underline">
                  {site.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin aria-hidden className="size-4.5 text-mint" />
                Văn phòng Hà Nội và Hà Tĩnh
              </li>
            </ul>
          </div>
          <LeadForm variant="compact" defaultIntent={intent} defaultProduct={product} />
        </div>
      </div>
    </section>
  );
}
