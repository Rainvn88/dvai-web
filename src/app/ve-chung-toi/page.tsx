import { Cloud, LayoutGrid, Mail, Sparkles, Workflow } from "lucide-react";
import { StatsRow } from "@/components/sections/CaseCards";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Về chúng tôi",
  description: `${site.legalName} (${site.englishName}) giúp doanh nghiệp Việt Nam dùng Microsoft Cloud qua license, triển khai, tự động hoá và dịch vụ vận hành.`,
  path: "/ve-chung-toi/",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line bg-[linear-gradient(135deg,#e2f1f4_0%,#f7fbfc_48%,#e7eef8_100%)] pt-12 pb-14 md:pt-[72px] md:pb-20">
        <div className="wrap">
          <SectionHeading
            as="h1"
            size={1}
            eyebrow={site.tagline}
            eyebrowStyle="dash"
            title={
              <>
                Từ license đến <em>giải pháp hoàn chỉnh.</em>
              </>
            }
            lede="DVAI giúp doanh nghiệp Việt Nam dùng Microsoft Cloud qua license, triển khai, tự động hoá và dịch vụ vận hành."
          />
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Năng lực"
            title={
              <>
                Lĩnh vực <em>chúng tôi làm.</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            items={[
              { icon: Mail, title: "Microsoft 365", text: "Email, Teams, SharePoint, bảo mật và quản trị hằng tháng.", href: "/microsoft-365/", linkLabel: "Xem chi tiết" },
              { icon: LayoutGrid, title: "Power Platform", text: "Ứng dụng nội bộ, tự động hoá và báo cáo trên Microsoft 365.", href: "/power-apps/", linkLabel: "Xem chi tiết" },
              { icon: Cloud, title: "Azure", text: "Máy chủ, sao lưu, lưu trữ và bảo mật trên cloud.", href: "/azure/", linkLabel: "Xem chi tiết" },
              { icon: Sparkles, title: "Copilot", text: "AI trên dữ liệu doanh nghiệp, trợ lý AI nội bộ.", href: "/copilot/", linkLabel: "Xem chi tiết" },
              { icon: Workflow, title: "Tự động hoá quy trình", text: "Số hoá nghiệp vụ vận tải, xuất nhập khẩu, thanh toán, KPI.", href: "/du-an/", linkLabel: "Xem dự án" },
            ]}
          />
          <StatsRow />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Thông tin doanh nghiệp" title="Thông tin pháp lý và văn phòng" className="mb-8" />
          <div className="card overflow-hidden">
            <dl className="divide-y divide-line text-[15px]">
              {[
                ["Tên công ty", site.legalName],
                ["Tên tiếng Anh", site.englishName],
                ["Mã số thuế", site.taxId],
                ...site.offices.map((office) => [office.name, office.address]),
                ["Hotline", site.hotline],
                ["Email", site.email],
              ].map(([label, value]) => (
                <div key={label} className="grid gap-1 px-5.5 py-4 sm:grid-cols-[200px_minmax(0,1fr)] sm:gap-6">
                  <dt className="text-muted">{label}</dt>
                  <dd className="font-medium text-navy">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <CtaPanel
        intent="tu-van"
        title={
          <>
            Trao đổi với DVAI <em>về hệ thống của bạn.</em>
          </>
        }
      />
    </>
  );
}
