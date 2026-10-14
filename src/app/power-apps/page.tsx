import { Check, ChartLine, FileText, Layers, MessageSquare } from "lucide-react";
import { ApprovalDemo } from "@/components/demo/ApprovalDemo";
import { AppPackagesDetailed } from "@/components/sections/AppPackages";
import { CaseCards } from "@/components/sections/CaseCards";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { CustomAppBlock } from "@/components/sections/CustomAppBlock";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Power Apps: ứng dụng nội bộ cho doanh nghiệp",
  description:
    "Ứng dụng duyệt chi phí, quản lý vận tải, CRM, mua hàng, tài liệu, KPI trên Power Apps. Triển khai từ 1 tuần, chạy trên Microsoft 365 doanh nghiệp đang dùng.",
  path: "/power-apps/",
});

function OptionCard({ title, points, note }: { title: string; points: string[]; note: string }) {
  return (
    <div className="card grid content-start gap-3 p-6.5">
      <h3 className="text-[17px] font-semibold text-navy">{title}</h3>
      <ul className="grid gap-2.5 text-[15px]">
        {points.map((point) => (
          <li key={point} className="flex gap-2">
            <Check aria-hidden className="mt-1 size-4 flex-none text-teal" />
            {point}
          </li>
        ))}
      </ul>
      <p className="text-[14px] text-muted">{note}</p>
    </div>
  );
}

