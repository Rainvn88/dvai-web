import Link from "next/link";
import {
  Check,
  FolderOpen,
  GraduationCap,
  Globe,
  KeyRound,
  Mail,
  Minus,
  ShieldCheck,
} from "lucide-react";
import { PlanChooser } from "@/components/m365/PlanChooser";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { leadHref, site } from "@/content/site";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Microsoft 365 cho doanh nghiệp: Business Basic, Standard, Premium",
  description: `So sánh Microsoft 365 Business Basic, Standard, Premium và chọn gói theo quy mô. License từ ${site.licenseFrom}/user/tháng, hoá đơn VAT, hỗ trợ chuyển email.`,
  path: "/microsoft-365/",
});

const plans = [
  {
    name: "Business Basic",
    lead: "Email, họp và lưu trữ cho toàn công ty.",
    features: [
      "Email tên miền riêng, hộp thư 50 GB",
      "Teams để họp và chat",
      "OneDrive 1 TB mỗi người, SharePoint",
      "Word, Excel, PowerPoint bản web và mobile",
    ],
  },
  {
    name: "Business Standard",
    lead: "Toàn bộ Business Basic, thêm Office cài trên máy tính.",
    features: [
      "Word, Excel, PowerPoint, Outlook bản cài",
      "Mỗi người cài trên tối đa 5 PC hoặc Mac, 5 máy tính bảng, 5 điện thoại",
      "Hội thảo trực tuyến có đăng ký tham dự",
    ],
  },
  {
    name: "Business Premium",
    lead: "Toàn bộ Business Standard, thêm bảo mật và quản lý thiết bị.",
    features: [
      "Quản lý laptop, điện thoại công ty (Intune)",
      "Chống mã độc và lừa đảo (Defender for Business)",
      "Kiểm soát đăng nhập (Entra ID P1)",
      "Chống rò rỉ dữ liệu nhạy cảm",
    ],
  },
];

const compareRows: [string, boolean | string, boolean | string, boolean | string][] = [
  ["Email doanh nghiệp, hộp thư 50 GB", true, true, true],
  ["Họp và chat trên Teams", true, true, true],
  ["OneDrive 1 TB mỗi người, SharePoint", true, true, true],
  ["Word, Excel, PowerPoint bản web và mobile", true, true, true],
  ["Office cài trên máy tính", false, true, true],
  ["Hội thảo trực tuyến có đăng ký tham dự", false, true, true],
  ["Quản lý laptop, điện thoại công ty", false, false, true],
  ["Chống mã độc, lừa đảo nâng cao", false, false, true],
  ["Chặn đăng nhập từ thiết bị hoặc vị trí lạ", false, false, true],
  ["Chống rò rỉ dữ liệu nhạy cảm", false, false, true],
  ["Số người dùng tối đa", "300", "300", "300"],
];

function Cell({ value }: { value: boolean | string }) {
  if (typeof value === "string") return <span className="font-semibold text-navy tabular-nums">{value}</span>;
  return value ? (
    <>
      <Check aria-hidden className="mx-auto size-5 text-teal" />
      <span className="sr-only">Có</span>
    </>
  ) : (
    <>
      <Minus aria-hidden className="mx-auto size-5 text-[#9db0b8]" />
      <span className="sr-only">Không</span>
    </>
  );
}

