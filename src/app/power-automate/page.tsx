import { Bell, CalendarClock, Check, ClipboardCheck, Inbox, RefreshCw, ScanText } from "lucide-react";
import { CaseCards } from "@/components/sections/CaseCards";
import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Power Automate: tự động hoá quy trình doanh nghiệp",
  description:
    "Tự động duyệt nhiều cấp, nhắc hạn, gửi báo cáo, đồng bộ dữ liệu giữa Outlook, Teams, SharePoint, Excel với Power Automate.",
  path: "/power-automate/",
});

const exampleFlow = [
  "Nhân viên gửi đề nghị thanh toán trong ứng dụng",
  "Trưởng phòng nhận thông báo trên Teams và duyệt",
  "Đề nghị vượt hạn mức chuyển tiếp lên giám đốc",
  "Kế toán nhận email kèm chứng từ để thanh toán",
  "Toàn bộ lịch sử duyệt được lưu vào SharePoint",
];

export default function PowerAutomatePage() {
  return (
    <>
      <PageHero
        eyebrow="Power Automate"
        title={
          <>
            Tự động hoá việc lặp lại: <em>duyệt, nhắc việc, chuyển dữ liệu.</em>
          </>
        }
        lede="Power Automate nối Outlook, Teams, SharePoint, Excel và nhiều ứng dụng khác để công việc tự chạy theo quy tắc."
        primary="tu-van"
        product="Power Automate"
        aside={
          <div className="card p-6.5">
            <p className="text-[13px] font-semibold tracking-[0.1em] text-teal uppercase">Ví dụ: luồng duyệt thanh toán</p>
            <ol className="mt-4 grid gap-0">
              {exampleFlow.map((step, index) => (
                <li key={step} className="relative flex gap-3.5 pb-4 last:pb-0">
                  {index < exampleFlow.length - 1 && (
                    <span aria-hidden className="absolute top-7 left-[13px] h-[calc(100%-24px)] w-px bg-line-strong" />
                  )}
                  <span className="grid size-[27px] flex-none place-items-center rounded-full bg-teal-soft text-[12.5px] font-semibold text-teal">
                    {index + 1}
                  </span>
                  <span className="pt-0.5 text-[14.5px] text-ink">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 text-[12.5px] text-muted">Ví dụ minh hoạ. Quy tắc duyệt cấu hình theo từng doanh nghiệp.</p>
          </div>
        }
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Quy trình phổ biến"
            title={
              <>
                Những việc doanh nghiệp thường <em>tự động hoá đầu tiên.</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            items={[
              { icon: ClipboardCheck, title: "Duyệt đề xuất nhiều cấp", text: "Chuyển đúng người duyệt theo hạn mức, nhắc khi quá hạn." },
              { icon: Inbox, title: "Lưu file đính kèm email", text: "Tự lưu chứng từ từ email vào thư mục SharePoint theo khách hàng." },
              { icon: CalendarClock, title: "Báo cáo định kỳ", text: "Gửi báo cáo hằng ngày, hằng tuần qua email hoặc Teams." },
              { icon: Bell, title: "Nhắc hạn", text: "Hợp đồng, giấy phép, đăng kiểm xe sắp hết hạn." },
              { icon: RefreshCw, title: "Đồng bộ dữ liệu", text: "Giữa Excel, SharePoint và phần mềm khác, không nhập tay hai lần." },
              { icon: ScanText, title: "Đọc hoá đơn, chứng từ", text: "Trích số liệu từ file PDF bằng AI Builder." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Loại tự động hoá"
            title={
              <>
                Cloud flow và <em>Desktop flow.</em>
              </>
            }
            className="mb-10"
          />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: "Cloud flow",
                points: [
                  "Tự động hoá giữa các dịch vụ online như Outlook, Teams, SharePoint",
                  "Nhiều trường hợp dùng được với license Microsoft 365 đang có",
                ],
              },
              {
                title: "Desktop flow",
                points: [
                  "Thao tác thay người trên phần mềm cài máy tính, ví dụ nhập liệu vào phần mềm cũ",
                  "Cần license Power Automate Premium",
                ],
              },
            ].map((card) => (
              <div key={card.title} className="card grid content-start gap-3 p-6.5">
                <h3 className="text-[17px] font-semibold text-navy">{card.title}</h3>
                <ul className="grid gap-2.5 text-[15px]">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-2">
                      <Check aria-hidden className="mt-1 size-4 flex-none text-teal" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-4 text-[14px] text-muted">
            Connector Premium như HTTP, SQL Server, Dataverse cần license riêng. DVAI báo rõ trước khi triển khai.
          </p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Cách bắt đầu"
            title={
              <>
                Bắt đầu từ <em>một quy trình.</em>
              </>
            }
            className="mb-12"
          />
          <Steps
            items={[
              { title: "Liệt kê việc lặp lại", text: "Những việc tốn giờ công mỗi ngày, mỗi tuần." },
              { title: "Chọn 1–3 quy trình", text: "Ưu tiên quy trình tác động lớn nhất." },
              { title: "Xây và chạy thử", text: "Chạy song song với cách làm cũ để kiểm tra." },
              { title: "Mở rộng, theo dõi", text: "Thêm quy trình mới, theo dõi lỗi định kỳ." },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Dự án" title={<>Kết quả <em>đã đo được.</em></>} className="mb-10" />
          <CaseCards />
        </div>
      </section>

      <Faq
        title="Câu hỏi về Power Automate"
        items={[
          { q: "Power Automate có sẵn trong Microsoft 365 chưa?", a: "Nhiều gói Microsoft 365 doanh nghiệp đã gồm quyền dùng Power Automate với các connector chuẩn như Outlook, Teams, SharePoint, Excel." },
          { q: "Khi nào cần license Premium?", a: "Khi luồng dùng connector Premium như HTTP, SQL Server, Dataverse, hoặc dùng desktop flow để tự động thao tác trên máy tính." },
          { q: "Luồng bị lỗi thì ai theo dõi?", a: "Power Automate gửi thông báo khi luồng chạy lỗi. Với dịch vụ quản trị hằng tháng, DVAI theo dõi và xử lý lỗi cho doanh nghiệp." },
          { q: "Có gửi thông báo qua Zalo được không?", a: "Có thể, nếu doanh nghiệp dùng Zalo Official Account có API. Cách này cần connector HTTP thuộc nhóm Premium. DVAI tư vấn phương án ở buổi khảo sát." },
        ]}
      />

      <CtaPanel
        intent="tu-van"
        product="Power Automate"
        title={
          <>
            Gửi chúng tôi <em>một quy trình</em> bạn muốn tự động.
          </>
        }
      />
    </>
  );
}
