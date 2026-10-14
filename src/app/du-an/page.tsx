import { CaseCards, StatsRow } from "@/components/sections/CaseCards";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Dự án đã triển khai",
  description:
    "Dự án số hoá vận hành DVAI đã triển khai cho doanh nghiệp logistics, thương mại và forwarder, với kết quả đo được.",
  path: "/du-an/",
});

export default function CasesPage() {
  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-12 pb-14 md:pt-[72px] md:pb-20">
        <div className="wrap">
          <SectionHeading
            as="h1"
            size={1}
            eyebrow="Dự án"
            eyebrowStyle="dash"
            title={
              <>
                Dự án <em>đã triển khai.</em>
              </>
            }
            lede="Phạm vi và kết quả đo được của từng dự án. Tên khách hàng được ẩn theo thoả thuận bảo mật."
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <CaseCards />
          <StatsRow />
        </div>
      </section>

      <CtaPanel
        intent="tu-van"
        product="Ứng dụng thiết kế riêng"
        title={
          <>
            Muốn có kết quả tương tự <em>cho doanh nghiệp của bạn?</em>
          </>
        }
      />
    </>
  );
}