export default function Microsoft365Page() {
  return (
    <>
      <PageHero
        eyebrow="Microsoft 365 cho doanh nghiệp"
        title={
          <>
            Email tên miền, Teams, Office và bảo mật <em>trong một gói.</em>
          </>
        }
        lede="Chọn gói theo số nhân sự và yêu cầu bảo mật. DVAI chuyển email, cấu hình và hỗ trợ sau triển khai."
        primary="bao-gia"
        product="Microsoft 365"
        trust={["Hoá đơn VAT, thanh toán VND", "Chuyển email cũ, không mất thư", `Phản hồi trong ${site.responseTime}`]}
        aside={
          <div className="card grid gap-4 p-7">
            <p className="text-[13px] font-semibold tracking-[0.1em] text-teal uppercase">Giá tham khảo</p>
            <p className="text-[15px] text-muted">
              License từ{" "}
              <span className="block font-display text-[44px] leading-tight text-navy">{site.licenseFrom}</span>
              /user/tháng
            </p>
            <ul className="grid gap-2 border-t border-line pt-4 text-[14.5px]">
              <li className="flex gap-2">
                <Check aria-hidden className="mt-0.5 size-4 flex-none text-teal" />
                Báo giá theo kỳ cam kết tháng hoặc năm
              </li>
              <li className="flex gap-2">
                <Check aria-hidden className="mt-0.5 size-4 flex-none text-teal" />
                Kết hợp nhiều gói trong một công ty
              </li>
              <li className="flex gap-2">
                <Check aria-hidden className="mt-0.5 size-4 flex-none text-teal" />
                Hỗ trợ chuyển email và cấu hình bảo mật
              </li>
            </ul>
            <Link href="#chon-goi" className="link-more">
              Gói nào phù hợp với bạn? →
            </Link>
          </div>
        }
      />

      <section className="section" id="cac-goi">
        <div className="wrap">
          <SectionHeading
            eyebrow="Các gói Business"
            title={
              <>
                Ba gói Microsoft 365 <em>cho doanh nghiệp đến 300 người.</em>
              </>
            }
            lede="Giá phụ thuộc kỳ cam kết, cách thanh toán và khuyến mãi từng thời điểm. Gửi số người dùng để nhận báo giá chính xác."
            className="mb-10"
          />
          <div className="grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => (
              <article key={plan.name} className="card flex flex-col gap-4 border-t-[3px] border-t-teal p-6.5">
                <h3 className="text-[19px] font-semibold text-navy">Microsoft 365 {plan.name}</h3>
                <p className="text-[14.5px] text-muted">{plan.lead}</p>
                <ul className="grid gap-2.5 text-[14.5px]">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <Check aria-hidden className="mt-0.5 size-4 flex-none text-teal" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={leadHref("bao-gia", "Microsoft 365", `Gói ${plan.name}`)}
                  className="btn btn-secondary mt-auto"
                >
                  Nhận báo giá gói này
                </Link>
              </article>
            ))}
          </div>
          <p className="mt-4 text-[13.5px] text-muted">
            License Microsoft 365 từ {site.licenseFrom}/user/tháng. Giá chưa bao gồm dịch vụ chuyển đổi và quản trị.
          </p>
        </div>
      </section>

      <section className="section pt-0 scroll-mt-20" id="chon-goi">
        <div className="wrap">
          <SectionHeading
            eyebrow="Chọn gói"
            title={
              <>
                Gói nào phù hợp với <em>doanh nghiệp của bạn?</em>
              </>
            }
            className="mb-10"
          />
          <PlanChooser />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="So sánh chi tiết" title="So sánh tính năng từng gói" className="mb-8" />
          <div className="card overflow-hidden">
            {/* relative: giữ các nhãn sr-only (position: absolute) bên trong vùng cuộn */}
            <div className="relative overflow-x-auto">
              <table className="w-full min-w-[640px] border-collapse text-[15px]">
                <caption className="sr-only">So sánh tính năng Microsoft 365 Business Basic, Standard, Premium</caption>
                <thead>
                  <tr className="bg-[#f6f9fa]">
                    <th scope="col" className="px-5 py-4 text-left text-[13px] font-semibold text-muted">
                      Tính năng
                    </th>
                    {["Basic", "Standard", "Premium"].map((name) => (
                      <th key={name} scope="col" className="w-[18%] px-3 py-4 text-center text-[13px] font-semibold text-navy">
                        {name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([label, ...cells]) => (
                    <tr key={label} className="border-t border-line">
                      <th scope="row" className="px-5 py-3.5 text-left font-normal">
                        {label}
                      </th>
                      {cells.map((cell, index) => (
                        <td key={index} className="px-3 py-3.5 text-center">
                          <Cell value={cell} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Sản phẩm lẻ và add-on"
            title={
              <>
                Chỉ cần <em>một phần</em> của Microsoft 365?
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            columns={4}
            tone="blue"
            items={[
              { icon: Mail, title: "Exchange Online", text: "Chỉ email doanh nghiệp, gói Plan 1 hoặc Plan 2 theo dung lượng và tính năng lưu trữ." },
              { icon: Globe, title: "Teams Essentials", text: "Họp và chat cho nhóm nhỏ, không kèm email và Office." },
              { icon: FolderOpen, title: "SharePoint, OneDrive", text: "Lưu trữ và chia sẻ tài liệu cho doanh nghiệp chưa cần email mới." },
              { icon: ShieldCheck, title: "Add-on", text: "Microsoft 365 Copilot, Defender, Intune, Entra ID, lưu trữ email dài hạn." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Kỳ cam kết"
            title={
              <>
                Cam kết tháng hay <em>cam kết năm?</em>
              </>
            }
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <div className="card grid content-start gap-3 p-6.5">
              <h3 className="text-[17px] font-semibold text-navy">Cam kết năm</h3>
              <ul className="grid gap-2.5 text-[15px]">
                <li className="flex gap-2"><Check aria-hidden className="mt-1 size-4 flex-none text-teal" />Giá thấp hơn cam kết tháng</li>
                <li className="flex gap-2"><Check aria-hidden className="mt-1 size-4 flex-none text-teal" />Thanh toán theo tháng hoặc trả trước cả năm</li>
                <li className="flex gap-2"><Check aria-hidden className="mt-1 size-4 flex-none text-teal" />Tăng số người dùng trong kỳ, giảm khi gia hạn</li>
              </ul>
              <p className="text-[14px] text-muted">Phù hợp khi nhân sự ổn định.</p>
            </div>
            <div className="card grid content-start gap-3 p-6.5">
              <h3 className="text-[17px] font-semibold text-navy">Cam kết tháng</h3>
              <ul className="grid gap-2.5 text-[15px]">
                <li className="flex gap-2"><Check aria-hidden className="mt-1 size-4 flex-none text-teal" />Tăng, giảm số người dùng linh hoạt hằng tháng</li>
                <li className="flex gap-2"><Check aria-hidden className="mt-1 size-4 flex-none text-teal" />Giá cao hơn cam kết năm</li>
              </ul>
              <p className="text-[14px] text-muted">Phù hợp cho nhân sự thời vụ hoặc dự án ngắn hạn.</p>
            </div>
          </div>
          <p className="mt-4 max-w-[75ch] text-[14px] text-muted">
            Sau khi mua hoặc gia hạn, Microsoft chỉ cho phép huỷ hoặc giảm số lượng trong một khoảng thời gian ngắn. DVAI
            kiểm tra số người dùng cùng bạn trước khi đặt mua.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Dịch vụ đi kèm"
            title={
              <>
                Không chỉ <em>cấp license.</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            items={[
              { icon: Mail, title: "Chuyển email cũ", text: "Từ Gmail, Google Workspace, hosting mail sang Exchange Online, giữ nguyên thư cũ.", href: "/dich-vu/trien-khai-chuyen-doi/", linkLabel: "Xem dịch vụ chuyển đổi" },
              { icon: Globe, title: "Cấu hình tên miền", text: "MX, SPF, DKIM, DMARC để email gửi đi không bị đánh dấu spam." },
              { icon: FolderOpen, title: "Teams và SharePoint", text: "Thiết lập nhóm, thư mục theo phòng ban và phân quyền truy cập." },
              { icon: KeyRound, title: "Bảo mật nền tảng", text: "Xác thực đa yếu tố, chính sách mật khẩu, chống giả mạo email." },
              { icon: GraduationCap, title: "Đào tạo người dùng", text: "Hướng dẫn dùng Outlook, Teams, OneDrive cho nhân viên." },
              { icon: ShieldCheck, title: "Quản trị hằng tháng", text: "Quản lý người dùng, license, bảo mật và sao lưu.", href: "/dich-vu/quan-tri-van-hanh/", linkLabel: "Xem dịch vụ quản trị" },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Quy trình"
            title={
              <>
                Lên Microsoft 365 <em>trong 5 bước.</em>
              </>
            }
            className="mb-12"
          />
          <Steps
            items={[
              { title: "Khảo sát", text: "Số người dùng, hệ thống email và dữ liệu hiện tại." },
              { title: "Báo giá, tạo tenant", text: "Chốt gói, kỳ cam kết và tạo tài khoản Microsoft 365." },
              { title: "Cấu hình", text: "Tên miền, bảo mật, Teams và SharePoint." },
              { title: "Chuyển dữ liệu", text: "Chuyển email và tài liệu từ hệ thống cũ." },
              { title: "Bàn giao, đào tạo", text: "Đổi MX ngoài giờ, kiểm tra, hướng dẫn người dùng." },
            ]}
          />
        </div>
      </section>

      <Faq
        title="Câu hỏi về Microsoft 365"
        items={[
          { q: "DVAI có xuất hoá đơn VAT và nhận thanh toán bằng VND không?", a: "Có. DVAI xuất hoá đơn VAT và nhận thanh toán bằng VND." },
          { q: "Một công ty có dùng nhiều gói khác nhau được không?", a: "Được. License gán cho từng người dùng, nên có thể kết hợp Business Basic, Standard và Premium trong cùng một công ty." },
          { q: "Giảm số người dùng giữa kỳ được không?", a: "Với cam kết năm, số lượng thường chỉ giảm được khi gia hạn. Nếu nhân sự thay đổi theo mùa, DVAI tư vấn tách một phần sang cam kết tháng." },
          { q: "Chuyển email có làm gián đoạn công việc không?", a: "Thư cũ được chuyển trước trong khi hệ thống cũ vẫn chạy. Bước đổi bản ghi MX được làm ngoài giờ làm việc để hạn chế gián đoạn." },
          { q: "Dữ liệu được lưu ở đâu?", a: "Dữ liệu nằm trong tenant Microsoft 365 của chính doanh nghiệp, tại trung tâm dữ liệu của Microsoft. Doanh nghiệp giữ quyền quản trị cao nhất." },
          { q: "Gói Business có kèm Teams không?", a: "Microsoft bán các gói Business ở phiên bản kèm Teams và không kèm Teams, tuỳ thị trường và thời điểm. Khi báo giá, DVAI ghi rõ phiên bản và tư vấn lựa chọn phù hợp." },
          { q: "Microsoft 365 khác Google Workspace thế nào?", a: "Cả hai đều có email, họp và lưu trữ. Microsoft 365 có thêm Office cài trên máy và kết nối sẵn với Power Platform để xây ứng dụng, tự động hoá. DVAI có thể chuyển dữ liệu từ Google Workspace sang Microsoft 365." },
        ]}
      />

      <CtaPanel
        product="Microsoft 365"
        title={
          <>
            Nhận báo giá Microsoft 365 <em>trong {site.responseTime}.</em>
          </>
        }
      />
    </>
  );
}
