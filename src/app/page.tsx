import Link from "next/link";
import { ChartColumn, Cloud, LayoutGrid, Mail, Server, ShieldCheck, Sparkles, Workflow } from "lucide-react";
import { ApprovalDemo } from "@/components/demo/ApprovalDemo";
import { AppPackagesDark } from "@/components/sections/AppPackages";
import { ArticleCards } from "@/components/sections/ArticleCards";
import { CaseCards, StatsRow } from "@/components/sections/CaseCards";
import { ChecklistPanel } from "@/components/sections/ChecklistPanel";
import { CompareTable } from "@/components/sections/CompareTable";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { CustomAppBlock } from "@/components/sections/CustomAppBlock";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { NumberedRows } from "@/components/sections/NumberedRows";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { LeadButtons } from "@/components/ui/LeadButtons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadHref, site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = {
  ...pageMeta({
    title: "DVAI | Microsoft Cloud & Business Solutions for SMEs in Vietnam",
    description: site.description,
    path: "/",
  }),
  title: { absolute: "DVAI | Microsoft Cloud & Business Solutions for SMEs in Vietnam" },
};

export default function HomePage() {
  return (
    <>
      <PageHero
        eyebrow={site.tagline}
        title={
          <>
            Từ license Microsoft đến <em>ứng dụng chạy thật</em> trong doanh nghiệp.
          </>
        }
        lede="Microsoft 365, Power Platform, Azure và Copilot cho doanh nghiệp Việt Nam từ 5 đến 300 nhân sự. Một đầu mối cho license, triển khai, ứng dụng nội bộ và vận hành."
        primary="bao-gia"
        trust={[
          "Dữ liệu nằm trong Microsoft 365 của chính bạn",
          "Hoá đơn VAT, thanh toán VND",
          `Phản hồi trong ${site.responseTime}`,
        ]}
        aside={<ApprovalDemo />}
      />

      <section className="section" id="nhu-cau">
        <div className="wrap">
          <SectionHeading
            eyebrow="Bắt đầu từ nhu cầu"
            title={
              <>
                Doanh nghiệp bạn <em>đang cần gì?</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            columns={4}
            items={[
              {
                icon: Mail,
                title: "Email tên miền riêng, họp và làm việc nhóm",
                text: `Hộp thư @congty.vn, Teams, OneDrive và Office cho toàn công ty. License từ ${site.licenseFrom}/user/tháng.`,
                href: "/microsoft-365/",
                linkLabel: "Microsoft 365",
              },
              {
                icon: Workflow,
                title: "Bỏ duyệt chứng từ bằng giấy, Excel, Zalo",
                text: "Đề xuất, phê duyệt và lưu vết trên điện thoại, tự nhắc người duyệt.",
                href: "/power-apps/",
                linkLabel: "Power Apps, Power Automate",
              },
              {
                icon: ChartColumn,
                title: "Báo cáo số liệu tự cập nhật",
                text: "Dashboard doanh thu, chi phí, vận hành thay cho tổng hợp thủ công cuối tháng.",
                href: "/power-bi/",
                linkLabel: "Power BI",
              },
              {
                icon: Server,
                title: "Máy chủ, sao lưu, bảo mật dữ liệu",
                text: "Đưa phần mềm và dữ liệu lên cloud, có bản sao lưu ngoài văn phòng.",
                href: "/azure/",
                linkLabel: "Azure",
              },
            ]}
          />
          <CustomAppBlock />
        </div>
      </section>

      <section className="section pt-0" id="lo-trinh">
        <div className="wrap">
          <SectionHeading
            eyebrow="Lộ trình triển khai"
            title={
              <>
                Bắt đầu với license, phát triển thành <em>hệ thống vận hành.</em>
              </>
            }
            lede="Mỗi bước dựa trên bước trước, nên doanh nghiệp không phải mua lại hay làm lại."
            className="mb-10"
          />
          <NumberedRows
            rows={[
              { cond: "Điểm bắt đầu", title: "Microsoft 365", text: "Email tên miền, Teams, OneDrive, SharePoint và Office cho toàn công ty.", href: "/microsoft-365/", linkLabel: "Xem các gói", highlight: true },
              { cond: "Khi quy trình còn chạy bằng giấy và Excel", title: "Power Apps", text: "Ứng dụng nội bộ: duyệt chi phí, vận tải, mua hàng, KPI.", href: "/power-apps/" },
              { cond: "Khi việc lặp lại chiếm nhiều giờ công", title: "Power Automate", text: "Tự động duyệt nhiều cấp, nhắc hạn, thông báo qua Teams và email.", href: "/power-automate/" },
              { cond: "Khi cần số liệu để ra quyết định", title: "Power BI", text: "Dashboard quản trị tự cập nhật, xem trên điện thoại.", href: "/power-bi/" },
              { cond: "Khi máy chủ văn phòng đã cũ", title: "Azure", text: "Máy ảo, sao lưu, lưu trữ và bảo mật trên cloud.", href: "/azure/" },
              { cond: "Khi dữ liệu đã được phân quyền đúng", title: "Copilot", text: "AI làm việc trên email, tài liệu và cuộc họp của doanh nghiệp.", href: "/copilot/" },
              { cond: "Suốt quá trình sử dụng", title: "Quản trị và vận hành", text: "Quản lý người dùng, giám sát bảo mật, sao lưu và hỗ trợ hằng tháng.", href: "/dich-vu/quan-tri-van-hanh/", linkLabel: "Xem dịch vụ" },
            ]}
          />
        </div>
      </section>

      <section className="section on-dark bg-navy text-white" id="ung-dung">
        <div className="wrap grid items-start gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="eyebrow eyebrow-dash mb-5">Ứng dụng dựng sẵn</p>
            <h2 className="display-2">
              Ứng dụng nội bộ <em>đã chạy thực tế,</em> điều chỉnh theo quy trình của bạn.
            </h2>
            <p className="lede mt-4.5 mb-7.5">
              Xây trên Power Apps, SharePoint và Power Automate mà doanh nghiệp đã có trong Microsoft 365. Xem demo,
              thống nhất phạm vi, nhận báo giá trọn gói.
            </p>
            <LeadButtons primary="tu-van" product="Power Apps" dark />
          </div>
          <AppPackagesDark />
        </div>
      </section>

      <section className="section" id="san-pham">
        <div className="wrap">
          <SectionHeading
            eyebrow="Sản phẩm và dịch vụ"
            title={
              <>
                Hệ sinh thái Microsoft, <em>một đầu mối.</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            tone="blue"
            topBorder
            items={[
              {
                icon: Mail,
                title: "Microsoft 365",
                text: `Email, họp, lưu trữ và Office. Tư vấn chọn gói theo số nhân sự và yêu cầu bảo mật. License từ ${site.licenseFrom}/user/tháng.`,
                chips: ["Business Basic", "Business Standard", "Business Premium", "Exchange Online", "Teams", "SharePoint", "OneDrive"],
                href: "/microsoft-365/",
                linkLabel: "Xem các gói",
              },
              {
                icon: LayoutGrid,
                title: "Power Platform",
                text: "Ứng dụng nội bộ, tự động hoá quy trình và báo cáo quản trị trên nền Microsoft 365.",
                chips: ["Power Apps", "Power Automate", "Power BI", "Dataverse"],
                href: "/power-apps/",
                linkLabel: "Xem chi tiết",
              },
              {
                icon: Cloud,
                title: "Azure",
                text: "Hạ tầng cloud cho phần mềm, dữ liệu và sao lưu, có bảng ước tính chi phí trước khi triển khai.",
                chips: ["Máy ảo", "Sao lưu", "Lưu trữ", "Chuyển lên cloud", "Danh tính", "Bảo mật"],
                href: "/azure/",
                linkLabel: "Xem chi tiết",
              },
              {
                icon: Sparkles,
                title: "AI và Copilot",
                text: "AI trong Word, Excel, Outlook, Teams và trợ lý AI riêng cho doanh nghiệp.",
                chips: ["Microsoft 365 Copilot", "Copilot Studio", "AI workflow", "AI automation"],
                href: "/copilot/",
                linkLabel: "Xem chi tiết",
              },
            ]}
            columns={2}
          />
          <div className="card mt-4 grid gap-5 border-t-[3px] border-t-teal p-6 md:grid-cols-2 md:gap-7">
            <div className="flex flex-col gap-3">
              <span className="w-max rounded-full bg-teal-soft px-2.5 py-0.5 text-[12px] font-semibold text-teal">
                Sau khi triển khai
              </span>
              <h3 className="text-[17px] font-semibold text-navy">Quản trị và vận hành</h3>
              <p className="text-[14.5px] text-muted">
                Phần mà đơn vị chỉ bán license không làm: quản trị hệ thống Microsoft của bạn hằng tháng.
              </p>
              <Link href="/dich-vu/quan-tri-van-hanh/" className="link-more">
                Xem dịch vụ quản trị →
              </Link>
            </div>
            <div className="flex flex-col gap-3">
              <span className="icon-tile bg-teal-soft text-teal">
                <ShieldCheck aria-hidden className="size-5" strokeWidth={1.8} />
              </span>
              <ul className="flex flex-wrap gap-1.5">
                {["Quản trị Microsoft 365", "Quản lý user và license", "Giám sát bảo mật", "Sao lưu", "Hỗ trợ kỹ thuật"].map((chip) => (
                  <li key={chip} className="chip chip-teal">
                    {chip}
                  </li>
                ))}
              </ul>
              <p className="text-[15px] text-muted">Báo giá theo số người dùng và phạm vi hỗ trợ</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0" id="du-an">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              eyebrow="Dự án tiêu biểu"
              title={
                <>
                  Kết quả từ <em>các dự án đã triển khai.</em>
                </>
              }
            />
            <Link href="/du-an/" className="link-more">
              Xem tất cả dự án →
            </Link>
          </div>
          <CaseCards />
          <StatsRow />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Vì sao chọn DVAI"
            title={
              <>
                Khác gì so với <em>mua license ở nơi khác?</em>
              </>
            }
            className="mb-10"
          />
          <CompareTable
            caption="So sánh DVAI với đơn vị chỉ bán license"
            head={["Hạng mục", "DVAI", "Đơn vị chỉ bán license"]}
            rows={[
              ["Tư vấn chọn gói theo quy mô và nhu cầu", "Có", "Thường không"],
              ["Chuyển email, dữ liệu, cấu hình bảo mật", "Có quy trình, có biên bản", "Khách tự làm"],
              ["Xây ứng dụng và tự động hoá trên Microsoft 365", "6 ứng dụng dựng sẵn và thiết kế riêng", "Không"],
              ["Quản trị và hỗ trợ sau bán", "Gói hằng tháng", "Theo vụ việc"],
              ["Hoá đơn VAT, thanh toán VND", "Có", "Tuỳ đơn vị"],
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Quản trị và vận hành"
              title={
                <>
                  Đội quản trị Microsoft 365 cho doanh nghiệp <em>không có IT riêng.</em>
                </>
              }
              lede="Thêm, khoá người dùng, cấp quyền, theo dõi bảo mật, sao lưu và hỗ trợ kỹ thuật theo gói hằng tháng."
            />
            <p className="mt-4 mb-5.5 text-[15px] text-muted">Báo giá theo số người dùng và phạm vi hỗ trợ.</p>
            <Link href={leadHref("tu-van", "Quản trị và vận hành")} className="btn btn-secondary">
              Đặt lịch tư vấn
            </Link>
          </div>
          <ChecklistPanel
            title="Mỗi tháng chúng tôi lo"
            items={[
              "Tạo, khoá tài khoản và chuyển dữ liệu khi nhân viên nghỉ việc.",
              "Thu hồi license không dùng để không trả tiền thừa.",
              "Cảnh báo đăng nhập bất thường và email lừa đảo.",
              "Sao lưu email, OneDrive, SharePoint và Teams.",
              "Báo cáo hằng tháng: sự cố, thay đổi, khuyến nghị.",
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Cách làm việc"
            title={
              <>
                Làm việc với chúng tôi <em>thế nào?</em>
              </>
            }
            className="mb-12"
          />
          <Steps
            items={[
              { title: "Trao đổi nhu cầu", text: "30 phút qua Teams để hiểu hệ thống và quy trình hiện tại." },
              { title: "Đề xuất và báo giá", text: "Phương án, phạm vi và chi phí rõ ràng trước khi triển khai." },
              { title: "Triển khai", text: "Cấu hình, chuyển dữ liệu, xây ứng dụng, đào tạo người dùng." },
              { title: "Vận hành", text: "Bàn giao, bảo hành và gói quản trị hằng tháng nếu cần." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0" id="kien-thuc">
        <div className="wrap">
          <div className="mb-9 flex flex-wrap items-end justify-between gap-5">
            <SectionHeading
              eyebrow="Kiến thức"
              title={
                <>
                  Hướng dẫn chọn và dùng <em>Microsoft cho doanh nghiệp.</em>
                </>
              }
            />
            <Link href="/kien-thuc/" className="link-more">
              Xem tất cả bài viết →
            </Link>
          </div>
          <ArticleCards />
        </div>
      </section>

      <CtaPanel
        title={
          <>
            Cần báo giá Microsoft 365 hoặc <em>tư vấn giải pháp?</em>
          </>
        }
      />
    </>
  );
}