export default function PowerAppsPage() {
  return (
    <>
      <PageHero
        eyebrow="Power Apps cho doanh nghiệp"
        title={
          <>
            Ứng dụng nội bộ chạy trên <em>Microsoft 365 bạn đang dùng.</em>
          </>
        }
        lede="Thay Excel, giấy tờ và tin nhắn Zalo bằng ứng dụng duyệt, theo dõi và báo cáo trên điện thoại. Ứng dụng dựng sẵn triển khai từ 1 tuần."
        primary="tu-van"
        product="Power Apps"
        chips={["Power Apps", "Power Automate", "SharePoint", "Dataverse", "Teams"]}
        aside={<ApprovalDemo />}
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Dấu hiệu"
            title={
              <>
                Doanh nghiệp đang gặp <em>những việc này?</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            columns={4}
            items={[
              { icon: FileText, title: "Đề xuất in giấy, chờ ký nhiều ngày", text: "Chứng từ đi qua nhiều bàn, khó biết đang dừng ở đâu." },
              { icon: Layers, title: "Mỗi phòng một file Excel", text: "Số liệu không khớp, mất thời gian đối chiếu cuối tháng." },
              { icon: MessageSquare, title: "Phê duyệt qua Zalo", text: "Không lưu vết, khó tra lại khi cần kiểm tra." },
              { icon: ChartLine, title: "Thiếu số liệu theo thời gian thực", text: "Quản lý phải chờ tổng hợp mới ra được quyết định." },
            ]}
          />
        </div>
      </section>

      <section className="section scroll-mt-20 pt-0" id="goi-ung-dung">
        <div className="wrap">
          <SectionHeading
            eyebrow="Ứng dụng dựng sẵn"
            title={
              <>
                6 ứng dụng dựng sẵn, <em>điều chỉnh theo quy trình của bạn.</em>
              </>
            }
            lede="Xem demo, thống nhất phạm vi, nhận báo giá trọn gói."
            className="mb-10"
          />
          <AppPackagesDetailed />
          <CustomAppBlock id="thiet-ke-rieng" />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Cách hoạt động"
            title={
              <>
                Xây trên nền tảng Microsoft, <em>dữ liệu nằm trong hệ thống của bạn.</em>
              </>
            }
            lede="Dùng chung tài khoản Microsoft 365, không cần đăng nhập riêng, dữ liệu không ra khỏi tenant công ty."
            className="mb-10"
          />
          <FlowDiagram
            label="Các thành phần của một ứng dụng Power Apps"
            nodes={[
              { title: "Power Apps", text: "Giao diện trên điện thoại, máy tính và Teams" },
              { title: "SharePoint hoặc Dataverse", text: "Nơi lưu dữ liệu trong tenant của bạn" },
              { title: "Power Automate", text: "Duyệt, nhắc việc, gửi thông báo" },
              { title: "Power BI", text: "Báo cáo quản trị" },
              { title: "Teams và Outlook", text: "Nhận thông báo, duyệt nhanh" },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Nơi lưu dữ liệu"
            title={
              <>
                SharePoint List hay <em>Dataverse?</em>
              </>
            }
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <OptionCard
              title="SharePoint List"
              points={[
                "Có sẵn trong Microsoft 365, không tốn thêm license",
                "Phù hợp quy trình vừa và nhỏ",
                "Dễ xem, dễ xuất dữ liệu ra Excel",
              ]}
              note="Lựa chọn mặc định khi bắt đầu."
            />
            <OptionCard
              title="Dataverse"
              points={[
                "Dữ liệu quan hệ, khối lượng lớn",
                "Phân quyền chi tiết theo vai trò và bản ghi",
                "Cần license Power Apps Premium",
              ]}
              note="Chuyển sang khi quy mô hoặc yêu cầu bảo mật tăng."
            />
          </div>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Quy trình triển khai"
            title={
              <>
                Từ quy trình trên giấy đến <em>ứng dụng chạy thật, từ 1 tuần.</em>
              </>
            }
            className="mb-12"
          />
          <Steps
            items={[
              { title: "Workshop quy trình", text: "1–2 buổi để hiểu cách công ty đang làm." },
              { title: "Demo trên dữ liệu của bạn", text: "Xem ứng dụng mẫu với dữ liệu thật." },
              { title: "Điều chỉnh, kiểm thử", text: "Người dùng chạy thử và góp ý." },
              { title: "Đào tạo, đưa vào dùng", text: "Hướng dẫn từng vai trò, chuyển dữ liệu cũ." },
              { title: "Bảo hành, hỗ trợ", text: "Sửa lỗi, bổ sung tính năng khi cần." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Chi phí"
            title={
              <>
                Hai cách <em>tính phí.</em>
              </>
            }
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2">
            <OptionCard
              title="Ứng dụng dựng sẵn"
              points={["Giá trọn gói theo phạm vi đã thống nhất", "Triển khai từ 1 tuần, quản lý vận tải từ 2 tuần"]}
              note="Phù hợp khi quy trình gần với mẫu có sẵn."
            />
            <OptionCard
              title="Ứng dụng thiết kế riêng"
              points={["Báo giá sau buổi khảo sát quy trình", "Phát triển thêm tính năng theo từng giai đoạn"]}
              note="Phù hợp khi nghiệp vụ đặc thù."
            />
          </div>
          <p className="mt-4 text-[14px] text-muted">License Microsoft, nếu cần thêm, được báo riêng và rõ ràng trước khi triển khai.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Dự án"
            title={
              <>
                Ứng dụng DVAI <em>đã triển khai.</em>
              </>
            }
            className="mb-10"
          />
          <CaseCards />
        </div>
      </section>

      <Faq
        title="Câu hỏi về Power Apps"
        items={[
          { q: "Có phải mua thêm license không?", a: "Nhiều ứng dụng chạy được với license Microsoft 365 doanh nghiệp đang có, khi dùng SharePoint và các connector chuẩn. Nếu cần Dataverse hoặc connector Premium, DVAI báo rõ chi phí license trước khi triển khai." },
          { q: "Nhân viên dùng trên điện thoại được không?", a: "Được. Ứng dụng chạy trên ứng dụng Power Apps cho iOS và Android, trên trình duyệt và ngay trong Teams." },
          { q: "Dữ liệu Excel cũ có chuyển vào được không?", a: "Được. Dữ liệu Excel hiện có được làm sạch và nhập vào ứng dụng trước khi đưa vào sử dụng." },
          { q: "Sau bàn giao, công ty tự sửa ứng dụng được không?", a: "Được. Ứng dụng nằm trong tenant của doanh nghiệp, DVAI bàn giao quyền quản trị cho công ty." },
          { q: "Khác gì mua phần mềm đóng gói?", a: "Ứng dụng làm theo đúng quy trình của doanh nghiệp, dùng chung tài khoản Microsoft 365 và mở rộng dần theo nhu cầu, thay vì phải đổi quy trình cho vừa phần mềm." },
          { q: "Kết nối được phần mềm kế toán hoặc ERP không?", a: "Tuỳ phần mềm. Nếu phần mềm có API hoặc cơ sở dữ liệu truy cập được, ứng dụng có thể đọc và ghi dữ liệu; nếu không, có thể trao đổi qua file. DVAI kiểm tra ở buổi khảo sát." },
        ]}
      />

      <CtaPanel
        intent="tu-van"
        product="Power Apps"
        title={
          <>
            Xem demo ứng dụng trên <em>quy trình của chính bạn.</em>
          </>
        }
        lede="30 phút qua Teams. Mang theo một quy trình đang làm bằng Excel hoặc giấy."
      />
    </>
  );
}
