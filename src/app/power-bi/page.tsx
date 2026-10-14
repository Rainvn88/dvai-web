import { CtaPanel } from "@/components/sections/CtaPanel";
import { Faq } from "@/components/sections/Faq";
import { FeatureCards } from "@/components/sections/FeatureCards";
import { FlowDiagram } from "@/components/sections/FlowDiagram";
import { PageHero } from "@/components/sections/PageHero";
import { Steps } from "@/components/sections/Steps";
import { Tabs } from "@/components/sections/Tabs";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pageMeta } from "@/lib/metadata";

export const metadata = pageMeta({
  title: "Power BI: dashboard quản trị cho doanh nghiệp",
  description:
    "Dashboard doanh thu, chi phí, vận hành, kho, nhân sự tự cập nhật từ Excel, SharePoint, phần mềm kế toán. So sánh Power BI Pro, Premium Per User và Fabric.",
  path: "/power-bi/",
});

const bars = [52, 61, 58, 70, 66, 78, 74, 83, 80, 88, 92, 86];

function DashboardMock() {
  return (
    <div className="card p-6" role="img" aria-label="Dashboard mẫu ngành logistics với số chuyến, chi phí mỗi chuyến và tỷ lệ giao đúng hạn, dữ liệu minh hoạ">
      <p className="text-[13px] font-semibold text-navy">Vận hành vận tải, tháng 10</p>
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          ["Số chuyến", "1.248"],
          ["Chi phí/chuyến", "1,86 tr ₫"],
          ["Đúng hạn", "94%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-[10px] bg-bg p-3">
            <p className="text-[11.5px] text-muted">{label}</p>
            <p className="font-display text-[22px] leading-tight text-navy tabular-nums">{value}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex h-[120px] items-end gap-1.5 border-b border-line">
        {bars.map((height, index) => (
          <span
            key={index}
            className={`flex-1 rounded-t-[3px] ${index === bars.length - 2 ? "bg-teal" : "bg-[#b9dde2]"}`}
            style={{ height: `${height}%` }}
          />
        ))}
      </div>
      <p className="mt-2 flex justify-between text-[11px] text-muted">
        <span>T11/2025</span>
        <span>T10/2026</span>
      </p>
      <p className="mt-4 text-[12px] text-muted">Dữ liệu minh hoạ.</p>
    </div>
  );
}

export default function PowerBiPage() {
  return (
    <>
      <PageHero
        eyebrow="Power BI"
        title={
          <>
            Báo cáo quản trị <em>tự cập nhật,</em> xem trên điện thoại.
          </>
        }
        lede="Gom Excel, SharePoint, phần mềm kế toán và ERP vào một dashboard. Không còn tổng hợp số liệu thủ công cuối tháng."
        primary="tu-van"
        product="Power BI"
        aside={<DashboardMock />}
      />

      <section className="section">
        <div className="wrap">
          <SectionHeading
            eyebrow="Theo bộ phận"
            title={
              <>
                Mỗi bộ phận <em>một dashboard.</em>
              </>
            }
            className="mb-10"
          />
          <Tabs
            label="Dashboard theo bộ phận"
            items={[
              { label: "Ban giám đốc", title: "Bức tranh toàn công ty", text: "Doanh thu, lợi nhuận, dòng tiền và các chỉ số chính trên một màn hình.", points: ["Doanh thu, lợi nhuận theo tháng", "Dòng tiền và công nợ", "So sánh với cùng kỳ và kế hoạch"] },
              { label: "Kinh doanh", title: "Pipeline và doanh số", text: "Theo dõi cơ hội, doanh số theo nhân viên và khu vực.", points: ["Pipeline theo giai đoạn", "Doanh số theo nhân viên, khu vực", "Khách hàng mới và quay lại"] },
              { label: "Vận hành, logistics", title: "Hiệu quả vận hành", text: "Số chuyến, chi phí và tỷ lệ giao đúng hạn cập nhật theo ngày.", points: ["Số chuyến theo xe, theo tuyến", "Chi phí mỗi chuyến", "Tỷ lệ giao đúng hạn"] },
              { label: "Kho", title: "Tồn kho và luân chuyển", text: "Biết hàng nào tồn lâu, hàng nào sắp hết.", points: ["Tồn kho theo kho, theo mã hàng", "Vòng quay hàng tồn", "Hàng chậm luân chuyển"] },
              { label: "Nhân sự", title: "Nhân sự và KPI", text: "Theo dõi KPI, nghỉ phép và biến động nhân sự.", points: ["Điểm KPI theo phòng ban", "Nghỉ phép, tăng ca", "Biến động nhân sự"] },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="Nguồn dữ liệu"
            title={
              <>
                Kết nối <em>dữ liệu bạn đang có.</em>
              </>
            }
            lede="Excel, CSV, SharePoint List, SQL Server, phần mềm kế toán qua file xuất hoặc API, Dataverse, Google Sheets."
            className="mb-10"
          />
          <FlowDiagram
            label="Quy trình làm báo cáo Power BI"
            nodes={[
              { title: "Nguồn dữ liệu", text: "Excel, SharePoint, phần mềm kế toán, ERP" },
              { title: "Làm sạch", text: "Chuẩn hoá mã, ngày, đơn vị" },
              { title: "Mô hình dữ liệu", text: "Nối các bảng, định nghĩa chỉ số" },
              { title: "Dashboard", text: "Biểu đồ, bộ lọc, xem trên điện thoại" },
              { title: "Chia sẻ theo quyền", text: "Mỗi người thấy đúng phần của mình" },
            ]}
          />
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading
            eyebrow="License"
            title={
              <>
                Power BI Pro, Premium Per User <em>hay Fabric?</em>
              </>
            }
            className="mb-10"
          />
          <FeatureCards
            columns={4}
            tone="blue"
            topBorder
            items={[
              { title: "Free", text: "Tự tạo và xem báo cáo cá nhân, không chia sẻ cho người khác." },
              { title: "Pro", text: "Chia sẻ và cộng tác. Người tạo và người xem báo cáo được chia sẻ đều cần license." },
              { title: "Premium Per User", text: "Dữ liệu lớn hơn, làm mới thường xuyên hơn, thêm tính năng nâng cao." },
              { title: "Fabric capacity", text: "Tính theo dung lượng, phù hợp khi nhiều người cùng xem báo cáo." },
            ]}
          />
          <p className="mt-4 text-[14px] text-muted">DVAI gợi ý loại license theo số người tạo và số người xem báo cáo.</p>
        </div>
      </section>

      <section className="section pt-0">
        <div className="wrap">
          <SectionHeading eyebrow="Quy trình" title={<>Từ file Excel đến <em>dashboard.</em></>} className="mb-12" />
          <Steps
            items={[
              { title: "Chốt chỉ số", text: "10–15 chỉ số quản trị quan trọng nhất." },
              { title: "Kiểm tra dữ liệu", text: "Nguồn, chất lượng và tần suất cập nhật." },
              { title: "Dựng bản mẫu", text: "Xem bản đầu tiên trên dữ liệu thật." },
              { title: "Hoàn thiện", text: "Phân quyền, đào tạo người xem." },
              { title: "Bảo trì", text: "Bổ sung báo cáo khi có nhu cầu mới." },
            ]}
          />
        </div>
      </section>

      <Faq
        title="Câu hỏi về Power BI"
        items={[
          { q: "Dữ liệu cập nhật bao lâu một lần?", a: "Tuỳ license và nguồn dữ liệu. Với Power BI Pro, báo cáo có thể tự làm mới theo lịch tối đa 8 lần mỗi ngày; Premium cho phép làm mới thường xuyên hơn." },
          { q: "Có cần kho dữ liệu riêng không?", a: "Không bắt buộc. Nhiều báo cáo đọc trực tiếp từ Excel, SharePoint hoặc cơ sở dữ liệu hiện có. Khi dữ liệu lớn hoặc nhiều nguồn, DVAI tư vấn thêm lớp lưu trữ trung gian." },
          { q: "Ai trong công ty cần license?", a: "Người tạo và người xem báo cáo được chia sẻ cần license Pro hoặc Premium Per User, trừ khi báo cáo đặt trên Fabric capacity phù hợp." },
          { q: "Mỗi phòng ban chỉ xem số liệu của mình được không?", a: "Được, bằng phân quyền theo dòng dữ liệu (row-level security)." },
        ]}
      />

      <CtaPanel
        intent="tu-van"
        product="Power BI"
        title={
          <>
            Gửi file báo cáo hiện tại để <em>được tư vấn dashboard.</em>
          </>
        }
      />
    </>
  );
}
